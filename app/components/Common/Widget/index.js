import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const Widget = ({ className, title, children }) => {
  return (
    <div
      className={classnames('widget-common-components', 'widget', className)}
    >
      <h3>{title}</h3>
      <div className="widget-line" />
      <div className="textwidget">
        {children}
      </div>
    </div>
  );
}

Widget.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]).isRequired,
};

export default Widget;
