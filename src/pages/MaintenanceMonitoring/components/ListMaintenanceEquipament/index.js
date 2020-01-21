import React, { memo } from 'react';
import { List, Button, Badge, Icon, Typography } from 'antd';
import { useDispatch } from 'dva';

import { formatMessage } from 'umi-plugin-react/locale';

import classNames from 'classnames';
import styles from './index.less';

import ListItem from './components/ListItem';
import ModalAddMaintenance from '@/components/ModalAddMaintenance';
import ModalMaintenanceDetailing from '@/components/ModalMaintenanceDetailing';
import ModalReleaseOfEquipmentForOperation from '@/components/ModalReleaseOfEquipmentForOperation';

const { Title, Text } = Typography;

function ListMaintenanceEquipament({ maintenanceType, color, data }) {
  const dispatch = useDispatch();

  function handleAddMaintenance() {
    dispatch({
      type: 'ModalAddMaintenance/updateVisible',
      payload: true,
    });
  }

  const BadgeCountEquipament = ({ count }) => (
    <Badge
      title={formatMessage({ id: 'expressions.AmountOfEquipment' })}
      count={count}
      style={{ backgroundColor: '#0d0d0d', color: '#fff', borderColor: '#0d0d0d' }}
    ></Badge>
  );

  const IconTextAddMaintenance = () => (
    <span>
      <Button type="link" onClick={() => handleAddMaintenance()}>
        <Icon type="tool" theme="filled" />
        {formatMessage({ id: 'component.tagSelect.Add' })}
      </Button>
    </span>
  );

  return (
    <div className={classNames(classNames, styles.div)}>
      <div style={{ backgroundColor: color }}>
        <Title level={4}>
          {maintenanceType} <BadgeCountEquipament count={data.length} /> <IconTextAddMaintenance />
        </Title>
      </div>

      <div style={{ backgroundColor: color }}>
        <List
          className="demo-loadmore-list"
          itemLayout="vertical"
          size="small"
          dataSource={data}
          renderItem={item => <ListItem data={data[0]} />}
        />
        <ModalAddMaintenance />
        <ModalMaintenanceDetailing />
        <ModalReleaseOfEquipmentForOperation />
      </div>
    </div>
  );
}
export default memo(ListMaintenanceEquipament);
