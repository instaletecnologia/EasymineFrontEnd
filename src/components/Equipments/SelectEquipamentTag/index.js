import React, { memo, useEffect, useState } from 'react';
import { Select } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { fetchSelectEquipmentTag, fetchSelectEquipmentTagNoInMaintenance } from './services/api';

const { Option } = Select;

function SelectEquipamentTag({ onChange, value, desabled, noInMaintenance }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function loadData() {
    onChange(null);
    setData([]);
    setLoading(true);

    const result = noInMaintenance
      ? await fetchSelectEquipmentTagNoInMaintenance()
      : await fetchSelectEquipmentTag();

    setData(result || []);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, [noInMaintenance]);

  return (
    <>
      <Select
        showSearch
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
        disabled={desabled}
      >
        {data.map(item => (
          <Option key={item.EquipamentoID} value={item.EquipamentoID}>
            {`${item.TagPrefixo}-${item.TagNumero}`}{' '}
          </Option>
        ))}
      </Select>
    </>
  );
}

export default memo(SelectEquipamentTag);
