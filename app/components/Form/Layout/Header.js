import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Spin } from 'antd';
import { Field, reduxForm } from 'redux-form/immutable';
import renderUpload from 'components/Form/Fields/upload';

class LayoutHeaderForm extends Component {
  form = React.createRef();

  render() {
    const { handleSubmit, submitting, message, onUploaded } = this.props;

    return (
      <Form
        ref={this.form}
        onSubmit={handleSubmit}
        className="header-layout-form-components form-shared"
      >
        <Spin
          spinning={submitting}
          tip="Submitting..."
        >
          <Field
            hasFeedback
            name="imageURL"
            placeholder="Image"
            disabled={submitting}
            component={renderUpload}
            onUploaded={(image) => onUploaded(image)}
          />
          {!!message && <p className="caption-invalid">{message}</p>}
        </Spin>
      </Form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.get('title')) {
    errors.imageURL = 'Image can\'t be blank';
  }

  return errors;
};

LayoutHeaderForm.propTypes = {
  onUploaded: PropTypes.func,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  message: PropTypes.string,
};

export default reduxForm({
  form: 'layout-header-form',
  enableReinitialize: true,
  validate,
})(LayoutHeaderForm);
