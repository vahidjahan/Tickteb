import React from 'react'
import {
  Container,
  Header,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Thumbnail,
  Item
} from 'native-base'

import {
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  View as NativeView
} from 'react-native'

import View from '../public/view/PrimaryView'
import Button from './../public/buttons/PrimaryButton'
import Text from '../public/text/PrimaryText'
import PrimaryInput from './../public/inputs/PrimaryInput'

import Gender from './../public/radioButton/Gender'
import { Prolar } from '../prolar/Prolar'

import CustomScrollView from './../public/view/CustomScrollView'
import CustomImage from '../public/image/CustomImage'
import PrimaryText from './../public/text/PrimaryText'
import CustomPicker from './../public/picker/CustomPicker'
import CameraRollPickerModal from '../public/picker/CameraRollModal'
import { DateField } from '../public/dateField/DateField'
import HeaderButton from '../public/buttons/HeaderButton'
import { GetSelectValue } from '../prolar/GetSelectValues'
import moment from 'moment-jalaali'
import { requestPermission } from '../prolar/PermissionCheck'
import DropDown from '../public/dropDown/DropDown'
import { ReletivePostApi } from './RelativeApi'
import RNFetchBlob from 'rn-fetch-blob'

import {
  validateEmail,
  validateTel,
  PersianValueCheck,
  numberCheck,
  NationalCodeCheck
} from '../prolar/Validators'

let optionss = {
  insurances: [],
  supplementaryInsurances: [],
  educationalDegrees: [],
  bloodTypes: []
}
let relData = {
  firstName: '',
  lastName: '',
  fixedLine: '',
  mobile: '',
  email: '',
  weight: '',
  height: '',
  nationalCode: '',
  birthDate: '',
  imageUrl: '',
  gender: false,
  bloodType: '',
  insurance: '',
  supplementaryInsurance: '',
  educationalDegree: ''
}

let y = {}
let image = ''

export default class RelativeAdd extends React.Component {
  static navigationOptions = { header: null }

  constructor (props) {
    super(props)
    this.state = {
      loadedValues: false,
      message: [],
      uri: '',
      newUri: false,
      indicatorShow: false,
      success: false
    }
    this.dateRefFunc = React.createRef()
    this.selectedDate = ''
    this.getValues()
  }
  getValues = async () => {
    optionss = await GetSelectValue()
    this.setState({ loadedValues: true })
  }

  goBack = () => {
    const { navigate } = this.props.navigation
    navigate('Profile')
  }
  getPhoto = uri => {
    this.setState({ uri, newUri: true })
  }
  getPhotoInfo = async () => {
    try {
      let st = await RNFetchBlob.fs.stat(this.state.uri)
      let data = await RNFetchBlob.fs.readFile(this.state.uri, 'base64')
      image = { data }

      let ty = 'jpg'
      if (st.filename.includes('png')) {
        ty = 'png'
      } else if (st.filename.includes('svg')) {
        ty = 'svg'
      } else if (st.filename.includes('gif')) {
        ty = 'gif'
      }
      image = { ...image, st, ty }
      this.setState({ newUri: false })
    } catch (err) {
      this.setState({ newUri: false, message: ['خطا در استفاده از عکس'] })
      this.riseError()
    }
  }
  componentDidUpdate () {
    if (this.state.uri.length > 0 && this.state.newUri) {
      this.getPhotoInfo()
    }
  }

  riseError = () => {
    setTimeout(() => this.dropdown.showError(this.state.message), 900)
  }
  getPermission = async () => {
    let perm = await requestPermission('READ_EXTERNAL_STORAGE')
    if (!perm) {
      this.setState({
        message: [
          'دسترسی برای خواندن عکس از گالری ندارید برای دسترسی لطفا در باز کردن نرم‌افزار دسترسی خواندن فایل از گالری را که پرسیده می‌شود تائیید کنید'
        ]
      })
      this.riseError()
    }
  }
  componentDidMount () {
    this.getPermission()
  }
  checkData = () => {
    this.setState({ message: [] })

    relData.nationalCode =
      relData.nationalCode.length > 0
        ? Prolar.convertNumbers2English(relData.nationalCode)
        : relData.nationalCode
    relData.fixedLine =
      relData.fixedLine.length > 0
        ? Prolar.convertNumbers2English(relData.fixedLine)
        : relData.fixedLine
    relData.height =
      relData.height.length > 0
        ? Prolar.convertNumbers2English(relData.height)
        : relData.height
    relData.weight =
      relData.weight.length > 0
        ? Prolar.convertNumbers2English(relData.weight)
        : relData.weight

    let fn = PersianValueCheck(relData.firstName)
    let ln = PersianValueCheck(relData.lastName)
    let nc = NationalCodeCheck(relData.nationalCode)
    let fl =
      relData.fixedLine.length > 0 ? validateTel(relData.fixedLine) : true
    let em = relData.email.length > 0 ? validateEmail(relData.email) : true
    let we = relData.weight.length > 0 ? numberCheck(relData.weight) : true
    let he = relData.height.length > 0 ? numberCheck(relData.height) : true
    let bd = relData.birthDate.length > 0
    let gn = relData.gender !== ''

    if (!fn) {
      this.setState(prevState => ({
        message: [...prevState.message, 'نام صحیح نیست']
      }))
    }
    if (!ln) {
      this.setState(prevState => ({
        message: [...prevState.message, 'نام خانوادگی صحیح نیست']
      }))
    }
    if (!nc) {
      this.setState(prevState => ({
        message: [...prevState.message, 'کد ملی صحیح نیست']
      }))
    }
    if (!fl) {
      this.setState(prevState => ({
        message: [...prevState.message, 'تلفن ثابت صحیح نیست']
      }))
    }
    if (!em) {
      this.setState(prevState => ({
        message: [...prevState.message, 'ایمیل صحیح نیست']
      }))
    }
    if (!we) {
      this.setState(prevState => ({
        message: [...prevState.message, 'وزن صحیح نیست']
      }))
    }
    if (!he) {
      this.setState(prevState => {
        message: [...prevState.message, 'قد صحیح نیست']
      })
    }
    if (!bd) {
      this.setState(prevState => ({
        message: [...prevState.message, 'تاریخ تولد الزامی است ']
      }))
    }

    if (!gn) {
      this.setState(prevState => ({
        message: [...prevState.message, 'جنسیت الزامی است ']
      }))
    }
    if (fn && ln && nc && em && fl && we && he && bd && gn) {
      return true
    } else {
      return false
    }
  }
  addRelative = async () => {
    this.setState({ indicatorShow: true })
    let reletiveData = {
      firstName: relData.firstName,
      lastName: relData.lastName,
      birthDate: relData.birthDate,
      nationalCode: relData.nationalCode,
      email: relData.email,
      gender: relData.gender,
      fixedLine: relData.fixedLine,
      insurance: relData.insurance,
      supplementaryInsurance: relData.supplementaryInsurance,
      mobile: relData.mobile
    }

    reletiveData = relData.hasOwnProperty('image')
      ? {
        ...reletiveData,
        image: relData.image.data,
        filetype: relData.image.ty
      }
      : { ...reletiveData, imageUrl: relData.imageUrl }

    let res = await ReletivePostApi(reletiveData)
    this.setState({ indicatorShow: true })
    if (res.message == 200) {
      this.props.navigation.state.params.reset()
      Prolar.navigator(this, 'Reletives', { st: 'toReletives' })()
    } else {
      if (res.errors != null && res.errors.length > 0) {
        this.setState({
          message: res.errors,
          indicatorShow: false
        })
      } else {
        this.setState({
          message: ['خطا در ارسال اطلاعات بستگان'],
          indicatorShow: false
        })
      }
      this.riseError()
    }
  }
  onPress = () => {
    let chk = this.checkData()
    if (chk) {
      if (image.hasOwnProperty('data')) {
        relData.image = image
      }
      this.addRelative()
    } else {
      this.riseError()
    }
  }
  render () {
    let space = Prolar.size.unit * 10
    let height = 50
    let rowStyle = { width: '100%', paddingTop: space, alignItems: 'flex-end' }
    let urii =
      this.state.uri.length > 1
        ? { uri: this.state.uri }
        : require('../../assets/icons/profilePicEdit.png')

    return (
      <Container>
        <Header style={Prolar.style.header.container}>
          <Left style={Prolar.style.header.left_}>
            <HeaderButton name='arrow-back' onPress={this.goBack} />
          </Left>
          <Body style={Prolar.style.header.body_}>
            <Title style={Prolar.style.header.title}>افزودن بستگان</Title>
          </Body>
          <Right />
        </Header>

        <CustomScrollView>
          <View
            justifyContent='center'
            alignItems='center'
            style={{ paddingLeft: space * 1.5, paddingRight: space * 1.5 }}
          >
            <Thumbnail source={urii} style={styles.pic} />

            {/* -------------------------------------------------------------- */}

            <CameraRollPickerModal
              style={{ flexDirection: 'row', alignItems: 'center' }}
              selectPhoto={this.getPhoto}
            >
              <Text
                label='آپلود عکس'
                color={Prolar.color.gray6}
                fontSize={Prolar.size.font_md}
                style={{ marginRight: 5 * Prolar.size.unit }}
              />
              <CustomImage
                width={25}
                height={25}
                src={require('./../../assets/icons/camera.png')}
              />
            </CameraRollPickerModal>

            {/* -------------------------------------------------------------- */}

            <View style={{ ...Prolar.style.rtlRow, paddingTop: space * 2 }}>
              <PrimaryInput
                required
                label='نام'
                placeholder='نام'
                getValue={x => (relData.firstName = x)}
                height={height}
                viewStyle={{ width: '50%', paddingLeft: space }}
              />

              <PrimaryInput
                required
                label='نام‌خانوادگی'
                placeholder='نام‌خانوادگی'
                height={height}
                getValue={x => (relData.lastName = x)}
                viewStyle={{ width: '50%', paddingRight: space }}
              />
            </View>

            {/* -------------------------------------------------------------- */}

            <PrimaryInput
              keyboardType='numeric'
              required
              label='کد ملی'
              placeholder='کد ملی'
              height={height}
              getValue={x => (relData.nationalCode = x)}
              viewStyle={{ width: '100%', paddingTop: space }}
            />

            {/* -------------------------------------------------------------- */}

            <View style={{ ...Prolar.style.rtlRow, paddingTop: space * 1.5 }}>
              <PrimaryText
                label='تاریخ تولد'
                style={{
                  fontFamily: Prolar.fontFamily,
                  fontSize: Prolar.size.font_sm,
                  color: Prolar.color.gray8
                }}
              />
            </View>

            <TouchableOpacity
              style={{
                height: 50 * Prolar.size.unit,
                backgroundColor: Prolar.color.gray2,
                width: '100%',
                alignItems: 'flex-end',
                justifyContent: 'center',
                borderRadius: Prolar.size.radius * Prolar.size.unit
              }}
              onPress={() => this.dateRefFunc.current._toggleModal()}
            >
              <DateField
                minDate={Prolar.dateTools.getGregorianToJalaliString(
                  moment(
                    new Date(Date.now() - 90 * 365 * 24 * 3600 * 1000)
                  ).format('YYYY/MM/DD'),
                  ''
                )}
                maxDate={Prolar.dateTools.getGregorianToJalaliString(
                  moment(
                    new Date(Date.now() - 18 * 365 * 24 * 3600 * 1000)
                  ).format('YYYY/MM/DD'),
                  ''
                )}
                defaultDate={Prolar.dateTools.getGregorianToJalaliString(
                  moment(
                    new Date(Date.now() - 40 * 365 * 24 * 3600 * 1000)
                  ).format('YYYY/MM/DD'),
                  ''
                )}
                viewStyle={{ marginRight: 10 * Prolar.size.unit }}
                textFieldStyle={[
                  Prolar.style.textStyle,
                  {
                    fontSize: Prolar.size.font_md,
                    color: Prolar.color.gray11,
                    fontFamily: Prolar.fontFamily,
                    fontSize: Prolar.size.icon_md
                  }
                ]}
                width={Prolar.size.unit * 350}
                height={Prolar.size.unit * 280}
                ref={this.dateRefFunc}
                format={'ymd'}
                getValue={data => {
                  relData.birthDate = data
                }}
              />
            </TouchableOpacity>

            {/* -------------------------------------------------------------- */}

            <View style={rowStyle}>
              <Gender
                defaultValue={false}
                setGender={x => (relData.gender = x)}
                space={space * 2}
                viewStyle={{ height: 50 * Prolar.size.unit }}
              />
            </View>

            {/* -------------------------------------------------------------- */}

            <PrimaryInput
              label='ایمیل'
              placeholder='ایمیل'
              height={height}
              getValue={x => (relData.email = x)}
              viewStyle={rowStyle}
            />
            {/* -------------------------------------------------------------- */}
            <PrimaryInput
              keyboardType='numeric'
              label='تلفن ثابت'
              placeholder='تلفن ثابت'
              height={height}
              style={{ width: '100%' }}
              getValue={x => (relData.fixedLine = x)}
              viewStyle={rowStyle}
            />

            {/* -------------------------------------------------------------- */}

            {/* <PrimaryInput
              label='آدرس'
              placeholder='آدرس'
              height={height}
              style={{ width: '100%' }}
              getValue={x => (relData.address = x)}
              viewStyle={rowStyle}
            /> */}

            {/* -------------------------------------------------------------- */}
            <CustomPicker
              viewStyle={rowStyle}
              label='تحصیلات'
              placeholder='تحصیلات'
              list={optionss.educationalDegrees}
              onSelect={item => {
                relData.educationalDegree = item.label
              }}
            />
            {/* -------------------------------------------------------------- */}

            <CustomPicker
              viewStyle={rowStyle}
              label='گروه خونی'
              placeholder='گروه خونی'
              list={optionss.bloodTypes}
              onSelect={item => (relData.bloodType = item.label)}
            />

            {/* -------------------------------------------------------------- */}

            <View style={{ ...Prolar.style.rtlRow, paddingTop: space }}>
              <PrimaryInput
                keyboardType='numeric'
                label='قد(سانتیمتر)'
                placeholder='قد(سانتیمتر)'
                height={height}
                getValue={x => (relData.height = x)}
                viewStyle={{ width: '50%', paddingLeft: space }}
              />

              <PrimaryInput
                keyboardType='numeric'
                label='وزن(کیلوگرم)'
                placeholder='وزن(کیلوگرم)'
                height={height}
                getValue={x => (relData.weight = x)}
                viewStyle={{ width: '50%', paddingRight: space }}
              />
            </View>

            {/* -------------------------------------------------------------- */}
            <CustomPicker
              viewStyle={rowStyle}
              label='بیمه'
              placeholder='بیمه'
              list={optionss.insurances}
              onSelect={item => (relData.insurance = item.label)}
            />
            {/* -------------------------------------------------------------- */}
            <CustomPicker
              viewStyle={rowStyle}
              label='بیمه تکمیلی'
              placeholder='بیمه تکمیلی'
              list={optionss.supplementaryInsurances}
              onSelect={item => (relData.supplementaryInsurance = item.label)}
            />
            {/* -------------------------------------------------------------- */}

            <View
              style={{
                ...Prolar.style.rtlRow,
                paddingTop: space,
                justifyContent: 'center',
                margin: space
              }}
            >
              {this.state.indicatorShow ? (
                <ActivityIndicator size='large' color={Prolar.color.primary} />
              ) : (
                <Button
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignSelf: 'center'
                  }}
                  color={Prolar.color.primary}
                  width={203}
                  height={height}
                  onPress={this.onPress}
                >
                  <Text
                    label='ذخیره اطلاعات'
                    color={Prolar.color.white}
                    fontSize={Prolar.size.font_md}
                  />
                </Button>
              )}
            </View>

            {/* -------------------------------------------------------------- */}
          </View>
        </CustomScrollView>
        <DropDown ref={ref => (this.dropdown = ref)} />
      </Container>
    )
  }
}

const styles = {
  pic: {
    alignSelf: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 50 * Prolar.size.unit,
    margin: 10 * Prolar.size.unit,
    width: 100 * Prolar.size.unit,
    height: 100 * Prolar.size.unit
  }
}
