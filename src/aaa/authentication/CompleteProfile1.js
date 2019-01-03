import React, { Component } from "react";
import { ScrollView, Image, TouchableOpacity } from "react-native";
import { Container, Header, Right, Body, Title, Left } from "native-base";

import ProgressBar from "./../../public/progressBar/ProgressBar";
import View from "./../../public/view/PrimaryView";
import PrimaryInput from "./../../public/inputs/PrimaryInput";
import { width, height } from "./../../public/style/Dimension";
import Button from "../../public/buttons/PrimaryButton";
import { TextStyle } from "./../../public/style/TextStyle";
import Gender from "./../../public/radioButton/Gender";
import Text from "./../../public/text/PrimaryText";
import { Prolar } from "./../../prolar/Prolar";
import CustomScrollView from "./../../public/view/CustomScrollView";
import CustomImage from "../../public/image/CustomImage";
import DropDown from "./../../public/dropDown/DropDown";
import {
  NationalCodeCheck,
  PersianValueCheck
} from "./../../prolar/Validators";
import { DateField } from "../../public/dateField/DateField";
// import { Icon } from 'native-base'
import { RegisterApi } from "./RegisterApi";
import moment from "moment-jalaali";
import { AuthStore } from "../../redux/providers/AuthStore";

let profile = {
  firstName: "",
  lastName: "",
  nationalCode: "",
  gender: false,
  birthDate: ""
};
let x = false;
let messagem = "";
let nc = 0;
let ln = 0;
let fn = 0;
let process = 0;
let MobileNumber;
let codee;
let unsubscribe;
export default class CompleteProfile1 extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    fn = 0;
    ln = 0;
    nn = 0;
    this.dateRefFunc = React.createRef();
    unsubscribe = AuthStore.subscribe(this.getData);
  }

  state = {
    message: [],
    status: false,
    nav: true
  };
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    mobileNumber = AuthStore.getState().mobileNumber;
    codee = AuthStore.getState().code;
  };
  handleName = value => {
    fn = 0;
    ln = 0;
    nn = 0;
    this.setState({ message: [] });
    profile.firstName = value;
  };
  handleLastname = value => {
    fn = 0;
    ln = 0;
    nn = 0;
    this.setState({ message: [] });
    profile.lastName = value;
  };
  handleNationalCode = value => {
    fn = 0;
    ln = 0;
    nn = 0;
    this.setState({ message: [] });
    profile.nationalCode = value;
  };
  setGender = val => {
    profile.gender = val;
  };
  onSetDate = val => {
    profile.birthDate = val;
  };
  mergeMessages = messages => {
    let messaget = "";
    messages.map(item => (messaget = messaget + ` ${item} \n`));

    return messaget;
  };

  doNext = res => {
    if (res.message == 200) {
      Prolar.navigator(this, "Services")();
    } else {
      this.dropdown.showError(res.errors);
    }
  };
  onPress = () => {
    profile.nationalCode = Prolar.convertNumbers2English(profile.nationalCode);
    ncheck = NationalCodeCheck(profile.nationalCode);
    fcheck = PersianValueCheck(profile.firstName);
    lcheck = PersianValueCheck(profile.lastName);
    if (!ncheck && nn == 0) {
      nn = 1;
      this.setState(prevState => ({
        message: [...prevState.message, "کد ملی وارد  شده صحیح نیست"]
      }));
      this.setState({ status: false });
    }
    if (!fcheck && fn == 0) {
      fn = 1;
      this.setState(prevState => ({
        message: [...prevState.message, "نام صحیح نیست"]
      }));
      this.setState({ status: false });
    }
    if (!lcheck && ln == 0) {
      ln = 1;
      this.setState(prevState => ({
        message: [...prevState.message, "نام خانوادگی صحیح نیست"]
      }));

      this.setState({ status: false });
    }
    if (ncheck && lcheck && fcheck) {
      RegisterApi(profile, mobileNumber, codee).then(res => this.doNext(res));
    } else {
      this.riseError();
    }
  };
  riseError = () => {
    setTimeout(() => this.dropdown.showError(this.state.message), 500);
  };
  render() {
    let rss = !this.state.status && this.state.message.length > 0;
    let radius = Prolar.size.radius;
    return (
      <Container>
        <Header style={Prolar.style.header}>
          <Left />
          <Body style={{ flex: 2 }}>
            <Title style={Prolar.style.header.title}>
              تکمیل اطلاعات کاربری
            </Title>
          </Body>
          <Right />
        </Header>
        <ProgressBar progress={0.7} color="white" />

        <CustomScrollView>
          <View alignItems="center" style={{ padding: 10 * Prolar.size.unit }}>
            <CustomImage
              src={require("../../../assets/icons/artworksCompleteProfile.png")}
              width={156}
              height={137}
              style={{
                marginTop: Prolar.size.unit * 20,
                marginBottom: Prolar.size.unit * 16
              }}
            />

            <View
              flexDirection="row"
              style={{ marginBottom: Prolar.size.unit * 20, width: "100%" }}
            >
              <PrimaryInput
                getValue={this.handleLastname}
                placeholder="نام خانوادگی"
                label="نام خانوادگی"
                required
                height={50}
                viewStyle={{ flex: 1, paddingRight: 5 * Prolar.size.unit }}
              />

              <PrimaryInput
                getValue={this.handleName}
                placeholder="نام"
                label="نام"
                required
                height={50}
                viewStyle={{ flex: 1, paddingLeft: 5 * Prolar.size.unit }}
              />
            </View>

            <PrimaryInput
              keyboardType="numeric"
              getValue={this.handleNationalCode}
              placeholder="کد ملی"
              label="کد ملی"
              required
              height={50}
              viewStyle={{ marginBottom: Prolar.size.unit * 20, width: "100%" }}
            />

            <Text
              label="تاریخ تولد"
              color={Prolar.color.gray4}
              fontSize={Prolar.size.font_sm}
              viewStyle={{ margin: 7 * Prolar.size.unit, width: "100%" }}
            />

            <TouchableOpacity
              justifyContent="center"
              alignItems="center"
              style={{
                borderWidth: 1,
                borderRadius: Prolar.size.unit * radius,
                borderColor: Prolar.color.cardBorder,
                height: 50 * Prolar.size.unit,
                flexDirection: "row",
                flex: 1,
                marginBottom: Prolar.size.unit * 20
              }}
              onPress={() => {
                // this.setState({ selectedDate: '' })
                this.dateRefFunc.current._toggleModal();
              }}
            >
              <View
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                style={{ backgroundColor: "transparent" }}
              >
                <DateField
                  minDate={Prolar.dateTools.getGregorianToJalaliString(
                    moment(
                      new Date(Date.now() - 90 * 365 * 24 * 3600 * 1000)
                    ).format("YYYY/MM/DD"),
                    ""
                  )}
                  maxDate={Prolar.dateTools.getGregorianToJalaliString(
                    moment(
                      new Date(Date.now() - 18 * 365 * 24 * 3600 * 1000)
                    ).format("YYYY/MM/DD"),
                    ""
                  )}
                  defaultDate={Prolar.dateTools.getGregorianToJalaliString(
                    moment(
                      new Date(Date.now() - 40 * 365 * 24 * 3600 * 1000)
                    ).format("YYYY/MM/DD"),
                    ""
                  )}
                  key={this.state.key}
                  viewStyle={{ marginRight: 10 * Prolar.size.unit }}
                  textFieldStyle={[
                    Prolar.style.textStyle,
                    {
                      fontSize: Prolar.size.font_sm,
                      color: Prolar.color.gray6
                    }
                  ]}
                  ref={this.dateRefFunc}
                  width={Prolar.size.unit * 350}
                  height={Prolar.size.unit * 280}
                  getValue={this.onSetDate}
                />

                <CustomImage
                  width={20}
                  height={20}
                  src={require("../../../assets/icons/calendar.png")}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: "100%",
                paddingTop: Prolar.size.unit * 10,
                marginBottom: Prolar.size.unit * 20
              }}
            >
              <Gender
                space={Prolar.size.unit * 10}
                setGender={this.setGender}
                viewStyle={{
                  height: Prolar.size.unit * 50,
                  marginTop: Prolar.size.unit * 16,
                  marginBottom: Prolar.size.unit * 16
                }}
              />
            </View>

            <Text
              color={Prolar.color.gray4}
              fontSize={Prolar.size.font_md}
              label="* کد ملی شما صرفا برای تشکیل پرونده پزشکی شما مورد استفاده قرار می گیرد."
              style={{
                paddingRight: Prolar.size.unit * 25,
                paddingLeft: Prolar.size.unit * 25,
                textAlign: "center",
                marginBottom: Prolar.size.unit * 70
              }}
            />
          </View>
        </CustomScrollView>

        <View
          flex={0}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          style={{
            marginBottom: 30 * Prolar.size.unit,
            marginTop: 10 * Prolar.size.unit,
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "transparent"
          }}
        >
          <Button
            icon="add"
            onPress={this.onPress}
            iconStyle={{
              color: Prolar.color.white,
              marginRight: 18 * Prolar.size.unit
            }}
            width={200}
            height={50}
            color={Prolar.color.primary}
          >
            <Text
              label="ثبت و ادامه"
              color={Prolar.color.white}
              fontSize={Prolar.size.font_md}
            />
          </Button>
        </View>
        <DropDown ref={ref => (this.dropdown = ref)} />
      </Container>
    );
  }
}
