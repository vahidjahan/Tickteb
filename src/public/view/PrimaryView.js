import React, { Component } from "react";
import { View, Text } from "react-native";

export default class PrimaryView extends Component {
  render() {
    return (
      <View
        style={[
          {
            backgroundColor: this.props.color,
            flex: this.props.flex,
            flexDirection: this.props.flexDirection,
            alignItems: this.props.alignItems,
            justifyContent: this.props.justifyContent
          },
          this.props.style
        ]}
      >
        {this.props.children}
      </View>
    );
  }
}

PrimaryView.defaultProps = {
  flex: 1,
  color: "white",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start"
};
