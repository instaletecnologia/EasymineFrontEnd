import React, { memo } from 'react';
import { Input, Form } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { useSelector } from 'dva';
import _ from 'lodash';

import SelectEquipamentTag from '@/components/Equipments/SelectEquipamentTag';
import SelectMaintenanceOccurrence from '@/components/Maintenances/SelectMaintenanceOccurrence';
import InputNumberPlate from '@/components/Users/InputNumberPlate';
import InputNumberHorimetro from '@/components/Equipments/InputNumberHorimetro';
import model from './model';

const { TextArea } = Input;
const FormItem = Form.Item;

function AddMaintenance({ form, onFormInstance = () => ({}) }) {
  const maintenanceType = useSelector(state =>
    _.get(state[model.namespace], 'params.maintenanceType'),
  );
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
          {getFieldDecorator('Observacoes', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'app.settings.Note' }),
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