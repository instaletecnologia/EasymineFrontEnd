import React, { memo, useState, useEffect } from 'react';
import { Button, Modal, Form, Input, notification } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import _ from 'lodash';
import moment from 'moment';

import SelectEquipamentTag from '@/components/Equipments/SelectEquipamentTag';
import SelectMaintenanceFailureClass from '@/components/Maintenances/SelectMaintenanceFailureClass';
import SelectMaintenanceItem from '@/components/Maintenances/SelectMaintenanceItem';
import SelectUserMechanical from '@/components/Maintenances/SelectUserMechanical';
import SelectMaintenanceReason from '@/components/Maintenances/SelectMaintenanceReason';
import SelectMaintenanceOrder from '@/components/Maintenances/SelectMaintenanceOrder';
import InputNumberPlate from '@/components/Users/InputNumberPlate';
import DatePickerAndTime from '@/components/DatePicker/DatePickerAndTime';

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

  const classeFalhaID = getFieldValue('ClasseFalhaID');
  const equipamentoModeloID = _.get(maintenance, 'EquipamentoModeloID');
  const controleHoraID = _.get(maintenance, 'ControleHoraID');
  const dateStart = _.get(maintenance, 'DataHoraInicio');

  useEffect(() => {
    if (visible) {
      setFieldsValue({
        EquipamentoID: _.get(maintenance, 'EquipamentoID'),
        Horimetro: _.get(maintenance, 'Horímetro'),
        ControleHoraID: _.get(maintenance, 'ControleHoraID'),
        OcorrenciaID: _.get(maintenance, 'OcorrenciaID'),
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

  const openNotificationWithIcon = (type, returnMenssage, returnDescription) => {
    notification[type]({
      message: returnMenssage,
      description: returnDescription,
    });
  };

  async function isDateValidet(value) {
    const dateNow = moment().add(1, 'seconds');
    const newValue = moment().add(-1, 'seconds');

    if (moment(newValue).isAfter(dateNow)) {
      openNotificationWithIcon(
        'error',
        formatMessage({ id: 'date.notification.notAllowed' }),
        formatMessage({ id: 'date.validet.dateGreaterCurrentDate' }),
      );
      console.log('value', newValue);
      console.log('dateNow', dateNow);
      console.log('moment(value).isAfter(dateNow)', moment(newValue).isAfter(dateNow));
      return false;
    }
    if (moment(newValue).isSameOrBefore(moment(dateStart))) {
      openNotificationWithIcon(
        'error',
        formatMessage({ id: 'date.notification.notAllowed' }),
        formatMessage({ id: 'date.validet.dateLessStartMaintence' }),
      );
      console.log('value', newValue);
      console.log('dateNow', dateStart);
      console.log(
        'moment(value).isSameOrBefore(moment(dateStart))',
        moment(newValue).isSameOrBefore(moment(dateStart)),
      );
      return false;
    }
    return true;
  }

  async function onSubmit() {
    setLoading(true);
    validateFields(async (err, values) => {
      if (err) {
        setLoading(false);
        getFieldsError();
        return;
      }
      const dataHora = _.get(values, 'DataHora');
      console.log('data hora', dataHora);
      if ((await isDateValidet(dataHora)) === false) {
        setLoading(false);
        getFieldsError();
        return;
      }

      const newValues = [
        {
          ClasseFalhaID: _.get(values, 'ClasseFalhaID'),
          EquipamentoID: _.get(values, 'EquipamentoID'),
          UsuarioID: _.get(values, 'UsuarioID'),
          ManutencaoItenID: _.get(values, 'ManutencaoItenID'),
          UsuarioMecanicoID: _.get(values, 'UsuarioMecanicoID'),
          MotivoManutencaoID: _.get(values, 'MotivoManutencaoID'),
          OrdemManutencaoID: _.get(values, 'OrdemManutencaoID'),
          Observacao: _.get(values, 'Observacao'),
          ControleHoraID: _.get(maintenance, 'ControleHoraID'),
          OcorrenciaID: _.get(maintenance, 'OcorrenciaID'),
        },
      ];
      console.log(_.get(values, 'DataHora'));
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
          {getFieldDecorator('DataHora', {
            initialValue: moment(dateStart),
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'date.title' }),
              },
            ],
          })(<DatePickerAndTime />)}
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
              EquipamentoModeloID={equipamentoModeloID}
              ClasseFalhaID={classeFalhaID}
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

        <FormItem initialValue={null}>
          {getFieldDecorator('OrdemManutencaoID', {
            rules: [
              {
                required: false,
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

        <FormItem initialValue={null}>
          {getFieldDecorator('Observacao', {
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

        <FormItem>
          {getFieldDecorator('OcorrenciaID', {
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
