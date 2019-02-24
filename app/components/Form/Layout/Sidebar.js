import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Spin } from 'antd';
import { Field, reduxForm } from 'redux-form/immutable';
import renderInput from 'components/Form/Fields/input';
import renderSelect from 'components/Form/Fields/select';

class LayoutSidebarForm extends Component {
  render() {
    const { handleSubmit, pristine, submitting, message, initialValues, onDelete } = this.props;

    return (
      <Form
        onSubmit={handleSubmit}
        className="sidebar-layout-form-category-components form-shared"
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
            name="block"
            label="Type (*)"
            disabled={submitting}
            component={renderSelect}
            options={[{ key: 'html', label: 'HTML' },  { key: 'category', label: 'Category' }]}
          />
          <Field
            hasFeedback
            name="content"
            type="textarea"
            placeholder="content"
            disabled={submitting}
            component={renderInput}
          />
          {!!message && <p className="caption-invalid">{message}</p>}
          <Button
            type="primary"
            htmlType="submit"
            disabled={pristine || submitting}
          >
            Submit
          </Button>
          {!!initialValues.get('uuid') &&
            <Button
              type="danger"
              style={{ marginLeft: 10 }}
              onClick={() => onDelete(initialValues.get('uuid'))}
            >
              Delete
            </Button>
          }
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

  if (!values.get('block')) {
    errors.block = 'Type can\'t be blank';
  }

  if (!values.get('content')) {
    errors.content = 'Content can\'t be blank';
  }

  return errors;
};

LayoutSidebarForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  message: PropTypes.string,
  onDelete: PropTypes.func,
  initialValues: PropTypes.object,
};

export default reduxForm({
  form: 'layout-sidebar-form',
  enableReinitialize: true,
  validate,
})(LayoutSidebarForm);
