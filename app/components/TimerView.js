import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { getSavedItem, STORAGE_KEY_USER_TIME } from "../services/storage";

export default class TimerView extends Component {
  time = 0;

  initialState = {
    isPause: false,
    startTime: 0,
    timerStart: 0,
    timerNow: 0,
    timerDuration: 0
  };

  state = {
    ...this.initialState
  };
  componentDidMount = async () => {
    try {
      if (!this.props.duration) {
        const startTime = await getSavedItem(STORAGE_KEY_USER_TIME);
        this.setState({ ...startTime });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    try {
      const { isTracking, isPause } = this.props;
      if (prevProps.isTracking !== isTracking) {
        if (isTracking) {
          if (!this.state.startTime) {
            var startTime = new Date().getTime();
            this.setState({
              startTime
            });
            await AsyncStorage.setItem(
              STORAGE_KEY_USER_TIME,
              JSON.stringify({ startTime })
            );
          }
          this.startTimer();
        } else {
          this.stopTimer();
          await AsyncStorage.removeItem(STORAGE_KEY_USER_TIME);
          this.setState({ ...this.initialState });
        }
      }

      if (prevProps.isPause !== isPause) {
        if (isPause) {
          this.stopTimer();
          const timerDuration =
            this.state.timerNow -
            this.state.timerStart +
            this.state.timerDuration;

          this.setState({
            isPause: true,
            timerDuration: timerDuration,
            timerStart: 0,
            timerNow: 0
          });

          await AsyncStorage.setItem(
            STORAGE_KEY_USER_TIME,
            JSON.stringify({
              timerDuration: timerDuration,
              timerStart: 0,
              timerNow: 0,
              startTime: this.state.startTime
            })
          );
        } else {
          this.startTimer();
          this.setState({ isPause: false });
        }
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  startTimer = async () => {
    try {
      if (!this.state.timerStart) {
        var timerStart = new Date().getTime();
        this.setState({
          timerStart: timerStart,
          timerNow: timerStart
        });

        await AsyncStorage.setItem(
          STORAGE_KEY_USER_TIME,
          JSON.stringify({
            timerDuration: this.state.timerDuration,
            timerStart: timerStart,
            timerNow: timerStart,
            startTime: this.state.startTime
          })
        );
      } else {
        this.setState({
          timerNow: timerStart
        });
      }
      this.timer = setInterval(() => {
        this.setState({ timerNow: new Date().getTime() });
      }, 1000);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  renderTime = duration => {
    var diff = duration;
    if (duration === undefined) diff = 0;

    const hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / 1000 / 60);
    diff -= minutes * 1000 * 60;
    const seconds = Math.floor(diff / 1000);

    return (
      <Text style={this.props.styleText}>
        {(hours <= 9 ? "0" : "") +
          hours +
          ":" +
          (minutes <= 9 ? "0" : "") +
          minutes +
          ":" +
          (seconds <= 9 ? "0" : "") +
          seconds}
      </Text>
    );
  };

  render() {
    this.time =
      this.props.duration ||
      this.state.timerNow - this.state.timerStart + this.state.timerDuration;
    if (isNaN(this.time)) this.time = 0;

    return <View>{this.renderTime(this.time)}</View>;
  }
}

TimerView.defaultProps = {
  styleText: null,
  duration: 0
};

TimerView.propTypes = {
  duration: PropTypes.number,
  styleText: Text.propTypes.style,
  isPause: PropTypes.bool,
  isTracking: PropTypes.bool
};
