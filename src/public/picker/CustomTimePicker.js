import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import Text from "./../../public/text/PrimaryText";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Prolar } from "../../prolar/Prolar";

export default class DateTimePickerTester extends Component {
  state = {
    isDateTimePickerVisible: false,
    selectedTime: "",
    date: undefined,
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState(
      {
        selectedTime: date.toString().substring(16, 21),
        date
      },
      () => { }
    );
    this.props.getValue(
      date
        .toString()
        .substring(16, 21)
        .toString()
    );
    this._hideDateTimePicker();
  };

  render() {
    return (
      <DateTimePicker
        mode="time"
        date={this.state.date == undefined ? this.props.initialDate : this.state.date}
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this._handleDatePicked}
        onCancel={this._hideDateTimePicker}
      />
    );
  }
}
