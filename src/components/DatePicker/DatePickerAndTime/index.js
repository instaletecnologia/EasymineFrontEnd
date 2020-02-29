import React, { memo } from 'react';
import { DatePicker, notification } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';

// function DatePickerAndTime({ onChange, value, defaultValue }) {
function DatePickerAndTime() {
  return (
    <>
      <DatePicker showTime placeholder={formatMessage({ id: 'date.title' })} />
    </>
  );
}

export default memo(DatePickerAndTime);
