package rodolphe.demo.util;

/**
 * Class for master datas.
 *
 * @author JDALMEIDA
 */
public class ReferenceObject {

    private String code;
    private String label;
    private Boolean active;

    /**
     * Create an instance of ReferenceObject.
     *
     * @param code code (String).
     * @param label Label.
     * @param active active.
     */
    public ReferenceObject(final String code, final String label, final Boolean active) {
        this.code = code;
        this.label = label;
        this.active = active;
    }

    /**
     * get the code.
     *
     * @return id's value.
     */
    public String getCode() {
        return code;
    }

    /**
     * Set code.
     *
     * @param code new value.
     */
    public void setCode(final String code) {
        this.code = code;
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
     * get active.
     *
     * @return active.
     */
    public Boolean getActive() {
        return active;
    }

    /**
     * Set active.
     *
     * @param active If active
     */
    public void setActive(final Boolean active) {
        this.active = active;
    }
}
