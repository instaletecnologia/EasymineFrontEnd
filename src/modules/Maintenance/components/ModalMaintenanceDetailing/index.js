import React, { memo, useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import _ from 'lodash';

import SelectEquipamentTag from '@/components/Equipments/SelectEquipamentTag';
import SelectMaintenanceFailureClass from '@/components/Maintenances/SelectMaintenanceFailureClass';
import SelectMaintenanceItem from '@/components/Maintenances/SelectMaintenanceItem';
import SelectUserMechanical from '@/components/Maintenances/SelectUserMechanical';
import SelectMaintenanceReason from '@/components/Maintenances/SelectMaintenanceReason';
import SelectMaintenanceOrder from '@/components/Maintenances/SelectMaintenanceOrder';

import { add } from './services/api';

import model from './model';

const { TextArea } = Input;
const FormItem = Form.Item;

function MaintenanceDetailingForm({ form }) {
  const dispatch = useDispatch();
  const visible = useSelector(state => state[model.namespace].visible);
  const [loading, setLoading] = useState(false);

  const maintenance = useSelector(state => _.get(state[model.namespace], 'params', {}));
  const {
    validateFields,
    resetFields,
    getFieldDecorator,
    getFieldsError,
    setFieldsValue,
    getFieldValue,
  } = form;
  const ClasseFalhaID = getFieldValue('ClasseFalhaID');
  const controleHoraID = _.get(maintenance, 'ControleHoraID');

  useEffect(() => {
    if (visible) {
      setFieldsValue({
        EquipamentoID: _.get(maintenance, 'EquipamentoID'),
        Horimetro: _.get(maintenance, 'Horímetro'),
        ControleHoraID: _.get(maintenance, 'ControleHoraID'),
      });
    }
  }, [visible]);
  function close() {
    setLoading(false);
    resetFields();
    dispatch({
      type: 'MaintenanceMonitoring/fetch',
    });
    dispatch(closeMaintenanceDetailing());
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
    // <div className={classNames(classNames, styles.div)}>
    <Modal
      width={420}
      visible={visible}
      title={`${formatMessage({ id: 'maintenance.breakdown' })} - ${controleHoraID}`}
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
              EquipamentoModeloID={_.get(maintenance, 'EquipamentoModeloID')}
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
              EquipamentoID={_.get(maintenance, 'EquipamentoID')}
              idCategoriasTempo={_.get(maintenance, 'idCategoriasTempo')}
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
          })(<TextArea maxLength={255} placeholder="Informe uma observação..." />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('ControleHoraID', {
            rules: [
              {
                required: true,
              },
            ],
          })(<></>)}
        </FormItem>
      </Form>
    </Modal>
  );
}

const ModalMaintenanceDetailing = Form.create({ name: 'MaintenanceDetailingForm' })(
  MaintenanceDetailingForm,
);

export default memo(ModalMaintenanceDetailing);

export function openMaintenanceDetailing(maintenance = undefined) {
  return {
    type: `${model.namespace}/open`,
    payload: maintenance,
  };
}

export function closeMaintenanceDetailing() {
  return {
    type: `${model.namespace}/close`,
  };
}
