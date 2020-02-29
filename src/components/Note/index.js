import React, { memo } from 'react';
import { Input } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

const { TextArea } = Input;

function Note({ value, onChange, maxLength = 255 }) {
  return (
    <>
      <TextArea maxLength={maxLength} placeholder="Informe uma observação..." />
    </>
  );
}

export default memo(Note);
