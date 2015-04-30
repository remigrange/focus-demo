package rodolphe.demo.util;

/**
 * Class for master datas.
 *
 * @author JDALMEIDA
 */
public class ReferenceObject {

    private final String code;
    private final String label;
    private final Boolean active;

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
     * get the label.
     *
     * @return label.
     */
    public String getLabel() {
        return label;
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
