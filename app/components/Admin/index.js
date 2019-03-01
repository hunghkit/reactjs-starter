import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Spin } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'
import { createStructuredSelector } from 'reselect';
import classnames from 'classnames';
import * as AppSelector from 'selectors/app';
import Sider from 'components/Admin/Layout/Sider';
import Header from 'components/Admin/Layout/Header';

const AdminLayout = ({ children, loading, currentUser, className, ...others }) => {
  if (!(currentUser || {}).uuid) {
    return null;
  }

  return (
    <Layout
      className={classnames("admin-components", className)}
      style={{ minHeight: '100vh' }}
      {...others}
    >
      <Sider />
      <Layout>
        <Header />
        <Spin spinning={loading}>
          <Layout.Content>
            {children}
          </Layout.Content>
          <Layout.Footer style={{ textAlign: 'center' }}>
            Management System © 2018 by Open
          </Layout.Footer>
        </Spin>
      </Layout>
    </Layout>
  );
}

AdminLayout.propTypes = {
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  loading: AppSelector.getRouting(),
});

export default connect(mapStateToProps)(withRouter(AdminLayout));
