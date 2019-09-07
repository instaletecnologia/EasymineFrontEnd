import React from 'react';
import _ from 'lodash';
import { connect } from 'dva';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Spin } from 'antd';
import proj4 from 'proj4';

import Map from '@/components/Map';
import Equipment from '@/components/Equipment';
import styles from '../assets/Position.less';

proj4.defs([
  [
    'EPSG:3857',
    '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
  ],
  [
    'EPSG:4326',
    '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'],
  [
    'EPSG:4269',
    '+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees',
  ],
]);

class Position extends React.PureComponent {
  timer = null;

  componentDidMount() {
    this.loadCoords();
    this.loadEquipments();
    this.timer = setInterval(() => this.loadEquipments(), 6500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  loadCoords = async () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'geoprocessPosition/loadCoords',
    });
  }

  loadEquipments = async () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'geoprocessPosition/loadEquipments',
    });
  }

  renderEquipmentMarker = equipment => {
    const lat = _.get(equipment, 'UltimaLocalizacao.Latitude');
    const lng = _.get(equipment, 'UltimaLocalizacao.Longitude');
    const location = [lat, lng]; // proj4('EPSG:4326', 'EPSG:3857', [lat, lng]);

    return (
      <Marker
        latitude={location[0]}
        longitude={location[1]}
        offsetLeft={-20}
        offsetTop={-10}>
        <Equipment {...equipment} />
      </Marker>
    );
  }

  render() {
    const { loadingCoords, coords, equipments } = this.props;

    if (loadingCoords) return <Spin />;

    return (
      <div className={styles.container}>
        <Map
          lat={_.get(coords, 'lat', 0)}
          lng={_.get(coords, 'lng', 0)}
        >
          {equipments.map(this.renderEquipmentMarker)}
        </Map>
      </div>
    );
  }
}

export default connect(({ geoprocessPosition, loading }) => ({
  coords: geoprocessPosition.coords,
  equipments: geoprocessPosition.equipments,
  loadingCoords: loading.effects['geoprocessPosition/loadCoords'],
}))(Position);
