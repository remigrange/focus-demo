/**
 *
 */
package roldophe.demo;

import io.vertigo.core.Home;
import io.vertigo.dynamo.domain.metamodel.DtDefinition;
import io.vertigo.dynamo.domain.metamodel.DtField;
import io.vertigo.dynamo.domain.metamodel.DtField.FieldType;
import io.vertigo.dynamo.domain.metamodel.DtFieldName;
import io.vertigo.dynamo.domain.model.DtList;
import io.vertigo.dynamo.domain.model.DtListURI;
import io.vertigo.dynamo.domain.model.DtListURIForCriteria;
import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.Association;
import io.vertigo.dynamo.domain.util.DtObjectUtil;
import io.vertigo.dynamo.persistence.PersistenceManager;
import io.vertigo.dynamo.persistence.criteria.FilterCriteriaBuilder;
import io.vertigo.dynamo.persistence.datastore.Broker;
import io.vertigo.lang.Assertion;
import io.vertigo.util.StringUtil;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import org.junit.Assert;
import org.junit.Test;

import rodolphe.demo.domain.DtDefinitions;
import roldophe.demo.tools.AbstractRodolpheTestCase;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Classe testant les méthodes générés automatiquement sur les DTO.
 *
 * @author jmforhan
 */
public class DtoTest extends AbstractRodolpheTestCase {

	private final Gson gson = createGson();

	private static Gson createGson() {
		return new GsonBuilder()//
				.setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") //
				.create();
	}

	/**
	 * Test les méthodes des dtos.
	 */
	@Test
	public void methodeDto() {
		for (final Class<?> dtoClass : new DtDefinitions()) {
			final String fullName = dtoClass.getCanonicalName();
			try {
				final DtObject dto = (DtObject) dtoClass.newInstance();
				Assert.assertNotNull(dto.toString());
				final Method[] ms = dtoClass.getMethods();
				final Map<String, Method> mMap = new HashMap<>();
				final Map<String, String> fkMethodeMap = new HashMap<>();
				for (final Method m : ms) {
					mMap.put(m.getName(), m);
					if (m.getName().startsWith("get")) {
						if (m.getName().endsWith("URI")) {
							if (m.getAnnotation(Association.class) != null) {
								final Association ass = m.getAnnotation(Association.class);
								final int idx = m.getName().lastIndexOf("URI");
								final String autoGetter = m.getName().substring(0, idx);
								if (!autoGetter.endsWith("DtList")) {
									fkMethodeMap.put(ass.fkFieldName(), autoGetter);
								}
							}
						} else {
							// On a un getter (sur champ privé, sur computed, getter automatique). On le teste
							m.invoke(dto);
						}
					}
				}
				// On vérifie l'enumération des champs et les getters associés
				verifierEnumfield(dto, mMap, fullName, fkMethodeMap);
			} catch (final Throwable t) {
				throw new RuntimeException("problème classe " + fullName, t);
			}
		}
	}

	private <D extends DtObject, E extends DtFieldName> void verifierEnumfield(final D dto,
			final Map<String, Method> mMap, final String fullName, final Map<String, String> fkMethodeMap) {
		final DtDefinition def = DtObjectUtil.findDtDefinition(dto);
		final String fdName = DtDefinitions.class.getCanonicalName() + "$" + dto.getClass().getSimpleName() + "Fields";
		try {
			final Class<E> fdClass = (Class<E>) Class.forName(fdName);
			Assert.assertNotNull(fdClass);
			final E[] enumValues = fdClass.getEnumConstants();
			for (final E field : enumValues) {
				// On trouve le champ dans les champs référencés du DTO
				final DtField dtField = def.getField(field);
				// On utilise les getters et setters générique
				dtField.getDataAccessor().getValue(dto);
				final boolean isComputed = FieldType.COMPUTED == dtField.getType();
				if (!isComputed) {
					dtField.getDataAccessor().setValue(dto, null);
				}
				// On utilise les getters et setters typés
				final String getter = "get" + StringUtil.constToUpperCamelCase(field.name());
				final Method gm = mMap.get(getter);
				Assert.assertNotNull(getter, gm);
				gm.invoke(dto);
				final String setter = "s" + getter.substring(1);
				final Method sm = mMap.get(setter);
				if (isComputed) {
					Assert.assertNull(setter, sm);
				} else {
					Assert.assertNotNull(setter, sm);
					sm.invoke(dto, (Object) null);
					final String autoGetter = fkMethodeMap.get(dtField.getName());
					if (autoGetter != null) {
						final Method agm = mMap.get(autoGetter);
						Assert.assertNotNull(fullName + " : " + autoGetter, agm);
						Assert.assertNull(agm.invoke(dto));
						verifierGetterAutomatique(dto, gm, sm, agm);
					}
				}
			}
		} catch (final Throwable t) {
			throw new RuntimeException("problème classe " + fdName, t);
		}
	}

	private <D extends DtObject> void verifierGetterAutomatique(final D dtoRef, final Method gm, final Method sm,
			final Method agm) {
		final DtDefinition dtDef = DtObjectUtil.findDtDefinition((Class<? extends DtObject>) agm.getReturnType());
		final Broker broker = Home.getComponentSpace().resolve(PersistenceManager.class).getBroker();
		// On clone via une sérialization - désérialization avec Gson
		final DtObject dto = gson.fromJson(gson.toJson(dtoRef), dtoRef.getClass());
		final FilterCriteriaBuilder<D> filterCriteriaBuilder = new FilterCriteriaBuilder<>();
		final DtListURI collectionURI = new DtListURIForCriteria<>(dtDef, filterCriteriaBuilder.build(), 2);
		Assertion.checkNotNull(collectionURI);
		final DtList<?> dtc = broker.getList(collectionURI);
		if (dtc.size() < 1) {
			return;
		}
		final DtObject dtoFk1 = dtc.get(0);
		final Object fk1 = DtObjectUtil.getId(dtoFk1);
		try {
			// On met null
			sm.invoke(dto, (Object) null);
			Assert.assertNull(gm.invoke(dto));
			Assert.assertNull(agm.invoke(dto));
			// On met un objet
			sm.invoke(dto, fk1);
			Assert.assertEquals(fk1, gm.invoke(dto));
			Assert.assertEquals(dtoFk1.toString(), agm.invoke(dto).toString());
			// On peut reappeler le getter automatique sans problème
			Assert.assertEquals(dtoFk1.toString(), agm.invoke(dto).toString());
		} catch (final Throwable t) {
			throw new RuntimeException(t);
		}
		if (dtc.size() < 2) {
			return;
		}
		final DtObject dtoFk2 = dtc.get(1);
		final Object fk2 = DtObjectUtil.getId(dtoFk2);
		Assert.assertNotEquals(fk1, fk2);
		try {
			// On change d'objet
			sm.invoke(dto, fk2);
			Assert.assertEquals(fk2, gm.invoke(dto));
			Assert.assertEquals(dtoFk2.toString(), agm.invoke(dto).toString());
		} catch (final Throwable t) {
			throw new RuntimeException(t);
		}
	}
}
