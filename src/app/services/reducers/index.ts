import { combineReducers } from 'redux';
import { adaptiveCard } from './adaptive-cards-reducer';
import { authToken, consentedScopes } from './auth-reducers';
import { autoComplete } from './autocomplete-reducer';
import { devxApi } from './devxApi-reducers';
import { graphExplorerMode } from './graph-explorer-mode-reducer';
import { scopes } from './permissions-reducer';
import { profile } from './profile-reducer';
import { sampleQuery } from './query-input-reducers';
import { isLoadingData } from './query-loading-reducers';
import { graphResponse } from './query-runner-reducers';
import { queryRunnerStatus } from './query-runner-status-reducers';
import { history } from './request-history-reducers';
import { samples } from './samples-reducers';
import { snippets } from './snippet-reducer';
import { termsOfUse } from './terms-of-use-reducer';
import { theme } from './theme-reducer';
import { sidebarProperties } from './toggle-sidebar-reducer';

export default combineReducers({
  adaptiveCard,
  authToken,
  autoComplete,
  consentedScopes,
  graphExplorerMode,
  graphResponse,
  devxApi,
  history,
  isLoadingData,
  profile,
  queryRunnerStatus,
  sampleQuery,
  samples,
  scopes,
  sidebarProperties,
  snippets,
  termsOfUse,
  theme,
});
