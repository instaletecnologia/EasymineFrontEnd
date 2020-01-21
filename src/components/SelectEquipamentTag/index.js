import React, { memo, useEffect } from 'react';
import { Select } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

const { Option } = Select;

function SelectEquipamentTag({ onChange, value, desabled }) {
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
        placeholder={formatMessage({ id: 'equipment.tag.placeholder' })}
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) => {
          return option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }}
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
