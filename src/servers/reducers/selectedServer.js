import { createAction, handleActions } from 'redux-actions';
import { resetShortUrlParams } from '../../short-urls/reducers/shortUrlsListParams';

/* eslint-disable padding-line-between-statements */
export const SELECT_SERVER = 'shlink/selectedServer/SELECT_SERVER';
export const RESET_SELECTED_SERVER = 'shlink/selectedServer/RESET_SELECTED_SERVER';
/* eslint-enable padding-line-between-statements */

const initialState = null;

export const resetSelectedServer = createAction(RESET_SELECTED_SERVER);

export const selectServer = ({ findServerById }, buildShlinkApiClient) => (serverId) => async (dispatch) => {
  dispatch(resetShortUrlParams());

  const selectedServer = findServerById(serverId);
  const { health } = await buildShlinkApiClient(selectedServer);
  const { version } = await health();

  dispatch({
    type: SELECT_SERVER,
    selectedServer: {
      ...selectedServer,
      version,
    },
  });
};

export default handleActions({
  [RESET_SELECTED_SERVER]: () => initialState,
  [SELECT_SERVER]: (state, { selectedServer }) => selectedServer,
}, initialState);
