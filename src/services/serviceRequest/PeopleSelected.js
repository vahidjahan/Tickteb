import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  ImageBackground
} from 'react-native'
import Modal from 'react-native-modal'
import {
  Tab,
  Tabs,
  TabHeading,
  ScrollableTab,
  Thumbnail,
  Icon
} from 'native-base'

import PrimaryView from './../../public/view/PrimaryView'
import IconButton from './../../public/buttons/PrimaryIconButton'
import Button from './../../public/buttons/PrimaryButton'

import PrimaryInput from './../../public/inputs/PrimaryInput'

import Text from './../../public/text/PrimaryText'
import { width, height } from './../../public/style/Dimension'
import Divider from './../../public/divider/Divider'
import ReletiveList from '../../profile/ReletiveList'
import CustomScrollView from '../../public/view/CustomScrollView'
import { Prolar } from '../../prolar/Prolar'

import DropDown from './../../public/dropDown/DropDown'

import { GetUserPatientListWithUserApi } from './../../orders/GetUserPatientListWithUserApi'

export default class PeopleSelected extends Component {
  static navigationOptions = { header: null }

  state = {
    visibleModal: false,
    selected: -1
  }

  constructor (props) {
    super(props)
  }

  onRequestClose = () => {
    this.setState({
      visibleModal: false,
      list: undefined
    })
  }

  renderList = () => {
    return this.state.list.map((item, index) => (
      <View
        key={index}
        alignItems='center'
        justifyContent='flex-start'
        style={{ flexBasis: '33.33%' }}
      >
        <TouchableOpacity
          borderRadius={80 * Prolar.size.unit}
          style={{
            marginRight: 5 * Prolar.size.unit,
            marginLeft: 5 * Prolar.size.unit
          }}
          onPress={() =>
            this.setState({
              ...this.state,
              selected: this.state.selected == index ? -1 : index
            })
          }
        >
          <ImageBackground
            resizeMode={'cover'}
            source={
              item.imageUrl != undefined
                ? item.imageUrl != ''
                  ? { uri: Prolar.api.domain + item.imageUrl.trim() }
                  : require('./../../../assets/icons/profilePicEdit.png')
                : require('./../../../assets/icons/profilePicEdit.png')
            }
            opacity={this.state.selected == index ? 0.5 : 1}
            borderWidth={
              this.state.selected == index ? Prolar.size.unit * 3 : 0
            }
            borderColor={Prolar.color.primary}
            imageStyle={{ borderRadius: 40 * Prolar.size.unit }}
            style={{
              width: 80 * Prolar.size.unit,
              height: 80 * Prolar.size.unit,
              borderRadius: 40 * Prolar.size.unit,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Prolar.color.primary
            }}
          >
            {this.state.selected == index && (
              <Icon
                type='Entypo'
                name='check'
                width={Prolar.size.unit * 19}
                height={Prolar.size.unit * 13}
                color={Prolar.color.white}
                style={{
                  color: Prolar.color.white
                }}
              />
            )}
          </ImageBackground>
        </TouchableOpacity>

        <Text
          label={item.fullName}
          style={{
            marginTop: 10 * Prolar.size.unit,
            width: 80 * Prolar.size.unit,
            textAlign: 'center'
          }}
          color={
            this.state.selected == index
              ? Prolar.color.primary
              : Prolar.color.gray7
          }
          fontSize={Prolar.size.font_sm}
        />
      </View>
    ))
  }

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View>
        <Text
          style={{ marginTop: 18 * Prolar.size.unit }}
          label='این سرویس را برای چه کسی می‌خواهید؟'
          color={Prolar.color.gray6}
          fontSize={Prolar.size.font_md}
        />
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          marginTop: 17 * Prolar.size.unit,
          marginBottom: 10 * Prolar.size.unit
        }}
      >
        <View
          style={{
            height: 150 * Prolar.size.unit
          }}
        >
          <ScrollView
            horizontal
            ref='scrollView'
            onContentSizeChange={e => {
              this.refs.scrollView.scrollToEnd({ animated: true })
            }}
          >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {this.state.list === undefined ? (
                <ActivityIndicator size='large' color={Prolar.color.primary} />
              ) : (
                this.renderList()
              )}
            </View>
          </ScrollView>
        </View>

        <Button
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',

            alignSelf: 'center',
            marginTop: 20 * Prolar.size.unit
          }}
          disabled={this.state.selected == -1}
          color={
            this.state.selected == -1
              ? Prolar.color.gray1
              : Prolar.color.primary
          }
          width={200}
          height={50}
          onPress={() => {
            this.data.patient = this.state.list[this.state.selected]
            this.setState({ visibleModal: false })
            Prolar.navigator(this, 'SelectTimeAndDate', this.data)()
          }}
        >
          <Text
            label='تایید'
            color={Prolar.color.white}
            fontSize={Prolar.size.font_md}
          />
        </Button>
      </View>
    </View>
  )

  render () {
    this.data = { list: this.props.data }
    return (
      <View style={this.props.style}>
        {this.state.error != undefined && (
          <DropDown message={this.state.error} alertType='warn' title='خطا' />
        )}

        <IconButton
          color={
            this.props.data.length == 0
              ? Prolar.color.gray1
              : Prolar.color.primary
          }
          iconColor={Prolar.color.white}
          width={200}
          height={50}
          disabled={this.props.data.length == 0}
          icon='arrow-forward'
          onPress={() => {
            GetUserPatientListWithUserApi().then(res => {
              if (res.errors.length == 0) {
                this.setState({ list: res.data.reverse() })
              } else {
                this.setState({ error: res.errors[0], visibleModal: false })
              }
            })

            this.setState({ visibleModal: true })
          }}
        >
          <PrimaryView
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
            style={{
              marginLeft: Prolar.size.unit * 5,
              backgroundColor: 'rgba(0, 0, 0, 0.0)'
            }}
          >
            <Text
              label='ادامه'
              color={Prolar.color.white}
              fontSize={Prolar.size.font_md}
            />
          </PrimaryView>
        </IconButton>

        <Modal
          onRequestClose={this.onRequestClose}
          isVisible={this.state.visibleModal}
          style={styles.bottomModal}
        >
          {this.renderModalContent()}
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 0,
    backgroundColor: 'white',
    // padding: 10 * Prolar.size.unit,
    borderRadius: Prolar.size.radius * Prolar.size.unit,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomModal: {
    justifyContent: 'flex-end'
    // margin: 30
  }
})
