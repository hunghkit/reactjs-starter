import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { isAuth } from 'helpers/isAuth';

class HeaderAdmin extends Component {
  render() {
    const { currentUser = {}, onLogout = () => {} } = this.props;

    return (
      <Layout.Header
        className="header-layout-admin-components"
      >
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={(item) => (item.key === 'logout' && onLogout())}
        >
          <Menu.SubMenu
            style={{ float: 'right' }}
            title={
              <span>
                hello {currentUser.displayName}
              </span>
            }
          >
            <Menu.Item key="app">
              <Link href="/">
                Back href app
              </Link>
            </Menu.Item>
            <Menu.Item key="logout">Sign out</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Header>
    );
  }
}

HeaderAdmin.propTypes = {
  onLogout: PropTypes.func,
  currentUser: PropTypes.object,
};

export default isAuth(HeaderAdmin);
