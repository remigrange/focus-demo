package rodolphe.demo.domain;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;

@DtDefinition
public final class Flower implements DtObject {
	private static final long serialVersionUID = -5975848806293357234L;
	private final Long id;
	private final String name;

	public Flower(final long id, final String name) {
		this.id = id;
		this.name = name;
	}

	@Field(domain = "DO_IDENTITY", type = "PRIMARY_KEY", notNull = true, label = "id")
	public final Long getId() {
		return id;
	}

	@Field(domain = "DO_STRING", label = "name")
	public String getName() {
		return name;
	}
}