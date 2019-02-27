/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import classNames from 'classnames';

const renderTotal = total => {
  let totalDom;
  switch (typeof total) {
    case 'undefined':
      totalDom = null;
      break;
    case 'function':
      totalDom = <div className="total">{total()}</div>;
      break;
    default:
      totalDom = <div className="total">{total}</div>;
  }
  return totalDom;
};

class ChartCard extends React.PureComponent {
  renderConnet = () => {
    const { contentHeight, title, avatar, action, total, footer, children, loading } = this.props;

    if (loading) {
      return false;
    }

    return (
      <div className="card-charts-themes-components">
        <div
          className={classNames('chart-top', { chartTopMargin: !children && !footer })}
        >
          <div className="avatar">{avatar}</div>
          <div className="metaWrap">
            <div className="meta">
              <span className="title">{title}</span>
              <span className="action">{action}</span>
            </div>
            {renderTotal(total)}
          </div>
        </div>
        {children && (
          <div className="content" style={{ height: contentHeight || 'auto' }}>
            <div className={contentHeight && 'contentFixed'}>{children}</div>
          </div>
        )}
        {footer && (
          <div
            className={classNames('footer', { footerMargin: !children })}
          >
            {footer}
          </div>
        )}
      </div>
    );
  };

  render() {
    const {
      loading = false,
      contentHeight,
      title,
      avatar,
      action,
      total,
      footer,
      children,
      ...rest
    } = this.props;
    return (
      <Card
        loading={loading}
        bodyStyle={{ padding: '20px 24px 8px 24px' }} {...rest}
      >
        {this.renderConnet()}
      </Card>
    );
  }
}


ChartCard.propTypes = {
  title: PropTypes.string,
  avatar: PropTypes.string,
  footer: PropTypes.node,
  loading: PropTypes.bool,
  action: PropTypes.object,
  contentHeight: PropTypes.number,
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ChartCard;
