import { fromJS } from 'immutable';
import { createReducer } from 'reduxsauce';
import { ADMINAPP } from 'actions/constants';

const init = {
  setting: {
    info: {},
    isLoading: false,
  },
  layout: {
    menus: {},
    header: {},
    setting: {},
    sidebars: {},
  },
}

export const INITIAL_STATE = fromJS(init);

export const onSettingRequest = (state) => state.setIn(['setting', 'isLoading'], true);

export const onSettingSuccess = (state, { setting = {} }) => state.setIn(['setting', 'info'], fromJS({ ...setting, ...(setting.value || {}) })).setIn(['setting', 'isLoading'], false);

export const onSettingFailure = (state) => state.setIn(['setting', 'isLoading'], false);

export const onLayoutSuccess = (state, { layout = {}, mode = 'header' }) => {
  if (mode !== 'header') {
    return state.setIn(['layout', mode, layout.uuid], fromJS({ ...layout, ...(layout.value || {}) }));
  }

  return state.setIn(['layout', mode], fromJS({ ...layout, ...(layout.value || {}) }));
}

export const onLayoutLoadingSuccess = (state, { layout = {}, mode = 'header' }) => {
  if (mode === 'all') {
    const payload = layout.reduce((obj, item) => {
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

    return state.set('layout', fromJS(payload));
  }

  return state;
}

export const onLayoutRemoveRequest = (state, { uuid, mode }) => state.deleteIn(['layout', mode, uuid]);

export const ACTION_HANDLERS = {
  [ADMINAPP.ADMIN_APP_LAYOUT_SUCCESS]: onLayoutSuccess,
  [ADMINAPP.ADMIN_APP_SETTING_REQUEST]: onSettingRequest,
  [ADMINAPP.ADMIN_APP_SETTING_SUCCESS]: onSettingSuccess,
  [ADMINAPP.ADMIN_APP_SETTING_FAILURE]: onSettingFailure,
  [ADMINAPP.ADMIN_APP_LAYOUT_REMOVE_REQUEST]: onLayoutRemoveRequest,
  [ADMINAPP.ADMIN_APP_LAYOUT_LOADING_SUCCESS]: onLayoutLoadingSuccess,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
