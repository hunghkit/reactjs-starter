import React, { Component } from 'react';
import { idRequired } from 'helpers/isAuth';
import App from 'components/Admin';

class Admin extends Component {
  render() {
    return (
      <App {...this.props}>
        <h1>AllUser</h1>
      </App>
    );
  }
}

export default idRequired(Admin);
