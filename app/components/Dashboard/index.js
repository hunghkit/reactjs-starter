/* eslint-disable */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import IntroduceRow from './IntroduceRow';
import SalesCard from './SalesCard';
import TopSearch from './TopSearch';
import ProportionSales from './ProportionSales';

const visitData2 = [
  { x: '2019-01-15', y: 1 },
  { x: '2019-01-16', y: 6 },
  { x: '2019-01-17', y: 4 },
  { x: '2019-01-18', y: 8 },
  { x: '2019-01-19', y: 3 },
  { x: '2019-01-20', y: 7 },
  { x: '2019-01-21', y: 2 },
];

const searchData = [
  { index: 1, keyword: 'something-0', count: 944, range: 44, status: 0 },
  { index: 2, keyword: 'something-1', count: 312, range: 46, status: 0 },
  { index: 3, keyword: 'something-2', count: 354, range: 61, status: 1 },
  { index: 4, keyword: 'something-3', count: 584, range: 42, status: 0 },
  { index: 5, keyword: 'something-4', count: 925, range: 65, status: 0 },
  { index: 6, keyword: 'something-5', count: 788, range: 10, status: 0 },
  { index: 7, keyword: 'something-6', count: 851, range: 83, status: 1 },
  { index: 8, keyword: 'something-7', count: 759, range: 42, status: 0 },
  { index: 9, keyword: 'something-8', count: 401, range: 96, status: 1 },
  { index: 10, keyword: 'something-9', count: 288, range: 72, status: 1 },
  { index: 11, keyword: 'something-10', count: 473, range: 50, status: 0 },
  { index: 12, keyword: 'something-11', count: 337, range: 8, status: 1 },
  { index: 13, keyword: 'something-12', count: 360, range: 34, status: 1 },
  { index: 14, keyword: 'something-13', count: 574, range: 34, status: 1 },
  { index: 15, keyword: 'something-14', count: 890, range: 24, status: 0 },
  { index: 16, keyword: 'something-15', count: 930, range: 46, status: 0 },
  { index: 17, keyword: 'something-16', count: 349, range: 12, status: 1 },
  { index: 18, keyword: 'something-17', count: 441, range: 50, status: 0 },
  { index: 19, keyword: 'something-18', count: 780, range: 18, status: 1 },
  { index: 20, keyword: 'something-19', count: 316, range: 97, status: 0 },
  { index: 21, keyword: 'something-20', count: 717, range: 74, status: 1 },
  { index: 22, keyword: 'something-21', count: 932, range: 49, status: 0 },
  { index: 23, keyword: 'something-22', count: 623, range: 92, status: 1 },
  { index: 24, keyword: 'something-23', count: 539, range: 93, status: 1 },
  { index: 25, keyword: 'something-24', count: 303, range: 13, status: 0 },
  { index: 26, keyword: 'something-25', count: 940, range: 14, status: 0 },
  { index: 27, keyword: 'something-26', count: 393, range: 73, status: 0 },
  { index: 28, keyword: 'something-27', count: 388, range: 5, status: 0 },
  { index: 29, keyword: 'something-28', count: 118, range: 4, status: 1 },
  { index: 30, keyword: 'something-29', count: 554, range: 17, status: 1 },
  { index: 31, keyword: 'something-30', count: 426, range: 94, status: 1 },
  { index: 32, keyword: 'something-31', count: 545, range: 12, status: 0 },
  { index: 33, keyword: 'something-32', count: 699, range: 51, status: 1 },
  { index: 34, keyword: 'something-33', count: 730, range: 6, status: 0 },
  { index: 35, keyword: 'something-34', count: 208, range: 51, status: 0 },
  { index: 36, keyword: 'something-35', count: 185, range: 46, status: 0 },
  { index: 37, keyword: 'something-36', count: 464, range: 79, status: 0 },
  { index: 38, keyword: 'something-37', count: 139, range: 11, status: 0 },
  { index: 39, keyword: 'something-38', count: 699, range: 87, status: 0 },
  { index: 40, keyword: 'something-39', count: 273, range: 70, status: 0 },
  { index: 41, keyword: 'something-40', count: 387, range: 12, status: 1 },
  { index: 42, keyword: 'something-41', count: 82, range: 28, status: 0 },
  { index: 43, keyword: 'something-42', count: 316, range: 4, status: 0 },
  { index: 44, keyword: 'something-43', count: 941, range: 30, status: 0 },
  { index: 45, keyword: 'something-44', count: 806, range: 58, status: 0 },
  { index: 46, keyword: 'something-45', count: 191, range: 38, status: 0 },
  { index: 47, keyword: 'something-46', count: 804, range: 65, status: 0 },
  { index: 48, keyword: 'something-47', count: 397, range: 13, status: 0 },
  { index: 49, keyword: 'something-48', count: 440, range: 25, status: 0 },
  { index: 50, keyword: 'something-49', count: 736, range: 79, status: 1 },
];

const salesPieData = [
  { x: 'alo 1', y: 4544 },
  { x: 'alo 2', y: 3321 },
  { x: 'alo 3', y: 3113 },
  { x: 'alo 4', y: 2341 },
  { x: 'alo 5', y: 1231 },
  { x: 'alo 6', y: 1231 },
];

class DashboardAdmin extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: null,
  };

  render() {
    return (
      <div className="dashboad-admin-components transparent">
        <IntroduceRow />
        <SalesCard
          isActive={() => undefined}
          salesData={[
            { x: 'M-1', y: 562 },
            { x: 'M-2', y: 650 },
            { x: 'M-3', y: 776 },
            { x: 'M-4', y: 825 },
            { x: 'M-5', y: 421 },
            { x: 'M-6', y: 778 },
            { x: 'M-7', y: 773 },
            { x: 'M-8', y: 1019 },
            { x: 'M-9', y: 819 },
            { x: 'M-10', y: 846 },
            { x: 'M-11', y: 1134 },
            { x: 'M-12', y: 736 },
          ]}
          selectDate={(type) => console.log(type)}
        />
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <TopSearch
              visitData2={visitData2}
              searchData={searchData}
            />
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <ProportionSales
              salesPieData={salesPieData}
              salesType={this.state.salesType}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DashboardAdmin;
