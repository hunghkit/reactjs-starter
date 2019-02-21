import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget from 'components/Common/Widget';
import { createStructuredSelector } from 'reselect';
import * as AppSelector from 'selectors/app';

export const Sidebar = ({ sidebars }) => {
  return (
    <div
      className="sidebar-app-components sidebar"
    >
      {sidebars.map((item, index) => (
        <Widget
          key={index}
          title={item.title}
          className="widget_text"
        >
          {item.html ? <div dangerouslySetInnerHTML={{ __html: item.html }} /> : item.content}
        </Widget>
      ))}
    </div>
  );
}

Sidebar.propTypes = {
  sidebars: PropTypes.array,
  onLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  sidebars: AppSelector.getConfig('sidebars'),
});

export default connect(mapStateToProps)(Sidebar);
