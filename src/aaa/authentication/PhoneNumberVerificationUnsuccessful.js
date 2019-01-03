import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import PrimaryView from './../../public/view/PrimaryView'
import Button from './../../public/buttons/PrimaryButton'
import Text from './../../public/text/PrimaryText'
import { width, height } from './../../public/style/Dimension'
import Divider from './../../public/divider/Divider'
import { Prolar } from './../../prolar/Prolar'
import { CheckUserApi } from './CheckUserApi'
import { AuthStore } from '../../redux/providers/AuthStore'

let buttonLabel = 'کد را دریافت نکردم'
let interval
let unsubscribe
export default class UnsuccessFul extends Component {
  constructor (props) {
    super(props)
    unsubscribe = AuthStore.subscribe(this.updateState)
  }

  state = {
    mobileNumber: '',
    visibleModal: false,
    disabled: true,
    timer: 60
  }
  updateState = () => {
    let mobileNumber = AuthStore.getState().mobileNumber
    if (this.state.mobileNumber != mobileNumber) {
      this.setState({ mobileNumber: mobileNumber })
    }
  }
  resendCode = () => {
    CheckUserApi(this.state.mobileNumber).then(res => {
      this.setState({
        visibleModal: false,
        disabled: true,
        timer: 60
      })
      this.componentDidMount()
    })
  }
  setButtonLabel = () => {
    return this.state.timer > 0
      ? `${buttonLabel} ( ${this.state.timer} )`
      : buttonLabel
  }
  changeNumber = () => {
    const { navigate } = this.props.navigation
    navigate('CheckUser')
  }
  componentDidMount () {
    if (this.state.timer > 0) {
      interval = setInterval(() => {
        this.setState({ timer: this.state.timer - 1 })
      }, 1000)
    }
  }
  componentDidUpdate () {
    if (this.state.timer == 0 && this.state.disabled == true) {
      this.setState({ disabled: false })
      clearInterval(interval)
    }
  }
  componentWillUnmount () {
    clearInterval(interval)
    unsubscribe()
  }

  renderModalContent = () => (
    <View style={styles.modalContent}>
      {/* <View */}
      <Text
        style={{
          marginBottom: Prolar.size.unit * 10,
          marginTop: Prolar.size.unit * 23
        }}
        label={Prolar.replaceNumberToPersion(this.state.mobileNumber)}
        color={Prolar.color.gray8}
        fontSize={Prolar.size.font_lg}
      />

      <Divider
        style={{ marginBottom: Prolar.size.unit * 24 }}
        color='#eaeaea'
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: Prolar.size.unit * 20
        }}
      >
        <Button
          onPress={this.resendCode}
          color={Prolar.color.primary}
          width={150}
          height={50}
          style={{ marginRight: Prolar.size.unit * 12 }}
        >
          <Text
            label='ارسال مجدد کد'
            color={Prolar.color.white}
            fontSize={Prolar.size.font_md}
          />
        </Button>

        <Button
          onPress={this.changeNumber}
          color={Prolar.color.primary}
          width={150}
          height={50}
        >
          <Text
            label='تغییر شماره'
            color={Prolar.color.white}
            fontSize={Prolar.size.font_md}
          />
        </Button>
      </View>

      <Divider
        style={{ marginBottom: Prolar.size.unit * 16 }}
        color={Prolar.color.gray12}
      />

      <TouchableOpacity
        onPress={() => {
          this.setState({ visibleModal: false })
        }}
      >
        <Text
          style={{ marginBottom: Prolar.size.unit * 16 }}
          label='بازگشت'
          color={Prolar.color.primary}
          fontSize={Prolar.size.font_md}
        />
      </TouchableOpacity>
    </View>
  )

  render () {
    return (
      <PrimaryView>
        <Button
          onPress={() => {
            this.updateState()
            this.setState({ visibleModal: true })
          }}
          disabled={this.state.disabled}
          color={Prolar.color.gray7}
          width={200}
          height={42}
        >
          <Text
            label={this.setButtonLabel()}
            color={Prolar.color.white}
            fontSize={Prolar.size.font_md}
          />
        </Button>

        <Modal
          isVisible={this.state.visibleModal}
          style={styles.bottomModal}
          onBackButtonPress={() => this.setState({ visibleModal: false })}
        >
          {this.renderModalContent()}
        </Modal>
      </PrimaryView>
    )
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: Prolar.color.white,
    borderRadius: Prolar.size.unit * 25,
    alignItems: 'center'

    // justifyContent: "flex-start"
  },
  bottomModal: {
    justifyContent: 'flex-end'
  }
})
