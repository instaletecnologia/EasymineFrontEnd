import React, { memo } from 'react';
import { Row, Col, Typography } from 'antd';
// import { formatMessage } from 'umi-plugin-react/locale';
import PieProductionType from './components/Charts/PieProductionType';

function dashboardMovement() {
  return (
    <div>
      <PieProductionType />
    </div>
  );
}
export default memo(dashboardMovement);
