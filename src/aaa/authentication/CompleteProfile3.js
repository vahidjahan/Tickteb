import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Container, Header, Right, Left, Body, Title, Icon } from "native-base";
import { StackActions, NavigationActions } from "react-navigation";

import ProgressBar from "./../../public/progressBar/ProgressBar";
import View from "./../../public/view/PrimaryView";
import { width, height } from "./../../public/style/Dimension";
import Button from "../../public/buttons/PrimaryButton";
import Text from "./../../public/text/PrimaryText";
import PrimaryInput from "./../../public/inputs/PrimaryInput";
import CustomPicker from "./../../public/picker/CustomPicker";
import CustomScrollView from "./../../public/view/CustomScrollView";
import { Prolar } from "./../../prolar/Prolar";
import HeaderButton from "../../public/buttons/HeaderButton";
import { GetSelectValue } from "../../prolar/GetSelectValues";
import {
  validateEmail,
  validateTel,
  PersianValueCheck,
  numberCheck
} from "../../prolar/Validators";
import { CompleteApi } from "./CompleteApi";
import DropDown from "../../public/dropDown/DropDown";
let optionss = {
  insurances: [],
  supplementaryInsurances: [],
  educationalDegrees: [],
  bloodTypes: []
};
let compData = {
  address: "",
  educationalDegree: "",
  fixedLine: "",
  insurance: "",
  supplementaryInsurance: "",
  bloodType: "",
  height: "",
  weight: "",
  email: ""
};

export default class CompleteProfile3 extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.getValues();
    this.state = {
      loadedValues: false,
      message: []
    };
  }
  navigateReset = routeName => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: routeName })]
    });

    this.props.navigation.dispatch(resetAction);
  };
  onPress = () => {
    this.setState({ message: [] });
    compData.weight = Prolar.convertNumbers2English(compData.weight);
    compData.height = Prolar.convertNumbers2English(compData.height);
    compData.fixedLine = Prolar.convertNumbers2English(compData.fixedLine);
    ec = validateEmail(compData.email);
    ac = PersianValueCheck(compData.address);
    fc = validateTel(compData.fixedLine);
    wc = numberCheck(compData.weight);
    hc = numberCheck(compData.height);

    if (!ec) {
      this.setState(prevState => ({
        message: [...prevState.message, "ایمیل وارد شده صحیح نیست"]
      }));
    }
    if (!ac) {
      this.setState(prevState => ({
        message: [...prevState.message, " آدرس وارد شده صحیح نیست"]
      }));
    }

    if (!fc) {
      this.setState(prevState => ({
        message: [...prevState.message, "تلفن ثابت وارد شده صحیح نیست"]
      }));
    }
    if (!wc) {
      this.setState(prevState => ({
        message: [...prevState.message, "وزن وارد شده صحیح نیست"]
      }));
    }

    if (!hc) {
      this.setState(prevState => ({
        message: [...prevState.message, "قد وارد شده صحیح نیست"]
      }));
    }
    if (ec && ac && fc && wc && hc) {
      CompleteApi(compData).then(res => {
        if (res.message == 200) {
          const { reset } = this.props.navigation;
          reset("Services");
        } else {
          this.dropdown.showError(res.errors);
        }
      });
    } else {
      this.riseError();
    }
  };
  riseError = () => {
    setTimeout(() => this.dropdown.showError(this.state.message), 500);
  };

  goBack = () => {
    this.navigateReset("Services");
  };
  getValues = async () => {
    optionss = await GetSelectValue();
    this.setState({ loadedValues: true });
  };

  render() {
    let rowStyle = {
      width: "100%",
      paddingTop: Prolar.size.unit * 10,
      alignItems: "flex-end"
    };

    return (
      <Container>
        <Header style={Prolar.style.header.container}>
          <Left style={Prolar.style.header.left_}>
            <HeaderButton name="arrow-back" onPress={this.goBack} />
          </Left>
          <Body style={Prolar.style.header.body_}>
            <Title style={Prolar.style.header.title}>
              تکمیل اطلاعات کاربری
            </Title>
            <Right />
          </Body>
          <Right />
        </Header>
        <ProgressBar progress={1} color="#32B67A" />

        <CustomScrollView>
          <View
            alignItems="stretch"
            style={{
              paddingLeft: 15 * Prolar.size.unit,
              paddingRight: 15 * Prolar.size.unit
            }}
          >
            <PrimaryInput
              getValue={val => {
                compData.email = val;
              }}
              placeholder="ایمیل"
              label="ایمیل"
              viewStyle={{ width: "100%" }}
              height={50}
            />

            <PrimaryInput
              keyboardType="numeric"
              getValue={val => {
                compData.fixedLine = val;
              }}
              placeholder="تلفن ثابت"
              label="تلفن ثابت"
              viewStyle={{ width: "100%" }}
              height={50}
              viewStyle={{ marginTop: Prolar.size.unit * 30 }}
            />

            <PrimaryInput
              getValue={val => {
                compData.address = val;
              }}
              placeholder="آدرس"
              label="آدرس"
              viewStyle={{ width: "100%" }}
              height={50}
              viewStyle={{ marginTop: Prolar.size.unit * 30 }}
            />

            <CustomPicker
              list={optionss.educationalDegrees}
              label="تحصیلات"
              placeholder="تحصیلات"
              viewStyle={rowStyle}
              onSelect={item => (compData.educationalDegree = item.label)}
            />

            <CustomPicker
              list={optionss.bloodTypes}
              placeholder="گروه خون"
              label="گروه خون"
              viewStyle={rowStyle}
              onSelect={item => (compData.bloodType = item.label)}
            />

            <View
              flexDirection="row"
              style={{ marginTop: Prolar.size.unit * 30, width: "100%" }}
            >
              <PrimaryInput
                keyboardType="numeric"
                label="وزن(کیلوگرم)"
                placeholder="وزن(کیلوگرم)"
                height={50}
                viewStyle={{
                  paddingRight: Prolar.size.unit * 10,
                  width: "50%"
                }}
                getValue={val => {
                  compData.weight = val;
                }}
              />
              <PrimaryInput
                keyboardType="numeric"
                label="قد(سانتیمتر)"
                placeholder="قد(سانتیمتر)"
                viewStyle={{ paddingLeft: Prolar.size.unit * 10, width: "50%" }}
                height={50}
                getValue={val => {
                  compData.height = val;
                }}
              />
            </View>

            <CustomPicker
              list={optionss.insurances}
              placeholder="بیمه"
              label="بیمه"
              viewStyle={rowStyle}
              onSelect={item => (compData.insurance = item.label)}
            />

            <CustomPicker
              list={optionss.supplementaryInsurances}
              placeholder="بیمه تکمیلی"
              label="بیمه تکمیلی"
              viewStyle={rowStyle}
              onSelect={item => (compData.supplementaryInsurance = item.label)}
            />

            <Button
              color={Prolar.color.primary}
              width={200}
              height={50}
              style={{
                alignSelf: "center",
                marginTop: Prolar.size.unit * 26,
                marginBottom: Prolar.size.unit * 34
              }}
              onPress={this.onPress}
            >
              <Text label="تکمیل حساب کاربری" fontSize={Prolar.size.font_md} />
            </Button>
          </View>
        </CustomScrollView>
        <DropDown ref={ref => (this.dropdown = ref)} />
      </Container>
    );
  }
}
