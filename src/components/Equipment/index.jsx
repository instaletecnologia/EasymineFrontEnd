/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/require-default-props */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tooltip } from 'antd';
import _ from 'lodash';

export default class Equipment extends PureComponent {
  static propTypes = {
    TagPrefixo: PropTypes.string.isRequired,
    TagNumero: PropTypes.number.isRequired,
    Direcao: PropTypes.number,
    UltimaLocalizacao: PropTypes.array,
    Img: PropTypes.object,
    Ocorrencia: PropTypes.string,
    Operador: PropTypes.string,
    DataInicio: PropTypes.string,
  };

  static defaultProps = {
    Img: {},
    Ocorrencia: '',
    Operador: '',
    DataInicio: '',
  };

  addDefaultSrc = enabled => ev => {
    ev.target.src = `/images/equipment-CB-${enabled ? 'en' : 'dis'}abled.png`;
  }

  render() {
    const { TagPrefixo, TagNumero, Imagem, UltimaLocalizacao, Img, Ocorrencia, Operador, DataInicio } = this.props;
    const enabled = _.get(UltimaLocalizacao, 'Conectado', false);

    const aditionalProps = _.extend({
      style: {
        transform: `rotate(${_.get(UltimaLocalizacao, 'Direcao', 0)}deg)`,
      },
      src: `/images/equipment-${TagPrefixo}-${enabled ? 'en' : 'dis'}abled.png`,
      width: 20,
    }, Img);

    return (
      <Tooltip
        placement="top"
        title={(<ul>
          <li><strong>{TagPrefixo} {TagNumero}</strong></li>
          <li><strong>Ocorrência: </strong>{Ocorrencia}</li>
          <li><strong>Operador: </strong>{Operador}</li>
          <li><strong>desde </strong>{moment(DataInicio).utc().format('DD/MM/YYYY H:m:s')}</li>
        </ul>)}
      >
        <div style={{
          textAlign: 'center',
        }}>
          <img
            {...aditionalProps}
            onError={this.addDefaultSrc(enabled)}
          />
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              marginTop: 5,
            }}
          >
            <h1>{`${TagPrefixo} ${TagNumero}`}</h1>
          </div>
        </div>
      </Tooltip>
    );
  }
}
