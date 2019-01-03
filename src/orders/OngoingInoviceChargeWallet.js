import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import Modal from 'react-native-modal';

import Button from './../public/buttons/PrimaryButton';

import PrimaryInput from './../public/inputs/PrimaryInput';

import Text from './../public/text/PrimaryText';
import CustomImage from '../public/image/CustomImage';
import {Prolar} from './../prolar/Prolar';

export default class OngoingInoviceChargeWallet extends Component {
  state = {};

  handleOpen = () => {
    this.setState ({visibleModal: true});
  };

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 10 * Prolar.size.unit,
        }}
      >
        <Text
          label="افزایش اعتبار"
          color={Prolar.color.gray6}
          fontSize={Prolar.size.font_md}
        />
      </View>

      <View
        style={{
          backgroundColor: Prolar.color.gray9,
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
          alignItems: 'center',
        }}
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        <View
          flex={1}
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Text
            style={{
              marginRight: Prolar.size.unit * 30,
              marginLeft: Prolar.size.unit * 15,
            }}
            label="۲۳۴۰۰۰ تومان"
            color={Prolar.color.gray6}
            fontSize={Prolar.size.font_md}
          />

        </View>

        <CustomImage
          onPress={this.onChargeWallet}
          width={30}
          height={30}
          style={{marginRight: Prolar.size.unit * 15}}
          src={require ('../../assets/icons/wallet.png')}
        />
      </View>
      <View
        flexDirection="row"
        justifyContent="center"
        alignItems="stretch"
        style={{
          marginLeft: 16 * Prolar.size.unit,
          marginRight: 16 * Prolar.size.unit,
          marginTop: 15 * Prolar.size.unit,
        }}
      >
        <PrimaryInput
          viewStyle={{
            flex: 1,
          }}
          height={50}
          label="مبلغ مورد نیاز"
          placeholder="۲,۳۰۰"
          placeholderTextColor={Prolar.color.secondary}
          style={{
            padding: 7 * Prolar.size.unit,
            fontSize: Prolar.size.font_md,
          }}
        />
      </View>

      <View
        flexDirection="row"
        justifyContent="center"
        alignItems="stretch"
        style={{
          marginTop: 7 * Prolar.size.unit,
          marginLeft: 9 * Prolar.size.unit,
          marginRight: 9 * Prolar.size.unit,
        }}
      >
        <View flex={1} justifyContent="center" alignItems="stretch">
          <Button
            style={{
              marginRight: 4 * Prolar.size.unit,
              height: 50 * Prolar.size.unit,
            }}
            onPress={() => {
              this.setState ({visibleModal: false});
            }}
            color={Prolar.color.secondary}
            full={false}
            block
          >
            <Text
              label="بازگشت"
              color={Prolar.color.white}
              fontSize={Prolar.size.font_md}
            />
          </Button>
        </View>
        <View flex={1} justifyContent="center" alignItems="stretch">
          <Button
            style={{
              marginLeft: 4 * Prolar.size.unit,
              height: 50 * Prolar.size.unit,
            }}
            onPress={() => {
              this.setState ({visibleModal: false});
            }}
            color={Prolar.color.success}
            full={false}
            block
          >
            <Text
              label="پرداخت"
              color={Prolar.color.white}
              fontSize={Prolar.size.font_md}
            />
          </Button>
        </View>
      </View>
    </View>
  );

  render () {
    return (
      <Modal isVisible={this.state.visibleModal} style={styles.bottomModal}>
        {this.renderModalContent ()}
      </Modal>
    );
  }
}

const styles = StyleSheet.create ({
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    // margin: 30
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
    alignItems: 'center',
  },
  wallet: {
    backgroundColor: '#E7ECF0',
    borderRadius: 24 * Prolar.size.unit,
    marginTop: 10 * Prolar.size.unit,
  },
});
