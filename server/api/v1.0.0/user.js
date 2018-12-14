import Model from '@server/models';
import { handleFailure, handleSuccess } from '@server/helpers/auth';

export default {
  index(req, res) {
    const queryWhere = {};
    Model.User
      .getAll({ page: (req.query || {}).page || 1 }, queryWhere, req.user || {})
      .then(users => handleSuccess(res, { users }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },

  update(req, res) {
    Model.User
      .updateData(req.params.uuid, (req.body || {}).user, req.user || {})
      .then(user => handleSuccess(res, { user }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },
};
