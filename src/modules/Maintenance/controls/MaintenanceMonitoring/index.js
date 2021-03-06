import { Row, Col } from 'antd';
import React, { memo, useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import ListMaintenanceEquipament from '@/modules/Maintenance/controls/MaintenanceMonitoring/components/ListMaintenanceEquipament';
import Header from './components/Header';

import ModalMaintenance from '@/modules/Maintenance/components/ModalMaintenance';
import ModalMaintenanceDetailing from '@/modules/Maintenance/components/ModalMaintenanceDetailing';
import ModalMaintenanceRelease from '@/modules/Maintenance/components/ModalMaintenanceRelease';

import styles from './index.less';

function MaintenanceMonitoring() {
  const data = useSelector(state => state.MaintenanceMonitoring.data, []);
  const [dataHMC, setDataHMC] = useState([]);
  const [dataHMP, setDataHMP] = useState([]);

  let timer = null;
  const dispatch = useDispatch();

  async function loadData() {
    dispatch({
      type: 'MaintenanceMonitoring/fetch',
    });
  }

  useEffect(() => {
    setDataHMC(data.filter(el => el.idCategoriasTempo === 7 || el.ParentID === 7));
    setDataHMP(data.filter(el => el.idCategoriasTempo === 6 || el.ParentID === 6));
  }, [data]);

  useEffect(() => {
    timer = setInterval(() => loadData(), 60000);
    loadData();
    return function destroy() {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.main}>
      <Header />
      <Row>
        <Col xs={12}>
          <ListMaintenanceEquipament
            maintenanceType="HMC"
            maintenanceTypeDescription={formatMessage({ id: 'maintenance.corretive' })}
            // color="#DD7875"
            color="#9b2a23"
            data={dataHMC}
          />
        </Col>
        <Col xs={12}>
          <ListMaintenanceEquipament
            maintenanceType="HMP"
            maintenanceTypeDescription={formatMessage({ id: 'maintenance.preventive' })}
            color=""
            data={dataHMP}
          />
        </Col>
      </Row>
      <ModalMaintenance />
      <ModalMaintenanceDetailing />
      <ModalMaintenanceRelease />
    </div>
  );
}

export default memo(MaintenanceMonitoring);
