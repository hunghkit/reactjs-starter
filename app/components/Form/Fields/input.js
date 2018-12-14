import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

class newComponent extends Component {
  render() {
    const { input, meta, hasFeedback, label, type = 'text', ...rest } = this.props;
    const hasError = meta.invalid && (meta.touched || meta.submitFailed);
    const InputComonent = type === 'textarea' ? Input.TextArea : Input;

    return (
      <Form.Item
        label={label}
        help={hasError && meta.error}
        hasFeedback={hasFeedback && hasError}
        validateStatus={hasError ? 'error' : 'success'}
      >
        <InputComonent
          type={type}
          {...input}
          {...rest}
        />
      </Form.Item>
    );
  }
}

newComponent.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    asyncValidating: PropTypes.bool,
    error: PropTypes.string,
    touched: PropTypes.bool,
  }).isRequired,
  label: PropTypes.node,
  type: PropTypes.string,
  hasFeedback: PropTypes.bool,
};

export default newComponent;
