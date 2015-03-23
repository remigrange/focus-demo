/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.dynamox.task;

import io.vertigo.dynamo.domain.metamodel.DataType;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.task.metamodel.TaskAttribute;
import io.vertigo.lang.Assertion;
import io.vertigo.util.StringUtil;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Ce processor permet de remplacer le Where XXX_ID in (#YYY.ROWNUM.ZZZ_ID#).
 * surchargé pour autoriser les minuscules dans REGEXP_PATTERN pour les mots clef SQL.
 *
 * @author npiedeloup
 */
final class WhereInPreProcessor {

	private static final int MASTER_TABLE_FK_GROUP = 1;
	private static final int OPTIONNAL_NOT_GROUP = 2;
	private static final int DTC_INPUTNAME_GROUP = 3;
	private static final int DTC_INPUT_PK_GROUP = 4;
	private static final String REGEXP_CHECK_PATTERN = "\\s(?:IN|in).+#.+(?:ROWNUM|rownum).+#";
	private static final Pattern JAVA_CHECK_PATTERN = Pattern.compile(REGEXP_CHECK_PATTERN);
	private static final String REGEXP_PATTERN = "\\s([A-Za-z0-9_\\.]+)\\s+((?:NOT|not)\\s+)?(?:IN|in)\\s+\\(#([A-Z0-9_]+)\\.(?:ROWNUM|rownum)\\.([A-Z0-9_]+)#\\)";
	private static final Pattern JAVA_PATTERN = Pattern.compile(REGEXP_PATTERN);
	private static final int NB_MAX_WHERE_IN_ITEM = 1000;
	private static final char IN_CHAR = '#';
	private final Map<TaskAttribute, Object> parameterValuesMap;

	/**
	 * Contructeur.
	 *
	 * @param parameterValuesMap Valeur des paramÃ¨tres
	 */
	WhereInPreProcessor(final Map<TaskAttribute, Object> parameterValuesMap) {
		Assertion.checkNotNull(parameterValuesMap);
		// -----
		this.parameterValuesMap = parameterValuesMap;
	}

	/**
	 * @param sqlQuery Query to process
	 * @return Processed query
	 */
	public String evaluate(final String sqlQuery) {
		// On commence par vÃ©rifier la prÃ©sence des mot clÃ©s.
		if (containsKeywords(sqlQuery)) {
			return doEvaluate(sqlQuery);
		}
		return sqlQuery;
	}

	private static boolean containsKeywords(final String sqlQuery) {
		// On vÃ©rifie la prÃ©cense de tous les mots clÃ©s (.rownum., in, #)
		return JAVA_CHECK_PATTERN.matcher(sqlQuery).find(); // fast check
	}

	private TaskAttribute obtainTaskAttribute(final String attributeName) {
		for (final TaskAttribute attribute : parameterValuesMap.keySet()) {
			if (attribute.getName().equals(attributeName)) {
				return attribute;
			}
		}
		throw new IllegalStateException(StringUtil.format("Attribute {0} not found.", attributeName));
	}

	private String doEvaluate(final String sqlQuery) {
		final StringBuilder buildQuery = new StringBuilder(sqlQuery.length());
		int lastMatchOffset = 0;
		final Matcher matcher = JAVA_PATTERN.matcher(sqlQuery);
		while (matcher.find()) {
			// The first matched char is a blank, we keep it (matcher.start+1)
			buildQuery.append(sqlQuery.substring(lastMatchOffset, matcher.start() + 1));
			lastMatchOffset = matcher.end();
			final String fkFieldName = matcher.group(MASTER_TABLE_FK_GROUP);
			final String pkFieldName = matcher.group(DTC_INPUT_PK_GROUP);
			final String inputParamName = matcher.group(DTC_INPUTNAME_GROUP);
			final boolean isNotIn = matcher.group(OPTIONNAL_NOT_GROUP) != null; // null if not found
			final TaskAttribute attribute = obtainTaskAttribute(inputParamName);
			Assertion
			.checkState(
					attribute.isIn() && attribute.getDomain().getDataType() == DataType.DtList,
					"Attribute {0} can't be use in WherInPreProcessor. Check it was declared as IN and is DtList type.",
					inputParamName);
			// -----
			final DtList<?> listObject = (DtList<?>) parameterValuesMap.get(attribute);
			if (listObject.isEmpty()) {
				// where XX not in <<empty>> => always true
				// where XX in <<empty>> => always false
				buildQuery.append(isNotIn ? "1=1" : "1=2");
			} else {
				// -----
				final boolean moreThanOneWhereIn = listObject.size() > NB_MAX_WHERE_IN_ITEM;
				if (moreThanOneWhereIn) {
					buildQuery.append("( ");
				}
				buildQuery.append(fkFieldName);
				buildQuery.append(isNotIn ? " NOT IN (" : " IN (");
				// -----
				String separator = "";
				int index = 1;
				for (final DtObject dto : listObject) {
					buildQuery.append(separator).append(IN_CHAR).append(inputParamName).append(".")
					.append(String.valueOf(listObject.indexOf(dto))).append(".").append(pkFieldName)
					.append(IN_CHAR);
					separator = ",";
					// -----
					if (moreThanOneWhereIn && index != listObject.size() && index % NB_MAX_WHERE_IN_ITEM == 0) {
						buildQuery.append(isNotIn ? ") AND " : ") OR ");
						buildQuery.append(fkFieldName);
						buildQuery.append(isNotIn ? " NOT IN (" : " IN (");
						separator = "";
					}
					// -----
					index++;
				}
				buildQuery.append(")");
				if (moreThanOneWhereIn) {
					buildQuery.append(")");
				}
			}
		}
		Assertion
		.checkState(
				lastMatchOffset > 0,
				"WhereInPreProcessor not applied. Keywords found but query doesn't match. Check syntaxe : XXX_ID <<not>> in (#YYY.ROWNUM.ZZZ_ID#) of {0}",
				sqlQuery);
		buildQuery.append(sqlQuery.substring(lastMatchOffset));
		return buildQuery.toString();
	}
}
