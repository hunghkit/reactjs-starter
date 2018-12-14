import express from 'express';
import authenticate, { injectUserToReq } from '@server/helpers/auth';
import Auth from './auth';
import User from './user';
import Image from './image';
import Post from './post';
import Category from './category';

const multer  = require('multer');

const upload = multer({ dest: 'uploads/' });

export default (app) => {
  const authenticateRouter = express.Router();
  const unauthenticateRouter = express.Router();

  unauthenticateRouter.get('/auth', Auth.index);
  unauthenticateRouter.post('/auth/signin', Auth.signin);
  unauthenticateRouter.post('/auth/signup', Auth.signup);

  authenticateRouter.get('/users', User.index);
  authenticateRouter.put('/users/:uuid', User.update);

  authenticateRouter.get('/admin/posts', Post.index);
  authenticateRouter.post('/admin/posts', Post.create);
  authenticateRouter.put('/admin/posts/:uuid', Post.update);
  authenticateRouter.delete('/admin/posts/:uuid', Post.destroy);

  authenticateRouter.get('/admin/categories', Category.index);
  authenticateRouter.post('/admin/categories', Category.create);
  authenticateRouter.put('/admin/categories/:uuid', Category.update);
  authenticateRouter.delete('/admin/categories/:uuid', Category.destroy);

  unauthenticateRouter.post('/uploadfileck', upload.single('upload'), Image.create);

  app.use('/api/v1.0.0', injectUserToReq, unauthenticateRouter);
  app.use('/api/v1.0.0', authenticate, authenticateRouter);
};
