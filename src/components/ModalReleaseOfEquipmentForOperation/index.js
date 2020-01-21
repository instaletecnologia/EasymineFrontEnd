import React, { memo } from 'react';
import { Button, Modal, Input } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import classNames from 'classnames';
import styles from './index.less';

import ReleaseOfEquipmentForOperation from '@/modules/Maintenance/controls/ReleaseOfEquipmentForOperation';

function ModalReleaseOfEquipmentForOperation() {
  const visible = useSelector(state => state.ModalReleaseOfEquipmentForOperation.visible);
  const initialValue = useSelector(state => state.ModalReleaseOfEquipmentForOperation.initialValue);
  const dispatch = useDispatch();

  function handleVisible() {
    dispatch({
      type: 'ModalReleaseOfEquipmentForOperation/updateVisible',
      payload: false,
    });
  }

  return (
    <div className={classNames(classNames, styles.div)}>
      <Modal
        width={380}
        visible={visible}
        title={formatMessage({ id: 'maintenance.release' })}
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
        {visible && <ReleaseOfEquipmentForOperation initialValue={initialValue} />}
      </Modal>
    </div>
  );
}
export default memo(ModalReleaseOfEquipmentForOperation);
