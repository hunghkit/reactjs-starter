import React, { Component } from 'react';
import PropTypes from 'prop-types';

const computeHeight = (node) => {
  const totalHeight = parseInt(getComputedStyle(node).height, 10);
  const padding = parseInt(getComputedStyle(node).paddingTop, 10) + parseInt(getComputedStyle(node).paddingBottom, 10);

  return totalHeight - padding;
};

const getAutoHeight = (n) => {
  if (!n) {
    return 0;
  }

  let node = n;

  let height = computeHeight(node);

  while (!height) {
    node = node.parentNode;
    if (node) {
      height = computeHeight(node);
    } else {
      break;
    }
  }

  return height;
};

const autoHeight = WrappedComponent => {
  class autoHeightComponent extends Component {
    state = {
      computedHeight: 0,
    };

    componentDidMount() {
      const { height } = this.props;
      if (!height) {
        const h = getAutoHeight(this.root);
        // eslint-disable-next-line
        this.setState({ computedHeight: h });
      }
    }

    handleRoot = node => {
      this.root = node;
    };

    render() {
      const { height } = this.props;
      const { computedHeight } = this.state;
      const h = height || computedHeight;

      return (
        <div ref={this.handleRoot}>{h > 0 && <WrappedComponent {...this.props} height={h} />}</div>
      );
    }
  }

  autoHeightComponent.propTypes = {
    height: PropTypes.number,
  };

  return autoHeightComponent;
};

export default autoHeight;
