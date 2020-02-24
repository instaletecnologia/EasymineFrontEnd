import React, { memo, useState, useEffect } from 'react';
import { Button, Input, Form, Modal } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import _ from 'lodash';

import SelectEquipamentTag from '@/components/Equipments/SelectEquipamentTag';
import InputNumberPlateMaintenance from '@/components/Maintenances/Users/InputNumberPlateMaintenance';
import SelectUserMechanical from '@/components/Maintenances/Users/SelectUserMechanical';
import InputNumberHorimetro from '@/components/Equipments/InputNumberHorimetro';

import { release } from './services/api';

import model from './model';

const { TextArea } = Input;
const FormItem = Form.Item;

function ModalMaintenanceReleaseForm({ form }) {
  const dispatch = useDispatch();
  const visible = useSelector(state => state[model.namespace].visible);
  const [loading, setLoading] = useState(false);
  const maintenance = useSelector(state => _.get(state[model.namespace], 'params'));

  const { validateFields, resetFields, getFieldDecorator, getFieldsError, setFieldsValue } = form;
  const ControleHoraID = _.get(maintenance, 'ControleHoraID');

  useEffect(() => {
    if (visible) {
      setFieldsValue({
        EquipamentoID: _.get(maintenance, 'EquipamentoID'),
        Horimetro: _.get(maintenance, 'Horímetro'),
        ControleHoraID: _.get(maintenance, 'ControleHoraID'),
      });
    }
  }, [visible]);

  async function close() {
    setLoading(false);
    resetFields();
    dispatch({
      type: 'MaintenanceMonitoring/fetch',
    });
    dispatch(closeMaintenanceRelease());
  }

  async function onSubmit() {
    setLoading(true);
    validateFields(async (err, values) => {
      if (err) {
        setLoading(false);
        getFieldsError();
        return;
      }

      await release({ ...values, ControleHoraID });
      await close();
    });
  }

  const errorsObj = getFieldsError();
  let hasError = false;
  Object.keys(errorsObj).forEach(field => {
    if (errorsObj[field] !== undefined) hasError = true;
  });

  return (
    <Modal
      width={420}
      visible={visible}
      title={`${formatMessage({ id: 'maintenance.release' })} - ${ControleHoraID}`}
      onCancel={close}
      destroyOnClose
      footer={[
        <Button key="back" onClick={close} disabled={loading}>
          {formatMessage({ id: 'component.titleButton.Return' })}
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={onSubmit}
          loading={loading}
          disabled={hasError}
        >
          {formatMessage({ id: 'component.titleButton.Save' })}
        </Button>,
      ]}
    >
      <Form>
        <FormItem>
          {getFieldDecorator('EquipamentoID', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'equipment.tag.placeholder' }),
              },
            ],
          })(<SelectEquipamentTag disabled />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('UsuarioID', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'user.plate' }),
              },
            ],
          })(<InputNumberPlateMaintenance />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('Horimetro', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'equipment.Horimeter' }),
              },
            ],
          })(<InputNumberHorimetro />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('UsuarioMecanicoID', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'user.mechanical.placeholder' }),
              },
            ],
          })(<SelectUserMechanical />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('Observacoes', {
            rules: [
              {
                required: false,
                message: 'Observação',
              },
            ],
          })(<TextArea maxLength={255} placeholder="Informe uma observação..." />)}
        </FormItem>
      </Form>
    </Modal>
  );
}

const ModalMaintenanceRelease = Form.create({ name: 'ModalMaintenanceReleaseForm' })(
  ModalMaintenanceReleaseForm,
);
export default memo(ModalMaintenanceRelease);

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
