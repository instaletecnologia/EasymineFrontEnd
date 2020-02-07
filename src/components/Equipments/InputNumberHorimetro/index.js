import React, { memo } from 'react';
import { Input, Typography } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import StringMask from 'string-mask';

const { Text } = Typography;

function InputNumberHorimetro({ onChange, value }) {
  function onComponentChange(e) {
    const mask = new StringMask('#.##9,90', { reverse: true });
    const newValue = mask.apply(
      e.target.value
        .toString()
        .replace(/^\D+/g, '')
        .replace('.', '')
        .replace(',', ''),
    );

    // console.log(
    //   e.target.value,
    //   e.target.value
    //     .toString()
    //     .replace(/^\D+/g, '')
    //     .replace('.', ''),
    //   value,
    // );
    onChange(newValue);
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
        type="text"
        onChange={onComponentChange}
        value={value}
      />
    </>
  );
}

export default memo(InputNumberHorimetro);
