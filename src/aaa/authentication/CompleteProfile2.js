import React, { Component } from "react";
import { ScrollView, Image, StyleSheet } from "react-native";
import { Container, Header, Right, Body, Title, Left } from "native-base";
import RNExitApp from "react-native-exit-app";

import ProgressBar from "./../../public/progressBar/ProgressBar";
import View from "./../../public/view/PrimaryView";
import Button from "../../public/buttons/PrimaryButton";
import Text from "./../../public/text/PrimaryText";
import { Prolar } from "./../../prolar/Prolar";
import { WebView } from "react-native";
import Modal from "react-native-modal";
import { SourceData } from "../../prolar/ApiLinks";
export default class CompleteProfile2 extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    visibleModal: false
  };

  deny = () => {
    this.setState({ visibleModal: true });
  };
  accept = () => {
    Prolar.navigator(this, "CompleteProfile1")();
  };
  think = () => {
    this.setState({ visibleModal: false });
  };
  exit = () => {
    RNExitApp.exitApp();
  };

  renderModalContent = () => (
    <View style={styles.modalContent}>
      {/* <View */}
      <Text
        style={{
          marginBottom: Prolar.size.unit * 20,
          marginTop: Prolar.size.unit * 23
        }}
        label="آیا مطمئنید می‌خواهید از تیک‌طب خارج شوید؟"
        color={Prolar.color.gray7}
        fontSize={Prolar.size.font_md}
      />

      <View
        style={{
          flexDirection: "row",
          flex: 0,
          backgroundColor: "transparent",
          marginBottom: 15 * Prolar.size.unit
        }}
      >
        <Button
          onPress={this.think}
          color={Prolar.color.primary}
          width={150}
          height={50}
          style={{ marginRight: Prolar.size.unit * 12 }}
        >
          <Text
            label="خیر"
            color={Prolar.color.white}
            fontSize={Prolar.size.font_md}
          />
        </Button>

        <Button
          onPress={this.exit}
          color={Prolar.color.gray7}
          width={150}
          height={50}
        >
          <Text
            label="بله"
            color={Prolar.color.white}
            fontSize={Prolar.size.font_md}
          />
        </Button>
      </View>
    </View>
  );

  render() {
    return (
      <Container>
        <Header style={Prolar.style.header}>
          <Left />
          <Body style={{ flex: 2 }}>
            <Title style={Prolar.style.header.title}>
              قوانین و ضوابط استفاده
            </Title>
          </Body>
          <Right />
        </Header>
        <ProgressBar progress={0.7} color="white" />

        {/* <ScrollView>
          <View alignItems="center">

            <Text
              color={Prolar.color.gray6}
              fontSize={Prolar.size.font_md}
              style={{
                paddingRight: Prolar.size.unit * 20,
                paddingLeft: Prolar.size.unit * 20
              }}
            />
          </View>
          </ScrollView> */}
        <WebView
          source={{ uri: `${Prolar.api.domain}${SourceData.persianSiteRules}` }}
          style={{
            paddingRight: Prolar.size.unit * 20,
            paddingLeft: Prolar.size.unit * 20,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1
          }}
        />

        <View
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            flex: 0,
            marginBottom: 30 * Prolar.size.unit,
            backgroundColor: "transparent",
            zIndex: 2
          }}
          flexDirection="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Button
            onPress={this.deny}
            color={Prolar.color.gray7}
            width={160}
            height={50}
          >
            <Text
              label="موافق نیستم و خروج"
              color={Prolar.color.white}
              fontSize={15}
            />
          </Button>
          <Button
            onPress={this.accept}
            color={Prolar.color.primary}
            width={160}
            height={50}
          >
            <Text
              label="قبول و ورود"
              color={Prolar.color.white}
              fontSize={15}
            />
          </Button>
        </View>
        <Modal
          isVisible={this.state.visibleModal}
          style={styles.bottomModal}
          onBackButtonPress={() => this.setState({ visibleModal: false })}
        >
          {this.renderModalContent()}
        </Modal>
      </Container>
    );
  }
}
const styles = {
  modalContent: {
    flex: 0,
    backgroundColor: "white",
    borderRadius: Prolar.size.radius * Prolar.size.unit,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomModal: {
    justifyContent: "flex-end"
  }
};
