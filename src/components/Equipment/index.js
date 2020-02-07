/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/require-default-props */
import React, { memo } from 'react';
import moment from 'moment';
import { Tooltip } from 'antd';
import _ from 'lodash';

function Equipment({
  TagPrefixo,
  TagNumero,
  // Imagem,
  UltimaLocalizacao,
  Img,
  Ocorrencia,
  Operador,
  DataInicio,
  Online,
  Degree,
  KM = 0,
}) {
  const aditionalProps = _.extend(
    {
      style: {
        transform: `rotate(${Degree || _.get(UltimaLocalizacao, 'Direcao', 0)}deg)`,
        '-webkit-animation': 'spin 4s linear infinite',
        animation: 'spin 4s linear infinite',
      },
      src: `/images/equipment-${TagPrefixo}-${Online ? 'en' : 'dis'}abled.png`,
      width: 20,
    },
    Img,
  );

  function addDefaultSrc(ev) {
    ev.target.src = `/images/equipment-CB-${Online ? 'en' : 'dis'}abled.png`;
  }

  return (
    <Tooltip
      placement="top"
      title={
        <ul>
          <li>
            <strong>
              {TagPrefixo} {TagNumero}
            </strong>
          </li>
          <li>
            <strong>Ocorrência: </strong>
            {Ocorrencia}
          </li>
          <li>
            <strong>Operador: </strong>
            {Operador}
          </li>
          <li>
            <strong>desde </strong>
            {moment(DataInicio)
              .utc()
              .format('DD/MM/YYYY H:m:s')}
          </li>
        </ul>
      }
    >
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <img {...aditionalProps} onError={addDefaultSrc} />
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: 5,
            marginTop: 5,
          }}
        >
          <h1 style={{ margin: 0 }}>{`${TagPrefixo} ${TagNumero}`}</h1>
          {_.ceil(KM, 0)} km/h
        </div>
      </div>
    </Tooltip>
  );
}

const isEqual = (prev, next) =>
  !(
    prev.Online !== next.Online ||
    prev.Degree !== next.Degree ||
    prev.KM !== next.KM ||
    prev.Latitude !== next.Latitude
  );

export default memo(Equipment, isEqual);
