import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import moment from 'moment';
import queryString from 'qs';
import Link from 'next/link';
import { connect } from 'react-redux';
import { Table, Button, Avatar, Modal } from 'antd';
import { idRequired } from 'helpers/isAuth';
import App from 'components/Admin';
import { createStructuredSelector } from 'reselect';
import { onSearchRequest, onDeleteRequest } from 'actions/adminPost';
import * as PostSelector from 'selectors/admin/post';


class PostAdmin extends Component {
  columns = [{
    width: 82,
    title: 'Image',
    align: 'center',
    key: 'imageURL',
    dataIndex: 'imageURL',
    render: (item, record) => (
      <Avatar
        size={50}
        src={item}
        shape="square"
      >
        {(record.title || '').charAt(0)}
      </Avatar>
    )
  }, {
    title: 'Title',
    key: 'title',
    dataIndex: 'title',
    render: (item, record) => <Link as={`/admin/posts/${record.slug}`} href={`/admin/posts/edit?title=${item}`}>{item}</Link>
  }, {
    title: 'Description',
    dataIndex: 'excerpt',
    key: 'excerpt',
  }, {
    width: 120,
    key: 'author',
    align: 'center',
    title: 'Author',
    dataIndex: 'author',
    render: (item) => <span>{(item || {}).displayName || ''}</span>,
  }, {
    width: 100,
    align: 'center',
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
  }, {
    width: 120,
    title: 'Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (item) => <span>{moment(item).format('hh:mm - DD/MM/YYYY')}</span>,
  }, {
    key: 'slug',
    width: 120,
    align: 'center',
    title: 'Action',
    dataIndex: 'slug',
    render: (item, record) => (
      <div>
        <Button
          icon="edit"
          type="primary"
          style={{ margin: 5 }}
          onClick={() => this.props.router.push(`/admin/posts/${item}`)}
        />
        <Button
          icon="delete"
          type="danger"
          onClick={() => Modal.confirm({
            title: 'Are you sure delete this post?',
            content: 'If you press to yes. You can not undo your action',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => new Promise((resolve) => {
              this.props.onDelete(record.uuid, () => {
                this.props.onLoad(this.props.router.query);
                resolve(true);
              });
            }),
            onCancel() {},
          })}
        />
      </div>
    ),
  }];

  componentDidMount() {
    this.props.onLoad(this.props.router.query);
  }

  onChange = (page) => {
    const { query = {}, pathname } = this.props.router;
    query.page = page;
    this.props.onLoad(query);
    this.props.router.replace(`${pathname}?${queryString.stringify(query)}`);
  };

  render() {
    const { posts } = this.props;

    return (
      <App {...this.props}>
        <Head>
          <title>All posts</title>
        </Head>
        <div className="box-header flexbox align-items-center transparent">
          <h1 className="title-page">
            All posts
          </h1>
          <Button
            onClick={() => this.props.router.push('/admin/posts/new')}
          >
            Add New
          </Button>
        </div>
        <Table
          rowKey="uuid"
          dataSource={posts}
          columns={this.columns}
        />
      </App>
    );
  }
}

PostAdmin.propTypes = {
  onLoad: PropTypes.func,
  posts: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  router: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
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
  onLoad: (params) => dispatch(onSearchRequest(params)),
  onDelete: (uuid, cb) => dispatch(onDeleteRequest(uuid, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(idRequired(PostAdmin));
