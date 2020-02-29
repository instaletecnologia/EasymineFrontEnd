import React, { memo, useEffect, useState } from 'react';
import { Select } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { fetchSelect } from './services/api';

const { Option } = Select;

function SelectMaintenanceOrder({
  onChange,
  value,
  EquipamentoID = null,
  idCategoriasTempo = null,
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function loadData() {
    setData([]);

    if (EquipamentoID && idCategoriasTempo) {
      setLoading(true);
      const result = await fetchSelect({ EquipamentoID, idCategoriasTempo });
      if (result.length > 0) {
        setData(result);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [EquipamentoID, idCategoriasTempo]);

  return (
    <>
      <Select
        showSearch
        size="large"
        style={{ width: 300 }}
        placeholder={formatMessage({ id: 'maintenance.select.Order' })}
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.props.children
            .toString()
            .toLowerCase()
            .indexOf(input.toString().toLowerCase()) >= 0
        }
        loading={loading}
      >
        {data.map(item => (
          <Option key={item.OrdemManutencaoID}> {item.NumeroOrdem} </Option>
        ))}
      </Select>
    </>
  );
}

export default memo(SelectMaintenanceOrder);
