import React, { memo, useEffect } from 'react';
import { Input, Typography } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import StringMask from 'string-mask';

const { Text } = Typography;

const formatter = new StringMask('#.##0,00', { reverse: true });

function InputNumberHorimetro({ onChange, value }) {
  async function loadData() {
    onChange(null);
  }

  function onChangeValue(event) {
    console.log(event.target.value, formatter.apply(event.target.value));
    event.target.value = formatter.apply(event.target.value);
    return onChange(event);
  }

  // useEffect(() => {
  //   loadData();
  // }, []);

  return (
    <>
      <Text strong> {formatMessage({ id: 'equipment.Horimeter' })} </Text>
      <Input
        defaultValue={value}
        style={{ width: '200px' }}
        min={0}
        // step={0.01}
        onChange={onChangeValue}
      />
    </>
  );
}

export default InputNumberHorimetro;
