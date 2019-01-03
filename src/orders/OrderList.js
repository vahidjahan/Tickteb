import React from "react";
import { Body, Card, CardItem } from "native-base";
import { ScrollView, TouchableOpacity } from "react-native";

import View from "../public/view/PrimaryView";
import Text from "../public/text/PrimaryText";
import { Prolar } from "../prolar/Prolar";
import CustomImage from "../public/image/CustomImage";

export default class OrderList extends React.Component {
  static navigationOptions = { header: null };

  render() {
    const { order } = this.props;
    const { navigate } = this.props.navigation;
    return (
      <ScrollView
        contentContainerStyle={{
          margin: 10 * Prolar.size.unit,
          paddingBottom: 50 * Prolar.size.unit
        }}
      >
        {order.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              navigate("DoneAndStarred", {
                item
              });
            }}
          >
            <Card style={Prolar.style.card}>
              <CardItem style={Prolar.style.cardItem}>
                <Body style={Prolar.style.rtlCol}>
                  {/* row1 */}
                  <View style={[Prolar.style.rtlRow, Prolar.style.row]}>
                    <CustomImage width={24} height={24} src={item.statusIcon} />

                    <Text
                      label={item.status}
                      color={item.statusColor}
                      fontSize={Prolar.size.font_md}
                      style={Prolar.style.spaceText}
                    />

                    <Text
                      viewStyle={{
                        alignItems: "flex-start",
                        flexGrow: 4
                      }}
                      label={item.code}
                      color={Prolar.color.gray4}
                      fontSize={Prolar.size.font_md}
                    />
                  </View>

                  {/* row2 */}
                  <View style={[Prolar.style.rtlRow, Prolar.style.row]}>
                    <Text
                      label={item.services[0].title}
                      color={Prolar.color.gray6}
                      fontSize={Prolar.size.font_md}
                    />
                    <Text
                      viewStyle={{
                        alignItems: "flex-start",
                        flexGrow: 4
                      }}
                      label={item.date}
                      color={Prolar.color.gray5}
                      fontSize={Prolar.size.font_md}
                    />
                  </View>
                </Body>
              </CardItem>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}
