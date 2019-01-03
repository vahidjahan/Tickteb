import React, { Component } from "react";
import { View } from "react-native";
import { Prolar } from "./../../prolar/Prolar";

export class Divider extends Component {
  render() {
    return (
      <View
        style={[
          {
            backgroundColor: this.props.color,
            width: "100%",
            height: this.props.height
          },
          this.props.style
        ]}
      />
    );
  }
}

Divider.defaultProps = {
  color: Prolar.color.black,
  height: Prolar.size.unit * 1
};

export default Divider;
