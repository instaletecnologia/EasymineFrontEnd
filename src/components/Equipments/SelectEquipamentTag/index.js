import React, { memo, useEffect, useState } from 'react';
import { Select } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { fetchSelectEquipmentTag } from './services/api';

const { Option } = Select;

function SelectEquipamentTag({ onChange, value, disabled }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function loadData() {
    setData([]);
    setLoading(true);

    const result = await fetchSelectEquipmentTag();

    setData(result || []);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, [value]);

  return (
    <Select
      showSearch
      size="large"
      style={{ width: 300 }}
      placeholder={formatMessage({ id: 'equipment.tag.placeholder' })}
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) =>
        option.props.children
          .toString()
          .toLowerCase()
          .indexOf(input.toString().toLowerCase()) >= 0
      }
      loading={loading}
      value={value}
      disabled={disabled}
    >
      {data.map(item => (
        <Option key={item.EquipamentoID} value={item.EquipamentoID}>
          {`${item.TagPrefixo}-${item.TagNumero}`}{' '}
        </Option>
      ))}
    </Select>
  );
}

export default memo(SelectEquipamentTag);
