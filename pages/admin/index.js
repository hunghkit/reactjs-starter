import Router from 'next/router'
import { idRequired } from 'helpers/isAuth';

const Admin = () => {
  Router.push(`/admin/posts`);
  return null;
}

export default idRequired(Admin);
