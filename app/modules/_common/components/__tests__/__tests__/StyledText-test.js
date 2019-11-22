import React from "react";
import renderer from "react-test-renderer";

import { CookieText } from "../../CookieText";

it(`renders correctly`, () => {
  const tree = renderer
    .create(<CookieText>Snapshot test!</CookieText>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
