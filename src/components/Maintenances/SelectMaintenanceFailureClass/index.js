import React, { memo, useEffect, useState } from 'react';
import { Select } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { fetchSelect } from './services/api';

const { Option } = Select;

function SelectMaintenanceFailureClass({ onChange, maintenance = [] }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function loadData() {
    setData([]);

    if (maintenance) {
      setLoading(true);
      const { EquipamentoID, idCategoriasTempo, ParentID } = maintenance;

      const result = await fetchSelect({ EquipamentoID, idCategoriasTempo, ParentID });

      if (result.length > 0) {
        setData(result);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [maintenance]);

  return (
    <>
      <Select
        showSearch
        size="large"
        style={{ width: 300 }}
        placeholder={formatMessage({ id: 'maintenance.placeholder.FailureClass' })}
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
          <Option key={item.ClasseFalhaID}>{item.Descricao} </Option>
        ))}
      </Select>
    </>
  );
}

export default memo(SelectMaintenanceFailureClass);
