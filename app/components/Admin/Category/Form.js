import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Spin } from 'antd';
import { reset } from 'redux-form/immutable';
import { onCreateRequest } from 'actions/adminCategory';
import Form from 'components/Form/Category';

class Category extends Component {
  state = {
    submiting: false,
  };

  onSubmit = (e) => {
    this.setState({ submiting: true });
    this.props.onCreate({ ...e.toJS(), type: this.props.type || 'post' }, (category, error = false) => {
      this.setState({ submiting: false });
      if (!error) {
        this.props.onReset();
        this.props.onCancel(category);
      }
    });
  }

  render() {
    return (
      <div className="form-category-admin-components">
        <Spin spinning={this.state.submiting}>
          <Modal
            footer={null}
            title="Create a category"
            visible={this.props.modal}
            onCancel={() => this.props.onCancel()}
          >
            <Form
              onSubmit={this.onSubmit}
            />
          </Modal>
        </Spin>
      </div>
    );
  }
}


Category.propTypes = {
  type: PropTypes.string,
  modal: PropTypes.bool,
  onReset: PropTypes.func,
  onCancel: PropTypes.func,
  onCreate: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onReset: () => dispatch(reset('category-form')),
  onCreate: (category, cb) => dispatch(onCreateRequest(category, cb)),
});

export default connect(null, mapDispatchToProps)(Category);
