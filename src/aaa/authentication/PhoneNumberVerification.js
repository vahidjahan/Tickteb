import React, { Component } from "react";

import { Container, Header, Right, Body, Title, Left } from "native-base";
import { Prolar } from "./../../prolar/Prolar";

import View from "./../../public/view/PrimaryView";
import CustomImage from "./../../public/image/CustomImage";
import ProgressBar from "./../../public/progressBar/ProgressBar";
import LittleRoundedInput from "../../public/inputs/LittleRoundedInput";
import Text from "./../../public/text/PrimaryText";
import PhoneNumberVerificationUnsuccessful from "./PhoneNumberVerificationUnsuccessful";
import { VerificationApi } from "./VerificationApi";
import { AuthStore } from "../../redux/providers/AuthStore";
import { VerifyCode } from "../../redux/actions/AuthActions";
import { SignIn } from "./SignIn";
import DropDown from "../../public/dropDown/DropDown";
import CustomScrollView from "../../public/view/CustomScrollView";
import { StackActions, NavigationActions } from "react-navigation";

let unsubscribe;
let mobileNumber;
let isUser;
export default class PhoneNumberVerification extends Component {
  constructor(props) {
    super(props);
    unsubscribe = AuthStore.subscribe(this.getCodes);
  }
  componentDidMount() {
    this.getCodes();
  }

  static navigationOptions = {
    header: null
  };
  state = {
    code: "",
    err: false,
    message: "کد وارد شده یا شماره موبایل صحیح نمی‌باشد"
  };
  navigateReset = routeName => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: routeName })]
    });

    this.props.navigation.dispatch(resetAction);
  };
  getCodes = async () => {
    mobileNumber = AuthStore.getState().mobileNumber;
    isUser = AuthStore.getState().isUser;
  };
  getCode = async code => {
    const verifyRes = await VerificationApi(mobileNumber, code);
    if (verifyRes.message == 200) {
      AuthStore.dispatch(VerifyCode(code));
      if (isUser) {
        let st = SignIn(mobileNumber, code);
        if (st == 200) {
          this.navigateReset("Services");
        } else {
          this.setState({ err: true });
        }
      } else {
        const { navigate } = this.props.navigation;
        navigate("CompleteProfile2");
      }
    } else {
      this.setState({ err: true, message: verifyRes.errors[0] });
      this.riseError();
    }
  };
  riseError = () => {
    setTimeout(() => this.dropdown.showError(this.state.message), 500);
  };
  componentWillUnmount() {
    unsubscribe();
  }

  render() {
    return (
      <Container>
        <Header style={Prolar.style.header}>
          <Left />
          <Body>
            <Title style={Prolar.style.header.title}>ثبت نام</Title>
          </Body>
          <Right />
        </Header>
        <ProgressBar progress={0.3} color="white" />
        <CustomScrollView>
          <View alignItems="center">
            <CustomImage
              src={require("../../../assets/icons/artworksPhoneNumberVerfication.png")}
              width={156}
              height={137}
              style={{
                marginTop: Prolar.size.unit * 26,
                marginBottom: Prolar.size.unit * 24
              }}
            />

            <Text
              style={{
                marginBottom: Prolar.size.unit * 12,
                marginLeft: Prolar.size.unit * 25,
                marginRight: Prolar.size.unit * 25,
                textAlign: "center"
              }}
              color={Prolar.color.gray7}
              fontSize={Prolar.size.font_md}
              label="پیامی حاوی کد 6 رقمی به شما ارسال شده است آن را وارد کنید"
            />

            <LittleRoundedInput
              viewStyle={{ marginBottom: Prolar.size.unit * 24 }}
              getCode={this.getCode}
            />
            <PhoneNumberVerificationUnsuccessful
              navigation={this.props.navigation}
            />
          </View>
        </CustomScrollView>
        <DropDown ref={ref => (this.dropdown = ref)} />
      </Container>
    );
  }
}
