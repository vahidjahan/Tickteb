import React, { Component } from 'react'
import { View, Text } from 'react-native'
import CodeInput from 'react-native-confirmation-code-input'
import { Prolar } from './../../prolar/Prolar'

export class LittleRoundedInput extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={[this.props.viewStyle, { height: Prolar.size.unit * 60 }]}>
        <CodeInput
          ref='codeInputRef'
          size={Prolar.size.unit * 40}
          keyboardType='numeric'
          codeLength={6}
          cellBorderWidth={0}
          className={'border-circle'}
          codeInputStyle={{
            fontSize: Prolar.size.font_xl,
            backgroundColor: '#e7ecf0',
            color: '#283946'
          }}
          onFulfill={code => this.props.getCode(code)}
        />
      </View>
    )
  }
}

export default LittleRoundedInput
