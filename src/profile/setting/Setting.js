import React from 'react'
// import { Button } from "react-native";

import { Header, Left, Right, Body, Title } from 'native-base'
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native'

import View from '../../public/view/PrimaryView'
import Text from '../../public/text/PrimaryText'
import HeaderButton from '../../public/buttons/HeaderButton'
import { width, height } from '../../public/style/Dimension'
import Switch from './../../public/radioButton/Switch'
import Logout from './Logout'
import { Prolar } from '../../prolar/Prolar'
import CustomImage from '../../public/image/CustomImage'
import { AsyncStorage } from 'react-native'

const setStore = async (type, value) => {
  if (type == 'other') {
    await AsyncStorage.setItem('otherNotification', value)
  } else if (type == 'service') {
    await AsyncStorage.setItem('serviceNotification', value)
  }
}
export default class Setting extends React.Component {
  static navigationOptions = { header: null }
  constructor (props) {
    super(props)
    this.child = React.createRef()
    this.state = {
      serviceNotificationFlag: true,
      otherNotificationFlag: true,
      loadedVals: false
    }
    this.otherNotification = React.createRef()
    this.serviceNotification = React.createRef()
    this.getFlag()
  }
  getFlag = async () => {
    let service = await AsyncStorage.getItem('serviceNotification')
    let other = await AsyncStorage.getItem('otherNotification')
    let flag
    if (service != null) {
      flag = service == 'on'
      this.setState({ serviceNotificationFlag: flag })
    }
    if (other != null) {
      flag = other == 'on'
      this.setState({ otherNotificationFlag: flag })
    }
    this.setState({ loadedVals: true })
  }
  serviceSwitch = value => {
    onOff = value
    let flag = value == 'on'
    this.setState({ serviceNotificationFlag: flag })
    setStore('service', value)
  }

  otherSwitch = value => {
    onOff = value

    let flag = value == 'on'
    this.setState({ otherNotificationFlag: flag })
    setStore('other', value)
  }

  goBack = () => {
    const { navigate } = this.props.navigation
    navigate('Profile')
  }
  goAboutUs = () => {
    const { navigate } = this.props.navigation
    navigate('AboutUs')
  }

  EditProfilePage = () => {
    const { navigate } = this.props.navigation
    navigate('EditProfile')
  }
  onLogout = () => {
    this.child.current.handleOpen()
  }
  render () {
    return (
      <View flex={1} alignItems='stretch'>
        {/* <Header style={Prolar.style.header}>
          <Left style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={this.goBack}>
              <Icon name="arrow-back" style={Prolar.style.header.icon} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={Prolar.style.header.title}>تنظیمات</Title>
          </Body>
          <Right>
            <Icon name="settings" style={Prolar.style.header.icon} />
          </Right>
        </Header> */}

        <Header style={Prolar.style.header.container}>
          <Left style={Prolar.style.header.left_}>
            <HeaderButton name='arrow-back' onPress={this.goBack} />
          </Left>
          <Body style={Prolar.style.header.body_}>
            <Title style={Prolar.style.header.title}>تنظیمات</Title>
          </Body>
          <Right />
        </Header>
        {this.state.loadedVals == true ? (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View
              alignItems='stretch'
              flexDirection='column'
              style={{ marginTop: Prolar.size.unit * 15 }}
            >
              <View
                flexDirection='row'
                justifyContent='flex-end'
                alignItems='center'
                style={{
                  marginBottom: Prolar.size.unit * 15,
                  marginRight: Prolar.size.unit * 7
                }}
              >
                <Text
                  style={{
                    marginTop: Prolar.size.unit * 3,
                    marginRight: Prolar.size.unit * 7
                  }}
                  label='اعلان ها'
                  color='#97A2A7'
                  fontSize={Prolar.size.font_md}
                />
                <CustomImage
                  width={21}
                  height={24}
                  style={{ marginRight: Prolar.size.unit * 10 }}
                  src={require('../../../assets/icons/notificationDark.png')}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  this.serviceNotification.current.handleSwitch()
                }}
              >
                <View
                  flexDirection='row'
                  style={{ display: 'flex', ...styles.list }}
                >
                  <View alignItems='center' justifyContent='flex-start'>
                    <Switch
                      ref={this.serviceNotification}
                      state={this.state.serviceNotificationFlag}
                      getValue={this.serviceSwitch}
                    />
                  </View>
                  <View
                    style={{ flexGrow: 4 }}
                    alignItems='flex-end'
                    justifyContent='center'
                  >
                    <Text
                      style={{
                        marginTop: Prolar.size.unit * 0,
                        marginRight: Prolar.size.unit * 10
                      }}
                      label='اعلان رسیدن سرویس‌ دهنده به مسیر'
                      color='#4F616E'
                      fontSize={Prolar.size.font_md}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.otherNotification.current.handleSwitch()
                }}
              >
                <View flexDirection='row' style={styles.list3}>
                  <View alignItems='center' justifyContent='flex-start'>
                    <Switch
                      state={this.state.otherNotificationFlag}
                      ref={this.otherNotification}
                      getValue={this.otherSwitch}
                    />
                  </View>
                  <View
                    style={{ flexGrow: 4 }}
                    alignItems='flex-end'
                    justifyContent='center'
                  >
                    <Text
                      style={{
                        marginTop: Prolar.size.unit * 0,
                        marginRight: Prolar.size.unit * 10
                      }}
                      label='سایر اعلان‌ها'
                      color='#97A2A7'
                      fontSize={Prolar.size.font_md}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.EditProfilePage}>
                <View
                  style={[
                    Prolar.style.rtlRow,
                    styles.list,
                    {
                      display: 'flex',
                      marginRight: 5 * Prolar.size.unit,
                      paddingTop: 0,
                      paddingBottom: 0,
                      marginTop: 20 * Prolar.size.unit
                    }
                  ]}
                >
                  <CustomImage
                    width={35}
                    height={35}
                    style={{ margin: Prolar.size.unit * 15 }}
                    src={require('../../../assets/icons/people.png')}
                  />
                  <View style={[Prolar.style.rtlCol]}>
                    <Text
                      label='ویرایش حساب کاربری'
                      color={Prolar.color.gray6}
                      fontSize={Prolar.size.font_md}
                    />
                    <Text
                      label='ویرایش عکس، ایمیل و تمامی اطلاعات حساب شما'
                      color={Prolar.color.gray5}
                      fontSize={Prolar.size.font_sm}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.goAboutUs}>
                <View
                  style={[
                    Prolar.style.rtlRow,
                    styles.list2,
                    {
                      display: 'flex',
                      marginRight: 5 * Prolar.size.unit,
                      paddingTop: 0,
                      paddingBottom: 0
                    }
                  ]}
                >
                  <CustomImage
                    width={35}
                    height={35}
                    style={{ margin: Prolar.size.unit * 15 }}
                    src={require('../../../assets/icons/info.png')}
                  />
                  <View style={[Prolar.style.rtlCol]}>
                    <Text
                      label='درباره تیک‌طب'
                      color={Prolar.color.gray6}
                      fontSize={Prolar.size.font_md}
                    />
                    <Text
                      label='درباره اپلیکیشن تیک‌طب و ساختار و قوانین آن'
                      color={Prolar.color.gray5}
                      fontSize={Prolar.size.font_sm}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onLogout}>
                <View
                  style={[
                    Prolar.style.rtlRow,
                    styles.list3,
                    {
                      display: 'flex',
                      marginRight: 5 * Prolar.size.unit,
                      paddingTop: 0,
                      paddingBottom: 0
                    }
                  ]}
                >
                  <CustomImage
                    width={35}
                    height={35}
                    style={{ margin: Prolar.size.unit * 15 }}
                    src={require('../../../assets/icons/signout.png')}
                  />
                  <Logout ref={this.child} />
                  <View style={[Prolar.style.rtlCol]}>
                    <Text
                      label='خروج از حساب کاربری'
                      color={Prolar.color.gray6}
                      fontSize={Prolar.size.font_md}
                    />
                    <Text
                      label='خداحافظی سخت ولی گاهی لازم است'
                      color={Prolar.color.gray5}
                      fontSize={Prolar.size.font_sm}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <ActivityIndicator size='large' color={Prolar.color.primary} />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    margin: 15
  },
  mBottom: {
    marginBottom: 20
  },
  list: {
    borderTopColor: '#C0D4E3',
    width: width * 0.972222222,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 2,
    borderTopLeftRadius: 17 * Prolar.size.unit,
    borderTopRightRadius: 17 * Prolar.size.unit,
    borderLeftColor: '#C0D4E3',
    borderRightColor: '#C0D4E3',
    borderBottomColor: '#C0D4E3',
    paddingRight: Prolar.size.unit * 5,
    paddingTop: Prolar.size.unit * 15,
    marginLeft: Prolar.size.unit * 5,
    paddingBottom: Prolar.size.unit * 15
  },
  list2: {
    borderTopColor: '#C0D4E3',
    width: width * 0.972222222,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderLeftColor: '#C0D4E3',
    borderRightColor: '#C0D4E3',
    borderBottomColor: '#C0D4E3',
    paddingRight: Prolar.size.unit * 5,
    paddingTop: Prolar.size.unit * 15,
    marginLeft: Prolar.size.unit * 5,
    paddingBottom: Prolar.size.unit * 15
  },
  list3: {
    borderTopColor: '#C0D4E3',
    width: width * 0.972222222,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomLeftRadius: 17 * Prolar.size.unit,
    borderBottomRightRadius: 17 * Prolar.size.unit,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderLeftColor: '#C0D4E3',
    borderRightColor: '#C0D4E3',
    borderBottomColor: '#C0D4E3',
    paddingRight: Prolar.size.unit * 5,
    paddingTop: Prolar.size.unit * 15,
    marginLeft: Prolar.size.unit * 5,
    paddingBottom: Prolar.size.unit * 15
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C0D4E3',
    borderRadius: 10,
    shadowColor: '#C0D4E3',
    shadowOffset: { width: 10, height: 27 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    paddingHorizontal: 12,
    margin: 5,
    width: width * 0.972222222,
    height: height * 0.09375
  },
  contentContainer: {
    paddingVertical: 5
  }
})
