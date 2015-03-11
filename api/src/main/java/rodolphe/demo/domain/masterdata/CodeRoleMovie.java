/**
 *
 */
package rodolphe.demo.domain.masterdata;

import rodolphe.demo.domain.CodeEnumWithDto;
import rodolphe.demo.domain.masterdatas.RoleMovie;
import rodolphe.demo.util.MdlUtil;

/**
 * @author JDALMEIDA
 *
 */
public enum CodeRoleMovie implements CodeEnumWithDto<RoleMovie> {

	/** actor */
	actor,
	/** composer */
	composer,
	/** costdesigner */
	costdesigner,
	/** director */
	director,
	/** editor */
	editor,
	/** producer */
	producer,
	/** writer */
	writer;

	/* (non-Javadoc)
	 * @see rodolphe.demo.domain.CodeEnumWithDto#getDto()
	 */
	/** {@inheritDoc} */
	@Override
	public RoleMovie getDto() {
		return MdlUtil.getObject(getDtoClass(), name());
	}

	/* (non-Javadoc)
	 * @see rodolphe.demo.domain.CodeEnumWithDto#getDtoClass()
	 */
	/** {@inheritDoc} */
	@Override
	public Class<RoleMovie> getDtoClass() {
		return RoleMovie.class;
	}


}