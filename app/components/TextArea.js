import React, { Component } from "react";
import { TextInput } from "react-native";
import PropTypes from "prop-types";

class TextArea extends Component {
  static propTypes = {
    text: PropTypes.string,
    onTextChange: PropTypes.func
  };
  render() {
    const { text, onTextChange, ...extraProps } = this.props;
    return (
      <TextInput
        {...extraProps}
        style={extraProps.style}
        multiline={true}
        onChangeText={onTextChange}
        value={text}
      />
    );
  }
}
export default TextArea;
