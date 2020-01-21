import React, { memo, useEffect } from 'react';
import { Button, Modal, Input, Form } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { useSelector, useDispatch } from 'dva';

import SelectEquipamentTag from '@/components/SelectEquipamentTag';
import InputNumberPlate from '@/components/InputNumberPlate';
import SelectUserMechanical from '@/components/SelectUserMechanical';
import InputNumberHorimetro from '@/components/InputNumberHorimetro';

const { TextArea } = Input;
const FormItem = Form.Item;

function ModalReleaseOfEquipmentForOperation({ form, initialValue }) {
  const { getFieldDecorator } = form;

  // function onChange(value) {
  //  console.log(`selected ${value}`);
  // }

  useEffect(() => {
    if (initialValue) {
      form.setFieldsValue({
        Tag: initialValue.Tag,
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
          })(<InputNumberPlate UserPermissionID={15} />)}
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
export default memo(
  Form.create({ name: 'ModalReleaseOfEquipmentForOperation' })(ModalReleaseOfEquipmentForOperation),
);
