import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

class AppLayout extends Component {
  render() {
    return (
      <Layout
        className="app-components"
      >
        {this.props.children}
      </Layout>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default AppLayout;
