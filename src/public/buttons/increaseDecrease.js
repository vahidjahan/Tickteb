import React from 'react'
import { Icon } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Prolar } from './../../prolar/Prolar'

import View from '../view/PrimaryView'
import Text from '../text/PrimaryText'
// import Text from '../../../native-base-theme/components/Text'

export default class IncreaseDecrease extends React.Component {
  static navigationOptions = { header: null }
  constructor (props) {
    super(props)

    this.state = {
      value: 0,
      init: true
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (
      nextProps.defaultValue != prevState.value &&
      nextProps.defaultValue != null &&
      nextProps.defaultValue &&
      prevState.init
    ) {
      return {
        value: nextProps.defaultValue,
        init: false
      }
    }
    return null
  }

  add = () => {
    let add = this.state.value + 1
    this.setState({ value: add }, () => {
      this.props.getValue(this.state.value)
    })
  }

  min = () => {
    let min = this.state.value - 1
    if (min >= 0) {
      this.setState({ value: min }, () => {
        this.props.getValue(this.state.value)
      })
    }
  }

  render () {
    return (
      <View
        flexDirection='row'
        justifyContent='space-around'
        alignItems='center'
        style={{
          width: Prolar.size.unit * 111,
          height: Prolar.size.unit * 30,
          borderWidth: Prolar.size.unit * 1,
          borderColor: Prolar.color.cardBorder,
          borderRadius: Prolar.size.unit * 15,
          marginLeft: Prolar.size.unit * 10
        }}
      >
        <TouchableOpacity onPress={this.min}>
          <Icon
            type='Entypo'
            name='minus'
            style={{
              color: Prolar.color.gray6,
              fontSize: Prolar.size.unit * 20
            }}
          />
        </TouchableOpacity>

        <Text
          label={Prolar.replaceNumberToPersion(this.state.value)}
          color={Prolar.color.gray6}
        />

        <TouchableOpacity onPress={this.add}>
          <Icon
            type='Entypo'
            name='plus'
            style={{
              color: Prolar.color.gray6,
              fontSize: Prolar.size.unit * 20
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
