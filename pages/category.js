import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'qs';
import moment from 'moment';
import { withRouter } from 'next/router'
import Link from 'next/link';
import { connect } from 'react-redux';
import App from 'components/App';
import { createStructuredSelector } from 'reselect';
import { onDetailRequest } from 'actions/category';
import * as PostSelector from 'selectors/category';

class CategoryDetail extends Component {
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
    const { title, description, keywords } = this.props;

    return (
      <App
        className="category-page"
        header={{ title, description, keywords }}
      >
        {this.props.posts.map(this.renderPost)}
      </App>
    );
  }
}

CategoryDetail.propTypes = {
  onLoad: PropTypes.func,
  posts: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  router: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,

  title: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  posts: PostSelector.getPosts(),
  total: PostSelector.getCount(),
  isLoaded: PostSelector.getLoaded(),
  pageSize: PostSelector.getPageSize(),
  totalPage: PostSelector.getTotalPage(),
  currentPage: PostSelector.getCurrentPage(),

  title: PostSelector.getTitle(),
  keywords: PostSelector.getKeywords(),
  description: PostSelector.getDescription(),
});


const mapDispatchToProps = (dispatch) => ({
  onLoad: (params, cb) => dispatch(onDetailRequest(params, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryDetail));
