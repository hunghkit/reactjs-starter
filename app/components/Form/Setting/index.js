import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Spin, Row, Col, Card } from 'antd';
import { Field, reduxForm } from 'redux-form/immutable';
import renderInput from 'components/Form/Fields/input';
import renderUpload from 'components/Form/Fields/upload';

const colPropsLeft = {
  lg: 18,
  md: 24,
};

class SettingForm extends Component {
  state = {
    modal: false,
  };

  render() {
    const { handleSubmit, pristine, submitting, message } = this.props;

    return (
      [
        <Form
          key="form-post"
          onSubmit={handleSubmit}
          className="post-form-components form-shared"
        >
          <Spin
            spinning={submitting}
            tip="Submitting..."
          >
            <Row gutter={32} type="flex" justify="center">
              <Col {...colPropsLeft}>
                <Card title="Site Setting">
                  <Field
                    hasFeedback
                    name="title"
                    placeholder="ReactJS"
                    disabled={submitting}
                    label="Site title: (*)"
                    component={renderInput}
                  />
                  <Field
                    hasFeedback
                    type="textarea"
                    name="description"
                    disabled={submitting}
                    component={renderInput}
                    label="Site description"
                    placeholder="Ex: ReactJS, Redux"
                  />
                  <Field
                    hasFeedback
                    type="textarea"
                    name="keywords"
                    disabled={submitting}
                    component={renderInput}
                    label="Site keyword"
                    placeholder="Ex: ReactJS, Redux"
                  />
                  <Field
                    hasFeedback
                    name="facebookURL"
                    disabled={submitting}
                    label="Facebook Link"
                    component={renderInput}
                    placeholder="https://facebook.com"
                  />
                  <Field
                    hasFeedback
                    name="linkedInURL"
                    disabled={submitting}
                    label="Linkedin Link"
                    component={renderInput}
                    placeholder="https://linkedin.com"
                  />
                  <Field
                    hasFeedback
                    name="twitterURL"
                    disabled={submitting}
                    label="Twitter Link"
                    component={renderInput}
                    placeholder="http://twitter.com"
                  />
                  <Field
                    hasFeedback
                    name="imageURL"
                    placeholder="Image"
                    disabled={submitting}
                    component={renderUpload}
                  />
                  <Form.Item
                    className="center"
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-submit"
                      disabled={pristine || submitting}
                    >
                      Save
                    </Button>
                  </Form.Item>
                </Card>
              </Col>
            </Row>
            {!!message && <p className="caption-invalid">{message}</p>}
          </Spin>
        </Form>,
      ]
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.get('title')) {
    errors.title = 'Title site can\'t be blank';
  }

  return errors;
};

SettingForm.propTypes = {
  pristine: PropTypes.bool,
  message: PropTypes.string,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
};


export default reduxForm({
  form: 'setting-form',
  enableReinitialize: true,
  validate,
})(SettingForm);
