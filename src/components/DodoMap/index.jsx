import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import PropTypes from 'prop-types';

import { MAP_API_URL } from 'constants/misc';

const GoogleMapWrapper = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 1.3521, lng: 103.8198 }}>
      <Marker position={{ lat: 1.3521, lng: 103.8198 }} />
    </GoogleMap>
  )),
);

export default class DodoMap extends React.Component {
  static propTypes = {
    googleMapURL: PropTypes.string,
    loadingElement: PropTypes.element,
    containerElement: PropTypes.element,
    mapElement: PropTypes.element,
  };
  static defaultProps = {
    googleMapURL: MAP_API_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `370px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  };

  render() {
    return <GoogleMapWrapper {...this.props} />;
  }
}
