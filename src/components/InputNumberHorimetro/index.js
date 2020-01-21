import React, { memo, useEffect, useState } from 'react';
import { InputNumber, Typography, Input, Tooltip } from 'antd';

import { formatMessage } from 'umi-plugin-react/locale';

const { Text } = Typography;

function InputNumberHorimetro({ value }) {
  return (
    <>
      <Text strong> {formatMessage({ id: 'equipment.Horimeter' })} </Text>
      <InputNumber
        defaultValue={value}
        min={0}
        max={100}
        parser={value => value.replace(/\D/g, '')}
      />
    </>
  );
}

export default memo(InputNumberHorimetro);
