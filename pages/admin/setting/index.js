import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { idRequired } from 'helpers/isAuth';
import App from 'components/Admin';
import Form from 'components/Form/Setting';
import { onSettingRequest, onSettingLoadingRequest } from 'actions/adminApp';
import { createStructuredSelector } from 'reselect';
import * as AppSelector from 'selectors/admin/app';

class AdminSetting extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <App {...this.props}>
        <Head>
          <title>Site Setting</title>
        </Head>
        <Form
          initialValues={this.props.setting}
          onSubmit={(e) => {
            this.props.onCreate(e.toJS());
          }}
        />
      </App>
    );
  }
}

AdminSetting.propTypes = {
  onLoad: PropTypes.func,
  onCreate: PropTypes.func,
  setting: PropTypes.object,
  router: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  setting: AppSelector.getInfo('setting'),
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: () => dispatch(onSettingLoadingRequest()),
  onCreate: (setting) => dispatch(onSettingRequest(setting)),
});

export default connect(mapStateToProps, mapDispatchToProps)(idRequired(AdminSetting));
