import React, { memo } from 'react';
import { List, Avatar, Icon, Typography } from 'antd';
import { useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import moment from 'moment';

import { openMaintenanceDetailing } from '@/modules/Maintenance/components/ModalMaintenanceDetailing';
import { openMaintenanceRelease } from '@/modules/Maintenance/components/ModalMaintenanceRelease';

const { Text } = Typography;

function ListItem({ data }) {
  const dispatch = useDispatch();

  function handleVisibleDetailing() {
    dispatch(openMaintenanceDetailing(data));
  }

  function handleVisibleRelease() {
    dispatch(openMaintenanceRelease(data));
  }

  const IconTextDetailing = () => (
    <span onClick={handleVisibleDetailing} style={{ fontSize: '16px', color: '#000' }}>
      <Icon type="snippets" theme="outlined" />
      {formatMessage({ id: 'component.tagSelect.Detail' })}
    </span>
  );

  const IconTextRelease = () => (
    <span onClick={handleVisibleRelease} style={{ fontSize: '16px', color: '#000' }}>
      <Icon type="like-o" theme="outlined" />
      {formatMessage({ id: 'component.tagSelect.Release' })}
    </span>
  );

  return (
    <List.Item actions={[<IconTextDetailing />, <IconTextRelease />]}>
      <List.Item.Meta
        // avatar={ <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> }
        title={<a href={data.Tag}> {data.Tag}</a>}
        description={
          <div>
            <Text strong>{formatMessage({ id: 'equipment.fleet' })}</Text>
            {` ${data.EquipamentoModeloDescricao} `}
            <Text strong>{formatMessage({ id: 'expressions.It_s_at' })}</Text>
            {` ${data.Ocorrencia} `}
            <Text strong>{formatMessage({ id: 'expressions.Since' })}</Text>{' '}
            {`${moment(data.DataHoraInicio).format('L')} ${moment(data.DataHoraInicio).format(
              'LTS',
            )} `}
            <Text strong>{`(${moment(data.DataHoraInicio)
              .startOf('day')
              .fromNow()}) `}</Text>
            <div>
              <Text mark>
                {data.Detalhado ? (
                  formatMessage({ id: 'expressions.Detailed' })`: ${data.Detalhado}`
                ) : (
                  <span>{formatMessage({ id: 'expressions.NoDetailsFound' })}</span>
                )}
              </Text>
            </div>
          </div>
        }
      />
    </List.Item>
  );
}
export default memo(ListItem);
