import React from "react";
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Thumbnail
} from "native-base";
import { ActivityIndicator, TouchableOpacity, BackHandler } from "react-native";
import moment from "moment-jalaali";

import HeaderButton from "../../public/buttons/HeaderButton";
import PrimaryText from "../../public/text/PrimaryText";
import View from "../../public/view/PrimaryView";
import Button from "./../../public/buttons/PrimaryButton";
import Text from "../../public/text/PrimaryText";
import PrimaryInput from "./../../public/inputs/PrimaryInput";
import Gender from "./../../public/radioButton/Gender";
import { Prolar } from "../../prolar/Prolar";
import DropDown from "../../public/dropDown/DropDown";
import { EditProfileAPI, ChangeProfilePicAPI } from "./EditProfileApi";
import CustomScrollView from "./../../public/view/CustomScrollView";
import CustomImage from "../../public/image/CustomImage";
import { DateField } from "./../../public/dateField/DateField";
import CustomPicker from "./../../public/picker/CustomPicker";
import CameraRollPickerModal from "../../public/picker/CameraRollModal";
import SuccessfulRequest from "./../../services/serviceRequest/SuccessfulRequest";
import { GetSelectValue } from "../../prolar/GetSelectValues";
import { GetProfileApi } from "../GetProfileApi";

import {
  validateEmail,
  validateTel,
  PersianValueCheck,
  numberCheck,
  NationalCodeCheck
} from "../../prolar/Validators";
import RNFetchBlob from "rn-fetch-blob";
import { requestPermission } from "../../prolar/PermissionCheck";
import { BlobApi } from "./BlobApi";

// -----------------------------------lists---------------------------------------------
let optionss = {
  insurances: [],
  supplementaryInsurances: [],
  educationalDegrees: [],
  bloodTypes: []
};
let defaultValues = {};
let urii;

// ----------------------------------------------------------------------------------------

let checkers = { naco: false, wei: false, hei: false, fil: false };

export default class EditProfile extends React.Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      data: "",
      key: 0,
      visibleButton: true,
      visibleIndicator: false,
      message: [],
      successful: false,
      loadedValues: false,
      uri: "",
      newUri: false
    };
    this.dateRefFunc = React.createRef();

    this.getValues();
  }
  getPhoto = uri => {
    this.setState({ uri, newUri: true });
  };
  saveImage = async (data, ty, st) => {
    // sendPhotoApi(st,data)
    body = {
      file: data,
      filetype: ty,
      st: st,
      url: "/api/Profile/Customer/PostProfilePicture"
    };

    let res = await BlobApi(body);

    if (res.message != 200) {
      this.setState({ message: res.errors });
      this.riseError();
    } else {
      urii = {
        uri: Prolar.api.domain + res.data.trim()
      };
    }
  };

  imageData = async () => {
    let ty = "jpg";

    if (this.state.uri.length > 0 && this.state.newUri) {
      try {
        let st = await RNFetchBlob.fs.stat(this.state.uri);

        if (st.filename.includes("png")) {
          ty = "png";
        } else if (st.filename.includes("svg")) {
          ty = "svg";
        } else if (st.filename.includes("gif")) {
          ty = "gif";
        }
        let data = await RNFetchBlob.fs.readFile(this.state.uri, "base64");

        this.setState({ newUri: false });
        let data2 = { ...st, file: data };
        this.saveImage(data, ty, st);
      } catch (err) {
        this.setState({ newUri: false, message: ["خطا در استفاده از عکس"] });
        this.riseError();
      }
    }
  };
  componentDidUpdate() {
    this.imageData();
  }
  getValues = async () => {
    optionss = await GetSelectValue();
    let res = await GetProfileApi(Prolar.data.authorization);
    if (res.message == 200) {
      defaultValues = res.data;
      for (var key in defaultValues) {
        if (defaultValues[key] == null || defaultValues[key] == "undefined") {
          defaultValues[key] = "";
        }
      }

      this.setState({ loadedValues: true });
    } else {
      res.errors.map(item => {
        this.setState(prevState => ({
          message: [...prevState.message, item]
        }));
      });
      this.riseError();
      this.getValues();
    }
  };

  goBack = () => {
    const { navigate } = this.props.navigation;
    navigate("Profile");
  };
  checkValues = () => {
    this.setState({ message: [] });
    defaultValues.nationalCode = checkers.naco
      ? Prolar.convertNumbers2English(defaultValues.nationalCode)
      : defaultValues.nationalCode;
    defaultValues.weight = checkers.wei
      ? Prolar.convertNumbers2English(defaultValues.weight)
      : defaultValues.weight;
    defaultValues.height = checkers.hei
      ? Prolar.convertNumbers2English(defaultValues.height)
      : defaultValues.height;
    defaultValues.fixedLine = checkers.fil
      ? Prolar.convertNumbers2English(defaultValues.fixedLine)
      : defaultValues.fixedLine;

    let fn = PersianValueCheck(defaultValues.firstName);
    let ln = PersianValueCheck(defaultValues.lastName);
    let nc = NationalCodeCheck(defaultValues.nationalCode);
    let fl =
      defaultValues.fixedLine.length > 0
        ? validateTel(defaultValues.fixedLine)
        : true;
    let em =
      defaultValues.email.length > 0
        ? validateEmail(defaultValues.email)
        : true;
    let we =
      defaultValues.weight.length > 0
        ? numberCheck(defaultValues.weight)
        : true;
    let he =
      defaultValues.height.length > 0
        ? numberCheck(defaultValues.height)
        : true;
    if (!fn) {
      this.setState(prevState => {
        message: [...prevState.message, "نام صحیح نیست"];
      });
    }
    if (!ln) {
      this.setState(prevState => ({
        message: [...prevState.message, "نام خانوادگی صحیح نیست"]
      }));
    }
    if (!nc) {
      this.setState(prevState => ({
        message: [...prevState.message, "کد ملی صحیح نیست"]
      }));
    }
    if (!fl) {
      this.setState(prevState => ({
        message: [...prevState.message, "تلفن ثابت صحیح نیست"]
      }));
    }
    if (!em) {
      this.setState(prevState => ({
        message: [...prevState.message, "ایمیل صحیح نیست"]
      }));
    }
    if (!we) {
      this.setState(prevState => ({
        message: [...prevState.message, "وزن صحیح نیست"]
      }));
    }
    if (!he) {
      this.setState(prevState => {
        message: [...prevState.message, "قد صحیح نیست"];
      });
    }

    if (fn && ln && nc && em && fl && we && he) {
      return true;
    } else {
      return false;
    }
  };
  saveProfileInfo = () => {
    let chk = this.checkValues();
    if (chk) {
      this.setState({ visibleButton: false, visibleIndicator: true });
      EditProfileAPI(defaultValues).then(res => {
        if (res.errors.length > 0) {
          this.setState({ message: res.errors });
          this.setState({ visibleButton: true, visibleIndicator: false });
          this.riseError();
        } else {
          this.setState({
            successful: true,
            visibleButton: true,
            visibleIndicator: false
          });
          this.setState({ key: Date.now() });
        }
      });
    } else {
      this.riseError();
    }
  };
  goToProfile = () => {
    this.props.navigation.pop();
  };
  riseError = () => {
    setTimeout(() => this.dropdown.showError(this.state.message), 900);
  };
  // setSuccess=(val)=>{
  //   this.s
  getPermission = async () => {
    let perm = await requestPermission("READ_EXTERNAL_STORAGE");
    if (!perm) {
      this.setState({
        message: [
          "دسترسی برای خواندن عکس از گالری ندارید برای دسترسی لطفا در باز کردن نرم‌افزار دسترسی خواندن فایل از گالری را که پرسیده می‌شود تائیید کنید"
        ]
      });
      this.riseError();
    }
  };

  // componentDidMount () {
  //   this.getPermission()
  //   BackHandler.addEventListener('hardwareBackPress', () => {
  //     console.log('back is clicked')
  //     this.setFlag()
  //   })
  // }
  // componentWillUnmount () {
  //   BackHandler.removeEventListener('hardwareBackPress', () => {
  //     console.log('back is clicked')
  //     this.setFlag()
  //   })
  // }
  render() {
    let space = Prolar.size.unit * 10;
    let height = 50;
    let rowStyle = {
      width: "100%",
      paddingTop: space,
      alignItems: "flex-end"
    };
    urii = require("../../../assets/icons/profilePicEdit.png");
    if (defaultValues.hasOwnProperty("imageUrl")) {
      let temp =
        defaultValues.imageUrl.length > 1
          ? {
              uri: Prolar.api.domain + defaultValues.imageUrl.trim()
            }
          : require("../../../assets/icons/profilePicEdit.png");
      urii = this.state.uri.length > 1 ? { uri: this.state.uri } : temp;
    }

    let success = true;
    return (
      <Container>
        <Header style={Prolar.style.header.container}>
          <Left style={Prolar.style.header.left_}>
            <HeaderButton name="arrow-back" onPress={this.goBack} />
          </Left>
          <Body style={Prolar.style.header.body_}>
            <Title style={Prolar.style.header.title}>ویرایش حساب کاربری</Title>
          </Body>
          <Right />
        </Header>

        {this.state.successful && (
          <SuccessfulRequest
            state_={{ vis: success }}
            backButton={this.goToProfile}
          />
        )}
        <CustomScrollView>
          {this.state.loadedValues ? (
            <View
              key={this.state.key}
              justifyContent="center"
              alignItems="center"
              style={{
                paddingLeft: space * 1.5,
                paddingRight: space * 1.5
              }}
            >
              <Thumbnail source={urii} style={styles.pic} />

              <CameraRollPickerModal
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
                enable={this.state.visibleModal}
                selectPhoto={this.getPhoto}
                callback={this.getPhoto}
              >
                <Text
                  label="آپلود عکس"
                  color={Prolar.color.gray6}
                  fontSize={Prolar.size.font_md}
                  style={{
                    marginRight: 5 * Prolar.size.unit
                  }}
                />
                <CustomImage
                  width={25}
                  height={25}
                  src={require("./../../../assets/icons/camera.png")}
                />
              </CameraRollPickerModal>

              <View
                style={{
                  ...Prolar.style.rtlRow,
                  paddingTop: space * 2
                }}
              >
                <PrimaryInput
                  required
                  label="نام"
                  defaultValue={
                    defaultValues.firstName == null
                      ? ""
                      : defaultValues.firstName
                  }
                  getValue={x => (defaultValues.firstName = x)}
                  height={height}
                  viewStyle={{
                    width: "50%",
                    paddingLeft: space
                  }}
                />

                <PrimaryInput
                  required
                  label="نام‌خانوادگی"
                  defaultValue={
                    defaultValues.hasOwnProperty("lastName")
                      ? defaultValues.lastName
                      : ""
                  }
                  height={height}
                  getValue={x => (defaultValues.lastName = x)}
                  viewStyle={{
                    width: "50%",
                    paddingRight: space
                  }}
                />
              </View>

              <PrimaryInput
                keyboardType="numeric"
                required
                label="کد ملی"
                defaultValue={
                  defaultValues.hasOwnProperty("nationalCode")
                    ? Prolar.replaceNumberToPersion(defaultValues.nationalCode)
                    : ""
                }
                height={height}
                getValue={x => {
                  defaultValues.nationalCode = x;
                  checkers.naco = true;
                }}
                viewStyle={{ width: "100%", paddingTop: space }}
              />
              <View
                style={{
                  ...Prolar.style.rtlRow,
                  paddingTop: space * 1.5
                }}
              >
                <PrimaryText
                  label="تاریخ تولد"
                  style={{
                    fontFamily: Prolar.fontFamily,
                    fontSize: Prolar.size.font_sm,
                    color: Prolar.color.gray8
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  height: 50 * Prolar.size.unit,
                  backgroundColor: Prolar.color.gray2,
                  width: "100%",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  borderRadius: Prolar.size.radius * Prolar.size.unit
                }}
                onPress={() => this.dateRefFunc.current._toggleModal()}
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
                  viewStyle={{
                    marginRight: 10 * Prolar.size.unit
                  }}
                  textFieldStyle={[
                    Prolar.style.textStyle,
                    {
                      fontSize: Prolar.size.font_md,
                      color: Prolar.color.gray11,
                      fontFamily: Prolar.fontFamily,
                      fontSize: Prolar.size.icon_md
                    }
                  ]}
                  width={Prolar.size.unit * 350}
                  height={Prolar.size.unit * 280}
                  ref={this.dateRefFunc}
                  format={"ymd"}
                  defaultDate={
                    defaultValues.hasOwnProperty("birthDate")
                      ? defaultValues.birthDate
                      : Prolar.dateTools.getGregorianToJalaliString(
                          moment(
                            new Date(Date.now() - 40 * 365 * 24 * 3600 * 1000)
                          ).format("YYYY/MM/DD"),
                          ""
                        )
                  }
                  getValue={data => {
                    defaultValues.birthDate = data;
                  }}
                />
              </TouchableOpacity>

              <View style={rowStyle}>
                <Gender
                  space={space * 2}
                  defaultValue={
                    defaultValues.hasOwnProperty("gender")
                      ? defaultValues.gender
                      : ""
                  }
                  setGender={val => (defaultValues.gender = val)}
                  viewStyle={{
                    height: 50 * Prolar.size.unit
                  }}
                />
              </View>

              <PrimaryInput
                label="ایمیل"
                defaultValue={defaultValues.email}
                height={height}
                getValue={x => (defaultValues.email = x)}
                viewStyle={rowStyle}
              />

              <PrimaryInput
                keyboardType="numeric"
                label="تلفن ثابت"
                defaultValue={
                  defaultValues.hasOwnProperty("fixedLine")
                    ? Prolar.replaceNumberToPersion(defaultValues.fixedLine)
                    : ""
                }
                height={height}
                style={{ width: "100%" }}
                getValue={x => {
                  defaultValues.fixedLine = x;
                  checkers.fil = true;
                }}
                viewStyle={rowStyle}
              />

              <PrimaryInput
                label="آدرس"
                defaultValue={
                  defaultValues.hasOwnProperty("address")
                    ? defaultValues.address
                    : ""
                }
                height={height}
                style={{ width: "100%" }}
                getValue={x => (defaultValues.address = x)}
                viewStyle={rowStyle}
              />

              {defaultValues.educationalDegree.length > 0 ? (
                <CustomPicker
                  viewStyle={rowStyle}
                  label="تحصیلات"
                  placeholder=""
                  selected={optionss.educationalDegrees.findIndex(
                    x => (x.label = defaultValues.educationalDegree)
                  )}
                  list={optionss.educationalDegrees}
                  onSelect={item =>
                    (defaultValues.educationalDegree = item.label)
                  }
                />
              ) : (
                <CustomPicker
                  viewStyle={rowStyle}
                  label="تحصیلات"
                  placeholder=""
                  list={optionss.educationalDegrees}
                  onSelect={item =>
                    (defaultValues.educationalDegree = item.label)
                  }
                />
              )}

              {defaultValues.bloodType.length > 0 ? (
                <CustomPicker
                  viewStyle={rowStyle}
                  label="گروه خونی"
                  placeholder=""
                  selected={optionss.bloodTypes.findIndex(
                    x => (x.label = defaultValues.bloodType)
                  )}
                  list={optionss.bloodTypes}
                  onSelect={item => (defaultValues.bloodType = item.label)}
                />
              ) : (
                <CustomPicker
                  viewStyle={rowStyle}
                  label="گروه خونی"
                  placeholder=""
                  list={optionss.bloodTypes}
                  onSelect={item => (defaultValues.bloodType = item.label)}
                />
              )}

              <View
                style={{
                  ...Prolar.style.rtlRow,
                  paddingTop: space
                }}
              >
                <PrimaryInput
                  keyboardType="numeric"
                  label="قد(سانتیمتر)"
                  placeholder="قد(سانتیمتر)"
                  defaultValue={
                    defaultValues.hasOwnProperty("height")
                      ? Prolar.replaceNumberToPersion(defaultValues.height)
                      : ""
                  }
                  height={height}
                  getValue={x => {
                    defaultValues.height = x;
                    checkers.hei = true;
                  }}
                  viewStyle={{
                    width: "50%",
                    paddingLeft: space
                  }}
                />

                <PrimaryInput
                  keyboardType="numeric"
                  label="وزن(کیلوگرم)"
                  placeholder="وزن(کیلوگرم)"
                  defaultValue={
                    defaultValues.hasOwnProperty("weight")
                      ? Prolar.replaceNumberToPersion(defaultValues.weight)
                      : ""
                  }
                  height={height}
                  getValue={x => {
                    defaultValues.weight = x;
                    checkers.wei = true;
                  }}
                  viewStyle={{
                    width: "50%",
                    paddingRight: space
                  }}
                />
              </View>

              {defaultValues.insurance.length > 0 ? (
                <CustomPicker
                  viewStyle={rowStyle}
                  label="بیمه"
                  placeholder=""
                  selected={optionss.insurances.findIndex(
                    x => (x.label = defaultValues.insurance)
                  )}
                  list={optionss.insurances}
                  onSelect={item => (defaultValues.insurance = item.label)}
                />
              ) : (
                <CustomPicker
                  viewStyle={rowStyle}
                  label="بیمه"
                  placeholder=""
                  list={optionss.insurances}
                  onSelect={item => (defaultValues.insurance = item.label)}
                />
              )}

              {defaultValues.supplementaryInsurance.length > 0 ? (
                <CustomPicker
                  viewStyle={rowStyle}
                  label="بیمه تکمیلی"
                  placeholder=""
                  selected={optionss.supplementaryInsurances.findIndex(
                    x => (x.label = defaultValues.supplementaryInsurance)
                  )}
                  list={optionss.supplementaryInsurances}
                  onSelect={item =>
                    (defaultValues.supplementaryInsurance = item.label)
                  }
                />
              ) : (
                <CustomPicker
                  viewStyle={rowStyle}
                  label="بیمه تکمیلی"
                  placeholder=""
                  list={optionss.supplementaryInsurances}
                  onSelect={item =>
                    (defaultValues.supplementaryInsurance = item.label)
                  }
                />
              )}

              <View
                style={{
                  ...Prolar.style.rtlRow,
                  paddingTop: space,
                  justifyContent: "center",
                  margin: space
                }}
              >
                {this.state.visibleButton && (
                  <Button
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      alignContent: "center",
                      alignSelf: "center"
                    }}
                    color={Prolar.color.primary}
                    width={203}
                    height={height}
                    onPress={this.saveProfileInfo}
                  >
                    <Text
                      label="ثبت تغییرات"
                      color={Prolar.color.white}
                      fontSize={Prolar.size.font_md}
                    />
                  </Button>
                )}
                {this.state.visibleIndicator && (
                  <ActivityIndicator
                    size="large"
                    color={Prolar.color.primary}
                  />
                )}
              </View>
            </View>
          ) : (
            <ActivityIndicator size="large" color={Prolar.color.primary} />
          )}
        </CustomScrollView>
        <DropDown ref={ref => (this.dropdown = ref)} />
      </Container>
    );
  }
}

const styles = {
  pic: {
    alignSelf: "center",
    backgroundColor: "#F4F4F4",
    borderRadius: 50 * Prolar.size.unit,
    margin: 10 * Prolar.size.unit,
    width: 100 * Prolar.size.unit,
    height: 100 * Prolar.size.unit
  }
};
