import React from "react";
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Card,
  CardItem,
  Thumbnail
} from "native-base";

import { TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";

import View from "../public/view/PrimaryView";
import Text from "../public/text/PrimaryText";
import CustomImage from "../public/image/CustomImage";
import { CheckOrdersApi } from "./CheckOrdersApi";

import { Prolar } from "../prolar/Prolar";
import HeaderButton from "../public/buttons/HeaderButton";

export default class CheckOrders extends React.Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }

  componentWillMount() {
    CheckOrdersApi().then(res => this.setState({ data: res }));
  }

  goBack = () => {
    const { navigate } = this.props.navigation;
    navigate("Profile");
  };

  goOngoingOrderPage = () => {
    const { navigate } = this.props.navigation;
    navigate("Ongoing");
  };

  componentWillMount() {
    CheckOrdersApi().then(res => {
      this.setState({ data: res });
    });
  }

  goBack = () => {
    const { navigate } = this.props.navigation;
    navigate("Profile");
  };

  goOngoingOrderPage = () => {
    const { navigate } = this.props.navigation;
    navigate("Ongoing");
  };

  render() {
    const { navigate } = this.props.navigation;
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
            <Title style={Prolar.style.header.title}>پیگیری سرویس‌ها</Title>
          </Body>
          <Right />
        </Header>

        <Content padder style={Prolar.style.content}>
          <ScrollView
            style={{
              paddingBottom: 50 * Prolar.size.unit
            }}
          >
            {this.state.data.data !== undefined ? (
              this.state.data.data.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    navigate("Ongoing", {
                      item
                    });
                  }}
                >
                  <Card style={Prolar.style.card}>
                    <CardItem style={Prolar.style.cardItem}>
                      <Body style={Prolar.style.rtlCol}>
                        {/* row1 */}
                        <View style={[Prolar.style.rtlRow, Prolar.style.row]}>
                          <CustomImage
                            width={24}
                            height={24}
                            src={Prolar.getStatusInfo(item.status).iconUrl}
                          />

                          <Text
                            label={item.status}
                            color={Prolar.getStatusInfo(item.status).color}
                            fontSize={Prolar.size.font_md}
                            style={Prolar.style.spaceText}
                          />

                          <Text
                            viewStyle={{
                              alignItems: "flex-start",
                              flexGrow: 4
                            }}
                            label={Prolar.replaceNumberToPersion(item.date)}
                            color={Prolar.color.gray5}
                            fontSize={Prolar.size.font_md}
                          />
                        </View>

                        {/* row2 */}
                        <View style={[Prolar.style.rtlRow, Prolar.style.row]}>
                          <Text
                            viewStyle={{
                              alignItems: "flex-start",
                              flexGrow: 4
                            }}
                            label={
                              "#" +
                              Prolar.replaceNumberToPersion(item.trackingCode)
                            }
                            color={Prolar.color.gray4}
                            fontSize={Prolar.size.font_md}
                          />
                        </View>

                        {/* row3 */}
                        <View style={[Prolar.style.rtlRow, Prolar.style.row]}>
                          <Thumbnail
                            source={{
                              uri:
                                Prolar.api.domain +
                                (item.imageUrl != undefined
                                  ? item.imageUrl.trim()
                                  : "")
                            }}
                            style={{
                              width: Prolar.size.unit * 30,
                              height: Prolar.size.unit * 30,
                              borderRadius:
                                (Prolar.isIOS ? 50 : 100) * Prolar.size.unit
                            }}
                          />

                          <Text
                            label={item.fullName}
                            color={Prolar.color.gray6}
                            fontSize={Prolar.size.font_md}
                            style={Prolar.style.spaceText}
                          />
                        </View>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              ))
            ) : (
              <ActivityIndicator size="large" color={Prolar.color.primary} />
            )}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
