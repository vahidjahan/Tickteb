import React from 'react'
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Thumbnail
} from 'native-base'

import {
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground
} from 'react-native'
import call from 'react-native-phone-call'
import Avatar from 'react-native-badge-avatar'
import Hr from 'react-native-hr-component'
import View from '../public/view/PrimaryView'
import Button from '../public/buttons/PrimaryButton'
import Text from '../public/text/PrimaryText'
import ChargeWallet from './ChargeWallet'
import CustomImage from '../public/image/CustomImage'

import { Prolar } from './../prolar/Prolar'
import HeaderButton from '../public/buttons/HeaderButton'
import { GetMasterInformationApi } from '../services/serviceRequest/GetMasterInformationApi'
import DropDown from '../public/dropDown/DropDown'
import { GetRequestServiceItemApi } from './../orders/GetRequestServiceItemApi'

export default class Profile extends React.Component {
  static navigationOptions = { header: null }

  constructor (props) {
    super(props)
    this.state = {}

    this.data = [
      {
        title: 'درخواست سرویس جدید',
        description: 'درخواست سرویس',
        icon: require('../../assets/icons/artworksMainSpecialNurseAlt.png'),
        func: Prolar.navigator(this, 'Services')
      },
      {
        title: 'پیگیری سرویس‌ها',
        description: 'درخواست‌های باز و در حال پیگیری',
        icon: require('../../assets/icons/onGoingRequests.png'),
        func: this.goCheckOrdersPage
      },
      {
        title: 'سرویس‌های تکمیل شده',
        description: 'درخواست‌های بسته شده و قبلی',
        icon: require('../../assets/icons/profileOrders.png'),
        func: this.goOrdersPage
      },
      {
        title: 'آدرس‌های منتخب',
        description: 'آدرس‌هایی که بیشتر از آنها استفاده می‌کنید مثل خانه',
        icon: require('../../assets/icons/profileFavoriteLocations.png'),
        func: this.goFavoriteAddresses
      },
      {
        title: 'تراکنش‌های مالی',
        description: 'تراکنش هایی که انجام داده اید',
        icon: require('../../assets/icons/profileFinancial.png'),
        func: this.goTransactionPage
      },
      {
        title: 'ملاحظات پزشکی',
        description: 'نکاتی که مهم است سرویس‌دهنده شما بداند',
        icon: require('../../assets/icons/profileDoctorsNote.png'),
        func: this.goMedicalConsiderationsPage
      },
      {
        title: 'بستگان',
        description: 'افرادی که برای آنها با استفاده از تیک‌طب سرویس میگیرید',
        icon: require('../../assets/icons/profileReletives.png'),
        func: this.goReletivesPage
      },
      {
        title: 'تنظیمات',
        description: 'اعلان‌ها، ویرایش حساب، درباره تیک‌طب',
        icon: require('../../assets/icons/setting.png'),
        func: this.goSettingPage
      }
    ]
    this.child = React.createRef()
  }

  componentWillMount () {
    GetRequestServiceItemApi('27a4252c-b103-4c19-8d97-886809c93761')
    this.call()
  }

  goOrdersPage = () => {
    const { navigate } = this.props.navigation
    navigate('compeleteServiceList')
  }
  goSettingPage = () => {
    const { navigate } = this.props.navigation
    navigate('Setting')
  }
  goCheckOrdersPage = () => {
    const { navigate } = this.props.navigation
    navigate('CheckOrders')
  }
  goTransactionPage = () => {
    const { navigate } = this.props.navigation
    navigate('FinancialTransaction')
  }

  goMedicalConsiderationsPage = () => {
    const { navigate } = this.props.navigation
    navigate('MedicalConsiderations')
  }

  goReletivesPage = () => {
    const { navigate } = this.props.navigation
    navigate('Reletives', { ok: 'nok' })
  }

  goFavoriteAddresses = () => {
    const { navigate } = this.props.navigation
    navigate('FavoriteAddresses', {
      edit: true
    })
  }
  onChargeWallet = () => {
    this.child.current.handleOpen()
  }

  call = async () => {
    let res = await GetMasterInformationApi()
    if (res.message != 200) {
      this.setState({ msg: res.errors })
      setTimeout(this.call, 4000)
    } else {
      this.setState({ info: res.data })
    }
  }

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
            <Title style={Prolar.style.header.title}>حساب کاربری</Title>
          </Body>

          <Right style={Prolar.style.header.right_}>
            <HeaderButton
              name='settings'
              onPress={Prolar.navigator(this, 'Setting')}
            />
          </Right>
        </Header>

        <Content>
          {this.state.msg != undefined && (
            <DropDown
              message={this.state.msg.map(mess => `${mess} \n`)}
              alertType='warn'
              title='خطا'
            />
          )}

          <ScrollView>
            <View flex={1} justifyContent='flex-start' alignItems='center'>
              <TouchableOpacity>
                <ImageBackground
                  resizeMode={'cover'}
                  source={require('./../../assets/icons/profilePicEdit.png')}
                  imageStyle={{ borderRadius: 50 * Prolar.size.unit }}
                  style={{
                    width: 100 * Prolar.size.unit,
                    height: 100 * Prolar.size.unit,
                    borderRadius: 50 * Prolar.size.unit,

                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10 * Prolar.size.unit
                  }}
                >
                  {this.state.info && (
                    <Thumbnail
                      source={{
                        uri: Prolar.api.domain + this.state.info.imageUrl
                      }}
                      style={{
                        width: 100 * Prolar.size.unit,
                        height: 100 * Prolar.size.unit,
                        borderRadius: 50 * Prolar.size.unit
                      }}
                    />
                  )}
                </ImageBackground>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 110 * Prolar.size.unit
                }}
              >
                {this.state.info == undefined ? (
                  <ActivityIndicator
                    size='large'
                    color={Prolar.color.primary}
                  />
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      fex: 0,
                      justifyContent: 'center'
                    }}
                  >
                    <Text
                      label={this.state.info.name}
                      color={Prolar.color.gray6}
                      fontSize={Prolar.size.font_lg}
                    />

                    <View style={styles.wallet}>
                      <TouchableOpacity onPress={this.onChargeWallet}>
                        <CustomImage
                          style={{
                            marginLeft: Prolar.size.unit * 8
                          }}
                          width={35}
                          height={35}
                          src={require('../../assets/icons/add.png')}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          margin: Prolar.size.unit * 3
                        }}
                        label={Prolar.rialLabel(
                          Math.floor(this.state.info.credit / 10),
                          false
                        )}
                        color={Prolar.color.gray6}
                        fontSize={Prolar.size.font_md}
                      />

                      <CustomImage
                        onPress={this.onChargeWallet}
                        width={35}
                        height={35}
                        style={{
                          marginRight: Prolar.size.unit * 14
                        }}
                        src={require('../../assets/icons/wallet.png')}
                      />
                    </View>
                  </View>
                )}
              </View>
              <ChargeWallet info={this.state.info} ref={this.child} />
            </View>
            <View
              alignItems='stretch'
              flexDirection='column'
              style={{ marginTop: Prolar.size.unit * 10 }}
            >
              {this.data.map((item, i) => (
                <TouchableOpacity key={i} onPress={item.func}>
                  <View style={[Prolar.style.rtlRow, styles.list]}>
                    <CustomImage
                      width={35}
                      height={35}
                      style={{
                        margin: Prolar.size.unit * 15
                      }}
                      src={item.icon}
                    />
                    <View style={Prolar.style.rtlCol}>
                      <Text
                        label={item.title}
                        color={Prolar.color.gray6}
                        fontSize={Prolar.size.font_md}
                      />
                      <Text
                        label={item.description}
                        color={Prolar.color.gray4}
                        fontSize={Prolar.size.font_sm}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}

              <Hr
                hrStyles={{ marginBottom: 25 }}
                lineColor='#EFEFEF'
                thickness={2}
                hrPadding={0}
              />
            </View>
            <View
              flex={1}
              justifyContent='center'
              alignItems='center'
              style={{ alignSelf: 'center' }}
            >
              <Button
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  marginBottom: 15 * Prolar.size.unit
                }}
                color={Prolar.color.success}
                width={200}
                height={50}
                onPress={() => {
                  const args = {
                    number: '+98 914 306 5372', // String value with the number to call
                    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
                  }
                  call(args).catch(console.error)
                }}
              >
                <Text
                  label='مرکز تماس ۲۴ ساعته'
                  color={Prolar.color.white}
                  fontSize={Prolar.size.font_md}
                />
              </Button>
            </View>
          </ScrollView>
        </Content>
      </Container>
    )
  }
}

const styles = {
  list: {
    borderTopColor: '#EFEFEF',
    borderTopWidth: 2
  },
  wallet: {
    backgroundColor: '#E7ECF0',
    borderRadius: 24 * Prolar.size.unit,
    marginTop: 10 * Prolar.size.unit,
    width: 200 * Prolar.size.unit,
    height: 50 * Prolar.size.unit,
    flex: 0,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}
