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
    menus: {},
    header: {},
    setting: {},
    sidebars: {},
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

export const onConfigSuccess = (state, { payload }) => {
  const layout = payload.reduce((obj, item) => {
    switch (item.key) {
      case 'setting_site': return ({ ...obj, setting: { ...item, ...(item.value || {}) } });
      case 'layout_site_header': return ({ ...obj, header: { ...item, ...(item.value || {}) } });
      case 'layout_site_menus': return ({ ...obj, menus: { ...(obj.menus || {}), [item.uuid]: { ...item, ...(item.value || {}) } } });
      case 'layout_site_sidebars': return ({ ...obj, sidebars: { ...(obj.sidebars || {}), [item.uuid]: { ...item, ...(item.value || {}) } } });
      default: return obj;
    }
  }, {
    menus: {},
    header: {},
    setting: {},
    sidebars: {},
  })

  return state.set('config', fromJS(layout));
}

export const ACTION_HANDLERS = {
  [ON_CHANGE_OPEN_KEYS]: onChangeOpenKeys,
  [APP.ROUTER_REQUEST]: onRouterRequest,
  [APP.ROUTER_SUCCESS]: onRouterSuccess,
  [APP.SYSTEM_CONFIG_SUCCESS]: onConfigSuccess,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
