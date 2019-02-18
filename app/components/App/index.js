import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Header from './Header';
import Sidebar from './Sidebar';

class AppLayout extends Component {
  render() {
    return (
      <Layout
        className="app-components blog"
      >
        <Header />
        <div className="mainwrap blog home sidebar default">
          <div className="main clearfix">
            <div className="content blog">
              {this.props.children}
            </div>
            <Sidebar />
          </div>
        </div>
      </Layout>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default AppLayout;
