import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView
} from 'react-native'
import Modal from 'react-native-modal'

import PrimaryView from './../public/view/PrimaryView'
import IconButton from './../public/buttons/PrimaryIconButton'
import Button from './../public/buttons/PrimaryButton'

import PrimaryInput from './../public/inputs/PrimaryInput'

import Text from './../public/text/PrimaryText'
import { width, height } from './../public/style/Dimension'
import Divider from './../public/divider/Divider'
import CustomImage from '../public/image/CustomImage'
import { Prolar } from './../prolar/Prolar'

export default class ChargeWallet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visibleModal: false,
      one: Prolar.color.white,
      two: Prolar.color.white,
      four: Prolar.color.white,
      five: Prolar.color.white,
      ten: Prolar.color.white,

      selectedText: ''
    }
    this.inputP = React.createRef()
  }

  handleOpen = () => {
    this.setState({ visibleModal: true })
  }
  onSelectPrice = name => event => {
    this.setState({
      one: Prolar.color.white,
      two: Prolar.color.white,
      four: Prolar.color.white,
      five: Prolar.color.white,
      ten: Prolar.color.white
    })
    this.setState({ [name]: Prolar.color.primary })
    this.setState({ selectedText: name })
    this.inputP.current.setState({ value: '' })
  }

  clearSelectedPrice = () => {
    this.setState({
      one: Prolar.color.white,
      two: Prolar.color.white,
      four: Prolar.color.white,
      five: Prolar.color.white,
      ten: Prolar.color.white,

      selectedText: ''
    })
  }

  renderModalContent = () => (
    <View style={styles.scrollView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.modalContent}>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 10 * Prolar.size.unit
            }}
          >
            <Text
              label='افزایش اعتبار'
              color={Prolar.color.gray6}
              fontSize={Prolar.size.font_md}
            />
          </View>

          <View
            style={{
              backgroundColor: '#E7ECF0',
              borderRadius: 24 * Prolar.size.unit,
              width: 190 * Prolar.size.unit,
              height: 50 * Prolar.size.unit,
              marginLeft: 5 * Prolar.size.unit,
              marginRight: 5 * Prolar.size.unit,
              marginTop: 10,
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center'
            }}
            flexDirection='row'
            alignItems='center'
            justifyContent='flex-end'
          >
            <View
              flex={1}
              flexDirection='row'
              alignItems='center'
              justifyContent='flex-start'
            >
              <Text
                style={{
                  marginRight: Prolar.size.unit * 30,
                  marginLeft: Prolar.size.unit * 15
                }}
                label={Prolar.rialLabel(
                  Math.floor(this.props.info ? this.props.info.credit : 0),
                  false
                )}
                color={Prolar.color.gray6}
                fontSize={Prolar.size.font_md}
              />
            </View>

            <CustomImage
              onPress={this.onChargeWallet}
              width={30}
              height={30}
              style={{ marginRight: Prolar.size.unit * 15 }}
              src={require('../../assets/icons/wallet.png')}
            />
          </View>
          <View
            flexDirection='row'
            justifyContent='center'
            alignItems='stretch'
            style={{
              marginLeft: 16 * Prolar.size.unit,
              marginRight: 16 * Prolar.size.unit,
              marginTop: 15 * Prolar.size.unit
            }}
          >
            <PrimaryInput
              keyboardType='numeric'
              viewStyle={{
                flex: 1
              }}
              ref={this.inputP}
              height={50}
              label=''
              placeholder='مبلغ مورد نظر (دلخواه)'
              style={{ padding: 7 * Prolar.size.unit }}
              getValue={() => {
                this.clearSelectedPrice()

                this.inputP.current.setState({
                  value: Prolar.replaceNumberToPersion(
                    this.inputP.current.state.value
                  )
                })
              }}
            />
          </View>

          <View
            flexDirection='row'
            justifyContent='center'
            alignItems='stretch'
            style={{
              marginTop: 10 * Prolar.size.unit,
              marginLeft: 16 * Prolar.size.unit,
              marginRight: 16 * Prolar.size.unit
            }}
          >
            <View flex={1} justifyContent='center' alignItems='stretch'>
              <Button
                style={{
                  marginRight: 4 * Prolar.size.unit,
                  height: 50 * Prolar.size.unit,
                  borderWidth: 1,
                  borderColor: '#d6d7da',
                  shadow: 0
                }}
                onPress={this.onSelectPrice('two')}
                color={this.state.two}
                full={false}
                block
              >
                <Text
                  label={Prolar.replaceNumberToPersion('۲۰,۰۰۰ تومان')}
                  color={
                    this.state.selectedText === 'two'
                      ? Prolar.color.white
                      : Prolar.color.gray4
                  }
                  fontSize={Prolar.size.font_md}
                />
              </Button>
            </View>
            <View flex={1} justifyContent='center' alignItems='stretch'>
              <Button
                style={{
                  marginLeft: 4 * Prolar.size.unit,
                  height: 50 * Prolar.size.unit,
                  borderWidth: 1,
                  borderColor: '#d6d7da',
                  shadow: 0
                }}
                onPress={this.onSelectPrice('one')}
                color={this.state.one}
                full={false}
                block
              >
                <Text
                  label={Prolar.replaceNumberToPersion('۱۰,۰۰۰ تومان')}
                  color={
                    this.state.selectedText === 'one'
                      ? Prolar.color.white
                      : Prolar.color.gray4
                  }
                  fontSize={Prolar.size.font_md}
                />
              </Button>
            </View>
          </View>
          <View
            flexDirection='row'
            justifyContent='center'
            alignItems='stretch'
            style={{
              marginTop: 6 * Prolar.size.unit,
              marginLeft: 16 * Prolar.size.unit,
              marginRight: 16 * Prolar.size.unit
            }}
          >
            <View flex={1} justifyContent='center' alignItems='stretch'>
              <Button
                style={{
                  marginRight: 4 * Prolar.size.unit,
                  height: 50 * Prolar.size.unit,
                  borderWidth: 1,
                  borderColor: '#d6d7da',
                  shadow: 0
                }}
                onPress={this.onSelectPrice('five')}
                color={this.state.five}
                full={false}
                block
              >
                <Text
                  label={Prolar.replaceNumberToPersion('۵۰,۰۰۰ تومان')}
                  color={
                    this.state.selectedText === 'five'
                      ? Prolar.color.white
                      : Prolar.color.gray4
                  }
                  fontSize={Prolar.size.font_md}
                />
              </Button>
            </View>
            <View flex={1} justifyContent='center' alignItems='stretch'>
              <Button
                style={{
                  marginLeft: 4 * Prolar.size.unit,
                  height: 50 * Prolar.size.unit,
                  borderWidth: 1,
                  borderColor: '#d6d7da',
                  shadow: 0
                }}
                onPress={this.onSelectPrice('four')}
                color={this.state.four}
                full={false}
                block
              >
                <Text
                  label={Prolar.replaceNumberToPersion('۴۰,۰۰۰ تومان')}
                  color={
                    this.state.selectedText === 'four'
                      ? Prolar.color.white
                      : Prolar.color.gray4
                  }
                  fontSize={Prolar.size.font_md}
                />
              </Button>
            </View>
          </View>
          <View
            flexDirection='row'
            justifyContent='center'
            alignItems='stretch'
            style={{
              marginTop: 6 * Prolar.size.unit,
              marginLeft: 16 * Prolar.size.unit,
              marginRight: 16 * Prolar.size.unit
            }}
          >
            <View flex={1} justifyContent='center' alignItems='stretch' />
            <View flex={1} justifyContent='center' alignItems='stretch'>
              <Button
                style={{
                  marginLeft: 4 * Prolar.size.unit,
                  height: 50 * Prolar.size.unit,
                  borderWidth: 1,

                  borderColor: '#d6d7da'
                }}
                color={this.state.ten}
                full={false}
                block
                onPress={this.onSelectPrice('ten')}
              >
                <Text
                  label={Prolar.replaceNumberToPersion('۱۰۰,۰۰۰ تومان')}
                  color={
                    this.state.selectedText === 'ten'
                      ? Prolar.color.white
                      : Prolar.color.gray4
                  }
                  fontSize={Prolar.size.font_md}
                />
              </Button>
            </View>
          </View>
          <View
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
            style={{
              marginTop: 10 * Prolar.size.unit,
              marginLeft: 16 * Prolar.size.unit,
              marginRight: 16 * Prolar.size.unit
            }}
          >
            <View flex={1} justifyContent='center' alignItems='stretch'>
              <Button
                onPress={() => {
                  this.setState({ visibleModal: false })
                }}
                style={{
                  marginBottom: 10 * Prolar.size.unit,
                  height: 50 * Prolar.size.unit
                }}
                color={Prolar.color.primary}
                full={false}
                block
              >
                <Text
                  label='پرداخت'
                  color={Prolar.color.white}
                  fontSize={Prolar.size.font_md}
                />
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )

  render () {
    return (
      <Modal
        isVisible={this.state.visibleModal}
        style={styles.bottomModal}
        onRequestClose={() => this.setState({ visibleModal: false })}
      >
        {this.renderModalContent()}
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  bottomModal: {
    justifyContent: 'flex-end'
    // margin: 30
  },
  scrollView: {
    borderRadius: 25,

    backgroundColor: 'white'
  },
  wallet: {
    backgroundColor: '#E7ECF0',
    borderRadius: 24,
    width: 350,
    height: 80,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  wallet: {
    backgroundColor: '#E7ECF0',
    borderRadius: 24 * Prolar.size.unit,
    marginTop: 10 * Prolar.size.unit
  }
})
