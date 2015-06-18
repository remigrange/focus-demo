/**
 *
 */
package rodolphe.demo.util;

import io.vertigo.dynamo.domain.model.DtListState;
import io.vertigo.util.StringUtil;
import io.vertigo.vega.rest.model.UiListState;

/**
 * @author npiedeloup
 */
public final class DtListStateUtil {

    private static final int MAX_ROWS = 50;

    private DtListStateUtil() {
        // nothing
    }

    /**
     * Read a DtListState from UiListState.
     *
     * @param uiListState UiListState
     * @return DtListState
     */
    public static DtListState readUiListState(final UiListState uiListState) {
        final String sortFieldName;
        final boolean isSortDesc;
        if (!StringUtil.isEmpty(uiListState.getSortFieldName())) {
            sortFieldName = uiListState.getSortFieldName();
            isSortDesc = uiListState.isSortDesc();
        } else {
            sortFieldName = null;
            isSortDesc = false;
        }
        // -----
        final int skipRows = uiListState.getSkip();
        // -----
        return new DtListState(MAX_ROWS, skipRows, sortFieldName, isSortDesc);
    }
}
