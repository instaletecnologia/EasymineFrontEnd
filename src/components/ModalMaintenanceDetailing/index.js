import React, { memo } from 'react';
import { Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import classNames from 'classnames';
import styles from './index.less';

import MaintenanceDetailing from '@/modules/Maintenance/controls/MaintenanceDetailing';

function ModalMaintenanceDetailing() {
  const visible = useSelector(state => state.ModalMaintenanceDetailing.visible);
  const initialValue = useSelector(state => state.ModalMaintenanceDetailing.initialValue);
  const dispatch = useDispatch();

  function handleVisible() {
    dispatch({
      type: 'ModalMaintenanceDetailing/updateVisible',
      payload: false,
    });
  }

  return (
    <div className={classNames(classNames, styles.div)}>
      <Modal
        width={380}
        visible={visible}
        title={formatMessage({ id: 'maintenance.breakdown' })}
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
        {visible && <MaintenanceDetailing initialValue={initialValue} />}
      </Modal>
    </div>
  );
}
export default memo(ModalMaintenanceDetailing);
