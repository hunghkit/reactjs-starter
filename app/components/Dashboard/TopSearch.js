/* eslint-disable */
import React from 'react';
import { Row, Col, Table, Tooltip, Card, Icon } from 'antd';
import Trend from 'components/Themes/Trend';
import numeral from 'numeral';
import NumberInfo from 'components/Themes/NumberInfo';
import loadable from 'loadable-components';
const MiniArea = loadable(() => import('components/Themes/Charts/MiniArea'));

const styles = {};
// const NumberInfo = () => <div>NumberInfo</div>;

const columns = [
  {
    title: 'Rank',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: 'Search keyword',
    dataIndex: 'keyword',
    key: 'keyword',
    render: (text) => (<a href="/">{text}</a>),
  },
  {
    title: 'Users',
    dataIndex: 'count',
    key: 'count',
    sorter: (a, b) => a.count - b.count,
    className: 'alignRight',
  },
  {
    title: 'Weekly Range',
    dataIndex: 'range',
    key: 'range',
    sorter: (a, b) => a.range - b.range,
    render: (text, record) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'}>
        <span style={{ marginRight: 4 }}>{text}%</span>
      </Trend>
    ),
    align: 'right',
  },
];

const TopSearch = ({ visitData2, searchData }) => (
  <Card
    bordered={false}
    title="Online Top Search"
    style={{ marginTop: 24 }}
  >
    <Row gutter={68}>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              Search users
              <Tooltip
                title="Introduce"
              >
                <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
              </Tooltip>
            </span>
          }
          gap={8}
          total={numeral(12321).format('0,0')}
          status="up"
          subTotal={17.1}
        />
        <MiniArea line height={45} data={visitData2} />
      </Col>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              Per Capita Search
              <Tooltip
                title="Introduce"
              >
                <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
              </Tooltip>
            </span>
          }
          total={2.7}
          status="down"
          subTotal={26.2}
          gap={8}
        />
        <MiniArea line height={45} data={visitData2} />
      </Col>
    </Row>
    <Table
      rowKey={record => record.index}
      size="small"
      columns={columns}
      dataSource={searchData}
      pagination={{
        style: { marginBottom: 0 },
        pageSize: 5,
      }}
    />
  </Card>
);

export default TopSearch;
