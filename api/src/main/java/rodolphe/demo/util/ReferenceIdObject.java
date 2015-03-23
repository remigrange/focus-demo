package rodolphe.demo.util;

/**
 * Class for master datas.
 *
 * @author JDALMEIDA
 */
public class ReferenceIdObject {

    private Long code;
    private String label;
    private final Boolean active;

    /**
     * Create an instance of ReferenceObject.
     *
     * @param code code (Long).
     * @param label Label.
     * @param active active.
     */
    public ReferenceIdObject(final Long code, final String label, final Boolean active) {
        this.code = code;
        this.label = label;
        this.active = active;
    }

    /**
     * get the code.
     *
     * @return id's value.
     */
    public Long getCode() {
        return code;
    }

    /**
     * Set id.
     *
     * @param code new value.
     */
    public void setCode(final Long code) {
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
}
