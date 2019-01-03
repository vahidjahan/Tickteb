import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import CustomImage from '../public/image/CustomImage'
import Button from '../public/buttons/PrimaryButton'
import Text from '../public/text/PrimaryText'
import { Prolar } from '../prolar/Prolar'
import RateStar from '../public/rateStar/RateStar'
import { RateAPI } from './RateAPI'

export default class ModalForRating extends Component {
  constructor (props) {
    super(props)
  }
  state = {
    visibleModal: false,
    key: -1,
    rate: -1
  }

  saveRateInfo = () => {
    let bodyObject = {
      requestId: this.props.requestId,
      rate: this.state.rate,
      addProvider: false
    }
    let navigateProp = this.props.navigateProp
    RateAPI(bodyObject).then(res => {
      if (res.errors.length === 0) {
        alert('ممنون از نظر شما')
        this.setState({
          visibleModal: false,
          key: Date.now()
        })
        navigateProp.navigate('Profile')
      } else {
        alert(res.errors)
        this.setState({
          visibleModal: false,
          key: Date.now()
        })
        // this.props.getDataFromChild(this.state.rate);
        navigateProp.navigate('CheckOrders')
      }
    })
  } // EOF saveRateInfo
  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View
        flexDirection='row'
        style={{
          marginTop: Prolar.size.unit * 10
        }}
      >
        <CustomImage
          src={require('../../assets/icons/old/artworkNotificationSuccessful.png')}
          width={90.9}
          height={90.6}
          style={{
            marginBottom: Prolar.size.unit * 15
          }}
        />
      </View>
      <View
        flexDirection='row'
        style={{
          marginBottom: Prolar.size.unit * 10,
          marginRight: Prolar.size.unit * 5
        }}
      >
        <Text
          style={{ textAlign: 'center' }}
          label='سرویس شما با موفقیت به پایان رسید'
          color={'#00C853'}
          fontSize={Prolar.size.font_md}
        />
      </View>
      <View
        flexDirection='row'
        style={{
          marginRight: Prolar.size.unit * 5
        }}
      >
        <Text
          style={{ textAlign: 'center' }}
          label='نظرات شما درباره کیفیت سرویس،موجب بهبود و ارتقای کیفیت سرویس های بعدی خواهد شد'
          color={Prolar.color.gray6}
          fontSize={Prolar.size.font_md}
        />
      </View>
      <View
        flexDirection='row'
        style={{
          marginBottom: Prolar.size.unit * 20,
          marginRight: Prolar.size.unit * 5
        }}
      >
        <RateStar
          onChangeRate={index => {
            this.setState({ rate: index })
          }}
          rate={this.state.rate}
        />
      </View>

      <View
        flexDirection='row'
        style={{
          marginBottom: Prolar.size.unit * 20
        }}
      >
        <TouchableOpacity>
          <Button
            color={Prolar.color.primary}
            width={200}
            height={50}
            onPress={this.saveRateInfo}
          >
            <Text
              label='ثبت نظر'
              color={Prolar.color.white}
              fontSize={Prolar.size.font_md}
            />
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  )

  render () {
    if (this.props.state_ != undefined && this.props.state_.vis === true) {
      this.props.state_.vis = false
      this.state.visibleModal = true
    }
    return (
      <Modal
        key={this.state.key}
        isVisible={this.state.visibleModal}
        style={styles.bottomModal}
        onBackButtonPress={() =>
          this.setState({ visibleModal: false, key: Date.now() })}
      >
        {this.renderModalContent()}
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: Prolar.color.white,
    borderRadius: Prolar.size.unit * 25,
    alignItems: 'center',
    paddingRight: Prolar.size.unit * 10,
    paddingLeft: Prolar.size.unit * 10
  },

  bottomModal: {
    justifyContent: 'flex-end'
  }
})
