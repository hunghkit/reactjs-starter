import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { idRequired } from 'helpers/isAuth';
// import { createStructuredSelector } from 'reselect';
import App from 'components/Admin';
import Form from 'components/Form/Post';
// import * as PostSelector from 'selectors/adminPost';
import { onCreateRequest } from 'actions/adminPost';
import { onSearchRequest } from 'actions/adminCategory';

class NewPost extends Component {
  componentDidMount() {
    this.props.onLoadCategory();
  }

  render() {
    return (
      <App {...this.props}>
        <Head>
          <title>All posts</title>
        </Head>
        <h1>NewPost</h1>
        <Form
          onSubmit={(e) => {
            this.props.onCreate(e.toJS());
          }}
        />
      </App>
    );
  }
}

NewPost.propTypes = {
  onCreate: PropTypes.func,
  router: PropTypes.object.isRequired,
};

// const mapStateToProps = createStructuredSelector({
//   currentUser: PostSelector.getCurrentUser(),
// });

const mapDispatchToProps = (dispatch) => ({
  onCreate: (post) => dispatch(onCreateRequest(post)),
  onLoadCategory: () => dispatch(onSearchRequest({ limit: 0 })),
});

export default connect(null, mapDispatchToProps)(idRequired(NewPost));
