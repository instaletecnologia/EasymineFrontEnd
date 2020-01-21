import React, { memo, useEffect } from 'react';
import { Select } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

const { Option } = Select;

function SelectUserMechanical({ onChange, value }) {
  const data = useSelector(state => state.SelectUserMechanical.data);
  const loading = useSelector(state => state.loading.effects['SelectUserMechanical/fetch']);
  const dispatch = useDispatch();

  function loadData() {
    dispatch({
      type: 'SelectUserMechanical/fetch',
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Select
        showSearch
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
