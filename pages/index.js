import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'qs';
import moment from 'moment';
import { withRouter } from 'next/router'
import Link from 'next/link';
import { connect } from 'react-redux';
import App from 'components/App';
import { createStructuredSelector } from 'reselect';
import { onSearchRequest } from 'actions/post';
import * as PostSelector from 'selectors/post';

class Page extends Component {
  static getInitialProps (ctx) {
    return new Promise((resolve) => {
      if (ctx && ctx.store) {
        ctx.store.dispatch(onSearchRequest(ctx.query || {}, () => resolve({})));
      } else {
        resolve({});
      }
    });
  }

  componentDidMount() {
    this.props.onLoad(this.props.router.query);
  }

  onChange = (page) => {
    const { query = {}, pathname } = this.props.router;
    query.page = page;
    this.props.onLoad(query);
    this.props.router.replace(`${pathname}?${queryString.stringify(query)}`);
  };

  renderPost = (post) => {
    const { excerpt, title, author = {}, category = {}, createdAt, slug, imageURL } = post || {};

    return (
      <div
        key={post.uuid}
        className="blogpostcategory"
      >
        <div className="topBlog">
          <div className="blog-category">
            <em>
              <Link as={`/${process.env.CATEGORY_SLUG}/${(category || {}).slug || ''}`} href={`/category?slug=${(category || {}).slug || ''}`}>
                <a>{(category || {}).title || ''}</a>
              </Link>
            </em>
          </div>
          <h2 className="title">
            <Link as={`/${process.env.POST_SLUG}/${slug || ''}`} href={`/post?slug=${slug}`}>
              <a>{title}</a>
            </Link>
          </h2>
        </div>
        <Link as={`/${process.env.POST_SLUG}/${slug || ''}`} href={`/post?slug=${slug}`}>
          <a className="overdefultlink">
            <div className="overdefult"></div>
          </a>
        </Link>
        <div className="blogimage">
          <div className="loading"></div>
          <Link as={`/${process.env.POST_SLUG}/${slug || ''}`} href={`/post?slug=${slug}`}>
            <a>
              <img width="1160" height="748" src={imageURL} className="attachment-lavander-postBlock size-lavander-postBlock wp-post-image" alt={title || ''} />
            </a>
          </Link>
        </div>
        <div className="post-meta">
          <a className="post-meta-time">{moment(createdAt).format('MMMM DD, YYYY')}</a>
          <Link as={`/${process.env.AUTHOR_SLUG}/${(author || {}).username || ''}`} href={`/author?slug=${(author || {}).username || ''}`}>
            <a className="post-meta-author">by {(author || {}).displayName || ''}</a>
          </Link>
        </div>
        <div className="entry">
          <div className="meta">
            <div className="blogContent">
              <div className="blogcontent">
                <div dangerouslySetInnerHTML={{ __html: excerpt }} />
                <div className="lavander-read-more">
                  <Link as={`/${process.env.POST_SLUG}/${slug || ''}`} href={`/post?slug=${slug}`}><a>Continue reading</a></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <App
        className="index-page"
      >
        {this.props.posts.map(this.renderPost)}
      </App>
    );
  }
}

Page.propTypes = {
  onLoad: PropTypes.func,
  posts: PropTypes.array.isRequired,
  setting: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  posts: PostSelector.getPosts(),
  total: PostSelector.getCount(),
  isLoaded: PostSelector.getLoaded(),
  pageSize: PostSelector.getPageSize(),
  totalPage: PostSelector.getTotalPage(),
  currentPage: PostSelector.getCurrentPage(),
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (params, cb) => dispatch(onSearchRequest(params, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Page));
