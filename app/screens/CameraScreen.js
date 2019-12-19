import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import MyCamera from "../modules/_common/components/Camera/Camera";

class CameraScreen extends Component {
  render() {
    return (
      <>
        <MyCamera />
      </>
    );
  }
}

export default withTranslation()(CameraScreen);
