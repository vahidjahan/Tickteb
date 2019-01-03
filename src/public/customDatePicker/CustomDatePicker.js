import React, { Component } from "react";
import Selector from "./Selector";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";
import Modal from "react-native-modal";

export default class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: this.props.isVisible
    };
    this.year = 1397;
    this.month = "آبان";
    this.day = 29;
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  pickDate = () => {
    this.props.getValue(this.year + " " + this.month + " " + this.day);
    this.props.getDate(this.year, this.month, this.day);
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View>
        <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
          <View
            style={[
              styles.modalView,
              {
                width: this.props.width,
                height: this.props.height + 6,
                marginBottom: this.props.marginBottom
              }
            ]}
          >
            <Selector
              height={this.props.height}
              width={this.props.width}
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
                  styles.rightBorder,
                  {
                    height: this.props.height / 5
                  }
                ]}
              >
                <Button onPress={this._toggleModal} style={styles.button}>
                  <Text> ثبت</Text>
                </Button>
              </View>
              <View
                style={[
                  styles.button,
                  styles.leftBorder,
                  {
                    height: this.props.height / 5
                  }
                ]}
              >
                <Button onPress={this._toggleModal}>
                  <Text> ثبت</Text>
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
  marginBottom: 10,
  isVisible: false,
  getDate: date => date,
  getValue: (year, month, day) => year + month + day
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  modalView: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    padding: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  TouchableOpacityStyle: {
    flexDirection: "row",
    marginTop: 6
  },
  button: {
    borderTopWidth: 1,
    borderColor: "#d6d7da",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  rightBorder: {
    borderRightWidth: 1
  },
  leftBorder: {
    borderLeftWidth: 1
  }
});
