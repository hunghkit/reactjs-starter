import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from 'utils/autoHeight';

class Bar extends Component {
  state = {
    autoHideXLabels: false,
  };

  componentDidMount() {
    typeof window !== 'undefined' && window.addEventListener('resize', this.resize, { passive: true });
  }

  componentWillUnmount() {
    typeof window !== 'undefined' && window.removeEventListener('resize', this.resize);
  }

  handleRoot = n => {
    this.root = n;
  };

  handleRef = n => {
    this.node = n;
  };

  @Bind()
  @Debounce(400)
  resize() {
    if (!this.node) {
      return;
    }
    const canvasWidth = this.node.parentNode.clientWidth;
    const { data = [], autoLabel = true } = this.props;

    if (!autoLabel) {
      return;
    }
    const minWidth = data.length * 30;
    const { autoHideXLabels } = this.state;

    if (canvasWidth <= minWidth) {
      if (!autoHideXLabels) {
        this.setState({
          autoHideXLabels: true,
        });
      }
    } else if (autoHideXLabels) {
      this.setState({
        autoHideXLabels: false,
      });
    }
  }

  render() {
    const {
      data,
      height,
      title,
      padding,
      forceFit = true,
      color = 'rgba(24, 144, 255, 0.85)',
    } = this.props;

    const { autoHideXLabels } = this.state;

    const scale = {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
      },
    };

    const tooltip = [
      'x*y',
      (x, y) => ({
        name: x,
        value: y,
      }),
    ];

    return (
      <div className={"bar-charts-themes-components"} style={{ height }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          {title && <h4 style={{ marginBottom: 20 }}>{title}</h4>}
          <Chart
            data={data}
            scale={scale}
            forceFit={forceFit}
            padding={padding || 'auto'}
            height={title ? height - 41 : height}
          >
            <Axis
              name="x"
              title={false}
              label={autoHideXLabels ? false : {}}
              tickLine={autoHideXLabels ? false : {}}
            />
            <Axis name="y" min={0} />
            <Tooltip showTitle={false} crosshairs={false} />
            <Geom type="interval" position="x*y" color={color} tooltip={tooltip} />
          </Chart>
        </div>
      </div>
    );
  }
}

Bar.propTypes = {
  data: PropTypes.array,
  color: PropTypes.string,
  height: PropTypes.number,
  title: PropTypes.string,
  forceFit: PropTypes.bool,
  autoLabel: PropTypes.bool,
  padding: PropTypes.string,
};

export default autoHeight(Bar);
