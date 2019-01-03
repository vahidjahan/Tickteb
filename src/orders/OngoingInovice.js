import React, { Component } from "react";
import { Container } from "native-base";
import { ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import View from "../public/view/PrimaryView";
import Modal from "react-native-modal";
import Text from "../public/text/PrimaryText";
import { Prolar } from "../prolar/Prolar";
import Button from "../public/buttons/PrimaryButton";

import DropDown from "../public/dropDown/DropDown";
import { PayInvoiceApi } from "./PayInvoiceApi";
import { GetFinalInvoiceApi } from "./GetFinalInvoiceApi";

export default class OngoingInovice extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View
        style={{
          flexDirection: "row",
          flex: 0,
          msg: ""
        }}
      >
        <Button
          width={200}
          height={50}
          color={Prolar.color.success}
          onPress={() => {
            let bodyObject = {
              paymentType: 1,
              requestId: this.props.order.id
            };

            PayInvoiceApi(bodyObject).then(res => {
              if (res.errors.length === 0) {
                this.setState({ visibleModal: false });
                Prolar.navigator(this.props.activity, "Profile")();
                this.setState({ msg: undefined });
              } else {
                this.setState({ msg: res.errors }, () => {
                  this.setState({ msg: res.errors });
                });
              }
            });
          }}
        >
          <Text
            label="پرداخت نقدی"
            color={Prolar.color.white}
            fontSize={Prolar.size.font_md}
          />
        </Button>
      </View>

      <View
        style={{
          flexDirection: "row",
          flex: 0,
          paddingTop: Prolar.size.unit * 10
        }}
      >
        <Button
          width={200}
          height={50}
          color={Prolar.color.success}
          onPress={() => {
            let bodyObject = {
              paymentType: 0,
              requestId: this.props.order.id
            };

            PayInvoiceApi(bodyObject).then(res => {
              if (res.errors.length === 0) {
                this.setState({ visibleModal: false });
                Prolar.navigator(this.props.activity, "Profile")();
                this.setState({ msg: undefined });
              } else {
                this.setState({ msg: res.errors }, () => {
                  this.setState(
                    { msg: res.errors, visibleModal: false },
                    () => {
                      this.riseError();
                    }
                  );
                });
              }
            });
          }}
        >
          <Text
            label="کسر از حساب"
            color={Prolar.color.white}
            fontSize={Prolar.size.font_md}
          />
        </Button>
      </View>

      <TouchableOpacity
        onPress={() => {
          this.setState({ visibleModal: false });
        }}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          borderTopWidth: 1,
          borderTopColor: "#EAEAEA",
          marginTop: 10 * Prolar.size.unit,
          paddingTop: 10 * Prolar.size.unit
        }}
      >
        <Text
          label="بازگشت"
          color={Prolar.color.primary}
          fontSize={Prolar.size.font_md}
        />
      </TouchableOpacity>
    </View>
  );

  componentWillMount() {
    GetFinalInvoiceApi(this.props.order.id).then(res => {
      this.setState({ data: res.data });
    });
  }

  renderItem = (item, i) => {
    return (
      <View key={i} style={styles.row}>
        <Text
          color={Prolar.color.gray6}
          fontSize={Prolar.size.font_md}
          label={this.rialToTomanStr(item.price * item.quantity)}
          viewStyle={{ width: "25%" }}
          style={{ textAlign: "left" }}
        />
        <Text
          label={
            item.title +
            (item.quantity > 1
              ? " (" +
                Prolar.replaceNumberToPersion(item.quantity) +
                " مورد" +
                ")"
              : "")
          }
          color={Prolar.color.gray6}
          fontSize={Prolar.size.font_md}
          viewStyle={{ width: "75%" }}
          style={{ fontFamily: Prolar.fontFamily }}
        />
      </View>
    );
  };

  riseError = () => {
    setTimeout(() => this.dropdown.showError(this.state.msg), 500);
  };
  calcTotal = () => {
    let sum = 0;
    for (i = 0; i < this.state.data.length; i++) {
      let item = this.state.data[i];
      sum = sum + item.price * item.quantity;
    }
    return sum;
  };

  rialToTomanStr = rial => {
    return Prolar.rialLabel(Math.floor(rial));
  };

  containsType = type => {
    if (this.state.data == undefined) {
      return false;
    }
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].type == type) {
        return true;
      }
    }
    return false;
  };

  renderInvoice = () => (
    <View style={{ alignItems: "stretch" }}>
      <ScrollView>
        <View
          style={{
            paddingBottom: 145 * Prolar.size.unit,
            flex: 1,
            alignItems: "stretch"
          }}
        >
          {this.containsType(1) && (
            <View style={styles.col}>
              <Text
                label="سرویس‌های درخواستی"
                color={Prolar.color.gray4}
                fontSize={Prolar.size.font_md}
                viewStyle={styles.title}
              />
              {this.state.data.map(
                (item, i) => item.type == 1 && this.renderItem(item, i)
              )}
            </View>
          )}

          {this.containsType(2) && (
            <View style={styles.col}>
              <Text
                label="هدیه تیک‌طب"
                color={Prolar.color.gray4}
                fontSize={Prolar.size.font_md}
                viewStyle={styles.title}
              />
              {this.state.data.map(
                (item, i) => item.type == 2 && this.renderItem(item, i)
              )}
            </View>
          )}
          {this.containsType(4) && (
            <View style={styles.col}>
              <Text
                label="اقلام مصرفی"
                color={Prolar.color.gray4}
                fontSize={Prolar.size.font_md}
                viewStyle={styles.title}
              />
              {this.state.data.map((item, i) => {
                return item.type == 4 && this.renderItem(item, i);
              })}
            </View>
          )}
          {this.containsType(3) && (
            <View style={styles.col}>
              <Text
                label="سایر"
                color={Prolar.color.gray4}
                fontSize={Prolar.size.font_md}
                viewStyle={styles.title}
              />
              {this.state.data.map(
                (item, i) => item.type == 3 && this.renderItem(item, i)
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <View
        justifyContent="center"
        alignItem="center"
        style={{
          flex: 0,
          backgroundColor: "#ECF8F3",
          alignItems: "stretch",
          borderTopWidth: 1,
          borderTopColor: Prolar.color.success,
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 145 * Prolar.size.unit
        }}
      >
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Text
            color={Prolar.color.success}
            fontSize={Prolar.size.font_md}
            label={this.rialToTomanStr(this.calcTotal())}
          />
          <Text
            label="مجموع کل"
            color={Prolar.color.success}
            fontSize={Prolar.size.font_md}
            style={{ fontFamily: Prolar.fontFamily }}
          />
        </View>

        <View style={{ alignItems: "stretch" }}>
          <View
            flex={1}
            flexDirection="row"
            justifyContent="center"
            alignItem="center"
            style={{
              backgroundColor: "#ECF8F3"
            }}
          >
            <Button
              style={{ paddingBottom: 15 }}
              width={200}
              height={50}
              disabled={this.props.order.status != "تکمیل - فاکتور صادر شده"}
              color={
                this.props.order.status == "تکمیل - فاکتور صادر شده"
                  ? Prolar.color.success
                  : Prolar.color.gray4
              }
              onPress={() => this.setState({ visibleModal: true, delete: i })}
            >
              <Text
                label="پرداخت"
                color={Prolar.color.white}
                fontSize={Prolar.size.font_md}
              />
            </Button>
          </View>
        </View>
        <Modal
          isVisible={this.state.visibleModal}
          style={styles.bottomModal}
          onBackButtonPress={() => this.setState({ visibleModal: false })}
        >
          {this.renderModalContent()}
        </Modal>
      </View>
    </View>
  );

  render() {
    return (
      <Container>
        {this.state.data === undefined ? (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator size="large" color={Prolar.color.primary} />
          </View>
        ) : (
          this.renderInvoice()
        )}
        <DropDown ref={ref => (this.dropdown = ref)} />
      </Container>
    );
  }
}

const styles = {
  col: {
    flexDirection: "column",
    padding: 10 * Prolar.size.unit,
    alignItems: "flex-end"
  },
  row: {
    padding: 10 * Prolar.size.unit,
    borderBottomWidth: 1,
    borderBottomColor: Prolar.color.gray3,
    flexDirection: "row",
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItem: "center"
  },
  title: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: Prolar.color.gray4
  },
  modalContent: {
    flex: 0,
    backgroundColor: Prolar.color.white,
    borderRadius: Prolar.size.unit * 25,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 15 * Prolar.size.unit
  },
  bottomModal: {
    justifyContent: "flex-end"
  }
};
