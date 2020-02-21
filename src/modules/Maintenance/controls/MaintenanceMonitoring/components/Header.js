import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'dva';
import { PageHeader, Badge, Typography, Row, Col, Statistic, Icon } from 'antd';

const { Text } = Typography;
const { Countdown } = Statistic;

function Header() {
  const data = useSelector(state => state.MaintenanceMonitoring.data);
  const [DataEquipamentClassification, setDataEquipamentClassification] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setQtdEquipamentClassification();
    } else {
      setDataEquipamentClassification([]);
    }
  }, [data]);

  const deadline = Date.now() + 60000;

  function setQtdEquipamentClassification() {
    const equipmentClassifications = data
      .map(dataItem => dataItem.EquipamentoClassificacaoDescricao)
      .filter(
        (equipmentClassification, index, array) => array.indexOf(equipmentClassification) === index,
      );

    const counts = equipmentClassifications.map(equipmentClassification => ({
      id: equipmentClassification.EquipamentoClassificaoID,
      description: equipmentClassification,
      count: data.filter(item => item.EquipamentoClassificacaoDescricao === equipmentClassification)
        .length,
    }));

    setDataEquipamentClassification(counts);
  }

  const SpinTimeReload = () => (
    <Row>
      <Col span={8}>
        <Icon type="clock-circle" theme="filled" />
      </Col>
      <Col span={8}>
        <Countdown
          valueStyle={{ fontSize: 10, fontFamily: Blob, fontWeight: 'bold' }}
          value={deadline}
          Text="Segundos"
          format="ss"
        />
      </Col>
    </Row>
  );

  const BadgeCountEquipament = ({ description, count, bkColor }) => (
    <Badge
      key={count}
      count={count}
      style={{ backgroundColor: bkColor, color: '#fff', borderColor: bkColor }}
    >
      <Text strong style={{ margin: '12px', fontSize: 11, fontWeight: 'bold' }}>
        {description}
      </Text>
    </Badge>
  );

  return (
    <PageHeader style={{ borderColor: '#000' }}>
      <Row>
        <Col xs={2} md={1}>
          <SpinTimeReload></SpinTimeReload>
        </Col>
        <Col>
          {DataEquipamentClassification.map(item => (
            <BadgeCountEquipament
              key={item.count}
              description={item.description}
              count={item.count}
              bkColor={item.count < 11 ? '#87d068' : 'red'}
            />
          ))}
        </Col>
      </Row>
    </PageHeader>
  );
}

export default memo(Header);
