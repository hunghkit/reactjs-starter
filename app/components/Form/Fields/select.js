import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

const newComponent = props => {
  const { input, meta, hasFeedback, options, label, labelKey = 'label', valueKey = 'key', ...rest } = props;
  const hasError = meta.invalid && (meta.touched || meta.submitFailed);

  if (!input.value) {
    delete input.value;

    if (['multiple', 'tags'].includes(rest.mode)) {
      input.value = [];
    }
  }

  return (
    <Form.Item
      label={label}
      help={hasError && meta.error}
      hasFeedback={hasFeedback && hasError}
      validateStatus={hasError ? 'error' : 'success'}
    >
      <Select
        {...input}
        {...rest}
      >
        {options.map(item => (
          <Select.Option key={item[valueKey]}>{item[labelKey]}</Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

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
  mode: PropTypes.string,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  hasFeedback: PropTypes.bool,
};

export default newComponent;
