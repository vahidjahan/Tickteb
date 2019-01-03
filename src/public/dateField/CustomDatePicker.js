import React, { Component } from "react";
import Selector from "./Selector";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Button } from "native-base";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import { Prolar } from "../../prolar/Prolar";

export default class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: this.props.isVisible
    };

    var rxDatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
    let dateArr = props.defaultDate.match(rxDatePattern);

    if (dateArr != null) {
      this.year = parseInt(dateArr[1]);
      this.month = parseInt(dateArr[3]);
      this.day = parseInt(dateArr[5]);
    } else {
      this.year = 1397;
      this.day = 29;
      this.month = 8;
    }
  }

  dateStrToObj = date => {
    var rxDatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
    let dateArr = date.match(rxDatePattern);

    if (dateArr != null) {
      return {
        year: parseInt(dateArr[1]),
        month: parseInt(dateArr[3]),
        day: parseInt(dateArr[5])
      };
    } else {
      return {
        year: this.year,
        month: this.month,
        day: this.day
      };
    }
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  pickDate = () => {
    this.day = parseInt(this.day);
    this.month = parseInt(this.month);
    if (this.day < 10) {
      this.day = "0" + this.day;
    }
    if (this.month < 10) {
      this.month = "0" + this.month;
    }
    this.props.getValue(this.year + "/" + this.month + "/" + this.day);
    this.props.getDate(this.year, this.month, this.day);
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View>
        <Modal
          isVisible={this.state.isModalVisible}
          style={styles.modal}
          onRequestClose={() => this.setState({ isModalVisible: false })}
        >
          <View
            style={[
              styles.modalView,
              {
                width: this.props.width,
                height:
                  this.props.height -
                  (Prolar.isIOS ? (this.props.height * 2) / 5 : 0) +
                  6,
                marginBottom: this.props.marginBottom
              }
            ]}
          >
            <Selector
              height={this.props.height}
              width={this.props.width}
              maxDate={this.dateStrToObj(this.props.maxDate)}
              minDate={this.dateStrToObj(this.props.minDate)}
              defaultDate={{
                year: parseInt(this.year),
                month: parseInt(this.month),
                day: parseInt(this.day)
              }}
              getDate={(year, month, day) => {
                this.year = year;
                this.month = month;
                this.day = day;
              }}
            />
            <View
              style={[
                styles.TouchableOpacityStyle,
                { height: this.props.height / 5 }
              ]}
            >
              <View
                style={[
                  styles.button,
                  {
                    height: this.props.height / 5
                  }
                ]}
              >
                <Button
                  onPress={this.pickDate}
                  style={[styles.button, styles.rightBorder]}
                >
                  <Text style={styles.buttonText}>{this.props.setText}</Text>
                </Button>
              </View>
              <View
                style={[
                  styles.button,
                  {
                    height: this.props.height / 5
                  }
                ]}
              >
                <Button
                  onPress={this._toggleModal}
                  style={[styles.button, styles.leftBorder]}
                >
                  <Text style={styles.buttonText}>{this.props.closeText}</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

CustomDatePicker.defaultProps = {
  closeText: "لغو",
  setText: "تایید",
  width: 350,
  height: 280,
  defaultDate: { year: 1395, month: 3, day: 15 },
  marginBottom: 10,
  isVisible: false,
  getDate: (year, month, day) => year + month + day,
  getValue: date => date,
  minDate: { year: 1395, month: 5, day: 19 },
  maxDate: { year: 1398, month: 8, day: 22 }
};

CustomDatePicker.propTypes = {
  closeText: PropTypes.string,
  setText: PropTypes.string,
  isVisible: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  getDate: PropTypes.func,
  getValue: PropTypes.func
};
// TODO
// minDate: PropTypes.number,
// maxDate: PropTypes.String

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  modalView: {
    borderRadius: 10,
    backgroundColor: Prolar.color.primary,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  TouchableOpacityStyle: {
    flexDirection: "row",
    marginTop: 6,
    overflow: "hidden"
  },
  button: {
    borderTopWidth: 1,
    borderColor: "#d6d7da",
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  rightBorder: {
    borderLeftWidth: 0,
    borderRightWidth: 0.5
  },
  leftBorder: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0
  },
  buttonText: {
    textAlign: "center",
    flex: 1,
    fontSize: 18,
    fontWeight: "bold"
  }
});
