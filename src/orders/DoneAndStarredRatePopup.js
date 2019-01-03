import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'

import Button from './../public/buttons/PrimaryButton'
import Text from './../public/text/PrimaryText'
import CustomImage from '../public/image/CustomImage'
import { Prolar } from './../prolar/Prolar'
import RateStar from '../public/rateStar/RateStar'
import { RateAPI } from './RateAPI'

const stars = ['کاملا ناراضی', 'ناراضی', 'نسبتا راضی', 'راضی', 'کاملا راضی']

export default class DoneAndStarredRatePopup extends Component {
  state = { rate: 2 }

  handleOpen = () => {
    this.setState({ visibleModal: true })
  }

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <CustomImage
        onPress={this.onChargeWallet}
        width={80}
        height={80}
        src={require('../../assets/icons/artworkNotificationSuccessful.png')}
      />
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 12 * Prolar.size.unit
        }}
      >
        <Text
          label='سرویس شما با موفقیت به پایان رسید. '
          color={Prolar.color.success}
          fontSize={Prolar.size.font_md}
        />
      </View>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 10 * Prolar.size.unit,
          marginRight: 20 * Prolar.size.unit,
          marginLeft: 8 * Prolar.size.unit
        }}
      >
        <Text
          style={{
            textAlign: 'right'
          }}
          label='نظرات شما درباره کیفیت سرویس، موجب بهبود و ارتقای کیفیت سرویس‌های بعدی خواهد شد. '
          color={Prolar.color.gray6}
          fontSize={Prolar.size.font_md}
        />
      </View>

      <RateStar
        rate={this.state.rate}
        onChangeRate={index => {
          this.setState({ rate: index })
        }}
      />

      <Button
        onPress={() => {
          RateAPI(this.props.id, this.state.rate)
          this.setState({ visibleModal: false })
        }}
        color={Prolar.color.primary}
        width={203}
        height={50}
        style={{
          alignSelf: 'center',
          marginBottom: 10 * Prolar.size.unit,
          marginTop: 12 * Prolar.size.unit
        }}
      >
        <Text
          label='ثبت نظر'
          color={Prolar.color.white}
          fontSize={Prolar.size.font_md}
        />
      </Button>
    </View>
  )

  render () {
    return (
      <View>
        <Button
          color={Prolar.color.primary}
          width={203}
          height={50}
          onPress={this.handleOpen}
          style={{
            alignSelf: 'center',
            marginTop: 10 * Prolar.size.unit
          }}
        >
          <Text
            label='امتیاز به سرویس‌دهنده'
            color={Prolar.color.white}
            fontSize={Prolar.size.font_md}
          />
        </Button>
        <Modal isVisible={this.state.visibleModal} style={styles.bottomModal}>
          {this.renderModalContent()}
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomModal: {
    justifyContent: 'flex-end'
    // margin: 30
  }
})
