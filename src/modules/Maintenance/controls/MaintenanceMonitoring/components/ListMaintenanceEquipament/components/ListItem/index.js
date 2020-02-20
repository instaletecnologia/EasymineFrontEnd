import React, { memo } from 'react';
import { List, Avatar, Icon, Typography } from 'antd';
import { useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import moment from 'moment';

import { openMaintenanceDetailing } from '@/modules/Maintenance/components/ModalMaintenanceDetailing';
import { openMaintenanceRelease } from '@/modules/Maintenance/components/ModalMaintenanceRelease';
import { standardizationWords } from '@/utils/string';

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
          avatar={<Avatar src={`/images/equipment-${data.TAGPREFIXO}-enabled-2d.png`} /> }
        title={
          <a style={{ fontSize: '20px', color: '#000' }} href={data.Tag}>
            {' '}
            {data.Tag}
          </a>
        }
        description={
          <div>
            <Text strong>{formatMessage({ id: 'equipment.fleet' })}</Text>
            {` ${standardizationWords(data.EquipamentoModeloDescricao).substring(20, 0)}... `}
            <Text strong>{formatMessage({ id: 'expressions.It_s_at' })}</Text>
            {` ${standardizationWords(data.Ocorrencia).substring(22, 0)}... `}
            <Text strong>{formatMessage({ id: 'expressions.Since' })}</Text>{' '}
            {`${moment.utc(data.DataHoraInicio).format('L')} ${moment.utc(data.DataHoraInicio).format('LTS')} `}
            <Text strong>{`(${moment.utc(data.DataHoraInicio).startOf('hours').fromNow()}) `}</Text>
            <div>
              <Text mark>
                {data.Detalhado ? (
                 `${formatMessage({ id: 'maintenance.detailed.item' })}: ${standardizationWords(data.Detalhado)}`
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
