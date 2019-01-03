import React, { Component } from 'react'
import { View, Dimensions, TextInput } from 'react-native'
import { Item, Label } from 'native-base'
import { Prolar } from '../../prolar/Prolar'
import CustomImage from '../image/CustomImage'

let width = Dimensions.get('window').width * 0.86
let height = Dimensions.get('window').height * 0.078

export default class PrimaryInput extends Component {
  constructor (props) {
    super(props)
    this.state.value = this.props.defaultValue
  }
  state = {
    value: '',
    placeholder: this.props.placeholder
  }

  handleChange = value => {
    if (this.props.keyboardType == 'numeric') {
      value = Prolar.replaceNumberToPersion(value)
    }
    this.setState({ value }, () => {
      this.props.getValue(value)
    })
  }
  static getDerivedStateFromProps (nextProps, prevState) {
    if (
      nextProps.placeholder != prevState.placeholder &&
      prevState.placeholder != ''
    ) {
      return { placeholder: nextProps.placeholder }
    }
    return null
  }

  focus = placeholder => {
    this.setState({ placeholder: placeholder })
  }

  render () {
    const {
      placeholder,
      disabled,
      width,
      height,
      keyboardType,
      style,
      viewStyle,
      label,
      required,
      placeholderTextColor,
      fontSize
    } = this.props

    let bulletColor = Prolar.color.gray2
    if (required == true) {
      bulletColor = Prolar.color.error
    }
    return (
      <View style={viewStyle}>
        <Label style={Prolar.style.labelStyle}>{label}</Label>

        <View
          style={{
            flexDirection: 'row-reverse',
            alignItems: 'center',
            width: width * Prolar.size.unit,
            height: height * Prolar.size.unit,
            borderColor: Prolar.color.gray2,
            backgroundColor: Prolar.color.gray2,
            borderRadius: Prolar.size.radius * Prolar.size.unit
          }}
        >
          <View
            style={{
              backgroundColor: bulletColor,
              width: 5 * Prolar.size.unit,
              height: 5 * Prolar.size.unit,
              marginRight: 15 * Prolar.size.unit,
              marginLeft: 5 * Prolar.size.unit,
              borderRadius: 5 * Prolar.size.unit
            }}
          />

          <TextInput
            placeholderTextColor={placeholderTextColor}
            style={[
              {
                flex: 1,
                color: 'black'
              },
              Prolar.style.inputText,
              style
            ]}
            placeholder={this.state.placeholder}
            value={this.state.value}
            onFocus={this.focus}
            onChangeText={this.handleChange}
            keyboardType={keyboardType}
            fontSize={fontSize}
          />
        </View>
      </View>
    )
  }
}

PrimaryInput.defaultProps = {
  // placeholder: "",
  placeholderTextColor: Prolar.color.gray4,
  disabled: false,
  keyboardType: undefined,
  Label: 'test',
  root: {}
}
