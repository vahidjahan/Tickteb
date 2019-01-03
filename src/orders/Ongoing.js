import React from 'react'
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
  Tabs,
  ScrollableTab
} from 'native-base'
import { TouchableOpacity } from 'react-native'

import MyOngoingOrder from './MyOngoinOrder'
import OngoingTimeline from './OngoingTimeline'
import OngoingInovice from './OngoingInovice'
import OngoingOrderDetails from './OngoingOrderDetails'
import { Prolar } from '../prolar/Prolar'
import HeaderButton from '../public/buttons/HeaderButton'

export default class Ongoing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      headerTitle: 'درخواست من'
    }
    this.params = this.props.navigation.state.params
    this._tabs = React.createRef()
  }
  static navigationOptions = { header: null }

  goBack = () => {
    Prolar.navigator(this, -1)()
    // const { navigate } = this.props.navigation;
    // navigate("CheckOrders");
  }

  componentDidMount () {
    setTimeout(this._tabs.goToPage.bind(this._tabs, 3))
  }

  render () {
    let navigateProp = this.props.navigation
    return (
      <Container>
        <Header style={Prolar.style.header.container}>
          <Left style={Prolar.style.header.left_}>
            <HeaderButton name='arrow-back' onPress={this.goBack} />
          </Left>
          <Body style={Prolar.style.header.body_}>
            <Title style={Prolar.style.header.title}>
              {this.state.headerTitle}
            </Title>
          </Body>
          <Right />
        </Header>

        <Tabs
          // renderTabBar={() => <ScrollableTab />}
          tabBarPosition='bottom'
          tabBarUnderlineStyle={Prolar.style.tabBarUnderlineStyle}
          ref={component => (this._tabs = component)}
          initialPage={3}
          onChangeTab={({ i }) => {
            switch (i) {
              case 3: {
                this.setState({ headerTitle: 'درخواست من' })
                break
              }
              case 2: {
                this.setState({ headerTitle: 'مراحل انجام' })
                break
              }
              case 1: {
                this.setState({ headerTitle: 'نتایج' })
                break
              }
              case 0: {
                this.setState({ headerTitle: 'فاکتور' })
                break
              }
            }
          }}
        >
          <Tab
            heading='فاکتور'
            textStyle={Prolar.style.textStyle}
            activeTextStyle={Prolar.style.activeText}
            activeTabStyle={Prolar.style.activeTabStyle}
            tabBarUnderlineStyle={Prolar.style.tabBarUnderlineStyle}
            tabStyle={Prolar.style.tabStyle}
          >
            <OngoingInovice activity={this} order={this.params.item} />
          </Tab>

          <Tab
            heading='نتایج'
            textStyle={Prolar.style.textStyle}
            activeTextStyle={Prolar.style.activeText}
            activeTabStyle={Prolar.style.activeTabStyle}
            tabBarUnderlineStyle={Prolar.style.tabBarUnderlineStyle}
            tabStyle={Prolar.style.tabStyle}
          >
            <OngoingOrderDetails order={this.params.item} activity={this} />
          </Tab>

          <Tab
            heading='مراحل انجام'
            textStyle={Prolar.style.textStyle}
            activeTextStyle={Prolar.style.activeText}
            activeTabStyle={Prolar.style.activeTabStyle}
            tabBarUnderlineStyle={Prolar.style.tabBarUnderlineStyle}
            tabStyle={Prolar.style.tabStyle}
          >
            <OngoingTimeline
              navigateProp={navigateProp}
              activity={this}
              order={this.params.item}
            />
          </Tab>
          <Tab
            heading='درخواست من'
            textStyle={Prolar.style.textStyle}
            activeTextStyle={Prolar.style.activeText}
            activeTabStyle={Prolar.style.activeTabStyle}
            tabBarUnderlineStyle={Prolar.style.tabBarUnderlineStyle}
            tabStyle={Prolar.style.tabStyle}
          >
            <MyOngoingOrder activity={this} order={this.params.item} />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}
