import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Thumbnail } from "native-base";
import Button from "./../public/buttons/PrimaryButton";
import Text from "./../public/text/PrimaryText";
import { Prolar } from "./../prolar/Prolar";

export default class AllowEntry extends Component {
  state = {
    visibleModal: false
  };

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View
        flexDirection="row"
        style={{
          marginBottom: Prolar.size.unit * 10,
          marginTop: Prolar.size.unit * 23
        }}
      >
        <Thumbnail
          source={require("./../../assets/images/reza.jpg")}
          style={styles.avatar}
        />
      </View>
      <View
        flexDirection="row"
        style={{
          marginBottom: Prolar.size.unit * 10,
          marginTop: Prolar.size.unit * 23,
          marginRight: Prolar.size.unit * 5
        }}
      >
        <Text
          style={{ textAlign: "center" }}
          label="اقای فخرایی برای سرویس ۱۴
          به نزدیکی محل کار شما رسیده است"
          color={Prolar.color.gray6}
          fontSize={Prolar.size.font_md}
        />
      </View>
      <View
        flexDirection="row"
        style={{
          marginBottom: Prolar.size.unit * 10,
          marginTop: Prolar.size.unit * 23
        }}
      >
        <TouchableOpacity>
          <Button
            color={Prolar.color.primary}
            width={200}
            height={60}
            style={{ marginTop: Prolar.size.unit * 8 }}
          >
            <Text
              label="تایید"
              color={Prolar.color.white}
              fontSize={Prolar.size.font_md}
            />
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    return (
      <View>
        <Button
          onPress={() => {
            this.setState({ visibleModal: true });
          }}
          color={Prolar.color.gray7}
          width={200}
          height={42}
        >
          <Text
            label="test"
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: Prolar.color.white,
    borderRadius: Prolar.size.unit * 25,
    alignItems: "center",
    paddingRight: Prolar.size.unit * 10,
    paddingLeft: Prolar.size.unit * 10
  },
  avatar: {
    width: Prolar.size.unit * 100,
    height: Prolar.size.unit * 100,
    borderRadius: Prolar.size.unit * 50,
    marginTop: 10 * Prolar.size.unit
  },
  bottomModal: {
    justifyContent: "flex-end"
  }
});
