import React, { Component } from "react";
import DropDown from "../../public/dropDown/DropDown";
import View from "../../public/view/PrimaryView";
import PrimaryInput from "../../public/inputs/PrimaryInput";
import IconButton from "../../public/buttons/PrimaryIconButton";
import CustomImage from "../../public/image/CustomImage";
import Text from "../../public/text/PrimaryText";
import { Prolar } from "../../prolar/Prolar";
import { MobileNumberCheck } from "../../prolar/Validators";
import { CheckUserApi } from "./CheckUserApi";
import { AddMobileNumber } from "../../redux/actions/AuthActions";
import { AuthStore } from "../../redux/providers/AuthStore";

let mobileNumber = "";

export default class CheckUser extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      res: 100,
      message: [],
      value: ""
    };
  }

  handleInputValue = value => {
    mobileNumber = value;
  };
  componentDidUpdate() {
    if (this.state.res == 200) {
      const { navigate } = this.props.navigation;
      navigate("PhoneNumberVerification");
    } else {
      this.dropdown.showError(this.state.message);
    }
  }
  onPress = () => {
    mobileNumber = Prolar.convertNumbers2English(mobileNumber);
    if (mobileNumber == "") {
      this.setState({
        res: "Empty",
        message: ["لطفا شماره موبایل خود را وارد کنید"]
      });
      mobileNumber = "";
    } else if (MobileNumberCheck(mobileNumber)) {
      CheckUserApi(mobileNumber).then(res => {
        if (res.message == 200) {
          AuthStore.dispatch(AddMobileNumber(mobileNumber, res.data));
        }
        this.setState({ res: res.message, message: res.errors });
      });
    } else {
      this.setState({
        res: 300,
        message: ["شماره موبایل شما صحیح نمی‌باشد"]
      });
      mobileNumber = "";
    }
  };

  render() {
    return (
      <View alignItems="center">
        <View alignItems="center">
          <CustomImage
            src={require("../../../assets/icons/splashLogo.png")}
            width={148}
            height={122}
            style={{
              marginTop: Prolar.size.unit * 68,
              marginBottom: Prolar.size.unit * 58
            }}
          />

          <PrimaryInput
            keyboardType="numeric"
            getValue={this.handleInputValue}
            placeholder="لطفا شماره موبایل خود را وارد کنید"
            label="لطفا شماره موبایل خود را وارد کنید"
            width={310}
            height={50}
            viewStyle={{ marginBottom: Prolar.size.unit * 24 }}
          />

          <IconButton
            onPress={this.onPress}
            color={Prolar.color.primary}
            iconColor={Prolar.color.white}
            icon="arrow-forward"
            width={200}
            height={50}
            full
            style={{
              marginTop: Prolar.size.unit * 5,
              borderWidth: Prolar.size.unit * 1,
              borderColor: Prolar.color.gray3
            }}
            iconFlex={0.7}
            iconStyle={{ fontSize: Prolar.size.unit * 18 }}
          >
            <View
              color="transparent"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              style={{ marginLeft: Prolar.size.unit * 5 }}
            >
              <Text
                label="ادامه"
                color={Prolar.color.white}
                fontSize={Prolar.size.font_sm}
              />
            </View>
          </IconButton>
        </View>
        <DropDown ref={ref => (this.dropdown = ref)} />
      </View>
    );
  }
}
