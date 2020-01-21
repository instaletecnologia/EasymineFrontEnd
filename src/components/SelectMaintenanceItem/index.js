import React, { memo, useEffect } from 'react';
import { Select } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

const { Option } = Select;

function SelectMaintenanceItem({ onChange, value, tagValue }) {
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

  useEffect(() => {
    if (tagValue) {
      // fazer requisi~cao
      onChange(null);
      loadData();
    }
  }, [tagValue]);

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
          <Option key={item.EquipamentoID}>{`${item.TagPrefixo}-${item.TagNumero}`} </Option>
        ))}
      </Select>
    </>
  );
}

export default memo(SelectMaintenanceItem);
