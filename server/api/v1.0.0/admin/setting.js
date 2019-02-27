import Model from '@server/models';
import { handleFailure, handleSuccess } from '@server/helpers/auth';

export default {
  index(req, res) {
    Model.Option
      .getBy('setting_site')
      .then(payload => handleSuccess(res, { payload }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },

  create(req, res) {
    Model.Option
      .createData('setting_site', req.body.setting || {})
      .then(payload => handleSuccess(res, { payload }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },

  update(req, res) {
    const setting = Object.entries(req.body.setting || {}).reduce((obj, [key, value]) => {
      if (['title', 'keywords', 'description', 'imageURL', 'facebookURL', 'twitterURL', 'linkedInURL'].includes(key)) {
        obj[key] = value || '';
      }

      return obj;
    }, {});

    Model.Option
      .updateData(req.params.uuid, 'setting_site', { value: setting } , req.user)
      .then(payload => handleSuccess(res, { payload }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },
};
