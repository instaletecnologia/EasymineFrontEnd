import React, { memo } from 'react';
import { List, Avatar, Skeleton, Icon, Button, Typography } from 'antd';
import { useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import moment from 'moment';

import { openMaintenance } from '@/modules/Maintenance/components/ModalMaintenance';

const { Text } = Typography;

function ListItem({ data }) {
  const dispatch = useDispatch();

  function handleVisibleDetailing() {
    dispatch(openMaintenance(data));
  }

  function handleVisibleRelease() {
    alert('fazer o mesmo aqui');
  }

  const IconTextDetailing = () => (
    <span>
      <Button type="primary" ghost onClick={handleVisibleDetailing}>
        <Icon type="snippets" />
        {formatMessage({ id: 'component.tagSelect.Detail' })}
      </Button>
    </span>
  );

  const IconTextRelease = () => (
    <span>
      <Button type="primary" ghost onClick={handleVisibleRelease}>
        <Icon type="like-o" />
        {formatMessage({ id: 'component.tagSelect.Release' })}
      </Button>
    </span>
  );

  return (
    <List.Item actions={[<IconTextDetailing />, <IconTextRelease />]}>
      <Skeleton avatar title={false} loading={false} active>
        <List.Item.Meta
          // avatar={ <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> }
          title={<a href={data.Tag}> {data.Tag}</a>}
        />
        <div>
          <Text strong>{formatMessage({ id: 'equipment.fleet' })}</Text>
          {` ${data.EquipamentoModeloDescricao}`}
        </div>
        <div>
          <Text strong>{formatMessage({ id: 'expressions.It_s_at' })}</Text>
          {` ${data.Ocorrencia} `}
          <Text strong>{formatMessage({ id: 'expressions.Since' })}</Text>{' '}
          {`${moment(data.DataHoraInicio).format('L')} ${moment(data.DataHoraInicio).format(
            'LTS',
          )} `}
          <Text strong>{`(${moment(data.DataHoraInicio)
            .startOf('day')
            .fromNow()})`}</Text>
        </div>
        <div>
          <Text mark>
            {data.Detalhado ? (
              formatMessage({ id: 'expressions.Detailed' })`: ${data.Detalhado}`
            ) : (
              <span>{formatMessage({ id: 'expressions.NoDetailsFound' })}</span>
            )}
          </Text>
        </div>
      </Skeleton>
    </List.Item>
  );
}
export default memo(ListItem);
