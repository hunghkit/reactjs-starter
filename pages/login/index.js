import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginFrom from 'components/Form/SignIn';
import { onSubmitRequest } from 'actions/login';
import { withRouter } from 'next/router';
import Head from 'next/head'

const Login = ({ hasUser, router, ...props }) => {
  useEffect(() => {
    if (hasUser && router) {
      router.push('/admin/posts');
    }
  });

  return (
    <div className="login-pages">
      <Head>
       <title>Login page</title>
      </Head>
      <LoginFrom
        message={props.message}
        onSubmit={(e) => props.onSubmit(e.toJS())}
      />
    </div>
  );
};

Login.propTypes = {
  router: PropTypes.object,
  hasUser: PropTypes.bool,
  message: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  message: state.getIn(['currentUser', 'message']),
  hasUser: !!state.getIn(['currentUser', 'info', 'uuid']),
});

export const maptDispatchToProps = dispatch => ({
  onSubmit: (params) => dispatch(onSubmitRequest(params)),
});

export default connect(mapStateToProps, maptDispatchToProps)(withRouter(Login));
