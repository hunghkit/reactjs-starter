import Model from '@server/models';
import { handleSuccess, handleFailure } from '@server/helpers/auth';

export default {
  index(req, res) {
    Model.Option
      .getBys(['setting_site', 'layout_site_header', 'layout_site_sidebars', 'layout_site_menus'])
      .then(payload => handleSuccess(res, { payload, mode: 'all' }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  }
};
