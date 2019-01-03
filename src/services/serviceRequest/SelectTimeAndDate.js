import React, { Component } from "react";
import { Container, Header, Left, Right, Icon, Body, Title } from "native-base";
import { StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import moment from "moment-jalaali";
import View from "../../public/view/PrimaryView";
import { headerStyle } from "./../../public/style/HeaderStyle";
import { width } from "./../../public/style/Dimension";
import Text from "./../../public/text/PrimaryText";
import { Prolar } from "../../prolar/Prolar";
import CustomImage from "../../public/image/CustomImage";
import { DateField } from "./../../public/dateField/DateField";
import IconButton from "./../../public/buttons/PrimaryIconButton";
import CustomTimePicker from "../../public/picker/CustomTimePicker";
import HeaderButton from "./../../public/buttons/HeaderButton";
import PrimaryView from "../../public/view/PrimaryView";
import DateTools from "../../public/dateTools/DateTools";

export default class SelectTimeAndDate extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    date = new Date();
    date = moment(date).format("YYYY/MM/DD");

    this.state = {
      selectedDate: "",
      key: 0,
      location: undefined,
      to: 0,
      from: 0
    };
    this.dateRefFunc = React.createRef();
    this.data = this.props.navigation.state.params;
    this.child = React.createRef();
    this.child1 = React.createRef();
    this.child2 = React.createRef();
  }

  setFromValue = v => {
    this.setState({ from: v });
  };

  setToValue = v => {
    this.setState({ to: v });
  };

  setDate = data => {
    this.setState({ selectedDate: data, selectedDateStr: data });
  };

  changeTomorrow = () => {
    this.setState({
      selectedDate: "tomorrow",
      key: Date.now()
    });
  };

  changeToday = () => {
    this.setState({
      selectedDate: "today",
      key: Date.now()
    });
  };

  onSelectLocation = location => {
    this.data.location = location;
    this.setState({ location: location });
  };

  renderLocation = () =>
    this.state.location != undefined && (
      <View
        style={{
          borderWidth: 1,
          borderColor: Prolar.color.cardBorder,
          borderRadius: Prolar.size.unit * 10,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          padding: 16 * Prolar.size.unit,
          flex: 0,
          marginTop: 7 * Prolar.size.unit
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            flex: 0,
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <Text
            label={this.data.location.title}
            color={Prolar.color.primary}
            fontSize={Prolar.size.font_md}
            style={{ marginRight: Prolar.size.unit * 10 }}
          />
          <CustomImage
            width={20}
            height={20}
            src={require("../../../assets/icons/pin.png")}
          />
        </View>

        <Text
          label={
            this.data.location.description.replace(/,/g, "،") +
            "، " +
            this.data.location.detail
          }
          color={Prolar.color.gray6}
          fontSize={Prolar.size.font_md}
          style={{ marginTop: 10 * Prolar.size.unit }}
        />
      </View>
    );

  renderDate = () =>
    this.state.selectedDate != undefined &&
    this.state.selectedDate != "" && (
      <View
        style={{
          height: Prolar.size.unit * 60,
          paddingRight: 16 * Prolar.size.unit,
          borderWidth: 1,
          borderRadius: Prolar.size.unit * 10,
          borderColor: Prolar.color.cardBorder,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 7 * Prolar.size.unit
        }}
      >
        <Text
          label={Prolar.dateTools.getJalaliString(
            this.state.selectedDate,
            "mdw"
          )}
          color={Prolar.color.primary}
          fontSize={Prolar.size.font_lg}
          viewStyle={{
            position: "absolute",
            left: 0,
            right: 0
          }}
          style={{ textAlign: "center" }}
        />

        <CustomImage
          width={20}
          height={20}
          src={require("../../../assets/icons/calendar.png")}
        />
      </View>
    );

  render() {
    this.data = this.props.navigation.state.params;
    let radius = 10;
    return (
      <Container>
        <Header style={Prolar.style.header.container}>
          <Left style={Prolar.style.header.left_}>
            <HeaderButton
              name="arrow-back"
              onPress={Prolar.navigator(this, -1)}
            />
          </Left>
          <Body style={Prolar.style.header.body_}>
            <Title style={Prolar.style.header.title}>
              انتخاب زمان و مکان سرویس
            </Title>
          </Body>
          <Right />
        </Header>
        <ScrollView>
          <View
            style={{
              margin: Prolar.size.unit * 10,
              justifyContent: "flex-start",
              alignItems: "flex-end",
              paddingBottom: 100 * Prolar.size.unit
            }}
          >
            <Text
              color={Prolar.color.gray4}
              label="مکان"
              fontSize={Prolar.size.font_md}
              style={{ margin: 7 * Prolar.size.unit }}
            />

            <View
              style={{
                flexDirection: "row",
                flex: 0
              }}
            >
              <TouchableOpacity
                onPress={Prolar.navigator(this, "SelectLocationFromMap", {
                  onSelect: this.onSelectLocation
                })}
                style={{
                  borderColor: Prolar.color.cardBorder,
                  flex: 1,
                  borderWidth: 1,
                  borderTopLeftRadius: Prolar.size.unit * radius,
                  borderBottomLeftRadius: Prolar.size.unit * radius,
                  padding: Prolar.size.unit * 5,
                  paddingTop: Prolar.size.unit * 15,
                  paddingBottom: Prolar.size.unit * 15,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    shrink: 1
                  }}
                >
                  <Text
                    label="مکان جدید"
                    color={Prolar.color.gray6}
                    fontSize={Prolar.size.font_md}
                    style={{ marginRight: Prolar.size.unit * 15 }}
                  />
                  <CustomImage
                    width={25}
                    height={25}
                    src={require("../../../assets/icons/littlePin.png")}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={Prolar.navigator(
                  this,
                  "FavoriteAddresses",
                  this.onSelectLocation
                )}
                style={{
                  borderColor: Prolar.color.cardBorder,
                  flex: 1,
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopRightRadius: Prolar.size.unit * radius,
                  borderBottomRightRadius: Prolar.size.unit * radius,
                  padding: Prolar.size.unit * 5,
                  paddingTop: Prolar.size.unit * 15,
                  paddingBottom: Prolar.size.unit * 15,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    shrink: 1
                  }}
                >
                  <Text
                    label="آدرس‌های منتخب"
                    color={Prolar.color.gray6}
                    fontSize={Prolar.size.font_md}
                    style={{ marginRight: Prolar.size.unit * 15 }}
                  />
                  <CustomImage
                    width={25}
                    height={25}
                    src={require("../../../assets/icons/star.png")}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {this.renderLocation()}

            <Text
              label="زمان"
              color={Prolar.color.gray4}
              fontSize={Prolar.size.font_md}
              style={{
                margin: 7 * Prolar.size.unit,
                marginTop: 25 * Prolar.size.unit
              }}
            />

            <View flexDirection="row" style={{ flex: 0 }}>
              <TouchableOpacity
                justifyContent="center"
                alignItems="center"
                style={{
                  borderWidth: 1,
                  borderRightWidth: 0,
                  borderColor: Prolar.color.cardBorder,
                  borderTopLeftRadius: Prolar.size.unit * radius,
                  borderBottomLeftRadius: Prolar.size.unit * radius,

                  height: 60 * Prolar.size.unit,
                  flex: 1,
                  shrink: 1
                }}
                onPress={() => {
                  this.setState({ selectedDate: "" });
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
                      moment(new Date()).format("YYYY/MM/DD"),
                      ""
                    )}
                    maxDate={Prolar.dateTools.getGregorianToJalaliString(
                      moment(
                        new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000)
                      ).format("YYYY/MM/DD"),
                      ""
                    )}
                    key={this.state.key}
                    viewStyle={{
                      marginRight: 10 * Prolar.size.unit
                    }}
                    textFieldStyle={[
                      Prolar.style.textStyle,
                      {
                        fontSize: Prolar.size.font_sm,
                        color: Prolar.color.gray6
                      }
                    ]}
                    defaultDate={
                      this.state.selectedDate == "today" ||
                      this.state.selectedDate == "tomorrow"
                        ? ""
                        : this.state.selectedDate
                    }
                    width={Prolar.size.unit * 350}
                    height={Prolar.size.unit * 280}
                    ref={this.dateRefFunc}
                    getValue={this.setDate}
                  />

                  <CustomImage
                    width={20}
                    height={20}
                    src={require("../../../assets/icons/calendar.png")}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                justifyContent="center"
                alignItems="center"
                style={{
                  borderWidth: 1,
                  borderColor: Prolar.color.cardBorder,
                  width: 75 * Prolar.size.unit,
                  height: 60 * Prolar.size.unit
                }}
                onPress={this.changeTomorrow}
              >
                <View
                  justifyContent="center"
                  alignItems="center"
                  style={{ backgroundColor: "transparent" }}
                >
                  <Text
                    label="فردا"
                    color={Prolar.color.gray6}
                    fontSize={
                      Prolar.size.font_md *
                      (this.state.selectedDate == "tomorrow" ? 1.3 : 1)
                    }
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                justifyContent="center"
                alignItems="center"
                style={{
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderColor: Prolar.color.cardBorder,
                  borderTopRightRadius: Prolar.size.unit * radius,
                  borderBottomRightRadius: Prolar.size.unit * radius,
                  width: 75 * Prolar.size.unit,
                  height: 60 * Prolar.size.unit
                }}
                onPress={this.changeToday}
              >
                <View
                  justifyContent="center"
                  alignItems="center"
                  style={{ backgroundColor: "transparent" }}
                >
                  <Text
                    label="امروز"
                    color={Prolar.color.gray6}
                    fontSize={
                      Prolar.size.font_md *
                      (this.state.selectedDate == "today" ? 1.3 : 1)
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>

            {this.renderDate()}

            <Text
              label="ساعت"
              color={Prolar.color.gray4}
              fontSize={Prolar.size.font_md}
              style={{
                margin: 7 * Prolar.size.unit,
                marginTop: 25 * Prolar.size.unit
              }}
            />

            <View
              flexDirection="row"
              style={{
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  height: Prolar.size.unit * 60,
                  borderRadius: Prolar.size.unit * radius,
                  borderColor: Prolar.color.cardBorder,
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 5 * Prolar.size.unit
                }}
                onPress={() => {
                  this.child1.current._showDateTimePicker();
                }}
              >
                <Text
                  label={
                    this.state.to == 0
                      ? "تا ساعت"
                      : Prolar.replaceNumberToPersion(this.state.to)
                  }
                  color={
                    this.state.to == 0
                      ? Prolar.color.gray6
                      : Prolar.color.primary
                  }
                  fontSize={Prolar.size.font_md}
                />
                <CustomTimePicker
                  getValue={this.setToValue}
                  initialDate={new Date(Date.now() + 4 * 60 * 60 * 1000)}
                  ref={this.child1}
                />
              </TouchableOpacity>

              <CustomImage
                width={16}
                height={16}
                src={require("../../../assets/icons/to.png")}
                style={{
                  margin: 3 * Prolar.size.unit,
                  tintColor: Prolar.color.gray5
                }}
              />

              <TouchableOpacity
                justifyContent="center"
                alignItems="flex-end"
                style={{
                  borderWidth: 1,
                  height: Prolar.size.unit * 60,
                  borderRadius: Prolar.size.unit * radius,
                  borderColor: Prolar.color.cardBorder,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 5 * Prolar.size.unit
                }}
                onPress={() => {
                  this.child2.current._showDateTimePicker();
                }}
              >
                <Text
                  label={
                    this.state.from == 0
                      ? "از ساعت"
                      : Prolar.replaceNumberToPersion(this.state.from)
                  }
                  color={
                    this.state.from == 0
                      ? Prolar.color.gray6
                      : Prolar.color.primary
                  }
                  fontSize={Prolar.size.font_md}
                />
                <CustomTimePicker
                  getValue={this.setFromValue}
                  initialDate={new Date(Date.now() + 1 * 60 * 60 * 1000)}
                  ref={this.child2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            flex: 0,
            backgroundColor: "transparent",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: 30 * Prolar.size.unit,

            alignItems: "center",
            zIndex: 1000
          }}
        >
          <IconButton
            onPress={() => {
              this.data.date = this.state.selectedDate;
              this.data.from = this.state.from;
              this.data.to = this.state.to;
              Prolar.navigator(this, "Invoice", this.data)();
            }}
            iconColor={Prolar.color.white}
            icon="arrow-forward"
            width={200}
            color={
              this.isValid() == false
                ? Prolar.color.gray1
                : Prolar.color.primary
            }
            disabled={this.isValid() == false}
            height={50}
            iconStyle={{ fontSize: Prolar.size.font_xl }}
          >
            <View
              color="transparent"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              style={{ marginLeft: Prolar.size.unit * 20 }}
            >
              <Text
                label="ادامه"
                color={Prolar.color.white}
                fontSize={Prolar.size.font_md}
              />
            </View>
          </IconButton>
        </View>
      </Container>
    );
  }

  isValid = () => {
    return (
      this.state.selectedDate != "" &&
      this.state.location != undefined &&
      this.state.from != 0 &&
      this.state.to != 0
    );
  };
}
