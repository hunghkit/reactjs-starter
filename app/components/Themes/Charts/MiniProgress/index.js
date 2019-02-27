/* eslint-disable */
import React from 'react';
import { Tooltip } from 'antd';

const MiniProgress = ({ target, color = 'rgb(19, 194, 194)', strokeWidth, percent }) => (
  <div className="mini-progress-themes-components">
    <Tooltip title={target}>
      <div className="target" style={{ left: target ? `${target}%` : null }}>
        <span style={{ backgroundColor: color || null }} />
        <span style={{ backgroundColor: color || null }} />
      </div>
    </Tooltip>
    <div className="progressWrap">
      <div
        className="progress"
        style={{
          backgroundColor: color || null,
          width: percent ? `${percent}%` : null,
          height: strokeWidth || null,
        }}
      />
    </div>
  </div>
);

export default MiniProgress;
