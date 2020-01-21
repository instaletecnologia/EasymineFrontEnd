import React, { memo } from 'react';
import { Button, Modal, Input, Form } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { useSelector, useDispatch } from 'dva';
import _ from 'lodash';

import SelectEquipamentTag from '@/components/SelectEquipamentTag';
import SelectMaintenanceOccurrence from '@/components/SelectMaintenanceOccurrence';
import InputNumberPlate from '@/components/InputNumberPlate';
import SelectUserMechanical from '@/components/SelectUserMechanical';
import InputNumberHorimetro from '@/components/InputNumberHorimetro';
import model from './model';

const { TextArea } = Input;
const FormItem = Form.Item;

function AddMaintenance({ form, onFormInstance = () => ({}) }) {
  const dispatch = useDispatch();
  const maintenanceType = useSelector(state => _.get(state[model.namespace], 'params.maintenanceType'));
  const { getFieldDecorator } = form;
  const equipmentId = form.getFieldValue('EquipamentoID');

  onFormInstance(form);

  return (
    <Form>
      <div>
        <FormItem>
          {getFieldDecorator('EquipamentoID', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'equipment.tag.placeholder' }),
              },
            ],
          })(<SelectEquipamentTag />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('Chapa', {
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
          {getFieldDecorator('UsuarioID', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'user.mechanical.placeholder' }),
              },
            ],
          })(<SelectUserMechanical />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('OcorrenciaID', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'ocorrence.Descrition' }),
              },
            ],
          })(<SelectMaintenanceOccurrence maintenanceType={maintenanceType} equipmentId={equipmentId} />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('Observacao', {
            rules: [
              {
                required: true,
                message: 'Observação',
              },
            ],
          })(<TextArea placeholder="Informe uma observação..." />)}
        </FormItem>
      </div>
    </Form>
  );
}

const AddMaintenanceForm = Form.create({ name: 'AddMaintenance' })(AddMaintenance);

export default memo(AddMaintenanceForm);
