import React from "react";
// import { Button } from "react-native";
import {
  Container,
  Header,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Tab,
  Tabs
} from "native-base";
import { TouchableOpacity } from "react-native";
import HeaderButton from "../public/buttons/HeaderButton";
import OngoingInovice from "./OngoingInovice";
import OngoingOrderDetails from "./OngoingOrderDetails";
import { Prolar } from "../prolar/Prolar";
import DoneAndStarredTimeline from "./DoneAndStarredTimeline";
import MyDoneOrders from "./MyDoneOrders";
import DoneInvoice from "./DoneInvoice";

export default class DoneAndStarred extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTitle: "درخواست من"
    };
    this.params = this.props.navigation.state.params;
  }
  static navigationOptions = { header: null };

  goBack = () => {
    Prolar.navigator(this, -1)();
    // const { navigate } = this.props.navigation;
    // navigate("Orders");
  };

  componentDidMount() {
    setTimeout(this._tabs.goToPage.bind(this._tabs, 3));
  }

  render() {
    return (
      <Container>
        <Header style={Prolar.style.header.container}>
          <Left style={Prolar.style.header.left_}>
            <HeaderButton name="arrow-back" onPress={this.goBack} />
          </Left>
          <Body style={Prolar.style.header.body_}>
            <Title style={Prolar.style.header.title}>
              {this.state.headerTitle}
            </Title>
          </Body>
          <Right />
        </Header>

        <Tabs
          tabBarPosition="bottom"
          tabBarUnderlineStyle={Prolar.style.tabBarUnderlineStyle}
          ref={component => (this._tabs = component)}
          initialPage={3}
          onChangeTab={({ i }) => {
            switch (i) {
              case 3: {
                this.setState({ headerTitle: "درخواست من" });
                break;
              }
              case 2: {
                this.setState({ headerTitle: "مراحل انجام" });
                break;
              }
              case 1: {
                this.setState({ headerTitle: "نتایج" });
                break;
              }
              case 0: {
                this.setState({ headerTitle: "فاکتور" });
                break;
              }
            }
          }}
        >
          <Tab
            heading="فاکتور"
            textStyle={Prolar.style.textStyle}
            activeTextStyle={Prolar.style.activeText}
            activeTabStyle={Prolar.style.activeTabStyle}
            tabBarUnderlineStyle={Prolar.style.tabBarUnderlineStyle}
            tabStyle={Prolar.style.tabStyle}
          >
            <DoneInvoice order={this.params.item} />
          </Tab>

          <Tab
            heading="نتایج"
            textStyle={Prolar.style.textStyle}
            activeTextStyle={Prolar.style.activeText}
            activeTabStyle={Prolar.style.activeTabStyle}
            tabBarUnderlineStyle={Prolar.style.tabBarUnderlineStyle}
            tabStyle={Prolar.style.tabStyle}
          >
            <OngoingOrderDetails order={this.params.item} />
          </Tab>

          <Tab
            heading="مراحل انجام"
            textStyle={Prolar.style.textStyle}
            activeTextStyle={Prolar.style.activeText}
            activeTabStyle={Prolar.style.activeTabStyle}
            tabBarUnderlineStyle={Prolar.style.tabBarUnderlineStyle}
            tabStyle={Prolar.style.tabStyle}
          >
            <DoneAndStarredTimeline order={this.params.item} />
          </Tab>
          <Tab
            heading="درخواست من"
            textStyle={Prolar.style.textStyle}
            activeTextStyle={Prolar.style.activeText}
            activeTabStyle={Prolar.style.activeTabStyle}
            tabBarUnderlineStyle={Prolar.style.tabBarUnderlineStyle}
            tabStyle={Prolar.style.tabStyle}
          >
            <MyDoneOrders order={this.params.item} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
