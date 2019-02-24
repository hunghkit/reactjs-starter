import Model from '@server/models';
import { handleFailure, handleSuccess } from '@server/helpers/auth';

export default {
  index(req, res) {
    const mode = req.query.mode || 'all';

    if (mode === 'all') {
      Model.Option
        .getBys(['layout_site_header', 'layout_site_sidebars', 'layout_site_menus'])
        .then(payload => handleSuccess(res, { payload, mode }))
        .catch(errors => handleFailure(res, { errors, message: errors.message }));
    } else {
      Model.Option
        .getBy(`layout_site_${mode}`)
        .then(payload => handleSuccess(res, { payload, mode }))
        .catch(errors => handleFailure(res, { errors, message: errors.message }));
    }
  },

  create(req, res) {
    const { layout, mode = 'header' } = req.body;

    Model.Option
      .createData(`layout_site_${mode}`, layout)
      .then(payload => handleSuccess(res, { payload, mode }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },

  update(req, res) {
    const { layout, mode = 'header' } = req.body;

    Model.Option
      .updateData(req.params.uuid, `layout_site_${mode}`, { value: layout }, req.user)
      .then(payload => handleSuccess(res, { payload, mode }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },

  delete(req, res) {
    const { mode = 'menus' } = req.query;

    Model.Option
      .destroyData(req.params.uuid, req.user)
      .then(uuid => handleSuccess(res, { payload: { uuid }, mode }))
      .catch(errors => handleFailure(res, { errors, message: errors.message, mode }));
  },
};
