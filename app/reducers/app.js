import { fromJS } from 'immutable';
import { createReducer } from 'reduxsauce';
import {
  APP,
  ON_CHANGE_OPEN_KEYS,
} from 'actions/constants';

const prefix = 'moment_';

export const INITIAL_STATE = fromJS({
  router: false,
  darkTheme: true,
  locationQuery: {},
  locationPathname: '',
  menuPopoverVisible: false,
  isNavbar: typeof document !== 'undefined' ? document.body.clientWidth < 769 : false,
  navOpenKeys: typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [] : [],
  siderFold: typeof window !== 'undefined' ? window.localStorage.getItem(`${prefix}siderFold`) === 'true' : false,
  config: {
    menus: [],
    sidebars: [],
  }
});

export const onChangeOpenKeys = (state, { payload = {} }) => {
  if (typeof window === 'undefined') {
    return state;
  }

  window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(payload.navOpenKeys));
  return state.set('navOpenKeys', fromJS(payload.navOpenKeys));
};

export const onRouterRequest = state => state.set('router', true);

export const onRouterSuccess = state => state.set('router', false);

export const onConfigRequest = state => state.set('router', true);

export const onConfigSuccess = (state, { payload }) => state.set('config', fromJS(payload || INITIAL_STATE.get('config').toJS()));

export const ACTION_HANDLERS = {
  [ON_CHANGE_OPEN_KEYS]: onChangeOpenKeys,
  [APP.ROUTER_REQUEST]: onRouterRequest,
  [APP.ROUTER_SUCCESS]: onRouterSuccess,
  [APP.SYSTEM_CONFIG_SUCCESS]: onConfigSuccess,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
