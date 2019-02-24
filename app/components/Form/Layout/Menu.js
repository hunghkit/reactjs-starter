import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Spin } from 'antd';
import { Field, reduxForm } from 'redux-form/immutable';
import renderInput from 'components/Form/Fields/input';

class LayoutMenuForm extends Component {
  render() {
    const { handleSubmit, pristine, submitting, message, initialValues, onDelete } = this.props;

    return (
      <Form
        onSubmit={handleSubmit}
        className="menu-layout-form-category-components form-shared"
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
            name="link"
            placeholder="Link"
            component={renderInput}
            disabled={submitting}
          />
          {!!message && <p className="caption-invalid">{message}</p>}
          <div>
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
          </div>
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

  if (!values.get('link')) {
    errors.link = 'Link can\'t be blank';
  }

  return errors;
};

LayoutMenuForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  onDelete: PropTypes.func,
  submitting: PropTypes.bool,
  message: PropTypes.string,
  initialValues: PropTypes.object,
};

export default reduxForm({
  form: 'layout-menu-form',
  enableReinitialize: true,
  validate,
})(LayoutMenuForm);
