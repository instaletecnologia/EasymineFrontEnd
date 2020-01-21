import React, { memo, useContext } from 'react';
import { List, Button, Badge, Icon, Typography } from 'antd';
import { useDispatch } from 'dva';

import { formatMessage } from 'umi-plugin-react/locale';

import classNames from 'classnames';
import styles from './index.less';

import ListItem from './components/ListItem';
import ModalMaintenance, {
  openMaintenance,
  MAINTENANCE_TYPE,
} from '@/modules/Maintenance/components/ModalMaintenance';

const { Title, Text } = Typography;

function ListMaintenanceEquipament({ maintenanceType, color, data }) {
  const dispatch = useDispatch();

  function createMaintenance() {
    dispatch(openMaintenance({ maintenanceType: MAINTENANCE_TYPE.HMC }));
  }

  return (
    <div className={classNames(classNames, styles.div)}>
      <div style={{ backgroundColor: color }}>
        <Title level={4}>
          {maintenanceType}
          <Badge
            title={formatMessage({ id: 'expressions.AmountOfEquipment' })}
            count={data.length}
            style={{ backgroundColor: '#0d0d0d', color: '#fff', borderColor: '#0d0d0d' }}
          ></Badge>
          <span>
            <Button type="link" onClick={createMaintenance}>
              <Icon type="tool" theme="filled" />
              {formatMessage({ id: 'component.tagSelect.Add' })}
            </Button>
          </span>
        </Title>
      </div>

      <div style={{ backgroundColor: color }}>
        <List
          className="demo-loadmore-list"
          itemLayout="vertical"
          size="small"
          dataSource={data}
          renderItem={item => <ListItem data={item} />}
        />
        <ModalMaintenance />
      </div>
    </div>
  );
}
export default memo(ListMaintenanceEquipament);
