import React, { Component } from 'react'

import View from './../public/view/PrimaryView'
import CustomImage from './../public/image/CustomImage'
import { AuthStore } from '../redux/providers/AuthStore'
import { StyleSheet, ImageBackground } from 'react-native'
import RNExitApp from 'react-native-exit-app'

export default class Splash extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    const { navigate } = this.props.navigation
    setTimeout(() => {
      navigate('SplashLoading')
    }, 1000)
  }

  render () {
    return (
      <ImageBackground
        source={require('../../assets/icons/BG.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.contentView}>
          <CustomImage
            src={require('../../assets/icons/splashLogo.png')}
            width={148}
            height={122}
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
