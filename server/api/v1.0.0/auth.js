import Model from '@server/models';
import { handleFailure, handleSuccess } from '@server/helpers/auth';

export default {
  index(req, res) {
    req.user ? handleSuccess(res, { user: req.user }) : handleFailure(res, { message: null, status: 200 });
  },

  signin(req, res) {
    Model.User
      .authenticate((req.body || {}).user)
      .then(user => handleSuccess(res, { user }))
      .catch(error => handleFailure(res, { status: 400, message: error.message, error }));
  },

  signup(req, res) {
    Model.User
      .register((req.body || {}).user)
      .then(user => handleSuccess(res, { user }))
      .catch(error => handleFailure(res, { status: 400, message: error.message, error }));
  },
};
