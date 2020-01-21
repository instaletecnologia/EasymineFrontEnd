import React, { memo, useEffect } from 'react';
import { Select } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

const { Option } = Select;

function SelectMaintenanceReason({ onChange, value }) {
  const data = useSelector(state => state.SelectEquipamentTag.data);
  const loading = useSelector(state => state.loading.effects['SelectEquipamentTag/fetch']);
  const dispatch = useDispatch();

  function loadData() {
    dispatch({
      type: 'SelectEquipamentTag/fetch',
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
        placeholder={formatMessage({ id: 'maintenance.select.Reason' })}
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        loading={loading}
      >
        {data.map(item => (
          <Option key={item.EquipamentoID}>{`${item.TagPrefixo}-${item.TagNumero}`} </Option>
        ))}
      </Select>
    </>
  );
}

export default memo(SelectMaintenanceReason);
