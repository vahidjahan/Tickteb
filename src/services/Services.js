import React from 'react'

//
// https://testapi.tickteb.com/assets/svg/artworksMainVisitAlt.svg
// https://testapi.tickteb.com/assets/svg/artworksMainNurseAlt.svg

import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Button,
  Icon,
  Body,
  Title,
  Badge,
  Text,
  View as NView
} from 'native-base'
import {
  TouchableOpacity,
  Platform,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  Alert
} from 'react-native'
import { Prolar } from '../prolar/Prolar'
import CustomImage from '../public/image/CustomImage'
import TextProlar from './../public/text/PrimaryText'
import View from './../public/view/PrimaryView'
import HeaderButton from '../public/buttons/HeaderButton'
import SVGImage from 'react-native-remote-svg'
import SuccessfulRequest from './serviceRequest/SuccessfulRequest'
import { ServicesApi } from './serviceRequest/ServicesApi'
import DropDown from '../public/dropDown/DropDown'
import { GetUserNotificationApi } from '../notifications/GetUserNotificationApi'

export default class Services extends React.Component {
  static navigationOptions = { header: null }

  constructor (props) {
    super(props)
    this.state = {}
  }

  renderList = () => (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row-reverse',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {this.state.list.map((item, i) => (
          <View
            key={i}
            flex={0}
            justifyContent='center'
            alignItems='center'
            style={{ flexBasis: '45%', marginTop: 20 * Prolar.size.unit }}
          >
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={Prolar.navigator(this, 'ServiceRequest', i + 0)}
            >
              <View style={{ height: Prolar.screen.width * 0.3, flex: 0 }}>
                <SVGImage
                  style={{
                    width: Prolar.screen.width * 0.3,
                    height: Prolar.screen.width * 0.3
                  }}
                  source={{
                    uri: Prolar.api.domain +
                      (item.imageUrl != undefined ? item.imageUrl.trim() : '')
                  }}
                />
              </View>
              <TextProlar
                label={item.title}
                color={Prolar.color.serviceTitle}
                fontSize={Prolar.size.font_lg}
                fontFamily={Prolar.fontFamily}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  )

  call = () => {
    ServicesApi().then(res => {
      if (res.errors.length == 0) {
        Prolar.data.services = res.data
        this.setState({ list: res.data })
      } else {
        this.setState({ msg: res.errors })
        setTimeout(this.call, 4000)
      }
    })
  }

  componentWillMount = () => {
    Prolar.data.services = undefined
    this.state.list = undefined
    this.call()
    this.callNotification()
  }

  callNotification = () => {
    GetUserNotificationApi().then(res => {
      if (res.errors.length == 0) {
        this.setState({ notifNum: res.data.unreadedCount })
      }
    })
  }

  render () {
    let success

    if (
      this.props.navigation.state.params != undefined &&
      this.props.navigation.state.params.status === 'ok'
    ) {
      this.props.navigation.state.params = undefined
      success = true
    }

    const { navigate } = this.props.navigation

    let color = Prolar.color.white
    if (Prolar.isIOS) {
      color = Prolar.color.primary
    }

    // alert(Prolar.api.domain + data[0].imageUrl)
    return (
      <Container>
        {this.state.msg != undefined &&
          <DropDown
            message={this.state.msg.map(mess => `${mess} \n`)}
            alertType='warn'
            title='خطا'
          />}

        <SuccessfulRequest state_={{ vis: success }} />

        <Header style={Prolar.style.header.container}>
          <Left style={Prolar.style.header.left_}>
            <TouchableOpacity
              onPress={Prolar.navigator(this, 'Notifications')}
              style={{
                padding: 5,
                height: '100%',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <CustomImage
                style={{
                  height: '60%',
                  width: 19 * Prolar.size.unit,
                  tintColor: color
                }}
                src={require('../../assets/icons/notificationDark.png')}
              />
          {this.state.notifNum != undefined && this.state.notifNum != 0
                ? <NView
                  info
                  style={{
                    backgroundColor: '#EF3E4A',
                    position: 'relative',
                    zIndex: 10,
                    top: '-60%',
                    left: 10 * Prolar.size.unit,
                    width: 6 * Prolar.size.unit,
                    height: 6 * Prolar.size.unit,
                    borderWidth: 1 * Prolar.size.unit,
                    borderColor: Prolar.style.header.container
                        .backgroundColor,
                    borderRadius: 5 * Prolar.size.unit
                  }}
                  />
                : null}
            </TouchableOpacity>
          </Left>

          <Body
            style={[Prolar.style.header.body_, { justifyContent: 'center' }]}
          >
            <CustomImage
              style={{
                width: '100%',
                height: '60%',
                tintColor: color
              }}
              src={require('../../assets/icons/NavLogo.png')}
            />
          </Body>

          <Right style={Prolar.style.header.right_}>
            <HeaderButton
              name='menu'
              color={color}
              onPress={Prolar.navigator(this, 'Profile')}
            />
          </Right>
        </Header>

        <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
          {this.state.list === undefined
            ? <ActivityIndicator size='large' color={Prolar.color.primary} />
            : this.renderList()}
        </Content>

      </Container>
    )
  }
}

const styles = {
  iconColor: {
    color: Platform.OS === 'android'
      ? Prolar.color.white
      : Prolar.color.primary
  }
}
