import Model from '@server/models';
import { handleFailure, handleSuccess } from '@server/helpers/auth';

export default {
  index(req, res) {
    const { page = 1, limit = 5, size = false } = req.query;

    Model.Post
      .getAll({ page, limit: size || limit }, {}, {
        include: [{
          as: 'category',
          model: Model.Category,
          attributes: ['title', 'slug'],
        }],
      })
      .then(payload => handleSuccess(res, { payload }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },

  show(req, res) {
    Model.Post
      .getData(req.params.uuid)
      .then(post => handleSuccess(res, { post }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },
};
