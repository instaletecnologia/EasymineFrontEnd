import React, { memo, useEffect } from 'react';
import { Button, Modal, Input, Form } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { useSelector, useDispatch } from 'dva';

import SelectEquipamentTag from '@/components/SelectEquipamentTag';
import InputNumberPlate from '@/components/InputNumberPlate';
import SelectUserMechanical from '@/components/SelectUserMechanical';
import SelectMaintenanceFailureClass from '@/components/SelectMaintenanceFailureClass';
import SelectMaintenanceItem from '@/components/SelectMaintenanceItem';
import SelectMaintenanceReason from '@/components/SelectMaintenanceReason';

const { TextArea } = Input;
const FormItem = Form.Item;

function MaintenanceDetailing({ form, initialValue }) {
  const { getFieldDecorator } = form;

  // function onChange(value) {
  //  console.log(`selected ${value}`);
  // }

  useEffect(() => {
    if (initialValue) {
      form.setFieldsValue({
        Tag: initialValue.Tag,
        ClassefalhaID: initialValue.ClassefalhaID,
      });
    }
  }, []);

  const tagValue = form.getFieldValue('Tag');

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
          })(<SelectEquipamentTag desabled />)}
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
          {getFieldDecorator('ClassefalhaID', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'maintenance.select.FailureClass' }),
              },
            ],
          })(<SelectMaintenanceFailureClass />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('ItemManutencaoID', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'maintenance.select.Maintenanceitem' }),
              },
            ],
          })(<SelectMaintenanceItem tagValue={tagValue} />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('MotivoManutencaoID', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'maintenance.select.Reason' }),
              },
            ],
          })(<SelectMaintenanceReason />)}
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
export default memo(Form.create({ name: 'MaintenanceDetailing' })(MaintenanceDetailing));
