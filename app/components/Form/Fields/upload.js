import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Upload, Icon, message } from 'antd';

const beforeUpload = (file) => {
  const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');

  if (!isJPG) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }

  return isJPG && isLt2M;
}

class newComponent extends Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
    } else if (info.file.status === 'done') {
      this.setState({ loading: false });

      if (info.file.response && (info.file.response.image || {}.url)) {
        this.props.input.onChange(info.file.response.image.url);
        this.props.onUploaded && this.props.onUploaded(info.file.response.image.url);
      }
    }
  };

  render() {
    const { input, meta, hasFeedback, label, ...rest } = this.props;
    const hasError = meta.invalid && (meta.touched || meta.submitFailed);

    return (
      <Form.Item
        label={label}
        help={hasError && meta.error}
        hasFeedback={hasFeedback && hasError}
        className="avatar-uploader-form-item"
        validateStatus={hasError ? 'error' : 'success'}
      >
        <Upload
          name="upload"
          showUploadList={false}
          listType="picture-card"
          className="avatar-uploader"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
          action="/api/v1.0.0/uploadfileck"
          {...rest}
        >
          {!!input.value && <img width="200px" src={input.value} alt="" />}
          {!input.value &&
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          }
        </Upload>
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
  onUploaded: PropTypes.func,
  hasFeedback: PropTypes.bool,
};

export default newComponent;
