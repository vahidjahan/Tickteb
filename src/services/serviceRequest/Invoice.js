import React, { Component } from 'react'
import {
  Container,
  Content,
  List,
  ListItem,
  Header,
  Left,
  Body,
  Right,
  Title,
  Item
} from 'native-base'
import { ScrollView, ActivityIndicator } from 'react-native'
import View from '../../public/view/PrimaryView'
import Text from '../../public/text/PrimaryText'
import { Prolar } from '../../prolar/Prolar'
import Button from '../../public/buttons/PrimaryButton'
import HeaderButton from '../../public/buttons/HeaderButton'
import { InvoiceApi } from './InvoiceAPI'
import { RequestApi } from './RequestAPI'
import DropDown from '../../public/dropDown/DropDown'

export default class Invoice extends Component {
  static navigationOptions = { header: null }

  constructor (props) {
    super(props)
    this.state = {}
  }

  onSuccess = () => {
    Prolar.navigator(this, 'Services', { status: 'ok' })()
  }

  componentWillMount () {
    this.data = this.props.navigation.state.params
    let det = this.data.list.map(item => ({
      serviceItemId: item.data.id,
      quantity: item.count
    }))

    this.requestBody = {
      locationDescription: this.data.location.description,
      locationDetail: this.data.location.detail,
      locationLat: this.data.location.latitude,
      locationLng: this.data.location.longitude,
      patientId: this.data.patient.id,
      paymentType: 1,
      preferredDate: this.data.date,
      preferredFrom: this.data.from,
      preferredTo: this.data.to,
      serviceItemList: det
    }

    InvoiceApi({ details: det }).then(res => {
      if (res.errors.length == 0) {
        this.setState({ data: res.data })
      } else {
        this.dropdown.showError(res.errors)
        this.props.navigation.pop()
      }
    })
  }

  renderItem = (item, i) => {
    return (
      <View key={i} style={styles.row}>
        <Text
          color={Prolar.color.gray6}
          fontSize={Prolar.size.font_md}
          label={this.rialToTomanStr(item.price)}
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
      sum = sum + item.price
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

          {this.containsType(3) && (
            <View style={styles.col}>
              <Text
                label='سایر'
                color={Prolar.color.gray4}
                fontSize={Prolar.size.font_md}
                viewStyle={styles.title}
              />
              {this.state.data.map(
                (item, i) => item.type == 3 && this.renderItem(item, i)
              )}
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

        <Button
          disabled={this.state.wait == true}
          color={
            this.state.wait == true ? Prolar.color.gray1 : Prolar.color.success
          }
          onPress={() => {
            this.setState({ wait: true })
            RequestApi(this.requestBody).then(res => {
              if (res.errors.length > 0) {
                this.setState({ wait: false })
                this.dropdown.showError(res.errors)
              } else {
                this.onSuccess()
              }
            })
          }}
          style={{
            flex: 1,
            alignSelf: 'center',
            marginBottom: 30 * Prolar.size.unit
          }}
          width={200}
          height={50}
        >
          <Text
            style={{ textAlign: 'center' }}
            label='ثبت درخواست'
            fontSize={Prolar.size.font_md}
          />

          {this.state.wait == true && (
            <ActivityIndicator
              style={{
                position: 'absolute',
                right: 25 * Prolar.size.unit
              }}
              size='large'
              color={Prolar.color.primary}
            />
          )}
        </Button>
      </View>
    </View>
  )

  render () {
    return (
      <Container>
        <Header style={Prolar.style.header.container}>
          <Left style={Prolar.style.header.left_}>
            <HeaderButton
              name='arrow-back'
              onPress={Prolar.navigator(this, -1)}
            />
          </Left>
          <Body style={Prolar.style.header.body_}>
            <Title style={Prolar.style.header.title}>پیش‌فاکتور</Title>
          </Body>
          <Right />
        </Header>

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
