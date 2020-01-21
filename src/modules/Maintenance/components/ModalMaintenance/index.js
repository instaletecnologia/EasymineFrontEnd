import React, { memo, useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import classNames from 'classnames';
import styles from './index.less';

import model from './model';
import Form from './form';

export function openMaintenance(maintenance = undefined) {
  return {
    type: `${model.namespace}/open`,
    payload: maintenance,
  };
}

export function closeMaintenance() {
  return {
    type: `${model.namespace}/close`,
  };
}

export const MAINTENANCE_TYPE = {
  HMC: 6,
  HMP: 7,
};

function ModalMaintenance() {
  const dispatch = useDispatch();
  const visible = useSelector(state => state[model.namespace].visible);
  const [loading, setLoading] = useState(false);

  let form;

  function onSubmit() {
    setLoading(true);
    form.validateFields((err, values) => {
      setTimeout(() => setLoading(false), 3000);
      if (err) {
        console.log('tem erro no form', err, values);
        return;
      }

      console.log('Received values of form: ', values);
      // requisita pra api
      form.resetFields();
    });
  }

  function close() {
    dispatch(closeMaintenance());
  }

  function saveFormInstance(formRef) {
    form = formRef;
  }

  return (
    <div className={classNames(classNames, styles.div)}>
      <Modal
        width={380}
        visible={visible}
        title={formatMessage({ id: 'maintenance.inclusion' })}
        onCancel={close}
        footer={[
          <Button key="back" onClick={close} disabled={loading}>
            {formatMessage({ id: 'component.titleButton.Return' })}
          </Button>,
          <Button key="submit" type="primary" onClick={onSubmit} loading={loading}>
            {formatMessage({ id: 'component.titleButton.Save' })}
          </Button>,
        ]}
      >
        <Form onFormInstance={saveFormInstance} />
      </Modal>
    </div>
  );
}

export default memo(ModalMaintenance);
