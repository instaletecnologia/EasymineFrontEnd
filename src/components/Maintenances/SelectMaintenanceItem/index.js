import React, { memo, useEffect, useState } from 'react';
import { Select } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { fetchSelect } from './services/api';

const { Option } = Select;

function SelectMaintenanceItem({
  onChange,
  value,
  EquipamentoModeloID = null,
  ClasseFalhaID = null,
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function loadData() {
    setData([]);

    if (EquipamentoModeloID && ClasseFalhaID) {
      setLoading(true);
      const result = await fetchSelect({ EquipamentoModeloID, ClasseFalhaID });
      if (result.length > 0) {
        setData(result);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [EquipamentoModeloID, ClasseFalhaID]);

  return (
    <>
      <Select
        showSearch
        style={{ width: 300 }}
        placeholder={formatMessage({ id: 'maintenance.placeholder.Maintenanceitem' })}
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        loading={loading}
      >
        {data.map(item => (
          <Option key={item.ManutencaoItenID}> {item.Descricao} </Option>
        ))}
      </Select>
    </>
  );
}

export default memo(SelectMaintenanceItem);
