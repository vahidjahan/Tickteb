import React from "react";
import { Thumbnail } from "native-base";
import { ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";

import View from "../public/view/PrimaryView";
import Button from "../public/buttons/PrimaryButton";
import Text from "../public/text/PrimaryText";
import { Prolar } from "../prolar/Prolar";
import CustomImage from "../public/image/CustomImage";
import CustomCard from "../public/customCard/CustomCard";
import { GetRequestProviderApi } from "./GetRequestProviderApi";
import { GetRequestServiceItemApi } from "./GetRequestServiceItemApi";
import SVGImage from "react-native-remote-svg";
import { GetRequestLocationApi } from "./GetRequestLocationApi";
import DoneAndStarredRatePopup from "./DoneAndStarredRatePopup";
import call from "react-native-phone-call";

export default class MyDoneOrders extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      providerData: {},
      requestServiceItem: {},
      requestLocation: {},
      msg: undefined
    };
  }

  componentDidMount() {
    GetRequestProviderApi(this.props.order.id).then(res => {

      this.setState({ providerData: res }, () => {});
    });
    GetRequestServiceItemApi(this.props.order.id).then(res => {
      this.setState({ requestServiceItem: res }, () => {});
    });
    GetRequestLocationApi(this.props.order.id).then(res => {
      this.setState({ requestLocation: res }, () => {});
    });
  }

  render() {
    const { order } = this.props;

    return (
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "flex-start",
          margin: 10 * Prolar.size.unit,
          paddingBottom: 50
        }}
      >
        {/* ************************ code *****************************/}
        <View style={[Prolar.style.rtlRow, Prolar.style.row]}>
          <Text
            label="شناسه"
            color={Prolar.color.gray4}
            fontSize={Prolar.size.font_md}
          />
          <Text
            viewStyle={{ alignItems: "flex-start", flexGrow: 4 }}
            label={"#" + Prolar.replaceNumberToPersion(order.trackingCode)}
            color={Prolar.color.gray6}
            fontSize={Prolar.size.font_md}
          />
        </View>
        {/* ************************ date and time *****************************/}
        <View style={[Prolar.style.rtlRow, Prolar.style.row]}>
          <Text
            label="تاریخ و زمان"
            color={Prolar.color.gray4}
            fontSize={Prolar.size.font_md}
          />
          <Text
            viewStyle={{ alignItems: "flex-start", flexGrow: 4 }}
            label={Prolar.replaceNumberToPersion(order.date)}
            color={Prolar.color.gray6}
            fontSize={Prolar.size.font_md}
          />
        </View>
        {/* ************************ status card *****************************/}
        <CustomCard
          bdColor={Prolar.getStatusInfo(order.status).color}
          style={[
            Prolar.style.rtlRow,
            Prolar.style.row,
            Prolar.style.spaceCard
          ]}
        >
          <CustomImage
            width={24}
            height={24}
            src={Prolar.getStatusInfo(order.status).iconUrl}
          />
          <Text
            label={order.status}
            color={Prolar.getStatusInfo(order.status).color}
            fontSize={Prolar.size.font_md}
            style={Prolar.style.spaceText}
          />
        </CustomCard>
        {/** *********************** service provider  *****************************/}
        <View style={[Prolar.style.rtlRow, Prolar.style.row]}>
          <Text
            label="سرویس دهنده"
            color={Prolar.color.gray4}
            fontSize={Prolar.size.font_md}
          />
        </View>
        {/* ************************ service provider card *****************************/}
        {this.state.providerData ? (
          this.state.providerData.data ? (
            <CustomCard
              height={90}
              style={[
                Prolar.style.rtlRow,
                Prolar.style.row,
                Prolar.style.spaceCard
              ]}
            >
              <Thumbnail
                style={{
                  width: Prolar.size.unit * 50,
                  height: Prolar.size.unit * 50,
                  borderRadius: 25 * Prolar.size.unit
                }}
                source={
                  this.state.providerData.data.imageUrl !== null
                    ? {
                        uri:
                          Prolar.api.domain +
                          this.state.providerData.data.imageUrl
                      }
                    : require("./../../assets/icons/profilePicEdit.png")
                }
              />
              <View style={[Prolar.style.rtlCol, Prolar.style.spaceText]}>
                <Text
                  label={this.state.providerData.data.name}
                  color={Prolar.color.gray11}
                  fontSize={Prolar.size.font_md}
                />
                <Text
                  label={
                    this.state.providerData.data.jobTitle !== null
                      ? this.state.providerData.data.jobTitle
                      : ""
                  }
                  color={Prolar.color.gray4}
                  fontSize={Prolar.size.font_sm}
                />
              </View>
              <TouchableOpacity
                justifyContent="center"
                alignItems="center"
                style={{
                  borderWidth: 0,
                  borderColor: Prolar.color.cardBorder,
                  width: 75 * Prolar.size.unit,
                  height: 60 * Prolar.size.unit
                }}
                onPress={() => {
                  const args = {
                    number: this.state.providerData.data.phoneNumber, // String value with the number to call
                    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
                  };
                  call(args).catch(console.error);
                }}
              >
                <View
                  justifyContent="center"
                  alignItems="center"
                  style={{ backgroundColor: "transparent" }}
                >
                  <CustomImage
                    width={40}
                    height={40}
                    src={require("../../assets/icons/call.png")}
                  />
                </View>
              </TouchableOpacity>
            </CustomCard>
          ) : (
            <CustomCard
              height={90}
              style={[
                Prolar.style.rtlRow,
                Prolar.style.row,
                Prolar.style.spaceCard
              ]}
            >
              <View style={[Prolar.style.rtlCol, Prolar.style.spaceText]}>
                <Text
                  label={"فعلا کسی به درخواست شما جواب نداده است"}
                  color={Prolar.color.gray11}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            </CustomCard>
          )
        ) : (
          <ActivityIndicator size="large" color={Prolar.color.primary} />
        )}
        {/* ************************ request services *****************************/}
        <View style={[Prolar.style.rtlRow, Prolar.style.row]}>
          <Text
            label="سرویس های درخواستی"
            color={Prolar.color.gray4}
            fontSize={Prolar.size.font_md}
          />
        </View>
        {/* ************************ request services card *****************************/}
        {this.state.requestServiceItem ? (
          this.state.requestServiceItem.data ? (
            this.state.requestServiceItem.data.map((service, i) => (
              <View
                key={i}
                style={[
                  Prolar.style.rtlRow,
                  i == 0
                    ? Prolar.style.card1
                    : i == service.length - 1
                      ? Prolar.style.card3
                      : Prolar.style.card2
                ]}
              >
                <SVGImage
                  style={{
                    width: Prolar.size.unit * 50,
                    height: Prolar.size.unit * 50
                  }}
                  source={{
                    uri:
                      service.imageUrl == undefined
                        ? ""
                        : Prolar.api.domain + service.imageUrl.trim()
                  }}
                />

                <View
                  style={[
                    Prolar.style.rtlCol,
                    Prolar.style.spaceText,
                    { marginLeft: 25 }
                  ]}
                >
                  <Text
                    label={Prolar.replaceNumberToPersion(
                      service.title +
                        (service.quantity > 1
                          ? " (" +
                            Prolar.replaceNumberToPersion(service.quantity) +
                            " مورد" +
                            ")"
                          : "")
                    )}
                    color={Prolar.color.primary}
                    fontSize={Prolar.size.font_md}
                  />
                </View>
                <TouchableOpacity onPress={this.goBack} />
              </View>
            ))
          ) : (
            <ActivityIndicator size="large" color={Prolar.color.primary} />
          )
        ) : (
          <ActivityIndicator size="large" color={Prolar.color.primary} />
        )}
        {/* ************************ address *****************************/}
        <View style={[Prolar.style.rtlRow, Prolar.style.row]}>
          <Text
            label="آدرس"
            color={Prolar.color.gray4}
            fontSize={Prolar.size.font_md}
          />
        </View>
        {/* ************************ adress card *****************************/}
        {this.state.requestLocation ? (
          this.state.requestLocation.data ? (
            <CustomCard height={110} style={Prolar.style.rtlCol}>
              <View
                style={[
                  Prolar.style.rtlRow,
                  Prolar.style.row,
                  {
                    margin: 0,
                    paddingTop: 15 * Prolar.size.unit
                  }
                ]}
              >
                <CustomImage
                  style={{ marginRight: 10 * Prolar.size.unit }}
                  width={20}
                  height={17}
                  src={require("./../../assets/icons/pin.png")}
                />
                <Text
                  label={
                    this.state.requestLocation.data.title
                      ? this.state.requestLocation.data.title
                      : ""
                  }
                  color={Prolar.color.primary}
                  fontSize={Prolar.size.font_md}
                  style={Prolar.style.spaceText}
                />
              </View>
              <Text
                viewStyle={{
                  margin: 10 * Prolar.size.unit
                  // flexGrow: 2
                }}
                style={{ marginRight: 10 * Prolar.size.unit }}
                label={`${this.state.requestLocation.data.description} ${
                  this.state.requestLocation.data.detail
                }`}
                color={Prolar.color.gray6}
                fontSize={Prolar.size.font_md}
              />
            </CustomCard>
          ) : (
            <ActivityIndicator size="large" color={Prolar.color.primary} />
          )
        ) : (
          <ActivityIndicator size="large" color={Prolar.color.primary} />
        )}
        {order.status != undefined &&
          order.status.search("تکمیل") > -1 &&
          order.status != "تکمیل - امتیاز داده شده" && (
            <DoneAndStarredRatePopup id={this.props.order.id} />
          )}
      </ScrollView>
    );
  }
}
