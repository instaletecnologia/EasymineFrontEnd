import React, { memo } from 'react';
import { Button, Modal, Input } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import classNames from 'classnames';
import styles from './index.less';

import AddMaintenance from '@/modules/Maintenance/controls/AddMaintenance';

function ModalAddMaintenance({ maintenanceType }) {
  const visible = useSelector(state => state.ModalAddMaintenance.visible);
  const initialValue = useSelector(state => state.ModalAddMaintenance.initialValue);
  const dispatch = useDispatch();

  function handleVisible() {
    dispatch({
      type: 'ModalAddMaintenance/updateVisible',
      payload: true,
    });
  }
  return (
    <div className={classNames(classNames, styles.div)}>
      <Modal
        width={380}
        visible={visible}
        title={formatMessage({ id: 'maintenance.inclusion' })}
        onCancel={handleVisible}
        footer={[
          <Button key="back" onClick={handleVisible}>
            {formatMessage({ id: 'component.titleButton.Return' })}
          </Button>,
          <Button key="submit" type="primary">
            {formatMessage({ id: 'component.titleButton.Save' })}
          </Button>,
        ]}
      >
        {visible && <AddMaintenance initialValue={initialValue} />}
      </Modal>
    </div>
  );
}
export default memo(ModalAddMaintenance);
