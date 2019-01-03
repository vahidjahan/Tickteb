import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Icon,
  Body,
  Title
} from "native-base";
import { ScrollView, View } from "react-native";
import Hr from "react-native-hr-component";

import Text from "../public/text/PrimaryText";
import CustomImage from "../public/image/CustomImage";
import { Prolar } from "../prolar/Prolar";

export default class CancelledByCustomerTimeline extends Component {
  static navigationOptions = { header: null };
  constructor() {
    super();
    this.data = [
      {
        time: "۱۳:۳۴",
        title: "ثبت شده",
        icon: require("../../assets/icons/sitBlackdone.png"),
        color: Prolar.color.gray6
      },
      {
        time: "۱۳:۳۴",
        title: "پذیرفته شده توسط مرتضی رضایی",
        icon: require("../../assets/images/reza.jpg"),
        color: Prolar.color.gray6
      },
      {
        time: "۱۳:۳۴",
        title: "سرویس‌گیرنده درخواست را لغو کرد",
        icon: require("../../assets/icons/sitRedcancell.png"),
        color: Prolar.color.error
      }
    ];
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
        <Hr
          hrStyles={{ marginTop: 5, marginBottom: 5 }}
          hrPadding={5}
          lineColor={Prolar.color.gray1}
          width={1 * Prolar.size.unit}
          text={order.date}
          textStyles={Prolar.style.seenMessage}
        />

        {this.data.map((item, i) => (
          <View key={i} style={Prolar.style.rtlCol}>
            <View
              alignItems="flex-start"
              style={[
                Prolar.style.rtlRow,
                Prolar.style.row,
                { alignItems: "flex-start" }
              ]}
            >
              <CustomImage
                width={20}
                height={20}
                src={item.icon}
                style={{ borderRadius: 100 * Prolar.size.unit }}
              />
              {/* <View style={{ flex: 15 }}> */}
              <Text
                viewStyle={{ flex: 15 }}
                label={item.title}
                color={item.color}
                fontSize={Prolar.size.font_md}
                style={[Prolar.style.spaceText]}
              />
              {/* </View> */}

              <Text
                viewStyle={{ alignItems: "flex-start", flexGrow: 4 }}
                label={item.time}
                color={Prolar.color.gray4}
                fontSize={Prolar.size.font_md}
              />
            </View>

            {i != this.data.length - 1 ? (
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
            ) : (
              undefined
            )}
          </View>
        ))}
      </ScrollView>
    );
  }
}
