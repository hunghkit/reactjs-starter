import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import ckConfig from 'data/ckeditor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './CKEditor.css';

const CKEditor = require('react-ckeditor-wrapper');

class newComponent extends Component {
  constructor(props) {
    super(props);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(editorContent) {
    this.props.input.onChange(editorContent);
  }

  render() {
    const { meta, hasFeedback, label } = this.props;
    const hasError = meta.invalid && (meta.touched || meta.submitFailed);

    return (
      <Form.Item
        label={label}
        className={styles.wrapper}
        help={hasError && meta.error}
        hasFeedback={hasFeedback && hasError}
        validateStatus={hasError ? 'error' : 'success'}
      >
        <CKEditor
          value={this.props.input.value}
          onChange={this.onEditorStateChange}
          config={{
            ...ckConfig,
          }}
        />
      </Form.Item>
    );
  }
}

newComponent.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
  meta: PropTypes.shape({
    asyncValidating: PropTypes.bool,
    error: PropTypes.string,
    touched: PropTypes.bool,
  }).isRequired,
  label: PropTypes.node,
  hasFeedback: PropTypes.bool,
};

export default newComponent;
