import React, { memo, useEffect, useState } from 'react';
import { PageHeader, Badge, Typography, Row, Col, Statistic, Icon } from 'antd';

const { Text } = Typography;
const { Countdown } = Statistic;

function Header({ data }) {
  const [vdata, setVdata] = useState([]);
  const [DataEquipamentClassification, setDataEquipamentClassification] = useState([]);

  useEffect(() => {
    setVdata(data);
    setQtdEquipamentClassification();
  }, [data]);

  const deadline = Date.now() + 60000;

  function setQtdEquipamentClassification() {
    const mediaTypes = vdata
      .map(dataItem => dataItem.EquipamentoClassificacaoDescricao)
      .filter((mediaType, index, array) => array.indexOf(mediaType) === index);

    const counts = mediaTypes.map(mediaType => ({
      description: mediaType,
      count: vdata.filter(item => item.EquipamentoClassificacaoDescricao === mediaType).length,
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
    <Badge count={count} style={{ backgroundColor: bkColor, color: '#fff', borderColor: bkColor }}>
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
