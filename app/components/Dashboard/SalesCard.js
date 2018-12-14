import React from 'react';
import { Row, Col, Card, Tabs, DatePicker } from 'antd';
import numeral from 'numeral';
import loadable from 'loadable-components';

const Bar = loadable(() => import('components/Themes/Charts/Bar'));

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: ['no:', i].join(' '),
    total: 323234,
  });
}

const SalesCard = ({ rangePickerValue, salesData, isActive, handleRangePickerChange, selectDate }) => (
  <Card
    bordered={false}
    bodyStyle={{ padding: 0 }}
  >
    <div className={"salesCard"}>
      <Tabs
        tabBarExtraContent={
          <div className={"salesExtraWrap"}>
            <div className={"salesExtra"}>
              <a className={isActive('today')} onClick={() => selectDate('today')}>
                All Day
              </a>
              <a className={isActive('week')} onClick={() => selectDate('week')}>
                All Week
              </a>
              <a className={isActive('month')} onClick={() => selectDate('month')}>
                All Month
              </a>
              <a className={isActive('year')} onClick={() => selectDate('year')}>
                All Year
              </a>
            </div>
            <RangePicker
              value={rangePickerValue}
              onChange={handleRangePickerChange}
              style={{ width: 256 }}
            />
          </div>
        }
        size="large"
        tabBarStyle={{ marginBottom: 24 }}
      >
        <TabPane
          tab="Sales"
          key="sales"
        >
          <Row>
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div className={"salesBar"}>
                <Bar
                  height={295}
                  title="Sales Trend"
                  data={salesData}
                />
              </div>
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <div className={"salesRank"}>
                <h4 className={"rankingTitle"}>
                  Sales Ranking
                </h4>
                <ul className={"rankingList"}>
                  {rankingListData.map((item, i) => (
                    <li key={item.title}>
                      <span
                        className={`rankingItemNumber ${i < 3 ? 'active' : ''}`}
                      >
                        {i + 1}
                      </span>
                      <span className={"rankingItemTitle"} title={item.title}>
                        {item.title}
                      </span>
                      <span className={"rankingItemValue"}>
                        {numeral(item.total).format('0,0')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane
          tab="Visits"
          key="views"
        >
          <Row>
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div className={"salesBar"}>
                <Bar
                  height={292}
                  title="Visits Trend"
                  data={salesData}
                />
              </div>
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <div className={"salesRank"}>
                <h4 className={"rankingTitle"}>
                  Visits Ranking
                </h4>
                <ul className={"rankingList"}>
                  {rankingListData.map((item, i) => (
                    <li key={item.title}>
                      <span
                        className={`rankingItemNumber ${i < 3 ? 'active' : ''}`}
                      >
                        {i + 1}
                      </span>
                      <span className={"rankingItemTitle"} title={item.title}>
                        {item.title}
                      </span>
                      <span>{numeral(item.total).format('0,0')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  </Card>
);

export default SalesCard;
