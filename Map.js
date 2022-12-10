import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { FaAngleDoubleDown } from "react-icons/fa";

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 48.82479,
      lng: 2.27991,
    },
    zoom: 18,
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "50vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyABQ38VsiVGPFgEw2smkK-e6FnZXSWd1fs" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <FaAngleDoubleDown classname="marker" lat={48.82479} lng={2.27991} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
