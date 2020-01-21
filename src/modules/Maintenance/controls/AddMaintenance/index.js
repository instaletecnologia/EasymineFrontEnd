import React, { memo } from 'react';
import { Button, Modal, Input, Form } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { useSelector, useDispatch } from 'dva';

import SelectEquipamentTag from '@/components/SelectEquipamentTag';
import SelectMaintenanceOccurrence from '@/components/SelectMaintenanceOccurrence';
import InputNumberPlate from '@/components/InputNumberPlate';
import SelectUserMechanical from '@/components/SelectUserMechanical';
import InputNumberHorimetro from '@/components/InputNumberHorimetro';

const { TextArea } = Input;
const FormItem = Form.Item;

function AddMaintenance({ form, maintenanceType }) {
  const dispatch = useDispatch();
  const { getFieldDecorator } = form;

  // function onChange(value) {
  //  console.log(`selected ${value}`);
  // }

  return (
    <Form>
      <div>
        <FormItem>
          {getFieldDecorator('Tag', {
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
          })(<SelectMaintenanceOccurrence maintenanceType={maintenanceType} />)}
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
export default memo(Form.create({ name: 'AddMaintenance' })(AddMaintenance));
