/* eslint-disable */
import React from 'react';
import { Icon, Row, Col, Tooltip } from 'antd';
import numeral from 'numeral';
import loadable from 'loadable-components';
import Trend from 'components/Themes/Trend';
import ChartCard from 'components/Themes/Charts/Card';

const MiniBar = loadable(() => import('components/Themes/Charts/MiniBar'));
const MiniArea = loadable(() => import('components/Themes/Charts/MiniArea'));
const MiniProgress = loadable(() => import('components/Themes/Charts/MiniProgress'));

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const visitData = [
  { x: '2019-01-1', y: 7 },
  { x: '2019-01-2', y: 5 },
  { x: '2019-01-3', y: 4 },
  { x: '2019-01-4', y: 2 },
  { x: '2019-01-5', y: 4 },
  { x: '2019-01-6', y: 7 },
  { x: '2019-01-7', y: 5 },
  { x: '2019-01-8', y: 6 },
  { x: '2019-01-9', y: 5 },
  { x: '2019-01-10', y: 9 },
  { x: '2019-01-11', y: 6 },
  { x: '2019-01-12', y: 3 },
  { x: '2019-01-13', y: 1 },
  { x: '2019-01-14', y: 5 },
  { x: '2019-01-15', y: 3 },
  { x: '2019-01-16', y: 6 },
  { x: '2019-01-17', y: 5 },
];

const IntroduceRow = () => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Total Sales"
        action={
          <Tooltip
            title="Introduce"
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        contentHeight={46}
        total={() => <span>￥ 126560</span>}
        footer={<span>Daily Sales <strong>￥{numeral(12423).format('0,0')}</strong></span>}
      >
        <Trend flag="up" style={{ marginRight: 16 }}>
          <span>Weekly Changes: </span>
          <span className="trendText">12%</span>
        </Trend>
        <Trend flag="down">
          <span>Daily Changes: </span>
          <span className="trendText">11%</span>
        </Trend>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Visits"
        action={
          <Tooltip
            title="Introduce"
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        contentHeight={46}
        total={() => <span>8,846</span>}
        footer={<span>Daily Visits <strong>{numeral(8,846).format('0,0')}</strong></span>}
      >
        <MiniArea
          color="#975FE4"
          data={visitData}
        />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Payments"
        action={
          <Tooltip
            title="Introduce"
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        contentHeight={46}
        total={() => <span>6,560</span>}
        footer={<span>Conversion Rate <strong>{numeral(60).format('0,0')}%</strong></span>}
      >
        <MiniBar
          data={visitData}
        />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Operational Effect"
        action={
          <Tooltip
            title="Introduce"
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        contentHeight={46}
        total={() => <span>70%</span>}
        footer={<span>WoW Change <strong>{numeral(12).format('0,0')}%</strong></span>}
      >
        <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
