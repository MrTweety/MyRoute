import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MapView from "react-native-maps";

export default class AnimatingPolyline extends Component {
  state = {
    polylinePath: []
  };

  componentDidMount() {
    this.props.shouldAnimation && this.animatePolyline();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.shouldAnimation !== this.props.shouldAnimation) {
      if (this.props.shouldAnimation) {
        this.animatePolyline();
      } else {
        this.animatePolylineStop();
      }
    }
  }

  componentWillUnmount() {
    this.animatePolylineStop();
  }

  animatePolyline = () => {
    this.interval = setInterval(() => this.animatePolylineStart(), 70);
  };

  animatePolylineStop = () => {
    clearInterval(this.interval);
  };
  animatePolylineStart = () => {
    if (!this.props.isPause) {
      if (this.state.polylinePath.length < this.props.coords.length - 1) {
        const coords = this.props.coords;
        const newCoords = coords[this.state.polylinePath.length];
        if (newCoords && newCoords.image) {
          this.props.showImage(newCoords.image);
        }

        const polylinePath = [...this.state.polylinePath, { ...newCoords }];
        this.setState({ polylinePath });
      } else {
        this.setState({ polylinePath: [] });
      }
    }
  };

  render() {
    return (
      <Fragment>
        {this.state.polylinePath.length > 0 && (
          <MapView.Polyline
            coordinates={this.state.polylinePath}
            strokeColor="white"
            strokeWidth={9}
          />
        )}
        {this.state.polylinePath.length > 0 && (
          <MapView.Polyline
            coordinates={this.state.polylinePath}
            strokeColor="#484848"
            strokeWidth={5}
          />
        )}
      </Fragment>
    );
  }
}

AnimatingPolyline.defaultProps = {
  shouldAnimation: false
};

AnimatingPolyline.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.object).isRequired,
  showImage: PropTypes.func,
  shouldAnimation: PropTypes.bool,
  isPause: PropTypes.bool
};
