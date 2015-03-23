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
package io.vertigo.dynamo.domain.util;

import io.vertigo.core.Home;
import io.vertigo.core.spaces.definiton.Definition;
import io.vertigo.core.spaces.definiton.DefinitionUtil;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.dynamo.domain.metamodel.Dynamic;
import io.vertigo.dynamo.domain.metamodel.association.AssociationNNDefinition;
import io.vertigo.dynamo.domain.metamodel.association.AssociationSimpleDefinition;
import io.vertigo.dynamo.domain.metamodel.association.DtListURIForNNAssociation;
import io.vertigo.dynamo.domain.metamodel.association.DtListURIForSimpleAssociation;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.model.DynaDtObject;
import io.vertigo.dynamo.domain.model.URI;
import io.vertigo.lang.Assertion;
import io.vertigo.util.ClassUtil;
import io.vertigo.util.StringUtil;

/**
 * Utilitaire offrant des méthodes sur DtObject.
 *
 * @author pchretien
 */
public final class DtObjectUtil {

	private static final String DT_DEFINITION_PREFIX = DefinitionUtil.getPrefix(DtDefinition.class);
	private static final char SEPARATOR = Definition.SEPARATOR;

	private DtObjectUtil() {
		// constructeur privé.
	}

	/**
	 * Crée une nouvelle instance de DtObject à partir du type spécifié.
	 *
	 * @return Nouveau DtObject
	 */
	public static DtObject createDtObject(final DtDefinition dtDefinition) {
		Assertion.checkNotNull(dtDefinition);
		// -----
		if (dtDefinition.isDynamic()) {
			return new DynaDtObject(dtDefinition);
		}
		// La création des DtObject n'est pas sécurisée
		return ClassUtil.newInstance(dtDefinition.getClassCanonicalName(), DtObject.class);
	}

	/**
	 * @return Valeur de la PK
	 */
	public static Object getId(final DtObject dto) {
		Assertion.checkNotNull(dto);
		// -----
		final DtDefinition dtDefinition = findDtDefinition(dto);
		final DtField pkField = dtDefinition.getIdField().get();
		return pkField.getDataAccessor().getValue(dto);
	}

	/**
	 * Récupération d'une URI de DTO.
	 * On récupère l'URI d'un DTO référencé par une association.
	 * Il est nécessaire que l'association soit simple.
	 * Si l'association est multiple on ne récupère pas une URI mais une DtListURI, c'est à dire le pointeur vers une
	 * liste.
	 * On recherche une URI correspondant à une association.
	 * Exemple : Une Commande possède un bénéficiaire.
	 * Dans cetexemple on recherche l'URI du bénéficiaire à partir de l'objet commande.
	 *
	 * @param associationDefinitionName Nom de la définition d'une association
	 * @param dto DtObject
	 * @return URI du DTO relié via l'association au dto passé en paramètre (Nullable)
	 */
	public static <D extends DtObject> URI createURI(final DtObject dto, final String associationDefinitionName,
			final Class<D> dtoTargetClass) {
		Assertion.checkNotNull(associationDefinitionName);
		Assertion.checkNotNull(dto);
		Assertion.checkNotNull(dtoTargetClass);
		// -----
		final AssociationSimpleDefinition associationSimpleDefinition = Home.getDefinitionSpace().resolve(
				associationDefinitionName, AssociationSimpleDefinition.class);
		// 1. On recherche le nom du champ portant l'objet référencé (Exemple : personne)
		final DtDefinition dtDefinition = associationSimpleDefinition.getPrimaryAssociationNode().getDtDefinition();
		// 2. On calcule le nom de la fk.
		final DtField fkField = associationSimpleDefinition.getFKField();
		// 3. On calcule l'URI de la clé étrangère
		final Object id = fkField.getDataAccessor().getValue(dto);
		if (id == null) {
			return null;
		}
		return new URI(dtDefinition, id);
	}

	/**
	 * Récupération d'une URI de Collection à partir d'un dto
	 *
	 * @param dto DtObject
	 * @param associationDefinitionName Nom de l'association
	 * @param roleName Nom du role
	 * @return URI de la collection référencée.
	 */
	public static DtListURIForSimpleAssociation createDtListURIForSimpleAssociation(final DtObject dto,
			final String associationDefinitionName, final String roleName) {
		Assertion.checkNotNull(associationDefinitionName);
		Assertion.checkNotNull(roleName);
		Assertion.checkNotNull(dto);
		// -----
		final AssociationSimpleDefinition associationDefinition = Home.getDefinitionSpace().resolve(
				associationDefinitionName, AssociationSimpleDefinition.class);
		return new DtListURIForSimpleAssociation(associationDefinition, createURI(dto), roleName);
	}

	/**
	 * Récupération d'une URI de Collection à partir d'un dto
	 *
	 * @param dto DtObject
	 * @param associationDefinitionName Nom de l'association
	 * @param roleName Nom du role
	 * @return URI de la collection référencée.
	 */
	public static DtListURIForNNAssociation createDtListURIForNNAssociation(final DtObject dto,
			final String associationDefinitionName, final String roleName) {
		Assertion.checkNotNull(associationDefinitionName);
		Assertion.checkNotNull(roleName);
		Assertion.checkNotNull(dto);
		// -----
		final AssociationNNDefinition associationDefinition = Home.getDefinitionSpace().resolve(
				associationDefinitionName, AssociationNNDefinition.class);
		return new DtListURIForNNAssociation(associationDefinition, createURI(dto), roleName);
	}

	private static URI createURI(final DtObject dto) {
		Assertion.checkNotNull(dto);
		// -----
		final DtDefinition dtDefinition = findDtDefinition(dto);
		return new URI(dtDefinition, DtObjectUtil.getId(dto));
	}

	/**
	 * Représentation sous forme text d'un dtObject.
	 *
	 * @param dto dtObject
	 * @return Représentation sous forme text du dtObject.
	 */
	public static String toString(final DtObject dto) {
		Assertion.checkNotNull(dto);
		// -----
		final StringBuilder stringBuilder = new StringBuilder().append(findDtDefinition(dto).getName()).append('(');
		boolean first = true;
		for (final DtField dtField : findDtDefinition(dto).getFields()) {
			if (!first) {
				stringBuilder.append(", ");
			}
			stringBuilder.append(dtField.getName()).append('=');
			stringBuilder.append(dtField.getDataAccessor().getValue(dto));
			first = false;
		}
		stringBuilder.append(')');
		return stringBuilder.toString();
	}

	// =========================================================================
	// ===========================STATIC========================================
	// =========================================================================
	public static DtDefinition findDtDefinition(final DtObject dto) {
		Assertion.checkNotNull(dto);
		// -----
		if (dto instanceof Dynamic) {
			return Dynamic.class.cast(dto).getDefinition();
		}
		return findDtDefinition(dto.getClass());
	}

	public static DtDefinition findDtDefinition(final Class<? extends DtObject> dtObjectClass) {
		Assertion.checkNotNull(dtObjectClass);
		// -----
		final String name = DT_DEFINITION_PREFIX + SEPARATOR
				+ StringUtil.camelToConstCase(dtObjectClass.getSimpleName());
		return Home.getDefinitionSpace().resolve(name, DtDefinition.class);
	}
}
