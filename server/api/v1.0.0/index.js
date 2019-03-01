import express from 'express';
import authenticate, { injectUserToReq } from '@server/helpers/auth';
import Auth from './auth';
import User from './user';
import Image from './image';
import AdminPost from './admin/post';
import AdminLayout from './admin/layout';
import AdminSetting from './admin/setting';
import Category from './category';

import Post from './post';
import Config from './config';

const multer  = require('multer');

const upload = multer({ dest: 'uploads/' });

export default (app) => {
  const authenticateRouter = express.Router();
  const unauthenticateRouter = express.Router();

  unauthenticateRouter.get('/config', Config.index);

  unauthenticateRouter.get('/auth', Auth.index);
  unauthenticateRouter.post('/auth/signin', Auth.signin);
  unauthenticateRouter.post('/auth/signup', Auth.signup);

  unauthenticateRouter.get('/posts', Post.index);
  unauthenticateRouter.get('/posts/author/:slug', Post.author);
  unauthenticateRouter.get('/posts/category/:slug', Post.category);
  unauthenticateRouter.get('/posts/:slug', Post.show);

  authenticateRouter.get('/users', User.index);
  authenticateRouter.put('/users/:uuid', User.update);

  authenticateRouter.get('/admin/posts', AdminPost.index);
  authenticateRouter.post('/admin/posts', AdminPost.create);
  authenticateRouter.put('/admin/posts/:uuid', AdminPost.update);
  authenticateRouter.delete('/admin/posts/:uuid', AdminPost.destroy);

  authenticateRouter.get('/admin/settings', AdminSetting.index);
  authenticateRouter.post('/admin/settings', AdminSetting.create);
  authenticateRouter.put('/admin/settings/:uuid', AdminSetting.update);

  authenticateRouter.get('/admin/layouts', AdminLayout.index);
  authenticateRouter.post('/admin/layouts', AdminLayout.create);
  authenticateRouter.put('/admin/layouts/:uuid', AdminLayout.update);
  authenticateRouter.delete('/admin/layouts/:uuid', AdminLayout.delete);

  authenticateRouter.get('/admin/categories', Category.index);
  authenticateRouter.post('/admin/categories', Category.create);
  authenticateRouter.put('/admin/categories/:uuid', Category.update);
  authenticateRouter.delete('/admin/categories/:uuid', Category.destroy);

  unauthenticateRouter.post('/uploadfileck', upload.single('upload'), Image.create);

  app.use('/api/v1.0.0', injectUserToReq, unauthenticateRouter);
  app.use('/api/v1.0.0', authenticate, authenticateRouter);
};
