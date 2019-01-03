import React, { Component } from 'react'
import CustomDatePicker from './CustomDatePicker'
import {
  Platform,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { Button } from 'native-base'
import Modal from 'react-native-modal'
import Text from './../../public/text/PrimaryText'
import { Prolar } from '../../prolar/Prolar'

export class DateField extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: false,
      value: props.defaultDate
    }
    this.child = React.createRef()
  }

  _toggleModal = () => {
    this.child.current._toggleModal()
  }

  render () {
    return (
      <View style={[styles.container, this.props.viewStyle]}>
        <TouchableOpacity
          style={styles.TouchableOpacityStyle}
          onPress={() => this.child.current._toggleModal()}
        >
          <Text
            label={
              this.state.value == ''
                ? 'انتخاب از تقویم'
                : Prolar.dateTools.getJalaliString(
                    this.state.value,
                    this.props.format
                  )
            }
            color={Prolar.color.gray6}
            fontSize={Prolar.size.font_md}
            style={this.props.textFieldStyle}
          />
        </TouchableOpacity>

        <CustomDatePicker
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          isVisible={this.state.isVisible}
          ref={this.child}
          width={this.props.width}
          height={this.props.height}
          defaultDate={
            this.props.defaultDate == ''
              ? this.props.minDate
              : this.props.defaultDate
          }
          getDate={(year, month, day) => this.props.getDate(year, month, day)}
          getValue={value => {
            this.props.getValue(value)
            this.setState({ value: value })
          }}
        />
      </View>
    )
  }
}

DateField.defaultProps = {
  width: 350,
  height: 280,
  textFieldStyle: {},
  getDate: (year, month, day) => year + month + day,
  getValue: date => date,
  defaultDate: '',
  format: ''
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  TouchableOpacityStyle: {
    flexDirection: 'row'
  }
})
