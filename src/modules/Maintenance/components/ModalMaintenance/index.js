import React, { memo, useState } from 'react';
import { Input, Form, Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import _ from 'lodash';

import SelectEquipamentTag from '@/components/Equipments/SelectEquipamentTag';
import SelectMaintenanceOccurrence from '@/components/Maintenances/SelectMaintenanceOccurrence';
import InputNumberPlate from '@/components/Users/InputNumberPlate';
import InputNumberHorimetro from '@/components/Equipments/InputNumberHorimetro';
// import TextAreaNote from '@/components/Note';

import { add } from './services/api';

import model from './model';

const { TextArea } = Input;
const FormItem = Form.Item;

function MaintenanceForm({ form }) {
  const dispatch = useDispatch();
  const visible = useSelector(state => state[model.namespace].visible);
  const [loading, setLoading] = useState(false);

  const maintenanceType = useSelector(state =>
    _.get(state[model.namespace], 'params.maintenanceType'),
  );
  const { validateFields, resetFields, getFieldDecorator, getFieldsError } = form;
  const equipmentId = form.getFieldValue('EquipamentoID');

  async function close() {
    setLoading(false);
    resetFields();
    dispatch({
      type: 'MaintenanceMonitoring/fetch',
    });
    dispatch(closeMaintenance());
  }
  async function onSubmit() {
    setLoading(true);
    validateFields(async (err, values) => {
      if (err) {
        setLoading(false);
        getFieldsError();
        return;
      }
      await add(values);
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
      title={formatMessage({ id: 'maintenance.inclusion' })}
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
          })(<SelectEquipamentTag noInMaintenance />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('UsuarioID', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'user.plate' }),
              },
            ],
          })(<InputNumberPlate />)}
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
          {getFieldDecorator('OcorrenciaID', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'ocorrence.Descrition' }),
              },
            ],
          })(
            <SelectMaintenanceOccurrence
              maintenanceType={maintenanceType}
              equipmentId={equipmentId}
            />,
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('Observacao', {
            rules: [
              {
                required: false,
                message: formatMessage({ id: 'app.settings.Note' }),
              },
            ],
          })(<TextArea maxLength={255} placeholder="Informe uma observação..." />)}
        </FormItem>
      </Form>
    </Modal>
  );
}

const ModalMaintenance = Form.create({ name: 'MaintenanceForm' })(MaintenanceForm);

export default memo(ModalMaintenance);

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
  HMC: 7,
  HMP: 6,
};
