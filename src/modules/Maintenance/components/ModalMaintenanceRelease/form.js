import React, { memo, useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { useSelector } from 'dva';
import _ from 'lodash';

import SelectEquipamentTag from '@/components/Equipments/SelectEquipamentTag';
import InputNumberPlate from '@/components/Users/InputNumberPlate';
import SelectUserMechanical from '@/components/Maintenances/SelectUserMechanical';
import InputNumberHorimetro from '@/components/Equipments/InputNumberHorimetro';
import model from './model';

const { TextArea } = Input;
const FormItem = Form.Item;

function MaintenanceRelease({ form, onFormInstance = () => ({}) }) {
  const maintenance = useSelector(state => _.get(state[model.namespace], 'params'));

  const { getFieldDecorator, getFieldsError } = form;

  useEffect(() => {
    if (maintenance) {
      form.setFieldsValue({
        EquipamentoID: maintenance.EquipamentoID,
        Horimetro: maintenance.Horímetro,
      });
    }
    console.log(form);
    console.log(getFieldsError());
  }, []);

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
          })(<SelectEquipamentTag desabled />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('UsuarioID', {
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

const MaintenanceReleaseForm = Form.create({ name: 'MaintenanceRelease' })(MaintenanceRelease);

export default memo(MaintenanceReleaseForm);
