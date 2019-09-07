import React, { Component } from 'react';
import Dimensions from 'react-dimensions';
import PropTypes from 'prop-types';
import MapGL from 'react-map-gl';

const TOKEN = 'pk.eyJ1IjoiYnJ1bm9nb25uY2FsdmVzIiwiYSI6ImNqa3R3cGU1MzAwc2kzcHFrcGRlYmc0NXAifQ.LoA3kbY8I5BEbqr9kOGyWA';

class Map extends Component {
  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: props.lat,
        longitude: props.lng,
        zoom: props.zoom || 12.8,
        bearing: 0,
        pitch: 0,
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    const { lat, lng } = this.props;
    if (nextProps.lat !== lat || nextProps.lng !== lng) this.updateLatLng(nextProps.lat, nextProps.lng);
  }

  updateLatLng = (lat, lng) => {
    const { viewport } = this.state;

    const newData = viewport;
    newData.latitude = lat;
    newData.longitude = lng;

    this.setState({ viewport });
  }

  render() {
    const { containerWidth, containerHeight, children } = this.props;
    const { viewport } = this.state;
    return (
      <MapGL
        style={{ position: 'absolute', width: '100%', top: 0, left: 0 }}
        width={containerWidth}
        height={containerHeight}
        {...this.state.viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={viewport => this.setState({ viewport })}
      >
        {children}
      </MapGL>
    );
  }
}

const DimensionedMap = Dimensions()(Map);

export default DimensionedMap;
