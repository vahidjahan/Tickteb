import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import Modal from 'react-native-modal'
import PrimaryView from './../../public/view/PrimaryView'
import Button from './../../public/buttons/PrimaryButton'
import Text from './../../public/text/PrimaryText'
import { Prolar } from './../../prolar/Prolar'
import PrimaryInput from './../../public/inputs/PrimaryInput'
import { ListItem, CheckBox } from 'native-base'
import { AddressValueCheck } from '../../prolar/Validators'

export default class SelectLocationFromMapExactAddress extends Component {
  state = {
    visibleModal: false,
    checked: false,
    title: '',
    address: ''
  }

  changeChecked = () => {
    this.setState({ checked: !this.state.checked })
  }
  isValid = () => {
    if (this.state.wait) {
      return false
    }

    if (!this.props.showSave) {
      return (
        AddressValueCheck(this.state.title) &&
        AddressValueCheck(this.state.address)
      )
    } else if (this.state.checked) {
      return (
        AddressValueCheck(this.state.title) &&
        AddressValueCheck(this.state.address)
      )
    } else {
      return AddressValueCheck(this.state.address)
    }
  }
  getAddress = str => {
    this.setState({ address: str })
  }
  getTitle = str => {
    this.setState({ title: str })
  }
  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View style={{ alignSelf: 'flex-end' }}>
        <Text
          label={this.props.desc.replace(/,/g, '،')}
          color={Prolar.color.gray10}
          fontSize={Prolar.size.font_md}
        />
      </View>

      <Text
        viewStyle={{
          marginTop: Prolar.size.unit * 15
        }}
        label='برای یافتن هر چه سریع تر شما لطفا آدرس دقیق را در بخش زیر وارد نمايید'
        color={Prolar.color.gray8}
        fontSize={Prolar.size.font_md}
      />

      <PrimaryInput
        getValue={this.getAddress}
        required
        placeholder='آدرس دقیق'
        height={50}
        viewStyle={{
          marginBottom: Prolar.size.unit * 10,
          width: '100%',
          marginTop: 15 * Prolar.size.unit
        }}
      />
      {(this.state.checked || !this.props.showSave) && (
        <PrimaryInput
          getValue={this.getTitle}
          placeholder='عنوان آدرس'
          height={50}
          required
          viewStyle={{
            marginBottom: Prolar.size.unit * 10,
            width: '100%',
            marginTop: 15 * Prolar.size.unit
          }}
        />
      )}

      {this.props.showSave && (
        <TouchableOpacity
          style={{
            width: '100%',
            padding: 10 * Prolar.size.unit,
            marginTop: 15 * Prolar.size.unit,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
          onPress={this.changeChecked}
        >
          <Text
            label=' ذخیره در آدرس های منتخب '
            color={Prolar.color.gray10}
            fontSize={Prolar.size.font_md}
          />

          <CheckBox
            style={{ marginRight: 10 * Prolar.size.unit }}
            checked={this.state.checked}
            onPress={this.changeChecked}
            color={Prolar.color.primary}
          />
        </TouchableOpacity>
      )}

      <Button
        style={{
          alignSelf: 'center',
          marginTop: 15 * Prolar.size.unit
        }}
        width={200}
        height={50}
        disabled={this.isValid() == false}
        color={
          this.isValid() == false ? Prolar.color.gray1 : Prolar.color.primary
        }
        onPress={() => {
          let lo = {
            save:
              this.state.checked ||
              this.props.showSave == undefined ||
              this.props.showSave == false,
            title: this.state.title,
            detail: this.state.address
          }

          this.props.onConfirm(lo)

          this.setState({ wait: true })
        }}
      >
        <Text
          label='تایید'
          color={Prolar.color.white}
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
  )

  render () {
    return (
      <PrimaryView
        style={{
          backgroundColor: 'transparent',
          flex: 0,
          flexDirection: 'row',
          width: 200 * Prolar.size.unit
        }}
      >
        <Button
          onPress={() => {
            this.setState({ visibleModal: true })
          }}
          style={{
            flex: 1,
            alignSelf: 'center',
            marginBottom: 25 * Prolar.size.unit
          }}
          color={Prolar.color.primary}
          width={200}
          height={50}
        >
          <Text
            label='انتخاب محل سرویس'
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
    alignItems: 'center',
    padding: 15 * Prolar.size.unit
  },
  bottomModal: {
    justifyContent: 'flex-end'
  }
})
