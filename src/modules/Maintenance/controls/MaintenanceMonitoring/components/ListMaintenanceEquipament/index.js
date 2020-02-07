import React, { memo } from 'react';
import { List, Badge, Icon, Typography } from 'antd';
import { useDispatch } from 'dva';

import { formatMessage } from 'umi-plugin-react/locale';

import classNames from 'classnames';
import styles from './index.less';

import ListItem from './components/ListItem';

import {
  openMaintenance,
  MAINTENANCE_TYPE,
} from '@/modules/Maintenance/components/ModalMaintenance';

const { Title } = Typography;

function ListMaintenanceEquipament({ maintenanceType, maintenanceTypeDescription, color, data }) {
  const dispatch = useDispatch();

  function createMaintenance() {
    dispatch(openMaintenance({ maintenanceType: MAINTENANCE_TYPE[maintenanceType] }));
  }

  return (
    <div className={classNames(classNames, styles.div)}>
      <div style={{ backgroundColor: color, padding: '0.5%', paddingLeft: '20%' }}>
        <Title level={4}>
          {maintenanceTypeDescription}
          <span style={{ paddingLeft: '1%' }}>
            <Badge
              title={formatMessage({ id: 'expressions.AmountOfEquipment' })}
              count={data.length}
              style={{ backgroundColor: '#0d0d0d', color: '#fff', borderColor: '#0d0d0d' }}
            ></Badge>
          </span>
          <span
            onClick={createMaintenance}
            style={{ paddingLeft: '20%', fontSize: '16px', color: '#000' }}
          >
            <Icon type="tool" theme="filled" />
            {formatMessage({ id: 'component.tagSelect.Add' })}
          </span>
        </Title>
      </div>

      <div style={{ backgroundColor: color, margin: '0.5%' }}>
        <List
          className="demo-loadmore-list"
          itemLayout="vertical"
          size="small"
          dataSource={data}
          renderItem={item => <ListItem data={item} />}
        />
      </div>
    </div>
  );
}
export default memo(ListMaintenanceEquipament);
