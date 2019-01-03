import React, { Component } from "react";
import DropdownAlert from "react-native-dropdownalert";
import { Prolar } from "../../prolar/Prolar";

export default class DropDown extends Component {
  showError(msg) {
    let msg_ = msg;
    if (Array.isArray(msg)) {
      msg_ = "";
      for (let i = 0; i < msg.length; i++) {
        msg_ = msg_ + msg[i] + "\n";
      }
    }
    this.dropdown.alertWithType("warn", "خطا", msg_);
  }

  render() {
    const unit = Prolar.size.unit;
    return (
      <DropdownAlert
        closeInterval={4000}
        errorColor={this.props.errorColor}
        warnColor={this.props.warnColor}
        titleStyle={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          color: "black",
          textAlign: "right",
          fontSize: Prolar.size.font_md,
          zIndex: 1000000
        }}
        messageStyle={{
          flexDirection: "row",
          textAlign: "right",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          color: "black",
          fontSize: Prolar.size.font_md
        }}
        imageStyle={{
          alignSelf: "center",
          resizeMode: "contain",
          width: 40 * unit,
          height: 40 * unit
        }}
        errorImageSrc={require("./../../../assets/icons/error.png")}
        warnImageSrc={require("./../../../assets/icons/warn.png")}
        ref={ref => (this.dropdown = ref)}
        updateStatusBar={false}
      />
    );
  }
}

DropDown.defaultProps = {
  errorColor: Prolar.style.dropdownAlert.errorColor,
  warnColor: Prolar.style.dropdownAlert.warnColor,
  containerStyle: Prolar.style.dropdownAlert.containerStyle
};
