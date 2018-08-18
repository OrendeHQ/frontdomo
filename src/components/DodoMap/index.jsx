import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import PropTypes from 'prop-types';

import { MAP_API_URL } from 'constants/misc';
import robotIcon from 'assets/robot.svg';

const markerType = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
});

const gMapDefaultOptions = {
  fullscreenControl: false,
};

class DoogleMap extends React.Component {
  state = {
    bound: null,
    direction: null,
    destination: null,
  };
  static propTypes = {
    markerPosition: markerType.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    const firstTimeDestination =
      !prevState.destination && this.state.destination;
    const newDestination =
      prevState.destination &&
      this.state.destination &&
      (prevState.destination.lat !== this.state.destination.lat ||
        prevState.destination.lng !== this.state.destination.lng);

    if (firstTimeDestination || newDestination) {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new google.maps.LatLng(
            this.props.markerPosition.lat,
            this.props.markerPosition.lng,
          ),
          destination: new google.maps.LatLng(
            this.state.destination.lat,
            this.state.destination.lng,
          ),
          travelMode: google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              direction: result,
            });
          } else {
            console.error(`error fetching directions ${result}`); // eslint-disable-line no-console
          }
        },
      );
    }
  }

  onMapMounted = ref => {
    this.map = ref;
  };

  onBoundsChanged = () => {
    this.setState({
      bounds: this.map.getBounds(),
      center: this.map.getCenter(),
    });
  };

  onSearchBoxMounted = ref => {
    this.searchBox = ref;
  };

  onPlacesChanged = () => {
    const places = this.searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    const place = places[0];
    if (place.geometry.viewport) {
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }

    this.setState({
      destination: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      },
    });
    this.map.fitBounds(bounds);
  };

  render() {
    return (
      <GoogleMap
        ref={this.onMapMounted}
        onBoundsChanged={this.onBoundsChanged}
        defaultZoom={12}
        defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
        center={this.state.direction ? null : this.props.markerPosition}
        defaultOptions={gMapDefaultOptions}
      >
        <SearchBox
          ref={this.onSearchBoxMounted}
          bounds={this.state.bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={this.onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `10px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </SearchBox>
        <Marker
          position={this.props.markerPosition}
          icon={{
            url: robotIcon,
            scaledSize: new google.maps.Size(31, 43),
          }}
        />
        {this.state.direction && (
          <>
            <DirectionsRenderer
              directions={this.state.direction}
              defaultOptions={{ suppressMarkers: true }}
            />
            <Marker position={this.state.destination} />
          </>
        )}
      </GoogleMap>
    );
  }
}

const GoogleMapWrapper = withScriptjs(
  withGoogleMap(props => <DoogleMap {...props} />),
);

export default class DodoMap extends React.Component {
  static propTypes = {
    googleMapURL: PropTypes.string,
    loadingElement: PropTypes.element,
    containerElement: PropTypes.element,
    mapElement: PropTypes.element,
    markerPosition: markerType.isRequired,
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
