import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as CategorySelector from 'selectors/admin/category';
import { Form, Button, Spin, Row, Col, Card } from 'antd';
import { Field, reduxForm } from 'redux-form/immutable';
import CategoryForm from 'components/Admin/Category/Form';
import renderInput from 'components/Form/Fields/input';
import renderUpload from 'components/Form/Fields/upload';
import renderCKEditor from 'components/Form/Fields/CKEditor';
import renderSelect from 'components/Form/Fields/select';

const colPropsLeft = {
  lg: 18,
  md: 24,
};
const colPropsRight = {
  lg: 6,
  md: 24,
};

class PostForm extends Component {
  state = {
    modal: false,
  };

  render() {
    const { handleSubmit, pristine, submitting, message, categories } = this.props;

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
            <Row gutter={32}>
              <Col {...colPropsLeft}>
                <Card title="Post Title(*)">
                  <Field
                    hasFeedback
                    name="title"
                    placeholder="Title"
                    disabled={submitting}
                    component={renderInput}
                  />
                </Card>
                <Card title="Post Content(*)">
                  <Field
                    hasFeedback
                    name="content"
                    type="textarea"
                    placeholder="Content"
                    disabled={submitting}
                    component={renderCKEditor}
                    subtitle="300 minum - 400 max. words"
                  />
                </Card>
                <Card title="Post Excerpt">
                  <Field
                    hasFeedback
                    name="excerpt"
                    type="textarea"
                    placeholder="Excerpt"
                    component={renderInput}
                    disabled={submitting}
                  />
                </Card>
              </Col>
              <Col {...colPropsRight}>
                <Card
                  title="Action"
                >
                  <Field
                    hasFeedback
                    name="status"
                    label="Status(*)"
                    placeholder="Status"
                    disabled={submitting}
                    options={[{ key: 'active', label: 'Active' },  { key: 'inactive', label: 'Inactive' }]}
                    component={renderSelect}
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
                <Card
                  title={(
                    <div>
                      <span
                        style={{ marginRight: 5 }}
                      >
                        Category
                      </span>
                      <Button
                        icon="plus"
                        size="small"
                        shape="circle"
                        onClick={() => this.setState({ modal: true })}
                      />
                    </div>
                  )}
                >
                  <Field
                    hasFeedback
                    labelKey="title"
                    valueKey="uuid"
                    name="categoryId"
                    options={categories}
                    disabled={submitting}
                    placeholder="category"
                    component={renderSelect}
                  />
                </Card>
                <Card
                  title="Featured Image(*)"
                  style={{ overflow: 'visible', marginBottom: '10px' }}
                >
                  <Field
                    hasFeedback
                    name="imageURL"
                    disabled={submitting}
                    placeholder="Image"
                    component={renderUpload}
                  />
                </Card>
              </Col>
            </Row>
            {!!message && <p className="caption-invalid">{message}</p>}
          </Spin>
        </Form>,
        <CategoryForm
          key="form-category"
          modal={this.state.modal}
          onCancel={() => this.setState({ modal: false })}
        />,
      ]
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.get('title')) {
    errors.title = 'Title can\'t be blank';
  }

  if (!values.get('status')) {
    errors.status = 'Status can\'t be blank';
  }

  if (!values.get('imageURL')) {
    errors.imageURL = 'Featured image can\'t be blank';
  }

  if (!values.get('content')) {
    errors.content = 'Content can\'t be blank';
  }

  return errors;
};

PostForm.propTypes = {
  pristine: PropTypes.bool,
  message: PropTypes.string,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  categories: PropTypes.array.isRequired,
};


const mapStateToProps = createStructuredSelector({
  categories: CategorySelector.getCategories('post'),
});

export default connect(mapStateToProps, null)(reduxForm({
  form: 'post-form',
  validate,
})(PostForm));
