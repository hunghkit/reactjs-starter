import Model from '@server/models';
import { handleFailure, handleSuccess } from '@server/helpers/auth';

export default {
  index(req, res) {
    const { page = 1, limit = 10, size = false } = req.query;

    Model.Post
      .getAll({ page, limit: size || limit })
      .then(payload => handleSuccess(res, { payload }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },

  create(req, res) {
    Model.Post
      .createData(req.body.post || {}, req.user)
      .then(post => handleSuccess(res, { post }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },

  update(req, res) {
    handleSuccess(res, { posts: [] });
  },

  destroy(req, res) {
    Model.Post
      .destroyData(req.params.uuid, req.user)
      .then(post => handleSuccess(res, { post }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  }
};
