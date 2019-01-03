import React, { Component } from 'react'
import { Container, Header, Left, Body, Title } from 'native-base'
import { ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import View from '../public/view/PrimaryView'
import Modal from 'react-native-modal'
import Text from '../public/text/PrimaryText'
import { Prolar } from '../prolar/Prolar'
import Button from '../public/buttons/PrimaryButton'
import HeaderButton from '../public/buttons/HeaderButton'

import DropDown from '../public/dropDown/DropDown'
import { PayInvoiceApi } from './PayInvoiceApi'
import { GetFinalInvoiceApi } from './GetFinalInvoiceApi'
import { log } from 'util'

export default class Invoice extends Component {
  static navigationOptions = { header: null }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    GetFinalInvoiceApi(this.props.order.id).then(res => {
      this.setState({ data: res.data })
    })
  }

  renderItem = (item, i) => {
    return (
      <View key={i} style={styles.row}>
        <Text
          color={Prolar.color.gray6}
          fontSize={Prolar.size.font_md}
          label={this.rialToTomanStr(item.price * item.quantity)}
          viewStyle={{ width: '25%' }}
          style={{ textAlign: 'left' }}
        />
        <Text
          label={
            item.title +
            (item.quantity > 1
              ? ' (' +
                Prolar.replaceNumberToPersion(item.quantity) +
                ' مورد' +
                ')'
              : '')
          }
          color={Prolar.color.gray6}
          fontSize={Prolar.size.font_md}
          viewStyle={{ width: '75%' }}
          style={{ fontFamily: Prolar.fontFamily }}
        />
      </View>
    )
  }

  calcTotal = () => {
    let sum = 0
    for (i = 0; i < this.state.data.length; i++) {
      let item = this.state.data[i]
      sum = sum + item.price * item.quantity
    }
    return sum
  }

  rialToTomanStr = rial => {
    return Prolar.rialLabel(Math.floor(rial))
  }

  containsType = type => {
    if (this.state.data == undefined) {
      return false
    }
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].type == type) {
        return true
      }
    }
    return false
  }

  renderInvoice = () => (
    <View style={{ alignItems: 'stretch' }}>
      <ScrollView>
        <View
          style={{
            paddingBottom: 145 * Prolar.size.unit,
            flex: 1,
            alignItems: 'stretch'
          }}
        >
          {this.containsType(1) && (
            <View style={styles.col}>
              <Text
                label='سرویس‌های درخواستی'
                color={Prolar.color.gray4}
                fontSize={Prolar.size.font_md}
                viewStyle={styles.title}
              />
              {this.state.data.map(
                (item, i) => item.type == 1 && this.renderItem(item, i)
              )}
            </View>
          )}

          {this.containsType(2) && (
            <View style={styles.col}>
              <Text
                label='هدیه تیک‌طب'
                color={Prolar.color.gray4}
                fontSize={Prolar.size.font_md}
                viewStyle={styles.title}
              />
              {this.state.data.map(
                (item, i) => item.type == 2 && this.renderItem(item, i)
              )}
            </View>
          )}
          {this.containsType(4) && (
            <View style={styles.col}>
              <Text
                label='اقلام مصرفی'
                color={Prolar.color.gray4}
                fontSize={Prolar.size.font_md}
                viewStyle={styles.title}
              />
              {this.state.data.map((item, i) => {
                return item.type == 4 && this.renderItem(item, i)
              })}
            </View>
          )}

          {this.containsType(3) && (
            <View style={styles.col}>
              <Text
                label='سایر'
                color={Prolar.color.gray4}
                fontSize={Prolar.size.font_md}
                viewStyle={styles.title}
              />
              {this.state.data.map((item, i) => {
                return item.type == 3 && this.renderItem(item, i)
              })}
            </View>
          )}
        </View>
      </ScrollView>
      <View
        justifyContent='center'
        alignItem='center'
        style={{
          flex: 0,
          backgroundColor: '#ECF8F3',
          alignItems: 'stretch',
          borderTopWidth: 1,
          borderTopColor: Prolar.color.success,
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 145 * Prolar.size.unit
        }}
      >
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Text
            color={Prolar.color.success}
            fontSize={Prolar.size.font_md}
            label={this.rialToTomanStr(this.calcTotal())}
          />
          <Text
            label='مجموع کل'
            color={Prolar.color.success}
            fontSize={Prolar.size.font_md}
            style={{ fontFamily: Prolar.fontFamily }}
          />
        </View>
      </View>
    </View>
  )

  render () {
    return (
      <Container>


        {this.state.data === undefined ? (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <ActivityIndicator size='large' color={Prolar.color.primary} />
          </View>
        ) : (
          this.renderInvoice()
        )}
        <DropDown ref={ref => (this.dropdown = ref)} />
      </Container>
    )
  }
}

const styles = {
  col: {
    flexDirection: 'column',
    padding: 10 * Prolar.size.unit,
    alignItems: 'flex-end'
  },
  row: {
    padding: 10 * Prolar.size.unit,
    borderBottomWidth: 1,
    borderBottomColor: Prolar.color.gray3,
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItem: 'center'
  },
  title: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Prolar.color.gray4
  }
}
