import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import Modal from 'react-native-modal'
import Button from './../../public/buttons/PrimaryButton'
import Text from './../../public/text/PrimaryText'
import { Prolar } from '../../prolar/Prolar'
import RNExitApp from 'react-native-exit-app'

import { AuthStore } from '../../redux/providers/AuthStore'
import { AddUserInfo } from '../../redux/actions/AuthActions'

let subs
export default class Logout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visibleModal: false
    }
  }

  doLogOut = () => {
    this.setState({ visibleModal: false })
    AuthStore.dispatch(AddUserInfo('null', 'null'))
    Prolar.setToken('null')
    // setTimeout(() => {
    //   RNExitApp.exitApp()
    // }, 700)
  }

  handleOpen = () => {
    this.setState({ visibleModal: true })
  }
  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch'
        }}
      >
        <View
          style={{
            flex: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#EAEAEA',
            paddingBottom: 10 * Prolar.size.unit,
            paddingTop: 8 * Prolar.size.unit
          }}
        >
          <Text
            label='آیا از خروج خود مطمئنید؟'
            color={Prolar.color.gray8}
            fontSize={Prolar.size.font_md}
            style={{ height: '100%' }}
          />
        </View>

        <View
          style={{
            flex: 80,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'stretch'
          }}
        >
          <View
            style={{
              flex: 50,
              justifyContent: 'center',
              alignItems: 'stretch',
              paddingLeft: 20 * Prolar.size.unit,
              paddingRight: 20 * Prolar.size.unit
            }}
          >
            <Button
              onPress={() => {
                this.setState({ visibleModal: false })
              }}
              color={Prolar.color.gray6}
              full={false}
              block
            >
              <Text
                label='بی‌خیال شدم…'
                color={Prolar.color.white}
                fontSize={Prolar.size.font_md}
              />
            </Button>
          </View>
          <View
            style={{
              flex: 50,
              justifyContent: 'center',
              alignItems: 'stretch',
              paddingLeft: 20 * Prolar.size.unit,
              paddingRight: 20 * Prolar.size.unit
            }}
          >
            <Button
              full
              block
              color={Prolar.color.primary}
              onPress={this.doLogOut}
            >
              <Text
                label='بله خارج می‌شوم'
                color={Prolar.color.white}
                fontSize={Prolar.size.font_md}
              />
            </Button>
          </View>
        </View>

        <View
          style={{
            flex: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'stretch',
            borderTopWidth: 1,
            borderTopColor: '#EAEAEA',
            paddingBottom: 10 * Prolar.size.unit,
            paddingTop: 10 * Prolar.size.unit
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({ visibleModal: false })
            }}
          >
            <Text
              label='بازگشت'
              color={Prolar.color.primary}
              fontSize={Prolar.size.font_md}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  render () {
    return (
      <Modal isVisible={this.state.visibleModal} style={styles.bottomModal}>
        {this.renderModalContent()}
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    height: 184 * Prolar.size.unit
  },
  bottomModal: {
    justifyContent: 'flex-end'
    // margin: 30
  }
})
