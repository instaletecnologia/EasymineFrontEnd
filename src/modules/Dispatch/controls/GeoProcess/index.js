/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-use-before-define */
import React, { memo, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { Marker } from 'react-map-gl';
import { Spin, notification } from 'antd';
import proj4 from 'proj4';

import Map from '@/components/Map';
import Equipment from '@/components/Equipment';
import styles from './assets/Position.less';

import socket, { EVENTS } from '@/services/socket';
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
  const [equipments, setEquipments] = useState([]);

  const renderEquipmentMarker = equipment => {
    const lat = equipment.Latitude || _.get(equipment, 'UltimaLocalizacao.Latitude', mapCoords.lat);
    const lng =
      equipment.Longitude || _.get(equipment, 'UltimaLocalizacao.Longitude', mapCoords.lng);
    const km = equipment.KM || 0;

    return (
      <Marker
        key={`marker-${equipment.EquipamentoID}`}
        latitude={lat}
        longitude={lng}
        km={km}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <Equipment {...equipment} />
      </Marker>
    );
  };

  async function loadCoords() {
    const coordsResult = await getCoords();
    setMapCoords(coordsResult);
  }

  async function loadEquipments() {
    const equipmentsResult = await getEquipments();
    const list = Object.keys(equipmentsResult).map(k => equipmentsResult[k]);
    setEquipments(list);
  }

  async function load() {
    setLoading(true);
    await Promise.all([loadCoords(), loadEquipments()]);
    setLoading(false);
  }

  function onEquipmentConnection({ EquipamentoID, Online }) {
    console.log('onEquipmentConnection');
    setEquipments(prevEquipments => {
      const i = _.findIndex(prevEquipments, { EquipamentoID: parseInt(EquipamentoID, 0) });
      let newEquipments = prevEquipments;
      if (i !== -1) {
        newEquipments[i].Online = Online;
        const message = `${newEquipments[i].TagPrefixo} ${newEquipments[i].TagNumero}`;
        const description = `Equipamento ${Online ? 'ONLINE' : 'OFFLINE'}`;
        const data = { message, description };

        if (Online) notification.success(data);
        else notification.warning(data);

        return [...newEquipments];
      }
      return newEquipments;
    });
  }

  function onEquipmentCompass({ EquipamentoID, degree }) {
    console.log('onEquipmentCompass');
    setEquipments(prevEquipments => {
      const i = _.findIndex(prevEquipments, { EquipamentoID: parseInt(EquipamentoID, 0) });
      let newEquipments = prevEquipments;
      if (i !== -1) newEquipments[i].Degree = degree;
      return [...newEquipments];
    });
  }

  function onEquipmentPosition({ EquipamentoID, Latitude, Longitude, KM }) {
    console.log('onEquipmentPosition');
    setEquipments(prevEquipments => {
      const i = _.findIndex(prevEquipments, { EquipamentoID: parseInt(EquipamentoID, 0) });
      let newEquipments = prevEquipments;
      if (i !== -1) {
        newEquipments[i].Latitude = Latitude;
        newEquipments[i].Longitude = Longitude;
        newEquipments[i].KM = KM;
        return [...newEquipments];
      }
      return newEquipments;
    });
  }

  function onRefresh(data) {
    console.log('onEquipmentRefreshAll');
    setEquipments(() => [...Object.keys(data).map(k => data[k])]);
    notification.success({
      message: 'Monitorando equipamentos',
    });
  }

  useEffect(() => {
    load().then(() => {
      socket.on(EVENTS.ON_EQUIPMENT_CONNECTION, onEquipmentConnection);
      socket.on(EVENTS.ON_EQUIPMENT_COMPASS, onEquipmentCompass);
      socket.on(EVENTS.ON_EQUIPMENT_POSITION, onEquipmentPosition);
      socket.on(EVENTS.ON_EQUIPMENT_REFRESH_ALL, onRefresh);
    });

    /* return () => {
      socket.off(EVENTS.ON_EQUIPMENT_CONNECTION)
      socket.off(EVENTS.ON_EQUIPMENT_COMPASS)
      socket.off(EVENTS.ON_EQUIPMENT_POSITION)
      socket.off(EVENTS.ON_EQUIPMENT_REFRESH_ALL)
    } */
  }, []);

  if (loading) return <Spin />;

  return (
    <div className={styles.container}>
      <Map lat={mapCoords.lat} lng={mapCoords.lng}>
        {equipments.map(renderEquipmentMarker)}
      </Map>
    </div>
  );
}

export default memo(Position);
