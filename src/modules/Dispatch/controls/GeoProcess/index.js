import React, { memo, useEffect, useState } from 'react';
import _ from 'lodash';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Spin } from 'antd';
import proj4 from 'proj4';

import Map from '@/components/Map';
import Equipment from '@/components/Equipment';
import styles from './assets/Position.less';

import { getCoords, getEquipments } from './services/api';

proj4.defs([
  [
    'EPSG:3857',
    '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
  ],
  ['EPSG:4326', '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'],
  [
    'EPSG:4269',
    '+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees',
  ],
]);

function Position() {
  const [loading, setLoading] = useState(true);
  const [mapCoords, setMapCoords] = useState({ lat: 0, lng: 0 });
  const [equipments, setEquipments] = useState({});

  const renderEquipmentMarker = equipmentId => {
    const equipment = equipments[equipmentId];
    const lat = _.get(equipment, 'UltimaLocalizacao.Latitude');
    const lng = _.get(equipment, 'UltimaLocalizacao.Longitude');

    return (
      <Marker latitude={lat} longitude={lng} offsetLeft={-20} offsetTop={-10}>
        <Equipment {...equipment} />
      </Marker>
    );
  };

  async function loadCoords() {
    setLoading(true);

    const coordsResult = await getCoords();
    setMapCoords(coordsResult);

    setLoading(false);
  }

  async function loadEquipments() {
    const equipmentsResult = await getEquipments();
    setEquipments(equipmentsResult || {});
  }

  useEffect(() => {
    loadCoords();
    loadEquipments();
  }, []);

  if (loading) return <Spin />;

  return (
    <div className={styles.container}>
      <Map lat={mapCoords.lat} lng={mapCoords.lng}>
        {Object.keys(equipments).map(renderEquipmentMarker)}
      </Map>
    </div>
  );
}

export default memo(Position);
