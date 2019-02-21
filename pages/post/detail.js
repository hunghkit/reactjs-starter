import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withRouter } from 'next/router'
import Link from 'next/link';
import { connect } from 'react-redux';
import App from 'components/App';
import { createStructuredSelector } from 'reselect';
import { onDetailRequest } from 'actions/post';
import * as PostSelector from 'selectors/post';

class PostDetail extends Component {
  static getInitialProps (ctx) {
    return new Promise((resolve) => {
      if (ctx && ctx.store) {
        ctx.store.dispatch(onDetailRequest(ctx.query || {}, () => resolve({})));
      } else {
        resolve({});
      }
    });
  }

  componentDidMount() {
    this.props.onLoad(this.props.router.query);
  }

  render() {
    const { uuid, content, title, author = {}, category = {}, createdAt, slug, imageURL } = this.props.post || {};

    return (
      <App>
        <div
          key={uuid}
          className="detail-post-page blogpostcategory"
        >
          <div className="topBlog">
            <div className="blog-category">
              <em>
                <Link href={`/category/${(category || {}).slug || ''}`}>
                  <a>{(category || {}).title || ''}</a>
                </Link>
              </em>
            </div>
            <h2 className="title">
              <Link href={`/post/${slug || ''}`}>
                <a>{title}</a>
              </Link>
            </h2>
          </div>
          <Link href={`/post/${slug || ''}`}>
            <a className="overdefultlink">
              <div className="overdefult"></div>
            </a>
          </Link>
          <div className="blogimage">
            <div className="loading"></div>
            <Link href={`/post/${slug || ''}`}>
              <a rel="bookmark" title="Permanent" link="" to="" exploring="" my="" surroundings="">
                <img width="1160" height="748" src={imageURL} className="attachment-lavander-postBlock size-lavander-postBlock wp-post-image" alt={title || ''} />
              </a>
            </Link>
          </div>
          <div className="post-meta">
            <a className="post-meta-time">{moment(createdAt).format('MMMM DD, YYYY')}</a>
            <a className="post-meta-author" href="">by {(author || {}).displayName || ''}</a>
          </div>
          <div className="entry">
            <div className="meta">
              <div className="blogContent">
                <div className="blogcontent">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </App>
    );
  }
}

PostDetail.propTypes = {
  onLoad: PropTypes.func,
  post: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  post: PostSelector.getPost(),
  isLoaded: PostSelector.getLoaded(),
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (params, cb) => dispatch(onDetailRequest(params, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostDetail));
