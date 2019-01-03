import React, { Component } from "react";
import { ProgressBarAndroid, StyleSheet, View } from "react-native";
import { width } from "./../style/Dimension";

export default class ProgressBar extends Component {
  render() {
    return (
      <View
        style={{
          marginTop: -9,
          scaleX: this.props.direction,
          width: width
        }}
      >
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={this.props.indeterminate}
          progress={this.props.progress}
          color={this.props.color}
        />
      </View>
    );
  }
}

ProgressBar.defaultProps = {
  indeterminate: false,
  progress: 0.5,
  direction: -1,
  color: "white"
};
