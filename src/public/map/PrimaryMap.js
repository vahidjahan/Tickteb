import React, { Component } from "react";
import { MapView, StyleSheet, Text, View } from "react-native";

export class PrimaryMap extends Component {
  render() {
    return (
      <View>
        <Text>Ham</Text>
      </View>
      //   <MapView
      //     style={styles.map}
      //     showsUserLocation={false}
      //     followUserLocation={false}
      //     zoomEnabled={true}
      //   />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: 400,
    marginTop: 80
  }
});

export default PrimaryMap;
