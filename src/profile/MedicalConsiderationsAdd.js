import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import Modal from "react-native-modal";

import PrimaryView from "./../public/view/PrimaryView";
import IconButton from "./../public/buttons/PrimaryIconButton";
import Button from "./../public/buttons/PrimaryButton";

import PrimaryInput from "./../public/inputs/PrimaryInput";

import Text from "./../public/text/PrimaryText";
import { width, height } from "./../public/style/Dimension";
import Divider from "./../public/divider/Divider";
import { Prolar } from "../prolar/Prolar";
import {
  MedicalConsiderationsAddApi,
  MedicalConsiderationsAddPostApi
} from "./MedicalConsiderationsApi";
import { MedicalConsiderationListApi } from "./MedicalConsiderationListApi";
import DropDown from "../public/dropDown/DropDown";
import MedicalConsiderationList from "./MedicalConsiderationList";
import { AddressValueCheck } from "../prolar/Validators";

class Selectable extends Button {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: this.props.defaultValue
    };
  }

  onPress = title => {
    this.setState(
      {
        isSelected: !this.state.isSelected
      },
      () => {
        this.props.onSelect(this.props.title, this.state.isSelected);
      }
    );
  };

  render() {
    let { title } = this.props;
    let backgroundColor = this.state.isSelected
      ? (color = Prolar.color.primary)
      : Prolar.color.white;
    let color = this.state.isSelected
      ? (color = Prolar.color.white)
      : Prolar.color.gray4;

    return (
      <Button
        color={backgroundColor}
        height={50}
        onPress={this.onPress}
        style={styles.item}
      >
        <Text
          label={title}
          color={color}
          fontSize={Prolar.size.font_md}
          style={{
            alignItems: "flex-end",
            flex: 1
          }}
        />
      </Button>
    );
  }
}

export default class MedicalConsiderationAdd extends Component {
  state = {
    visibleModal: false,
    data: [],
    selectedList: [],
    error: undefined,
    explanation: ""
  };

  componentDidMount() {
    MedicalConsiderationsAddApi().then(res => {
      if (res.errors.length === 0) {
        this.setState({ data: res.data });
      } else {
        this.setState({ error: res.error });
      }
    });

    MedicalConsiderationListApi(this.props.patientId).then(res => {
      if (res.errors.length == 0) {
        this.setState({ selectedList: res.data });
      } else {
        this.setState({ error: res.errors });
      }
    });
  }
  /* -------------------------- Adding the selected items to the list ------------------------- */
  addToList = (label, selected) => {
    let tempList = this.state.selectedList;
    selected // If item is selected
      ? this.state.selectedList.filter(word => word === label).length === 0
        ? tempList.push(label)
        : undefined // Already exists
      : (tempList = this.state.selectedList.filter(word => word !== label)); // If item is unseleted

    this.setState({ selectedList: tempList });
  };
  mcGet = val => {
    this.setState({ explanation: val });
  };
  /* ------------------------- Saving new data to the Server -------------------- */
  riseError = () => {
    setTimeout(() => this.dropdown.showError(this.state.error), 500);
  };
  onSaveDataToServer = () => {
    let stringList = this.state.selectedList;
    let cdata = this.state.explanation;
    if (cdata.length > 0) {
      if (AddressValueCheck(cdata)) {
        stringList.push(cdata);
      } else {
        this.setState({
          error: "ملاحظات پزشکی نباید شامل کاراکترهای غیر متنی و عددی باشد"
        });
        this.riseError();
      }
    }
    let bodyObject = {
      stringList,
      id: this.props.patientId
    };

    MedicalConsiderationsAddPostApi(bodyObject).then(res => {
      if (res.errors.length === 0) {
        this.setState({ error: undefined, visibleModal: false }, () => {
          this.props.onUpdate();
        });
      } else {
        this.dropdown.showError("اشکال در برقراری ارتباط با سرور");
      }
    });
    this.setState({ explanation: "" });
  };

  renderModalContent = () =>
    this.state.data.length !== 0 ? (
      <View style={styles.modalContent}>
        <ScrollView
          style={{
            paddingRight: 15 * Prolar.size.unit,
            paddingLeft: 15 * Prolar.size.unit
          }}
        >
          <View>
            <Text
              style={styles.textLabel}
              label="انتخاب از گزینه‌های پیش‌فرض"
              color={Prolar.color.gray4}
              fontSize={Prolar.size.font_md}
            />

            <View alignItems="center">
              {this.state.data.map((item, index) => (
                <Selectable
                  onSelect={this.addToList}
                  key={index}
                  title={item}
                  defaultValue={
                    this.state.selectedList.filter(word => word === item)
                      .length !== 0
                  }
                />
              ))}
            </View>

            <Text
              style={styles.textLabel}
              label="شرح موضوع"
              color={Prolar.color.gray4}
              fontSize={Prolar.size.font_md}
            />

            <View alignItems="center">
              <PrimaryInput
                ref="MedicalConsiderationText"
                label=""
                required
                placeholder="محل درج ملاحظه پزشکی"
                viewStyle={{ width: "100%" }}
                height={50}
                fontSize={Prolar.size.font_md}
                getValue={this.mcGet}
              />
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
              marginTop: 20 * Prolar.size.unit,
              marginBottom: 16 * Prolar.size.unit
            }}
          >
            <Button
              style={{
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center"
              }}
              color={Prolar.color.primary}
              width={200}
              height={50}
              onPress={this.onSaveDataToServer}
            >
              <Text
                label="ثبت"
                color={Prolar.color.white}
                fontSize={Prolar.size.font_md}
              />
            </Button>
          </View>
        </ScrollView>
        <DropDown ref={ref => (this.dropdown = ref)} />
      </View>
    ) : (
      <ActivityIndicator size="large" color={Prolar.color.primary} />
    );

  render() {
    return (
      <PrimaryView
        style={{
          backgroundColor: "transparent"
        }}
      >
        <View flex={0.5} alignItems="center" justifyContent="center">
          <IconButton
            color={Prolar.color.primary}
            iconColor={Prolar.color.white}
            width={200}
            height={50}
            icon="add"
            onPress={() => {
              this.setState({ visibleModal: true });
            }}
          >
            <View
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              style={{
                flex: 1,
                marginLeft: Prolar.size.unit * 5,
                backgroundColor: "rgba(0, 0, 0, 0.0)"
              }}
            >
              <Text
                label="افزودن به لیست"
                color={Prolar.color.white}
                fontSize={Prolar.size.font_md}
              />
            </View>
          </IconButton>
        </View>

        <Modal
          isVisible={this.state.visibleModal}
          style={styles.bottomModal}
          onBackButtonPress={() => this.setState({ visibleModal: false })}
        >
          {this.renderModalContent()}
        </Modal>
      </PrimaryView>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    borderRadius: Prolar.size.radius * Prolar.size.unit,
    alignItems: "center",
    justifyContent: "center"
  },

  bottomModal: {
    justifyContent: "flex-end"
  },

  textLabel: {
    margin: 15 * Prolar.size.unit
  },

  item: {
    borderWidth: 2 * Prolar.size.unit,
    borderColor: Prolar.color.gray2,
    marginBottom: 10 * Prolar.size.unit,
    textAlign: "right",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingRight: 19 * Prolar.size.unit,
    paddingTop: 10 * Prolar.size.unit,
    width: "100%"
  }
});
