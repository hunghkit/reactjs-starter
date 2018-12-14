import React, { PureComponent } from 'react';
import { Chart, Tooltip, Geom } from 'bizcharts';
import autoHeight from 'utils/autoHeight';

class MiniBar extends PureComponent {
  render() {
    const { height, forceFit = true, color = '#1890FF', data = [] } = this.props;

    const scale = {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
      },
    };

    const padding = [36, 5, 30, 5];

    const tooltip = [
      'x*y',
      (x, y) => ({
        name: x,
        value: y,
      }),
    ];

    // for tooltip not to be hide
    const chartHeight = height;

    return (
      <div className={'mini-chart'} style={{ height }}>
        <div className={'chart-content'}>
          <Chart
            scale={scale}
            height={chartHeight}
            forceFit={forceFit}
            data={data}
            padding={padding}
          >
            <Tooltip showTitle={false} crosshairs={false} />
            <Geom type="interval" position="x*y" color={color} tooltip={tooltip} />
          </Chart>
        </div>
      </div>
    );
  }
}
export default autoHeight(MiniBar);
