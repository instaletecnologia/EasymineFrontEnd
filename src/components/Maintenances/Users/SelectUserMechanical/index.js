import React, { memo, useEffect, useState } from 'react';
import { Select } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { fetcSelectUserMechanical } from './services/api';

const { Option } = Select;

function SelectUserMechanical({ onChange, value }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function loadData() {
    setData([]);

    setLoading(true);
    const result = await fetcSelectUserMechanical();
    setData(result);
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
        placeholder={formatMessage({ id: 'user.mechanical.placeholder' })}
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        loading={loading}
      >
        {data.map(item => (
          <Option key={item.UsuarioID}>{`${item.Nome}`}</Option>
        ))}
      </Select>
    </>
  );
}

export default memo(SelectUserMechanical);
