import React, { Component } from "react";
import ScrollPicker from "react-native-wheel-scroll-picker";
import { Platform, StyleSheet, Text, View } from "react-native";

const Month = [
  "فرودین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند"
];

export default class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: 7
    };
    this.year = 97;
    this.month = 7;
    this.day = 28;
    this.yearData = 1397;
    this.monthData = 'آبان';
    this.dayData = 29;
  }

  sendDate = ()=>{
      this.props.getDate(this.yearData, this.monthData, this.dayData);
  };

  render() {
    return (
      <View style={[styles.mainView, { height: (this.props.height / 5) * 4 }]}>
        <View style={styles.spinner}>
          <Text
            style={[
              styles.spinnerHeader,
              {
                marginTop: this.props.height / 16
              }
            ]}
          >
            سال
          </Text>
          <ScrollPicker
            style={{ color: "red" }}
            dataSource={Array.from(
              new Array(120),
              (val, index) => index + 1300
            )}
            selectedIndex={this.year}
            renderItem={(data, index, isSelected) => {

            }}
            onValueChange={(data, selectedIndex) => {
              this.year = selectedIndex;
              this.yearData = data;
              this.sendDate();
            }}
            wrapperHeight={(this.props.height / 5) * 3}
            wrapperWidth={this.props.width / 3}
            wrapperBackground={"#FFFFFF"}
            itemHeight={this.props.height / 5}
            highlightColor={"#d8d8d8"}
            highlightBorderWidth={2}
            activeItemColor={"#222121"}
            itemColor={"#B4B4B4"}
          />
        </View>
        <View style={styles.spinner}>
          <Text
            style={[
              styles.spinnerHeader,
              {
                marginTop: this.props.height / 16
              }
            ]}
          >
            ماه
          </Text>
          <ScrollPicker
            dataSource={Array.from(new Array(12), (val, index) => Month[index])}
            selectedIndex={this.month}
            renderItem={(data, index, isSelected) => {
            }}
            onValueChange={(data, selectedIndex) => {
              this.month = selectedIndex;
              this.setState({ month: selectedIndex });
              this.monthData = data;
              this.sendDate();
            }}
            wrapperHeight={(this.props.height / 5) * 3}
            wrapperWidth={this.props.width / 3}
            wrapperBackground={"#FFFFFF"}
            itemHeight={this.props.height / 5}
            highlightColor={"#d8d8d8"}
            highlightBorderWidth={2}
            activeItemColor={"#222121"}
            itemColor={"#B4B4B4"}
          />
        </View>
        <View style={styles.spinner}>
          <Text
            style={[
              styles.spinnerHeader,
              {
                marginTop: this.props.height / 16
              }
            ]}
          >
            روز
          </Text>
          <ScrollPicker
            dataSource={Array.from(
              new Array(this.state.month < 6 ? 31 : 30),
              (val, index) => index + 1
            )}
            selectedIndex={this.day}
            renderItem={(data, index, isSelected) => {

            }}
            onValueChange={(data, selectedIndex) => {
              this.day = selectedIndex;
              this.dayData = data;
              this.sendDate();
            }}
            wrapperHeight={(this.props.height / 5) * 3}
            wrapperWidth={this.props.width / 3}
            wrapperBackground={"#FFFFFF"}
            itemHeight={this.props.height / 5}
            highlightColor={"#d8d8d8"}
            highlightBorderWidth={2}
            activeItemColor={"#222121"}
            itemColor={"#B4B4B4"}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row"
  },
  spinner: {
    padding: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  spinnerHeader: {
    textAlign: "center",
    color: "#353b48",
    fontWeight: "bold",
    fontSize: 18
  }
});
