import React, { Component } from 'react'
import { View } from 'react-native'

import Text from './../text/PrimaryText'
import { Prolar } from '../../prolar/Prolar'

export default class FarsiCalander extends Component {
  onConfirm = data => {
    let newDate = `${data[0]}/${data[1]}/${data[2]}`
    this.props.onGet(newDate)
  }

  render () {
    let bulletColor = Prolar.color.gray2
    if (this.props.required == true) {
      bulletColor = Prolar.color.error
    }

    return (
      <View style={this.props.viewStyle}>
        <Text label='تاریخ تولد' color='#ACB1B6' fontSize={13} />

        <View
          style={{
            flexDirection: 'row-reverse',
            alignItems: 'center',
            width: '100%',
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
              borderRadius: 25 * Prolar.size.unit
            }}
          />

          {// <PersianDatePicker
          //   style={{
          //     fontFamily: 'IRANSansMobile',
          //
          //     backgroundColor: 'transparent',
          //     borderWidth: 0,
          //     height: 50 * Prolar.size.unit,
          //     flex: 1
          //   }}
          //   textStyle={{ fontFamily: 'IRANSansMobile' }}
          //   onConfirm={this.props.onConfirm}
          //   minDate={this.props.minDate}
          //   maxDate={this.props.maxDate}
          //   selectedDate={this.props.selectedDate}
          //   pickerBg={[0, 0, 0]}
          // />
      }
        </View>
      </View>
    )
  }
}
