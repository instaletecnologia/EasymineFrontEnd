import { Row, Col } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import ListMaintenanceEquipament from '@/pages/MaintenanceMonitoring/components/ListMaintenanceEquipament';
import Header from './components/Header';

function MaintenanceMonitoring() {
  const data = useSelector(state => state.MaintenanceMonitoring.data);
  const [dataHMC, setDataHMC] = useState([]);
  const [dataHMP, setDataHMP] = useState([]);

  // const dataEquipamentClassification = [
  //  {
  //    "description": "Transporte",
  //    "count": 6,
  //  },
  //  {
  //    "description": "Apoio",
  //    "count": 16,
  //  },
  //  {
  //    "description": "Carga",
  //    "count": 20,
  //  },
  //
  // ];

  let timer = null;
  const dispatch = useDispatch();

  function loadData() {
    dispatch({
      type: 'MaintenanceMonitoring/fetch',
    });
  }

  useEffect(() => {
    timer = setInterval(() => loadData(), 60000);
    loadData();
    return function destroy() {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (data) {
      setDataHMC(data.filter(el => el.idCategoriasTempo === 6 || el.ParentID === 3));
      setDataHMP(data.filter(el => el.idCategoriasTempo === 7 || el.ParentID === 7));
    }
  }, [data]);

  return (
    <div>
      <Header data={data} />
      <Row>
        <Col xs={12}>
          <ListMaintenanceEquipament
            maintenanceType={formatMessage({ id: 'maintenance.corretive' })}
            color="#DD7875"
            data={dataHMC}
          />
        </Col>
        <Col xs={12}>
          <ListMaintenanceEquipament
            maintenanceType={formatMessage({ id: 'maintenance.preventive' })}
            color=""
            data={dataHMP}
          />
        </Col>
      </Row>
    </div>
  );
}

export default memo(MaintenanceMonitoring);