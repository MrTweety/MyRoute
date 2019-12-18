import React, { Component } from "react";
import SearchScreenList from "../modules/HomeScreenList/container/SearchScreenList";
import { withTranslation } from "react-i18next";

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
    return <SearchScreenList {...this.props} />;
  }
}
export default withTranslation()(SearchScreen);
