import React, { Component } from 'react';
import { idRequired } from 'helpers/isAuth';
import App from 'components/Admin';
import Dashboard from 'components/Dashboard';

class Admin extends Component {
  render() {
    return (
      <App {...this.props}>
        <Dashboard />
      </App>
    );
  }
}

export default idRequired(Admin);
