import React, { Component } from 'react'
import CustomImage from '../public/image/CustomImage'
import Text from './../public/text/PrimaryText'
import { Prolar } from './../prolar/Prolar'
import View from './../public/view/PrimaryView'
import { AuthStore } from '../redux/providers/AuthStore'
import { StyleSheet, ImageBackground } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'

export default class SplashLoading extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    const unsub = AuthStore.subscribe(this.checkNext)
  }
  navigateReset = routeName => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: routeName })]
    })

    this.props.navigation.dispatch(resetAction)
  }

  checkNext = () => {
    const { navigate } = this.props.navigation
    let obj = AuthStore.getState()
    if (obj.hasOwnProperty('authData')) {
      if (obj.authData.token != 'null') {
        Prolar.setToken(obj.authData.token)
        this.navigateReset('Services')
      } else {
        navigate('CheckUser')
      }
    } else {
      navigate('CheckUser')
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.checkNext()
    }, 3000)
  }

  render () {
    return (
      <ImageBackground
        source={require('../../assets/icons/BG.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.contentView}>
          <Text
            label='به تیک طب خوش آمدید'
            color={Prolar.color.gray7}
            fontSize={Prolar.size.font_lg}
            style={{ marginBottom: Prolar.size.unit * 34 }}
          />

          <CustomImage
            src={require('../../assets/icons/splashLogo.png')}
            width={148}
            height={122}
            style={{ marginBottom: Prolar.size.unit * 34 }}
          />

          <Text
            label='مراقب سلامتی شما'
            color={Prolar.color.gray7}
            fontSize={Prolar.size.font_lg}
            // style={{ marginBottom: Prolar.size.unit * 147 }}
          />
          <Text
            label='لطفا صبر کنید ...'
            color={Prolar.color.gray7}
            fontSize={Prolar.size.font_md}
          />
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
  contentView: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
