import React, { memo, useEffect } from 'react';
import { Select } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

const { Option } = Select;

function SelectMaintenanceFailureClass({ onChange }) {
  const initialValue = useSelector(state => state.ModalMaintenanceDetailing.initialValue);
  const data = useSelector(state => state.SelectMaintenanceFailureClass.data);
  const loading = useSelector(
    state => state.loading.effects['SelectMaintenanceFailureClass/fetch'],
  );
  const dispatch = useDispatch();

  function loadData() {
    if (initialValue) {
      dispatch({
        type: 'SelectMaintenanceFailureClass/fetch',
        payload: initialValue,
      });
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Select
        showSearch
        style={{ width: 300 }}
        placeholder={formatMessage({ id: 'maintenance.placeholder.FailureClass' })}
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
