import React, { memo, useEffect, useState } from 'react';
import { Select } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { fetchSelect } from './services/api';

const { Option } = Select;

function SelectMaintenanceReason({ onChange, value }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function loadData() {
    setData([]);
    setLoading(true);
    const result = await fetchSelect();
    if (result.length > 0) {
      setData(result);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Select
        showSearch
        size="large"
        style={{ width: 300 }}
        placeholder={formatMessage({ id: 'maintenance.select.Reason' })}
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
          <Option key={item.MotivoManutencaoID}>{item.Descricao} </Option>
        ))}
      </Select>
    </>
  );
}

export default memo(SelectMaintenanceReason);
