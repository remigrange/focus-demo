package rodolphe.demo.domain.commons;

import io.vertigo.dynamo.domain.model.DtObject;
import io.vertigo.dynamo.domain.stereotype.DtDefinition;
import io.vertigo.dynamo.domain.stereotype.Field;

@DtDefinition
public final class Alert implements DtObject {
	private static final long serialVersionUID = -5975848806293357234L;
	@Field(domain = "DO_IDENTITY", type = "PRIMARY_KEY", notNull = true, label = "id")
	private Long id;

	@Field(domain = "DO_STRING", label = "code")
	private String code;

	@Field(domain = "DO_STRING", label = "message")
	private String msg;

	public Alert() {}

	public final Long getId() {
		return id;
	}

	public void setId(final long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(final String code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(final String msg) {
		this.msg = msg;
	}
}