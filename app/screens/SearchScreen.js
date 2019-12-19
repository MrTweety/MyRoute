import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import Exemplar from "../modules/_common/container/Exemplar";

class SearchScreen extends Component {
  componentDidMount() {
    this.updateTitle();
  }

  componentDidUpdate() {
    this.updateTitle();
  }

  updateTitle() {
    const { getParam, setParams } = this.props.navigation;
    const { t } = this.props;
    const prevTitle = getParam("title");
    const newTitle = t("common.search");

    if (prevTitle !== newTitle) {
      setParams({ title: newTitle });
    }
  }

  render() {
    return <Exemplar />;
  }
}

export default withTranslation()(SearchScreen);
