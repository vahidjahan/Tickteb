import React from "react";
// import { Button } from "react-native";
import { Container, Header, Left, Right, Icon, Body, Title } from "native-base";
import { TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import Avatar from "react-native-badge-avatar";

import View from "../public/view/PrimaryView";
import IconButton from "../public/buttons/PrimaryIconButton";
import Text from "../public/text/PrimaryText";
import Modal from "react-native-modal";

import { width, height } from "../public/style/Dimension";
import { headerStyle } from "./../public/style/HeaderStyle";
import HeaderButton from "../public/buttons/HeaderButton";
import ReletiveList from "./ReletiveList";
import ReletiveAdd from "./ReletiveAdd";
import PrimaryIconButton from "../public/buttons/PrimaryIconButton";
import { Prolar } from "../prolar/Prolar";
import CustomImage from "../public/image/CustomImage";
import { GetUserPatientList } from "./getUserPatientList";
import DropDown from "../public/dropDown/DropDown";
patientList = [];
export default class Reletives extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      showMsg: true,
      refresh: true,
      flag: true,
      initial: false
    };
    this.call();
  }
  componentDidUpdate = () => {
    let stt = this.props.navigation.state.params;
    if (stt != undefined) {
      if (stt.hasOwnProperty("st")) {
        if (stt.st == "toReletives") {
          this.call();
        }
      }
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.navigation.state.params.ok == "ok") {
      return { refresh: !prevState.refresh };
    } else {
      return null;
    }
  }

  static navigationOptions = { header: null };

  goReletiveAddPage = () => {
    Prolar.navigator(this, "ReletiveAdd", {
      reset: this.resetComponent
    })();
  };

  goBack = () => {
    const { navigate } = this.props.navigation;
    navigate("Profile");
  };

  call = () => {
    if (this.state.initial == false) {
      GetUserPatientList().then(res => {
        if (res.errors.length == 0) {
          patientList = res.data;
          this.setState({ initial: true });
        } else {
          this.setState({ msg: res.errors });
          this.riseError();
          patientList = [];
          setTimeout(this.call, 4000);
        }
      });
    }
  };
  riseError = () => {
    setTimeout(() => this.dropdown.showError(this.state.message), 900);
  };
  resetComponent = () => {
    this.setState({ initial: false });
  };

  render() {
    return (
      <Container
        flex={1}
        contentContainerStyle={{ flex: 1, justifyContent: "center" }}
      >
        <Header style={Prolar.style.header.container}>
          <Left style={Prolar.style.header.left_}>
            <HeaderButton name="arrow-back" onPress={this.goBack} />
          </Left>
          <Body style={Prolar.style.header.body_}>
            <Title style={Prolar.style.header.title}>بستگان</Title>
          </Body>
          <Right />
        </Header>
        <View
          style={{
            flexDirection: "column-reverse"
          }}
        >
          <View
            flex={0}
            style={{
              backgroundColor: "transparent",
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              padding: 15 * Prolar.size.unit,
              alignItems: "center",
              zIndex: 1000
            }}
          >
            {this.state.showMsg && (
              <View
                flex={0}
                style={[
                  Prolar.style.card,
                  {
                    // backgroundColor: '#336699',

                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    width: "100%",
                    padding: 10 * Prolar.size.unit
                  }
                ]}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ showMsg: false })}
                >
                  <Icon
                    type="Ionicons"
                    name="md-close"
                    style={{
                      color: Prolar.color.gray7
                    }}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-end"
                  }}
                >
                  <Text
                    label={
                      "بستگان شما افرادی هستند که شما می‌توانید به سادگی برای آنها خدمات پزشکی درخواست کنید."
                    }
                    color={Prolar.color.gray6}
                    fontSize={Prolar.size.font_md}
                  />
                </View>
              </View>
            )}

            <IconButton
              color={Prolar.color.primary}
              iconColor={Prolar.color.white}
              width={200}
              height={50}
              icon="add"
              onPress={this.goReletiveAddPage}
            >
              <View
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                style={{
                  marginLeft: Prolar.size.unit * 5,
                  backgroundColor: "rgba(0, 0, 0, 0.0)"
                }}
              >
                <Text
                  label="افزودن شخص جدید"
                  color={Prolar.color.white}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            </IconButton>
          </View>

          <View
            style={{ shrink: "1", width: "100%", justifyContent: "center" }}
            alignItems="center"
            justifyContent="flex-start"
          >
            {this.state.initial == false ? (
              <ActivityIndicator size="large" color={Prolar.color.primary} />
            ) : (
              <ReletiveList
                navigation={this.props.navigation}
                list={patientList}
                reset={this.resetComponent}
              />
            )}
          </View>
        </View>
        <DropDown ref={ref => (this.dropdown = ref)} />
      </Container>
    );
  }
}

const reletivesStyle = {
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25
  },
  contentContainer: {
    paddingVertical: 5
  },

  bottomModal: {
    justifyContent: "flex-end"
    // margin: 30
  },

  tab: {
    backgroundColor: "#fafafa"
  },
  tabHeading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#3353F1"
  },
  tabSchroll: {
    backgroundColor: "#3353F1",
    height: 100
  }
};
