import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { idRequired } from 'helpers/isAuth';
// import { createStructuredSelector } from 'reselect';
import App from 'components/Admin';
import Form from 'components/Form/Post';
// import * as PostSelector from 'selectors/adminPost';
import { onCreateSuccess } from 'actions/adminPost';

class NewUser extends Component {
  render() {
    return (
      <App {...this.props}>
        <h1>NewUser</h1>
        <Form
          onSubmit={(e) => this.props.onCreate(e.toJS())}
        />
      </App>
    );
  }
}

NewUser.propTypes = {
  onCreate: PropTypes.func,
};

// const mapStateToProps = createStructuredSelector({
//   currentUser: PostSelector.getCurrentUser(),
// });

const mapDispatchToProps = (dispatch) => ({
  onCreate: (post) => dispatch(onCreateSuccess(post)),
});

export default connect(null, mapDispatchToProps)(idRequired(NewUser));
