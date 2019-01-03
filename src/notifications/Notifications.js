import React from 'react'
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Title,
  Card,
  CardItem
} from 'native-base'

import Text from './../public/text/PrimaryText'
import { TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import CustomImage from './../public/image/CustomImage'
import View from '../public/view/PrimaryView'
import Button from '../public/buttons/PrimaryButton'
import Hr from 'react-native-hr-component'
import { Prolar } from '../prolar/Prolar'
import HeaderButton from './../public/buttons/HeaderButton'

import { GetUserNotificationApi } from './GetUserNotificationApi.js'

import { GetCompleteServiceListApi } from './../orders/OrdersApi.js'
import { CheckOrdersApi } from './../orders/CheckOrdersApi.js'
import {
  GetUserPatientListWithUserApi
} from './../orders/GetUserPatientListWithUserApi.js'

export default class Services extends React.Component {
  static navigationOptions = { header: null }

  constructor (props) {
    super(props)
    this.state = { completeServiceList: [] }
  }
  componentWillMount = () => {
    this.call()
  }

  call = () => {
    GetUserNotificationApi().then(res => {
      if (res.errors.length == 0) {
        let readedData = []
        let unreadedData = []
        res.data.messages.map(item => {
          if (item.readed == true) {
            readedData.push(item)
          } else {
            unreadedData.push(item)
          }
        })
        this.setState({
          readedData: readedData,
          unreadedData: unreadedData
        })
        setTimeout(this.call, 25000)
      } else {
        this.setState({ msg: res.errors })
        setTimeout(this.call, 4000)
      }
    })
    GetUserPatientListWithUserApi().then(res => {
      if (res.errors.length == 0 && res.data != undefined) {
        this.state.completeServiceList = []
        res.data.map(data => {
          GetCompleteServiceListApi(data.id).then(res => {
            if (res.errors.length == 0) {
              this.setState({
                completeServiceList: this.state.completeServiceList.concat(
                  res.data
                )
              })
            } else {
              this.setState({ msg: res.errors })
              setTimeout(this.call, 4000)
            }
          })
        })
      } else {
        this.setState({ msg: res.errors })
        setTimeout(this.call, 4000)
      }
    })

    CheckOrdersApi().then(res => {
      if (res.errors.length == 0) {
        this.setState({ currentServiceList: res.data })
      } else {
        this.setState({ msg: res.errors })
        setTimeout(this.call, 4000)
      }
    })
  }

  goToOrder = item => {
    let result
    if (this.state.currentServiceList != undefined) {
      result = this.state.currentServiceList.find(date => {
        return date.id == item.referenceId
      })
      if (result != undefined) {
        Prolar.navigator(this, 'Ongoing', {
          item: result
        })()
      } else {
        result = this.state.completeServiceList.find(date => {
          return date.id == item.referenceId
        })
        if (result != undefined) {
          Prolar.navigator(this, 'DoneAndStarred', {
            item: result
          })()
        }
      }
    }
  }

  getDate = input => {
    let arr = input.split(' - ')
    return arr[0]
  }

  getTime = input => {
    let arr = input.split(' - ')
    return arr[1]
  }

  goBack = () => {
    const { navigate } = this.props.navigation
    navigate('Services')
  }

  getFormatDateTime = date => {
    return (
      Prolar.dateTools.getJalaliString(this.getDate(date), 'mdw') +
      ' - ساعت ' +
      Prolar.replaceNumberToPersion(this.getTime(date))
    )
  }

  renderReadedData = () =>
    this.state.readedData.map((item, i) => (
      <TouchableOpacity
        key={i}
        onPress={() => {
          this.goToOrder(item)
        }}
      >

        <Card key={i} style={Prolar.style.card}>
          <CardItem style={Prolar.style.cardItem}>
            <Body
              style={{
                flexDirection: 'row-reverse',
                justifyContent: 'flex-end',
                alignItems: 'flex-start'
              }}
            >
              <View justifyContent='flex-start' alignItems='flex-end'>
                <CustomImage
                  width={21}
                  height={24}
                  src={require('../../assets/icons/notificationDark.png')}
                />
              </View>
              <View style={[Prolar.style.rtlCol, { flexGrow: 7 }]}>
                <Text
                  label={this.getFormatDateTime(item.date)}
                  color={Prolar.color.gray4}
                  fontSize={Prolar.size.font_sm}
                />
                <Text
                  label={item.body}
                  color={Prolar.color.gray6}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    ))

  renderUnReadedData = () =>
    this.state.unreadedData.map((item, i) => (
      <TouchableOpacity
        key={i}
        onPress={() => {
          this.goToOrder(item)
        }}
      >
        <Card key={i} style={Prolar.style.card}>
          <CardItem style={Prolar.style.cardItem}>
            <Body
              style={{
                flexDirection: 'row-reverse',
                justifyContent: 'flex-end',
                alignItems: 'flex-start'
              }}
            >
              <View justifyContent='flex-start' alignItems='flex-end'>
                <CustomImage
                  width={21}
                  height={24}
                  src={require('../../assets/icons/notificationDark.png')}
                  style={{ tintColor: Prolar.color.primary }}
                />
              </View>
              <View style={[Prolar.style.rtlCol, { flexGrow: 7 }]}>
                <Text
                  label={this.getFormatDateTime(item.date)}
                  color={Prolar.color.gray4}
                  fontSize={Prolar.size.font_sm}
                />
                <Text
                  label={item.body}
                  color={Prolar.color.gray6}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    ))

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
          <Body>
            <Title style={Prolar.style.header.title}>اعلانات</Title>
          </Body>
          <Right />
        </Header>
        <Content
          padder
          contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
        >
          {this.state.readedData === undefined ||
            this.state.unreadedData === undefined
            ? <ActivityIndicator size='large' color={Prolar.color.primary} />
            : <ScrollView>
              {this.renderUnReadedData()}
              <Hr
                hrStyles={{ marginTop: 10, marginBottom: 5 }}
                hrPadding={5}
                lineColor={Prolar.color.cardBorder}
                width={2}
                color={Prolar.color.gray4}
                fontSize={Prolar.size.font_md}
                text='اعلانات دیده شده'
                textStyles={notificationStyle.seenMessage}
                />
              {this.renderReadedData()}
            </ScrollView>}
        </Content>
      </Container>
    )
  }
}

const notificationStyle = {
  seenMessage: {
    fontFamily: Prolar.fontFamily,
    letterSpacing: 0,
    textAlign: 'right'
  }
}
