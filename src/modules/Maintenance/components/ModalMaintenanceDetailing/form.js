import React, { memo, useEffect } from 'react';
import { Input, Form } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { useSelector } from 'dva';
import _ from 'lodash';

import SelectEquipamentTag from '@/components/Equipments/SelectEquipamentTag';
import SelectMaintenanceFailureClass from '@/components/Maintenances/SelectMaintenanceFailureClass';
import SelectMaintenanceItem from '@/components/Maintenances/SelectMaintenanceItem';
import SelectUserMechanical from '@/components/Maintenances/SelectUserMechanical';
import SelectMaintenanceReason from '@/components/Maintenances/SelectMaintenanceReason';
import SelectMaintenanceOrder from '@/components/Maintenances/SelectMaintenanceOrder';

import model from './model';

const { TextArea } = Input;
const FormItem = Form.Item;

function MaintenanceDetailing({ form, onFormInstance = () => ({}) }) {
  const maintenance = useSelector(state => _.get(state[model.namespace], 'params'));
  const { getFieldDecorator } = form;

  useEffect(() => {
    if (maintenance) {
      form.setFieldsValue({
        EquipamentoID: maintenance.EquipamentoID,
        Horimetro: maintenance.Horímetro,
      });
    }
  }, []);

  const ClasseFalhaID = form.getFieldValue('ClasseFalhaID');

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
          {getFieldDecorator('ClasseFalhaID', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'maintenance.placeholder.FailureClass' }),
              },
            ],
          })(<SelectMaintenanceFailureClass maintenance={maintenance} />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('ManutencaoItenID', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'maintenance.placeholder.FailureClass' }),
              },
            ],
          })(
            <SelectMaintenanceItem
              EquipamentoModeloID={maintenance.EquipamentoModeloID}
              ClasseFalhaID={ClasseFalhaID}
            />,
          )}
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
          {getFieldDecorator('MotivoManutencaoID', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'user.mechanical.placeholder' }),
              },
            ],
          })(<SelectMaintenanceReason />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('OrdemManutencaoID', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'maintenance.select.Order' }),
              },
            ],
          })(
            <SelectMaintenanceOrder
              EquipamentoID={maintenance.EquipamentoID}
              idCategoriasTempo={maintenance.idCategoriasTempo}
            />,
          )}
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

const MaintenanceDetailingForm = Form.create({ name: 'MaintenanceDetailing' })(
  MaintenanceDetailing,
);

export default memo(MaintenanceDetailingForm);
