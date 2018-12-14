import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'next/router'
import * as UserSelector from 'selectors/currentUser';
import { onLogoutRequest, onRefreshSuccess } from 'actions/login';


export const isAuth = (OldComponent) => {
  const newComponent = props => (props.isAsync ? <OldComponent {...props} /> : <div />);

  newComponent.propTypes = {
    isAsync: PropTypes.bool,
    currentUser: PropTypes.object,
  };

  newComponent.defaultProps = { currentUser: {} };

  const mapStateToProps = createStructuredSelector({
    isAsync: UserSelector.getIsAsync(),
    currentUser: UserSelector.getCurrentUser(),
  });

  const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(onLogoutRequest()),
    onRefresh: () => dispatch(onRefreshSuccess()),
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(newComponent));
};

export const idRequired = (OldComponent) => {
  class newComponent extends Component {
    UNSAFE_componentWillMount() {
      const { currentUser, router, isAsync } = this.props;

      if (isAsync) {
        if (!currentUser.uuid) {
          router.push('/login');
          typeof document !== 'undefined' && document.body.classList.remove('signed-in');
        }
      }
    }

    componentDidUpdate() {
      const { currentUser, router, isAsync } = this.props;

      if (isAsync) {
        if (!currentUser.uuid) {
          router.push('/login');
          typeof document !== 'undefined' && document.body.classList.remove('signed-in');
        }
      }
    }

    render() {
      return this.props.isAsync ? <OldComponent {...this.props} /> : <div />;
    }
  }

  newComponent.propTypes = {
    isAsync: PropTypes.bool,
    router: PropTypes.object,
    currentUser: PropTypes.object,
  };

  newComponent.defaultProps = { currentUser: {} };

  const mapStateToProps = createStructuredSelector({
    isAsync: UserSelector.getIsAsync(),
    currentUser: UserSelector.getCurrentUser(),
  });

  const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(onLogoutRequest()),
    onRefresh: () => dispatch(onRefreshSuccess()),
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(newComponent));
};
