import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import app from './app';
import appPost from './post';
import adminApp from './adminApp';
import adminPost from './adminPost';
import adminCategory from './adminCategory';
import currentUser from './currentUser';

export default combineReducers({
  app,
  appPost,
  adminApp,
  adminPost,
  currentUser,
  adminCategory,
  form: formReducer,
});
