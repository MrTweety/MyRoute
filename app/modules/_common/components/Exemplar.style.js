import { StyleSheet } from "react-native";

const theme = {
  PRIMARY_COLOR: "#2aabb8",
  FONT_SIZE_SMALL: 12,
  FONT_SIZE_MEDIUM: 14,
  FONT_SIZE_LARGE: 16,
  FONT_WEIGHT_LIGHT: "200",
  FONT_WEIGHT_MEDIUM: "500",
  FONT_WEIGHT_BOLD: "700",
  BACKGROUND_COLOR_LIGHT: "#ebe9e9",
  CONTAINER_PADDING: 20,
  TEXT_INPUT_PADDING: 10
};

const headingText = {
  fontSize: theme.FONT_SIZE_MEDIUM,
  alignSelf: "flex-start",
  padding: 10,
  fontWeight: theme.FONT_WEIGHT_BOLD
};

const textInput = {
  padding: theme.TEXT_INPUT_PADDING,
  backgroundColor: theme.BACKGROUND_COLOR_LIGHT,
  alignSelf: "stretch"
};

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.CONTAINER_PADDING,
    alignItems: "center"
  },
  titleHeading: {
    ...headingText
  },
  titleTextInput: {
    ...textInput
  },
  textAreaTitle: {
    ...headingText,
    fontWeight: theme.FONT_WEIGHT_LIGHT,
    fontStyle: "italic"
  },
  textArea: {
    ...textInput,
    flex: 1
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center"
  },
  bottomBarWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  },
  saveBtn: {
    padding: 10,
    fontWeight: theme.FONT_WEIGHT_BOLD
  },
  characterCount: {
    padding: 10,
    fontSize: theme.FONT_SIZE_SMALL
  }
});
