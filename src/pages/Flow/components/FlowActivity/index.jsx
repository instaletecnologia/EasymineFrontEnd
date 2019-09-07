/* eslint-disable no-plusplus */
import React, { PureComponent } from 'react';
import _ from 'lodash';

import { Card, Tag, Row, Col, Icon } from 'antd';
import Equipment from '@/components/Equipment';

const { CheckableTag } = Tag;

const filterWeight = weight => equipment => {
  const value = equipment.Peso - 1;
  const equipmentWeight = value > -1 ? weight : 0;
  return weight === equipmentWeight;
}

export default class FlowActivity extends PureComponent {
  renderWeight = originOrDestinity => (weight, i, weights) => {
    const maxColumns = 24;
    const col = maxColumns / (_.get(this.props, `${originOrDestinity}.Pesos`, []).length);

    let icon = 'arrow-right';
    let direction = 90;
    let bg = false;

    if (originOrDestinity === 'origin') {
      if (i === 0) bg = true;
      else {
        icon = 'arrow-left';
        direction = -90;
      }
    }

    if (originOrDestinity === 'destinity' && i === (weights.length - 1)) {
      icon = 'arrow-left';
      direction = -90;
      bg = true;
    }

    return (
      <Col xs={col}>
        <div style={{ alignItems: 'center', textAlign: 'center', position: 'relative', marginLeft: 5, marginTop: 5 }}>
          {bg && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: 25,
              backgroundColor: 'green',
              opacity: 0.2,
            }}></div>
          )}
          <Icon type={icon} />
          {
            weight.Equipamentos.map(this.renderEquipment(originOrDestinity, direction))
          }
        </div>
      </Col>
    )
  };

  renderEquipment = (originOrDestinity, direction) => equipmentId => (<Equipment
    {..._.get(this.props, `${originOrDestinity}.Equipamentos.${equipmentId}`, {})}
    Direcao={direction}
  />);

  render() {
    const { origin, destinity } = this.props;

    return (
      <div
        style={{ width: '100%', marginTop: 16 }}
        bodyStyle={{ padding: 10 }}
      >
        <Card
          title={origin.Nome}
          style={{ width: '100%', marginTop: 10 }}
        >
          <Row gutter={1}>{origin.Pesos.map(this.renderWeight('origin'))}</Row>
        </Card>
        <Card
          title={destinity.Nome}
          style={{ width: '100%', marginTop: 10 }}
          headStyle={{ textAlign: 'right' }}
        >
          <Row gutter={1}>{destinity.Pesos.map(this.renderWeight('destinity'))}</Row>
        </Card>
      </div>
    );
  }
}
