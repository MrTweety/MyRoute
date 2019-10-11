import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setTitle, setText } from "../actions/exemplar";
import Exemplar from "../components/Exemplar";

class ExemplarPage extends Component {
  render() {
    const { setTitle, setText, title, text } = this.props;
    return (
      <Exemplar
        setTitle={setTitle}
        setText={setText}
        title={title}
        text={text}
      />
    );
  }
}

ExemplarPage.propTypes = {
  setTitle: PropTypes.func,
  setText: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string
};

const mapStateToProps = state => ({
  title: state.content.title,
  text: state.content.text
});

const mapDispatchToProps = dispatch => ({
  setTitle: title => dispatch(setTitle(title)),
  setText: text => dispatch(setText(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExemplarPage);
