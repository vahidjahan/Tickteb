import React from 'react'
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Thumbnail,
  Tab,
  Tabs,
  TabHeading,
  ScrollableTab
} from 'native-base'
import View from '../public/view/PrimaryView'
import Text from '../public/text/PrimaryText'
import CustomImage from '../public/image/CustomImage'
import { TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import HeaderButton from '../public/buttons/HeaderButton'

// import OrderList from "./OrderList";
import { Prolar } from '../prolar/Prolar'
import { GetUserPatientListWithUserApi } from './GetUserPatientListWithUserApi'
import { GetCompleteServiceListApi } from './OrdersApi'
import { MedicalConsiderationsApi } from '../profile/MedicalConsiderationsApi'
import Orders from './Orders'

export default class compeleteServiceList extends React.Component {
  static navigationOptions = { header: null }

  constructor (props) {
    super(props)
    this.state = {
      data: undefined,
      error: undefined
    }
  }

  goBack = () => {
    const { navigate } = this.props.navigation
    navigate('Profile')
  }

  componentWillMount () {
    MedicalConsiderationsApi().then(res => {
      if (res.errors.length === 0) {
        this.setState({ data: res.data })
      } else {
        this.setState({ error: res.error }, () => {})
      }
    })
  }
  componentDidMount () {
    this.state.data != undefined &&
      setTimeout(
        this.tabs.goToPage.bind(this.tabs, this.state.data.length - 1),
        300
      )
  }

  render () {

    return (
      <Container>
        <Header style={Prolar.style.header.container}>
          <Left style={Prolar.style.header.left_}>
            <HeaderButton name='arrow-back' onPress={this.goBack} />
          </Left>
          <Body style={Prolar.style.header.body_}>
            <Title style={Prolar.style.header.title}>سرویس های تکمیل شده</Title>
          </Body>
          <Right />
        </Header>
        <Content style={Prolar.style.content}>
          {this.state.data ? (
            this.state.data.length !== 0 ? (
              <Tabs
                ref={c => {
                  this.tabs = c
                }}
                renderTabBar={() => (
                  <ScrollableTab style={medicalConsiderationStyle.tabSchroll} />
                )}
                initialPage={0}
              >
                {this.state.data.map((item, i) => (
                  <Tab
                    key={i}
                    style={medicalConsiderationStyle.tab}
                    heading={
                      <TabHeading style={medicalConsiderationStyle.tabHeading}>
                        <Thumbnail
                          // source={item.imageUrl}
                          source={
                            item.imageUrl != undefined &&
                            item.imageUrl.length > 1
                              ? {
                                uri: Prolar.api.domain + item.imageUrl.trim()
                              }
                              : require('./../../assets/icons/profilePicEdit.png')
                          }
                        />
                        <Text
                          label={item.fullName}
                          color={
                            Prolar.isIOS
                              ? Prolar.color.gray6
                              : Prolar.color.white
                          }
                          fontSize={Prolar.size.font_sm}
                          style={{ textAlign: 'center' }}
                        />
                      </TabHeading>
                    }
                  >
                    <Orders navigation={this.props.navigation} item={item} />
                  </Tab>
                ))}
              </Tabs>
            ) : (
              <ActivityIndicator size='large' color={Prolar.color.primary} />
            )
          ) : (
            <ActivityIndicator size='large' color={Prolar.color.primary} />
          )}
        </Content>
      </Container>
    )
  }
}
const medicalConsiderationStyle = {
  tab: {
    backgroundColor: '#fafafa'
  },
  tabHeading: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: Prolar.isIOS ? Prolar.color.white : Prolar.color.primary
  },
  tabSchroll: {
    paddingTop: 6 * Prolar.size.unit,
    flexDirection: 'row-reverse',
    backgroundColor: Prolar.isIOS ? Prolar.color.white : Prolar.color.primary,
    height: 100 * Prolar.size.unit
  }
}
