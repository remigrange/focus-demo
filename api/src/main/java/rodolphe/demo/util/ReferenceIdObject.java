package rodolphe.demo.util;

/**
 * Class for master datas.
 *
 * @author JDALMEIDA
 *
 */
public class ReferenceIdObject {

	private Long id;
	private String label;
	private final Boolean active;

	/**
	 * Create an instance of ReferenceObject.
	 *
	 * @param id id.
	 * @param label Label.
	 * @param active  active.
	 */
	public ReferenceIdObject(final Long id, final String label, final Boolean active) {
		this.id = id;
		this.label = label;
		this.active = active;
	}

	/**
	 * get the code.
	 *
	 * @return id's value.
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Set id.
	 *
	 * @param idP new value.
	 */
	public void setId(final Long idP) {
		id = idP;
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
}
