import React, { Component } from "react";
import { Image, View, Text } from "react-native";
import { Prolar } from "../../prolar/Prolar";

export default class CustomImage extends Component {
  render() {
    const { width, height, style, src, resizeMode } = this.props;

    return (
      <Image
        source={src}
        resizeMode={resizeMode}
        style={[
          {
            width: width * Prolar.size.unit,
            height: height * Prolar.size.unit
          },
          style
        ]}
      />
    );
  }
}

CustomImage.defaultProps = {
  resizeMode: "contain"
};
