import React, { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import queryString from 'qs';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import { createStructuredSelector } from 'reselect';
import { idRequired } from 'helpers/isAuth';
import { onSearchRequest } from 'actions/adminCategory';
import * as CategorySelector from 'selectors/admin/category';
import App from 'components/Admin';
import Form from 'components/Admin/Category/Form';

class Category extends Component {
  state = {
    modal: false
  };

  columns = [{
    title: 'Title',
    key: 'title',
    dataIndex: 'title',
  }, {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  }, {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
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
    const { categories, total, pageSize, currentPage } = this.props;

    return (
      <App {...this.props}>
        <Head>
          <title>All Categories of post</title>
        </Head>
        <div className="category-post-admin">
          <div className="box-header flexbox align-items-center">
            <h1 className="title-page">
              Post Category
            </h1>
            <Button
              onClick={() => this.setState({ modal: true })}
            >
              Add New
            </Button>
          </div>
          <Table
            rowKey="uuid"
            columns={this.columns}
            dataSource={categories}
            pagination={{
              total,
              pageSize,
              current: currentPage + 1,
              onChange: this.onChange,
            }}
          />
          <Form
            modal={this.state.modal}
            onCancel={(success = false) => {
              this.setState({ modal: false });
              !!success && this.props.onLoad(this.props.router.query);
            }}
          />
        </div>
      </App>
    );
  }
}

Category.propTypes = {
  onLoad: PropTypes.func,
  router: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  total: CategorySelector.getCount('post'),
  isLoaded: CategorySelector.getLoaded('post'),
  pageSize: CategorySelector.getPageSize('post'),
  totalPage: CategorySelector.getTotalPage('post'),
  categories: CategorySelector.getCategories('post'),
  currentPage: CategorySelector.getCurrentPage('post'),
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (params) => dispatch(onSearchRequest(params, 'post')),
});

export default connect(mapStateToProps, mapDispatchToProps)(idRequired(Category));
