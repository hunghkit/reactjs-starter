import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginFrom from 'components/Form/SignIn';
import { onSubmitRequest } from 'actions/login';
import { withRouter } from 'next/router';
import Head from 'next/head'

class Login extends Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.hasUser && !this.props.hasUser) {
      this.props.router.push('/admin');
    }
  }

  render() {
    return (
      <div className="login-pages">
        <Head>
         <title>Login page</title>
        </Head>
        <LoginFrom
          message={this.props.message}
          onSubmit={(e) => this.props.onSubmit(e.toJS())}
        />
      </div>
    );
  }
}

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
