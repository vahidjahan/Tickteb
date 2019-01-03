import React from 'react'
import {
  Icon,
  View as NativeView,
  Label,
  Header,
  Left,
  Body,
  Title,
  Right
} from 'native-base'
import Modal from 'react-native-modal'
import { TouchableOpacity, BackHandler } from 'react-native'
import { Prolar } from '../../prolar/Prolar'
import PrimaryButton from '../buttons/PrimaryButton'
import View from './../view/PrimaryView'
import Text from './../text/PrimaryText'
import CameraRollPicker from 'react-native-camera-roll-picker'
import { log } from 'util'
import HeaderButton from '../buttons/HeaderButton'

export default class CameraRollPickerModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = { visibleModal: false, selected: -1 }
  }

  getSelectedImages = val => {
    let uri = ''
    if (val.length > 0) {
      if (val[0].hasOwnProperty('uri')) {
        uri = val[0].uri
      }
    }
    this.props.selectPhoto(uri)
    this.setState({ visibleModal: false, selected: 1 })
  }

  goBack = () => {
    this.setState({ visibleModal: false })

    return true
  }
  render () {
    const { placeholder, label, required, list, fieldName, style } = this.props

    let bulletColor = Prolar.color.gray2
    if (required == true) {
      bulletColor = Prolar.color.error
    }

    return (
      <TouchableOpacity
        style={style}
        onPress={() => {
          this.setState({ visibleModal: true })
        }}
      >
        {this.props.children}

        <Modal
          style={{ width: '100%', height: '93%', margin: 0, marginTop: '7%' }}
          isVisible={this.state.visibleModal}
        >
          <Header style={Prolar.style.header.container}>
            <Left style={Prolar.style.header.left_}>
              <HeaderButton name='arrow-back' onPress={this.goBack} />
            </Left>
            <Body style={Prolar.style.header.body_}>
              <Title style={Prolar.style.header.title}>انتخاب عکس</Title>
            </Body>
            <Right />
          </Header>
          <NativeView
            style={{
              backgroundColor: '#FFFFFF',
              height: '100%'
            }}
          >
            <CameraRollPicker
              callback={this.getSelectedImages}
              selectSingleItem
              maximum={1}
            />
          </NativeView>
        </Modal>
      </TouchableOpacity>
    )
  }
}

CameraRollPickerModal.defaultProps = {
  fieldName: 'label'
}
