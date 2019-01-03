import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Prolar } from '../../prolar/Prolar'

export default class PrimaryText extends Component {
  static navigationOptions = { header: null }

  render () {
    const { fontSize, color, label, style, viewStyle } = this.props

    return (
      <View style={viewStyle}>
        <Text
          style={[
            {
              fontFamily: 'IRANSansMobile',
              fontSize: fontSize,
              color: color,
              alignItems: 'center',
              letterSpacing: 0,
              textAlign: 'right'
            },
            style
          ]}
        >
          {label}
        </Text>
      </View>
    )
  }
}

PrimaryText.defaultProps = {
  fontSize: Prolar.size.icon_md,
  color: Prolar.color.white,
  label: 'test'
}
