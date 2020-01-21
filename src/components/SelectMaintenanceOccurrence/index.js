import React, { memo, useEffect, useState } from 'react';
import { Select } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { fetchSelect } from './services/api';

const { Option } = Select;

function SelectMaintenanceOccurrence({ onChange, equipmentId = null, maintenanceType = null }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function loadData() {
    onChange(null);
    setData([]);

    if (maintenanceType && equipmentId) {
      setLoading(true);
      const result = await fetchSelect({ maintenanceType, equipmentId });
      setData(result);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [equipmentId, maintenanceType]);

  return (
    <>
      <Select
        showSearch
        disabled={!maintenanceType || !equipmentId || loading}
        style={{ width: 300 }}
        placeholder={formatMessage({ id: 'ocorrence.Descrition' })}
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        loading={loading}
      >
        {data.map(item => (
          <Option key={item.OcorrenciaID} value={item.OcorrenciaID}>
            {item.Descricao}
          </Option>
        ))}
      </Select>
    </>
  );
}

export default memo(SelectMaintenanceOccurrence);
