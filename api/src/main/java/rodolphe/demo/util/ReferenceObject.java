package rodolphe.demo.util;


/**
 *	Class for master datas.
 *
 * @author JDALMEIDA
 *
 */

public class ReferenceObject {

	private String id;
	private String label;
	private Boolean active;

	/**
	 * Create an instance of ReferenceObject.
	 *
	 * @param id id.
	 * @param label Label.
	 * @param active  active.
	 */
	public ReferenceObject(final String id, final String label, final Boolean active) {
		this.id = id;
		this.label = label;
		this.active = active;
	}

	/**
	 * get the code.
	 *
	 * @return id's value.
	 */
	public String getId() {
		return id;
	}

	/**
	 * Set id.
	 *
	 * @param id's new value.
	 */
	public void setId(final String code) {
		id = code;
	}

	/**
	 * get the label.
	 *
	 * @return label.
	 */
	public String getLabel() {
		return label;
	}

	/**
	 * Set label.
	 *
	 * @param label new value
	 */
	public void setLabel(final String label) {
		this.label = label;
	}

	/**
	 * get active
	 *
	 * @return active.
	 */
	public Boolean getActive() {
		return active;
	}

	/**
	 * Set active.
	 *
	 * @param active.
	 */
	public void setActive(final Boolean active) {
		this.active = active;
	}
}
