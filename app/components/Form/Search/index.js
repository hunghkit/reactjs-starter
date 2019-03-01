import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { Field, reduxForm } from 'redux-form/immutable';
import renderInput from 'components/Form/Fields/input';

const SearchHeader = ({ handleSubmit }) => (
  <Form
    onSubmit={handleSubmit}
    className="search-header-form-components"
  >
    <Field
      name="s"
      hasFeedback
      component={renderInput}
      placeholder="Search and hit enter..."
    />
  </Form>
);

SearchHeader.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({ form: 'search-header' })(SearchHeader);
