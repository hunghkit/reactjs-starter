import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Form, Button, Spin } from 'antd';
import { Field, reduxForm } from 'redux-form/immutable';
import renderInput from 'components/Form/Fields/input';

const SignInForm = ({ handleSubmit, submitting, message }) => (
  <Form
    onSubmit={handleSubmit}
    className="signin-form-components form-shared"
  >
    <Spin
      spinning={submitting}
      tip="Submitting..."
    >
      <h1 className="logo">
        Login
      </h1>
      <Field
        name="email"
        hasFeedback
        placeholder="Email"
        component={renderInput}
        disabled={submitting}
      />
      <Field
        hasFeedback
        type="password"
        name="password"
        component={renderInput}
        placeholder="Password"
        disabled={submitting}
      />
      <Form.Item
        className="center"
      >
        <Button
          type="primary"
          htmlType="submit"
          disabled={submitting}
          className="btn-submit"
        >
          Log in
        </Button>
      </Form.Item>
      {!!message && <p className="caption-invalid">{message}</p>}
    </Spin>
  </Form>
);

const validate = values => {
  const errors = {};
  if (!values.get('email')) {
    errors.email = 'Email can\'t be blank';
  } else if (!validator.isEmail(values.get('email'))) {
    errors.email = 'Email is invalid';
  }

  if (!values.get('password')) {
    errors.password = 'Password can\'t be blank';
  }

  return errors;
};

SignInForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  message: PropTypes.string,
};

export default reduxForm({
  form: 'signin',
  validate,
})(SignInForm);
