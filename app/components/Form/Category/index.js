import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Spin } from 'antd';
import { Field, reduxForm } from 'redux-form/immutable';
import renderInput from 'components/Form/Fields/input';

class CategoryForm extends Component {
  render() {
    const { handleSubmit, pristine, submitting, message } = this.props;

    return (
      <Form
        onSubmit={handleSubmit}
        className="category-form-components form-shared"
      >
        <Spin
          spinning={submitting}
          tip="Submitting..."
        >
          <Field
            hasFeedback
            name="title"
            component={renderInput}
            placeholder="Title"
            disabled={submitting}
          />
          <Field
            hasFeedback
            type="textarea"
            name="description"
            placeholder="Description"
            component={renderInput}
            disabled={submitting}
          />
          {!!message && <p className="caption-invalid">{message}</p>}
          <Button
            type="primary"
            htmlType="submit"
            disabled={pristine || submitting}
          >
            Submit
          </Button>
        </Spin>
      </Form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.get('title')) {
    errors.title = 'Title can\'t be blank';
  }

  return errors;
};

CategoryForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  message: PropTypes.string,
};

export default reduxForm({
  form: 'category-form',
  validate,
})(CategoryForm);
