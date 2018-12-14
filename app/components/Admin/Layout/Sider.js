import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavLink from 'next/link'
import { withRouter } from 'next/router';
import Menus from './Menu';

class Sider extends PureComponent {
  static propTypes = {
    isNavbar: PropTypes.bool,
    siderFold: PropTypes.bool,
  };

  render() {
    const { siderFold } = this.props;
    // if (isNavbar) return null;

    return (
      <Layout.Sider
        collapsible
        trigger={null}
        collapsed={siderFold}
      >
        <div className="admin-logo flexbox justify-content-center">
          <NavLink
            href="/admin"
            // className="header-logo"
          >
            Admin Management
          </NavLink>
        </div>
        <Menus />
      </Layout.Sider>
    );
  }
}

const mapStateToProps = (state) => ({
  isNavbar: state.getIn(['app', 'isNavbar']),
  siderFold: state.getIn(['app', 'siderFold']),
});

export default withRouter(connect(mapStateToProps)(Sider));
