/**
 *
 */
package rodolphe.demo.domain.masterdata;

import java.util.Locale;

import rodolphe.demo.domain.CodeEnumWithDto;
import rodolphe.demo.domain.masterdatas.RoleMovie;
import rodolphe.demo.util.MdlUtil;

/**
 * Code for Role in a movie. The enum is uppercase but the value in database is lowercase.
 * 
 * @author JDALMEIDA
 */
public enum CodeRoleMovie implements CodeEnumWithDto<RoleMovie> {
    /** actor. */
    ACTOR,
    /** composer. */
    COMPOSER,
    /** costdesigner. */
    COSTDESIGNER,
    /** director. */
    DIRECTOR,
    /** editor. */
    EDITOR,
    /** producer. */
    PRODUCER,
    /** writer. */
    WRITER;

    /** {@inheritDoc} */
    @Override
    public RoleMovie getDto() {
        return MdlUtil.getObject(getDtoClass(), dbValue());
    }

    /** {@inheritDoc} */
    @Override
    public Class<RoleMovie> getDtoClass() {
        return RoleMovie.class;
    }

    /**
     * Get the database value associated with the enum.
     * 
     * @return associated value in the database.
     */
    public String dbValue() {
        return name().toLowerCase(Locale.FRENCH);
    }
}
