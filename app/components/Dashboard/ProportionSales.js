import React from 'react';
import PropTypes from 'prop-types';
import { Card, Radio } from 'antd';
import loadable from 'loadable-components';

const Pie = loadable(() => import('components/Themes/Charts/Pie'));

const ProportionSales = ({ dropdownGroup, salesType, salesPieData, handleChangeSalesType }) => (
  <Card
    className={"salesCard"}
    bordered={false}
    title="The Proportion of Sales"
    bodyStyle={{ padding: 24 }}
    extra={
      <div className={"salesCardExtra"}>
        {dropdownGroup}
        <div className={"salesTypeRadio"}>
          <Radio.Group value={salesType} onChange={handleChangeSalesType}>
            <Radio.Button value="all">
              ALL
            </Radio.Button>
            <Radio.Button value="online">
              Online
            </Radio.Button>
            <Radio.Button value="stores">
              Stores
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>
    }
    style={{ marginTop: 24 }}
  >
    <div
      style={{
        minHeight: 380,
      }}
    >
      <h4 style={{ marginTop: 8, marginBottom: 32 }}>
        Sales
      </h4>
      <Pie
        hasLegend
        height={248}
        lineWidth={4}
        subTitle="Sales"
        data={salesPieData}
        valueFormat={value => <span>${value}</span>}
        total={() => <span>${salesPieData.reduce((pre, now) => now.y + pre, 0)}</span>}
      />
    </div>
  </Card>
);

ProportionSales.propTypes = {
  dropdownGroup: PropTypes.node,
  handleChangeSalesType: PropTypes.func,
  salesType: PropTypes.string.isRequired,
  salesPieData: PropTypes.array.isRequired,
};

export default ProportionSales;
