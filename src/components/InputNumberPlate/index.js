import React, { memo, useEffect, useState } from 'react';
import { InputNumber, Typography, Input, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'dva';

import { formatMessage } from 'umi-plugin-react/locale';

const { Text } = Typography;

function InputNumberPlate({ onChange: OnChange, UserPermissionID }) {
  const data = useSelector(state => state.InputNumberPlate.data);
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  function loadData() {
    dispatch({
      type: 'InputNumberPlate/fetch',
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  function onChange(value) {
    let name = '';
    let userId = null;
    try {
      if (value) {
        const user = data.filter(el => el.Chapa === value)[0];
        name = user.Nome.substring(0, 10);
        userId = user.UsuarioID;
      } else {
        name = '';
        userId = null;
      }
    } catch (e) {
      name = '';
      userId = null;
    }

    OnChange(userId);
    setName(name);
  }
  return (
    <>
      <Text strong> {formatMessage({ id: 'user.plate' })} </Text>
      <InputNumber
        defaultValue={0}
        min={0}
        parser={value => value.replace(/\D/g, '')}
        onChange={onChange}
      />
      <Text type="secondary"> {name ? name : formatMessage({ id: 'user.name' })} </Text>
    </>
  );
}

export default memo(InputNumberPlate);
