import React, { memo, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import classNames from 'classnames';
import styles from './index.less';
import model from './model';
import Form from './form';
import { release } from './services/api';

export function openMaintenanceRelease(maintenance = undefined) {
  return {
    type: `${model.namespace}/open`,
    payload: maintenance,
  };
}

export function closeMaintenanceRelease() {
  return {
    type: `${model.namespace}/close`,
  };
}

function ModalMaintenanceRelease() {
  const dispatch = useDispatch();
  const visible = useSelector(state => state[model.namespace].visible);
  const [loading, setLoading] = useState(false);
  const [validet, setValidet] = useState(false);

  let form;

  async function onSubmit() {
    setLoading(true);
    form.validateFields(async (err, values) => {
      // requisita pra api
      console.log(err);
      if (err) {
        setLoading(false);
        return setValidet(false);
      }
      await release(values);
      setLoading(false);
      setValidet(true);
      // reset os valor do form
      form.resetFields();
    });
    UpdateMaintenanceMonitoring();
    setTimeout(() => close(), 1000);
  }

  function UpdateMaintenanceMonitoring() {
    dispatch({
      type: 'MaintenanceMonitoring/fetch',
    });
  }

  function close() {
    setLoading(false);
    form.resetFields();
    dispatch(closeMaintenanceRelease());
  }

  function saveFormInstance(formRef) {
    form = formRef;
  }

  return (
    <div className={classNames(classNames, styles.div)}>
      <Modal
        width={380}
        visible={visible}
        title={formatMessage({ id: 'maintenance.release' })}
        onCancel={close}
        footer={[
          <Button key="back" onClick={close} disabled={loading || !validet}>
            {formatMessage({ id: 'component.titleButton.Return' })}
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={onSubmit}
            loading={loading}
            disabled={!validet}
          >
            {formatMessage({ id: 'component.titleButton.Save' })}
          </Button>,
        ]}
      >
        <Form onFormInstance={saveFormInstance} />
      </Modal>
    </div>
  );
}

export default memo(ModalMaintenanceRelease);
