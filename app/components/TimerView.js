import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

//nie używamy biblioteki "moment"

export default TimerView = ({ duration, styleText }) => {
  var diff = duration;
  if (duration === undefined) diff = 0;

  const hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / 1000 / 60);
  diff -= minutes * 1000 * 60;
  const seconds = Math.floor(diff / 1000);

  return (
    <Text style={styleText}>
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

TimerView.defaultProps = {
  styleText: null
};

TimerView.propTypes = {
  duration: PropTypes.number.isRequired,
  styleText: Text.propTypes.style
};
