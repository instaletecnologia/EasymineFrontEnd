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

  const BadgeCountEquipament = ({ description, count }) => (
    <Badge
      count={count}
      style={{ backgroundColor: '#0d0d0d', color: '#fff', borderColor: '#0d0d0d' }}
      title={formatMessage({ id: 'expressions.AmountOfEquipment' })}
    >
      <Title level={3}>{description}</Title>
    </Badge>
  );

  return (
    <div className={classNames(classNames, styles.div)}>
      <div style={{ backgroundColor: color, padding: '0.5%', paddingLeft: '20%' }}>
        <BadgeCountEquipament description={maintenanceTypeDescription} count={data.length} />
        <span
          onClick={createMaintenance}
          style={{ paddingLeft: '20%', fontSize: '16px', color: '#000' }}
        >
          <Icon type="tool" theme="filled" />
          {formatMessage({ id: 'component.tagSelect.Add' })}
        </span>
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
