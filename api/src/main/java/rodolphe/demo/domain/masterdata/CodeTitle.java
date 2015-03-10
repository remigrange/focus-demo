/**
 *
 */
package rodolphe.demo.domain.masterdata;

import rodolphe.demo.domain.CodeEnumWithDto;
import rodolphe.demo.domain.masterdatas.Title;
import rodolphe.demo.util.MdlUtil;

/**
 * Enum for people title.
 *
 * @author JDALMEIDA
 *
 */
public enum CodeTitle implements CodeEnumWithDto<Title> {
	/** MS */
	F,
	/** MR */
	M;

	/* (non-Javadoc)
	 * @see rodolphe.demo.domain.CodeEnumWithDto#getDto()
	 */
	/** {@inheritDoc} */
	@Override
	public Title getDto() {
		return MdlUtil.getObject(getDtoClass(), name());
	}

	/* (non-Javadoc)
	 * @see rodolphe.demo.domain.CodeEnumWithDto#getDtoClass()
	 */
	/** {@inheritDoc} */
	@Override
	public Class<Title> getDtoClass() {
		return Title.class;
	}

}
