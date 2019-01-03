import React, { Component } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import Hr from "react-native-hr-component";

import Text from "../public/text/PrimaryText";
import CustomImage from "../public/image/CustomImage";
import { Prolar } from "../prolar/Prolar";
import Button from "../public/buttons/PrimaryButton";
import { GetRequestDetailApi } from "./GetRequestDetailApi";
import { GetRequestProviderApi } from "./GetRequestProviderApi";
import ModalForRating from "./ModalForRating";

export default class OngoingtimeLine extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      timeLine: undefined,
      providerData: undefined,
      success: undefined,
      showModalForRate: false,
      rateIndex: -1
    };

    this.child = React.createRef();
  }
  getDataFromChild = index => {
    this.setState({ rateIndex: index });
  };

  goBack = () => {
    const { navigate } = this.props.navigation;
    navigate("Profile");
  };

  componentWillMount() {
    if (
      this.props.navigateProp.state.params != undefined &&
      this.props.navigateProp.state.params.item.status ===
        "تکمیل - فاکتور صادر شده"
    ) {
      this.props.navigateProp.state.params = undefined;
      this.setState({ success: true });
    }
    GetRequestDetailApi(this.props.order.id).then(res => {
      this.setState({ timeLine: res });
    });

    GetRequestProviderApi(this.props.order.id).then(res => {
      this.setState({ providerData: res });
    });
  }

  render() {
    let success = this.state.success;
    let orderID = this.props.order.id;
    let navigateProp = this.props.navigateProp;

    return this.state.timeLine ? (
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "flex-start",
          margin: 10 * Prolar.size.unit,
          paddingBottom: 50
        }}
      >
        {this.state.timeLine.data.timeLine.map((item, i) => (
          <View key={i} style={Prolar.style.rtlCol}>
            {i === 0 ? (
              <Hr
                hrStyles={{ marginTop: 5, marginBottom: 5 }}
                hrPadding={5}
                lineColor={Prolar.color.gray1}
                width={1 * Prolar.size.unit}
                text={Prolar.replaceNumberToPersion(
                  item.dateShamsi.substring(0, 10)
                )}
                textStyles={Prolar.style.seenMessage}
              />
            ) : this.state.timeLine.data.timeLine[i - 1].dateShamsi.substring(
              0,
              10
            ) !== item.dateShamsi.substring(0, 10) ? (
              <Hr
                hrStyles={{ marginTop: 5, marginBottom: 5 }}
                hrPadding={5}
                lineColor={Prolar.color.gray1}
                width={1 * Prolar.size.unit}
                text={Prolar.replaceNumberToPersion(
                  item.dateShamsi.substring(0, 10)
                )}
                textStyles={Prolar.style.seenMessage}
              />
            ) : (
              undefined
            )}

            {item.status === "انصراف توسط کاربر" ? (
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <CustomImage
                  width={20}
                  height={20}
                  src={require("../../assets/icons/sitCancel.png")}
                  style={{
                    borderRadius: 100 * Prolar.size.unit
                  }}
                />
                <Text
                  label={item.status}
                  color={Prolar.color.gray6}
                  fontSize={Prolar.size.font_md}
                  style={[Prolar.style.spaceText]}
                />
                <Text
                  viewStyle={{
                    alignItems: "flex-start",
                    flexGrow: 4
                  }}
                  label={Prolar.replaceNumberToPersion(
                    item.dateShamsi.substring(13, 18)
                  )}
                  color={Prolar.color.gray4}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            ) : item.status === "انصراف توسط سرویس دهنده" ? (
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <CustomImage
                  width={20}
                  height={20}
                  src={require("../../assets/icons/sitRedcancell.png")}
                  style={{
                    borderRadius: 100 * Prolar.size.unit
                  }}
                />
                <Text
                  label={item.status}
                  color={Prolar.color.gray6}
                  fontSize={Prolar.size.font_md}
                  style={[Prolar.style.spaceText]}
                />
                <Text
                  viewStyle={{
                    alignItems: "flex-start",
                    flexGrow: 4
                  }}
                  label={Prolar.replaceNumberToPersion(
                    item.dateShamsi.substring(13, 18)
                  )}
                  color={Prolar.color.gray4}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            ) : item.status === "سرویس دهنده یافت نشد" ? (
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <CustomImage
                  width={20}
                  height={20}
                  src={require("../../assets/icons/info.png")}
                  style={{
                    borderRadius: 100 * Prolar.size.unit
                  }}
                />
                <Text
                  label={item.status}
                  color={Prolar.color.gray6}
                  fontSize={Prolar.size.font_md}
                  style={[Prolar.style.spaceText]}
                />
                <Text
                  viewStyle={{
                    alignItems: "flex-start",
                    flexGrow: 4
                  }}
                  label={Prolar.replaceNumberToPersion(
                    item.dateShamsi.substring(13, 18)
                  )}
                  color={Prolar.color.gray4}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            ) : item.status === "ثبت شده" ? (
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <CustomImage
                  width={20}
                  height={20}
                  src={require("../../assets/icons/sitDone.png")}
                  style={{
                    borderRadius: 100 * Prolar.size.unit
                  }}
                />
                <Text
                  label={item.status}
                  color={Prolar.color.gray6}
                  fontSize={Prolar.size.font_md}
                  style={[Prolar.style.spaceText]}
                />
                <Text
                  viewStyle={{
                    alignItems: "flex-start",
                    flexGrow: 4
                  }}
                  label={Prolar.replaceNumberToPersion(
                    item.dateShamsi.substring(13, 18)
                  )}
                  color={Prolar.color.gray4}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            ) : item.status === "پذیرفته شده" ? (
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <CustomImage
                  width={20}
                  height={20}
                  src={
                    this.state.providerData
                      ? this.state.providerData.data.imageUrl !== null
                        ? {
                            uri:
                              Prolar.api.domain +
                              this.state.providerData.data.imageUrl
                          }
                        : require("./../../assets/icons/profilePicEdit.png")
                      : undefined
                  }
                  style={{
                    borderRadius: 100 * Prolar.size.unit
                  }}
                />
                <Text
                  label={item.status}
                  color={Prolar.color.gray6}
                  fontSize={Prolar.size.font_md}
                  style={[Prolar.style.spaceText]}
                />
                <Text
                  viewStyle={{
                    alignItems: "flex-start",
                    flexGrow: 4
                  }}
                  label={Prolar.replaceNumberToPersion(
                    item.dateShamsi.substring(13, 18)
                  )}
                  color={Prolar.color.gray4}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            ) : item.status === "در راه" ? (
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <CustomImage
                  width={20}
                  height={20}
                  src={
                    this.state.providerData
                      ? this.state.providerData.data.imageUrl !== null
                        ? {
                            uri:
                              Prolar.api.domain +
                              this.state.providerData.data.imageUrl
                          }
                        : require("./../../assets/icons/profilePicEdit.png")
                      : undefined
                  }
                  style={{
                    borderRadius: 100 * Prolar.size.unit
                  }}
                />
                <Text
                  label={item.status}
                  color={Prolar.color.gray6}
                  fontSize={Prolar.size.font_md}
                  style={[Prolar.style.spaceText]}
                />
                <Text
                  viewStyle={{
                    alignItems: "flex-start",
                    flexGrow: 4
                  }}
                  label={Prolar.replaceNumberToPersion(
                    item.dateShamsi.substring(13, 18)
                  )}
                  color={Prolar.color.gray4}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            ) : item.status === "در انتظار اجازه شروع" ? (
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <CustomImage
                  width={20}
                  height={20}
                  src={
                    this.state.providerData
                      ? this.state.providerData.data.imageUrl !== null
                        ? {
                            uri:
                              Prolar.api.domain +
                              this.state.providerData.data.imageUrl
                          }
                        : require("./../../assets/icons/profilePicEdit.png")
                      : undefined
                  }
                  style={{
                    borderRadius: 100 * Prolar.size.unit
                  }}
                />
                <Text
                  label={item.status}
                  color={Prolar.color.gray6}
                  fontSize={Prolar.size.font_md}
                  style={[Prolar.style.spaceText]}
                />
                <Text
                  viewStyle={{
                    alignItems: "flex-start",
                    flexGrow: 4
                  }}
                  label={Prolar.replaceNumberToPersion(
                    item.dateShamsi.substring(13, 18)
                  )}
                  color={Prolar.color.gray4}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            ) : item.status === "شروع شده" ? (
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <CustomImage
                  width={20}
                  height={20}
                  src={
                    this.state.providerData
                      ? this.state.providerData.data.imageUrl !== null
                        ? {
                            uri:
                              Prolar.api.domain +
                              this.state.providerData.data.imageUrl
                          }
                        : require("./../../assets/icons/profilePicEdit.png")
                      : undefined
                  }
                  style={{
                    borderRadius: 100 * Prolar.size.unit
                  }}
                />
                <Text
                  label={item.status}
                  color={Prolar.color.gray6}
                  fontSize={Prolar.size.font_md}
                  style={[Prolar.style.spaceText]}
                />
                <Text
                  viewStyle={{
                    alignItems: "flex-start",
                    flexGrow: 4
                  }}
                  label={Prolar.replaceNumberToPersion(
                    item.dateShamsi.substring(13, 18)
                  )}
                  color={Prolar.color.gray4}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            ) : item.status === "تکمیل - فاکتور صادر شده" ? (
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <CustomImage
                  width={20}
                  height={20}
                  src={require("../../assets/icons/sitDone.png")}
                  style={{
                    borderRadius: 100 * Prolar.size.unit
                  }}
                />
                <Text
                  label={item.status}
                  color={Prolar.color.success}
                  fontSize={Prolar.size.font_md}
                  style={[Prolar.style.spaceText]}
                />
                <Text
                  viewStyle={{
                    alignItems: "flex-start",
                    flexGrow: 4
                  }}
                  label={Prolar.replaceNumberToPersion(
                    item.dateShamsi.substring(13, 18)
                  )}
                  color={Prolar.color.gray4}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            ) : item.status === "تکمیل - پرداخت شده" ? (
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <CustomImage
                  width={20}
                  height={20}
                  src={require("../../assets/icons/sitDone.png")}
                  style={{
                    borderRadius: 100 * Prolar.size.unit
                  }}
                />
                <Text
                  label={item.status}
                  color={Prolar.color.success}
                  fontSize={Prolar.size.font_md}
                  style={[Prolar.style.spaceText]}
                />
                <Text
                  viewStyle={{
                    alignItems: "flex-start",
                    flexGrow: 4
                  }}
                  label={Prolar.replaceNumberToPersion(
                    item.dateShamsi.substring(13, 18)
                  )}
                  color={Prolar.color.gray4}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            ) : item.status === "تکمیل - ثبت گزارش" ? (
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <CustomImage
                  width={20}
                  height={20}
                  src={require("../../assets/icons/sitDone.png")}
                  style={{
                    borderRadius: 100 * Prolar.size.unit
                  }}
                />
                <Text
                  label={item.status}
                  color={Prolar.color.success}
                  fontSize={Prolar.size.font_md}
                  style={[Prolar.style.spaceText]}
                />
                <Text
                  viewStyle={{
                    alignItems: "flex-start",
                    flexGrow: 4
                  }}
                  label={Prolar.replaceNumberToPersion(
                    item.dateShamsi.substring(13, 18)
                  )}
                  color={Prolar.color.gray4}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <CustomImage
                  width={20}
                  height={20}
                  src={require("../../assets/icons/sitDone.png")}
                  style={{
                    borderRadius: 100 * Prolar.size.unit
                  }}
                />
                <Text
                  label={item.status}
                  color={Prolar.color.success}
                  fontSize={Prolar.size.font_md}
                  style={[Prolar.style.spaceText]}
                />
                <Text
                  viewStyle={{
                    alignItems: "flex-start",
                    flexGrow: 4
                  }}
                  label={Prolar.replaceNumberToPersion(
                    item.dateShamsi.substring(13, 18)
                  )}
                  color={Prolar.color.gray4}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            )}

            {i === this.state.timeLine.data.timeLine.length - 1 ? (
              undefined
            ) : (
              <View style={[Prolar.style.rtlRow, { paddingRight: 20 }]}>
                <View
                  style={{
                    borderRightColor: Prolar.color.gray1,
                    borderRightWidth: 3,
                    height: 30 * Prolar.size.unit,
                    marginRight: 14 * Prolar.size.unit
                  }}
                />
              </View>
            )}
    
            {item.status === "تکمیل - فاکتور صادر شده" && (
              <Button
                color={Prolar.color.primary}
                width={203}
                height={50}
                onPress={() => {
                  this.setState({ showModalForRate: true });
                }}
                style={{
                  alignSelf: "center",
                  marginBottom: 25 * Prolar.size.unit,
                  marginTop: 25 * Prolar.size.unit
                }}
              >
                <Text
                  label="امتیاز به سرویس دهنده"
                  color={Prolar.color.white}
                  fontSize={Prolar.size.font_md}
                />
              </Button>
            )}
          </View>
        ))}

        {this.state.showModalForRate && (
          <ModalForRating
            navigateProp={navigateProp}
            state_={{ vis: success }}
            requestId={orderID}
            getDataFromChild={this.getDataFromChild}
          />
        )}
      </ScrollView>
    ) : (
      <ActivityIndicator size="large" color={Prolar.color.primary} />
    );
  }
}
