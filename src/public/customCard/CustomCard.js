import React, { Component } from "react";
import { View } from "react-native";
import { Prolar } from "../../prolar/Prolar";

export default class CustomCard extends Component {
  render() {
    const {
      bgColor,
      bdColor,
      bdWidth,
      width,
      height,
      radius,
      children,
      style
    } = this.props;
    return (
      <View
        style={[
          {
            backgroundColor: bgColor,
            borderWidth: bdWidth * Prolar.size.unit,
            borderRadius: radius * Prolar.size.unit,
            borderColor: bdColor,
            width: "100%",
            height: height * Prolar.size.unit
          },
          style
        ]}
      >
        {children}
      </View>
    );
  }
}

CustomCard.defaultProps = {
  bgColor: Prolar.color.white,
  bdWidth: 2,
  radius: 10,
  bdColor: Prolar.color.cardBorder,
  height: 60
};
