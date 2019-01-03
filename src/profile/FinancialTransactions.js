import React from "react";

import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Card,
  CardItem
} from "native-base";
import CustomImage from "./../public/image/CustomImage";
import { TouchableOpacity, ScrollView } from "react-native";
import { FinancialTransactionApi } from "./FinancialTransactionApi";
import View from "../public/view/PrimaryView";
import Text from "../public/text/PrimaryText";
import ChargeWallet from "./ChargeWallet";
import { Prolar } from "../prolar/Prolar";
import HeaderButton from "./../public/buttons/HeaderButton";
import { ActivityIndicator } from "react-native";
import { GetMasterInformationApi } from "../services/serviceRequest/GetMasterInformationApi";

export default class FinancialTransaction extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      data: []
    };
  }

  onChargeWallet = () => {
    this.child.current.handleOpen();
  };

  componentDidMount() {
    FinancialTransactionApi(Prolar.data.authorization).then(res => {
      this.setState({ data: res });
    });
    GetMasterInformationApi().then(res => {
      if (res.errors.length != 0) {
        this.setState({ msg: res.errors });
        setTimeout(this.call, 4000);
      } else {
        this.setState({ info: res.data });
      }
    });
  }

  render() {
    let item = this.state.data.data;
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
            <Title style={Prolar.style.header.title}>تراکنش‌ مالی</Title>
          </Body>
          <Right />
        </Header>
        <ScrollView
          contentContainerStyle={{
            margin: 10 * Prolar.size.unit,
            paddingBottom: 80 * Prolar.size.unit
          }}
        >
          {item !== undefined ? (
            item.map((a, i) => (
              <Card key={i} style={Prolar.style.card}>
                <CardItem style={Prolar.style.cardItem}>
                  <Body style={Prolar.style.rtlCol}>
                    <View style={[Prolar.style.rtlRow, styles.row]}>
                      <View style={Prolar.style.rtlRow}>
                        {a.amount < 0 ? (
                          <CustomImage
                            width={21}
                            height={21}
                            src={require("../../assets/icons/payed.png")}
                          />
                        ) : (
                          <CustomImage
                            width={21}
                            height={21}
                            src={require("../../assets/icons/earned.png")}
                          />
                        )}
                        <Text
                          label={
                            a.amount < 0
                              ? Prolar.rialLabel(a.amount * -1)
                              : Prolar.rialLabel(a.amount)
                          }
                          color={Prolar.color.gray6}
                          fontSize={Prolar.size.font_lg}
                          style={styles.spaceText}
                        />
                      </View>
                      <Text
                        label={Prolar.replaceNumberToPersion(a.dateShamsi)}
                        color={Prolar.color.gray4}
                        fontSize={Prolar.size.font_md}
                        style={{
                          marginLeft: 5 * Prolar.size.unit
                        }}
                      />
                    </View>
                    <View style={[Prolar.style.rtlRow, styles.row]}>
                      <View style={Prolar.style.rtlRow}>
                        <Text
                          label={a.typeString}
                          color={Prolar.color.gray4}
                          fontSize={Prolar.size.font_md}
                        />
                      </View>
                      <View>
                        {a.trackingNumber ? (
                          <Text
                            label={`#${Prolar.replaceNumberToPersion(
                              a.trackingNumber
                            )}`}
                            color={Prolar.color.gray4}
                            fontSize={Prolar.size.font_md}
                          />
                        ) : (
                          <Text />
                        )}
                      </View>
                    </View>
                  </Body>
                </CardItem>
              </Card>
            ))
          ) : (
            <ActivityIndicator size="large" color={Prolar.color.primary} />
          )}
        </ScrollView>
        <View
          alignItems="center"
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 1000
          }}
        >
          <View
            style={styles.wallet}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <TouchableOpacity onPress={this.onChargeWallet}>
              <CustomImage
                width={35}
                height={35}
                src={require("../../assets/icons/add.png")}
                style={{ marginRight: 5 }}
              />
            </TouchableOpacity>
            <Text
              style={{ marginRight: Prolar.size.unit * 10 }}
              label={
                this.state.info
                  ? Prolar.rialLabel(Math.floor(this.state.info.credit), false)
                  : ""
              }
              color={Prolar.color.gray6}
              fontSize={Prolar.size.font_md}
            />

            <CustomImage
              onPress={this.onChargeWallet}
              width={35}
              height={35}
              style={{ marginRight: Prolar.size.unit * 5 }}
              src={require("../../assets/icons/wallet.png")}
            />
          </View>

          <ChargeWallet ref={this.child} />
        </View>
      </Container>
    );
  }
}

const styles = {
  row: {
    margin: 5 * Prolar.size.unit,
    marginBottom: 10 * Prolar.size.unit
  },
  spaceText: {
    marginRight: 8 * Prolar.size.unit
  },
  wallet: {
    backgroundColor: "#E7ECF0",
    borderRadius: 24 * Prolar.size.unit,
    marginTop: 10 * Prolar.size.unit,
    marginBottom: 15 * Prolar.size.unit,
    width: 200 * Prolar.size.unit,
    height: 50 * Prolar.size.unit
  }
};
