import Model from '@server/models';
import { handleFailure, handleSuccess } from '@server/helpers/auth';

export default {
  index(req, res) {
    const { page = 1, limit = 10, size = false, mode = 'post' } = req.query;

    Model.Category
      .getAll({ page, limit: size || limit }, { type: mode })
      .then(payload => handleSuccess(res, { payload, mode }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },

  create(req, res) {
    Model.Category
      .createData(req.body.category || {})
      .then(category => handleSuccess(res, { category }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },

  update(req, res) {
    handleSuccess(res, { categories: [] });
  },

  destroy(req, res) {
    handleSuccess(res, { category: [] });
  }
};
