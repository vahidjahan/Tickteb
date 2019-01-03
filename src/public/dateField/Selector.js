import React, { Component } from 'react'
import Picker from 'react-native-wheel-picker'

import { Platform, StyleSheet, Text, View } from 'react-native'
import { Prolar } from '../../prolar/Prolar'
import { color } from 'color'

const Month = [
  'فروردین ',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند'
]
let PickerItem = Picker.Item

export default class Selector extends Component {
  constructor (props) {
    super(props)

    this.state = {
      year: props.defaultDate.year - props.minDate.year,
      month: props.defaultDate.month - 1,
      day: props.defaultDate.day - 1
    }
    this.state.day =
      this.state.year == 0 && this.state.month == this.props.minDate.month - 1
        ? this.state.day - this.props.minDate.day + 1
        : this.state.day
    this.yearData = props.defaultDate.year
    this.monthData = props.defaultDate.month
    this.dayData = props.defaultDate.day
  }

  sendDate = () => {
    this.props.getDate(this.yearData, this.monthData, this.dayData)
  }

  getYearList = () => {
    return Array.from(
      new Array(this.props.maxDate.year - this.props.minDate.year + 1),
      (val, index) => index + this.props.minDate.year
    )
  }
  getMonthList = () => {
    if (this.state.year == 0) {
      return Array.from(
        new Array(12 - this.props.minDate.month + 1),
        (val, index) => Month[index + this.props.minDate.month - 1]
      )
    } else if (
      this.state.year ==
      this.props.maxDate.year - this.props.minDate.year
    ) {
      return Array.from(
        new Array(this.props.maxDate.month),
        (val, index) => Month[index]
      )
    } else {
      return Array.from(new Array(12), (val, index) => Month[index])
    }
  }
  getMonthDays = () => {
    let year = this.state.year + this.props.minDate.year
    if (year % 4 == 3) {
      return this.state.month < 6 ? 31 : 30
    } else {
      return this.state.month == 11 ? 29 : this.state.month < 6 ? 31 : 30
    }
  }

  getDayList = () => {
    if (
      this.state.year == 0 &&
      this.state.month == this.props.minDate.month - 1
    ) {
      let result = Array.from(
        new Array(this.getMonthDays() - this.props.minDate.day + 1),
        (val, index) => index + this.props.minDate.day
      )
      return result
    } else if (
      this.state.year == this.props.maxDate.year - this.props.minDate.year &&
      this.state.month == this.props.maxDate.month - 1
    ) {
      return Array.from(
        new Array(this.props.maxDate.day),
        (val, index) => index + 1
      )
    } else {
      return Array.from(
        new Array(this.getMonthDays()),
        (val, index) => index + 1
      )
    }
  }

  checkMonthPeriod = year => {
    let month = this.state.month
    if (year == 0) {
      month = this.props.minDate.month - 1
      this.monthData = this.props.minDate.month
    } else if (year == this.props.maxDate.year - this.props.minDate.year) {
      month = 0
      this.monthData = 1
    }
    this.setState({ month: month })
  }

  checkDayPeriod = month => {
    let day = this.state.day
    if (this.state.year == 0 && month == 0) {
      day = this.props.minDate.day - 1
      this.dayData = this.props.minDate.day
    } else if (
      this.state.year == this.props.maxDate.year - this.props.minDate.year &&
      month == this.props.maxDate.month - 1
    ) {
      day = 0
      this.dayData = 1
    }
    this.setState({ day: day })
  }
  // componentDidMount () {
  //   this.sp.scrollToIndex(2) // select 'c'
  //   this.selectedValue = this.sp.getSelected()
  // }
  getData = (ty, index) => {
    let x = ''
    if (ty == 'year') {
      x = this.getYearList()
    }
    if (ty == 'day') {
      x = this.getDayList()
    }
    return x[index]
  }
  render () {
    return (
      <View
        style={[
          styles.mainView,
          { height: (this.props.height / 5) * (Prolar.isIOS ? 2 : 4) }
        ]}
      >
        <View style={styles.spinner}>
          <Text
            style={[
              styles.spinnerHeader,
              { marginTop: this.props.height / 16 }
            ]}
          >
            سال
          </Text>
          <Picker
            style={{
              height: (this.props.height * (Prolar.isIOS ? 1 : 3)) / 5,
              width: this.props.width / 3
            }}
            itemSpace={20}
            isCurved={false}
            isCurtain
            itemStyle={{
              height: this.props.height / 5,
              fontSize: Prolar.size.font_xl,
              color: Prolar.color.white
            }}
            selectedValue={this.state.year}
            onValueChange={selectedIndex => {
              this.checkMonthPeriod(selectedIndex)
              this.yearData = this.getData('year', selectedIndex)
              this.setState({ year: selectedIndex })
              this.sendDate()
            }}
          >
            {this.getYearList().map((item, i) => (
              <PickerItem
                label={Prolar.replaceNumberToPersion(item.toString())}
                value={i}
                key={item}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.spinner}>
          <Text
            style={[
              styles.spinnerHeader,
              { marginTop: this.props.height / 16 }
            ]}
          >
            ماه
          </Text>
          <Picker
            style={{
              height: (this.props.height * (Prolar.isIOS ? 1 : 3)) / 5,
              width: this.props.width / 3
            }}
            itemSpace={20}
            isCurved={false}
            isCurtain
            itemStyle={{
              height: this.props.height / 5,
              fontSize: Prolar.size.font_xl,
              color: Prolar.color.white
            }}
            selectedValue={
              this.state.year == 0
                ? this.state.month - this.props.minDate.month + 1
                : this.state.month
            }
            onValueChange={selectedIndex => {
              this.checkDayPeriod(selectedIndex)
              this.setState({
                month:
                  selectedIndex +
                  (this.state.year == 0 ? this.props.minDate.month - 1 : 0)
              })
              this.monthData =
                (this.state.year == 0 ? this.props.minDate.month - 1 : 0) +
                selectedIndex +
                1
              this.sendDate()
            }}
          >
            {this.getMonthList().map((item, i) => (
              <PickerItem label={item} value={i} key={item} />
            ))}
          </Picker>
        </View>
        <View style={styles.spinner}>
          <Text
            style={[
              styles.spinnerHeader,
              { marginTop: this.props.height / 16 }
            ]}
          >
            روز
          </Text>
          <Picker
            style={{
              height: (this.props.height * (Prolar.isIOS ? 1 : 3)) / 5,
              width: this.props.width / 3
            }}
            itemSpace={20}
            isCurved={false}
            isCurtain
            itemStyle={{
              height: this.props.height / 5,
              fontSize: Prolar.size.font_xl,
              color: Prolar.color.white
            }}
            selectedValue={this.state.day}
            onValueChange={selectedIndex => {
              this.setState({ day: selectedIndex })
              let si =
                this.state.year == 0 &&
                this.state.month == this.props.minDate.month - 1
                  ? selectedIndex - this.props.minDate.day + 1
                  : selectedIndex
              if (si < 0) {
                si = 0
              }
              this.dayData = this.getData('day', selectedIndex)
              this.sendDate()
            }}
          >
            {this.getDayList().map((item, i) => (
              <PickerItem
                label={Prolar.replaceNumberToPersion(item.toString())}
                value={i}
                key={item}
              />
            ))}
          </Picker>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row'
  },
  spinner: {
    padding: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinnerHeader: {
    textAlign: 'center',
    color: Prolar.color.white,
    fontWeight: 'bold',
    fontSize: 18
  }
})
