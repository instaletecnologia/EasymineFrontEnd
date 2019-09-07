import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';

import { Card, Icon, Row, Col, Spin } from 'antd';

import FlowActivity from '../components/FlowActivity';
import Equipment from '@/components/Equipment';

class Flow extends React.PureComponent {
  timer = null;

  componentDidMount() {
    this.load();
    this.timer = setInterval(() => this.load(), 6500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  load = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'flow/loadData',
    });
  }

  renderActivity = activity => <FlowActivity
    key={activity.FrenteID}
    origin={activity.Origem}
    destinity={activity.Destino}
  />

  renderEquipment = equipment => (
    <Col>
      <Equipment {...equipment} />
    </Col>
  )

  render() {
    const { loading, data } = this.props;

    if (loading && (!_.get(data, 'production', []).length)) return <Spin />;

    return (
      <div>
        <Row gutter={5}>
          <Col xs={12}>
            <Card
              title="Horas ociosas"
            >
              {_.get(data, 'ho', []).map(this.renderEquipment)}
            </Card>
          </Col>
          <Col xs={12}>
            <Card
              title="Manutenção"
            >
              {_.get(data, 'hm', []).map(this.renderEquipment)}
            </Card>
          </Col>
        </Row>
        <Card
          title="Produção"
          style={{ marginTop: 5 }}
        >
          <Row>
            <Col xs={24}>
              {_.get(data, 'production', []).map(this.renderActivity)}
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default connect(({ flow, loading }) => ({
  data: flow.data,
  loading: loading.effects['flow/loadData'],
}))(Flow);
