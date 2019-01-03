import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import CustomImage from './../../public/image/CustomImage'
import Button from './../../public/buttons/PrimaryButton'
import Text from './../../public/text/PrimaryText'
import { Prolar } from './../../prolar/Prolar'

export default class SuccessfulRequest extends Component {
  state = {
    visibleModal: false,
    key: -1
  }

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View
        flexDirection='row'
        style={{
          marginBottom: Prolar.size.unit * 10,
          marginTop: Prolar.size.unit * 23,
          marginRight: Prolar.size.unit * 5
        }}
      >
        <Text
          style={{ textAlign: 'center' }}
          label='درخواست شما با موفقیت ثبت شد'
          color={Prolar.color.gray6}
          fontSize={Prolar.size.font_md}
        />
      </View>
      <View
        flexDirection='row'
        style={{
          marginTop: Prolar.size.unit * 10
        }}
      >
        <CustomImage
          src={require('./../../../assets/icons/artworkNotificationSuccessful.png')}
          width={130}
          height={130}
          style={{
            marginBottom: Prolar.size.unit * 24
          }}
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
            color={Prolar.color.gray7}
            width={200}
            height={50}
            onPress={() => {
              if (this.props.backButton != undefined) {
                this.props.backButton()
              }
              this.setState({
                visibleModal: false,
                key: Date.now()
              })
            }}
          >
            <Text
              label='بازگشت'
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
          this.setState({ visibleModal: false, key: Date.now() })
        }
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
