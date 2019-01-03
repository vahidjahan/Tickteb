import React from "react";

import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Card,
  CardItem
} from "native-base";
import Button from "../public/buttons/PrimaryButton";
import CustomImage from "../public/image/CustomImage";
import {
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from "react-native";
import View from "../public/view/PrimaryView";
import Text from "../public/text/PrimaryText";

import { Prolar } from "./../prolar/Prolar";
import { width } from "../public/style/Dimension";
import { GetUserDefaultLocationDetailList } from "./GetUserDefaultLocationDetailList";
import HeaderButton from "../public/buttons/HeaderButton";
import DropDown from "../public/dropDown/DropDown";
import Modal from "react-native-modal";
import { DeleteLocationApi } from "../services/serviceRequest/DeleteLocationApi";

export default class FavoriteAddresses extends React.Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    const edit = this.props.navigation.getParam("edit", false);
    this.state = {
      edit: edit
    };
    this.onSelect = this.props.navigation.state.params;
  }

  componentWillMount() {
    // alert("2");
    this.setState({ list: undefined });
    GetUserDefaultLocationDetailList(Prolar.data.authorization).then(res => {
      if (res.errors.length == 0) {
        this.setState({ list: res.data });
      } else {
        this.props.navigation.pop();
        alert(res.errors[0]);
        // this.setState({ error: res.errors[0] });
      }
    });
  }

  select = location => {
    if (typeof this.onSelect === "function") {
      location.latitude = location.lat;
      location.longitude = location.lng;
      this.onSelect(location);
      this.props.navigation.pop();
    } else {
      // alert("1");
      this.componentWillMount();
    }
  };

  addNewLocation = () => {
    const { navigate } = this.props.navigation;
    navigate("SelectLocationFromMap", { onSelect: this.select, save: true });
  };

  renderList = () => {
    return this.state.list.map((item, i) => (
      <TouchableOpacity
        key={i * 2 + 3 * this.state.list.length}
        onPress={() => this.select(item)}
        disabled={this.state.edit}
      >
        <Card
          onPress={() => this.select(item)}
          style={[
            Prolar.style.card,
            {
              borderTopLeftRadius: 10 * Prolar.size.unit,
              borderTopRightRadius: 10 * Prolar.size.unit,
              borderBottomLeftRadius: 10 * Prolar.size.unit,
              borderBottomRightRadius: 10 * Prolar.size.unit
            }
          ]}
        >
          <CardItem
            first
            style={[
              Prolar.style.cardItem,
              {
                borderTopLeftRadius: 10 * Prolar.size.unit,
                borderTopRightRadius: 10 * Prolar.size.unit,
                borderTopWidth: 1 * Prolar.size.unit,
                borderRightWidth: 1 * Prolar.size.unit,
                borderLeftWidth: 1 * Prolar.size.unit,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderColor: Prolar.color.cardBorder
              }
            ]}
          >
            <Body style={Prolar.style.rtlCol}>
              <View style={Prolar.style.rtlRow}>
                <CustomImage
                  width={25}
                  height={25}
                  src={require("./../../assets/icons/pin.png")}
                />
                <Text
                  label={item.title}
                  color={Prolar.color.primary}
                  fontSize={Prolar.size.font_md}
                  style={{
                    marginRight: Prolar.size.unit * 11
                  }}
                />
              </View>

              <Text
                label={item.description.replace(/,/g, "،") + "، " + item.detail}
                color={Prolar.color.gray6}
                fontSize={Prolar.size.font_md}
                style={{
                  marginRight: Prolar.size.unit * 13
                }}
              />
            </Body>
          </CardItem>
          <CardItem
            style={
              this.state.edit
                ? {
                    borderLeftWidth: 1 * Prolar.size.unit,
                    borderRightWidth: 1 * Prolar.size.unit,
                    borderBottomWidth: 1 * Prolar.size.unit,
                    borderTopWidth: 1 * Prolar.size.unit,
                    borderColor: Prolar.color.cardBorder,
                    borderBottomLeftRadius: 10 * Prolar.size.unit,
                    borderBottomRightRadius: 10 * Prolar.size.unit,
                    padding: 0
                  }
                : {
                    borderLeftWidth: 1 * Prolar.size.unit,
                    borderRightWidth: 1 * Prolar.size.unit,
                    borderBottomWidth: 1 * Prolar.size.unit,
                    borderColor: Prolar.color.cardBorder,
                    borderBottomLeftRadius: 10 * Prolar.size.unit,
                    borderBottomRightRadius: 10 * Prolar.size.unit,
                    padding: 0
                  }
            }
            last
          >
            {this.state.edit ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center"
                  }}
                  onPress={() =>
                    this.setState({ visibleModal: true, delete: i })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      label="حذف"
                      color={Prolar.color.cardDelete}
                      fontSize={Prolar.size.font_md}
                    />
                  </View>
                  <CustomImage
                    width={30}
                    height={30}
                    src={require("./../../assets/icons/DeleteAddress.png")}
                    style={{
                      marginRight: Prolar.size.unit * 13
                    }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              undefined
            )}
          </CardItem>
        </Card>
      </TouchableOpacity>
    ));
  };

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View
        flexDirection="row"
        style={{
          flex: 0,
          marginBottom: Prolar.size.unit * 10
        }}
      >
        <Text
          style={{ textAlign: "center" }}
          label="آیا مطمئنید؟"
          color={Prolar.color.gray6}
          fontSize={Prolar.size.font_md}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          flex: 0
        }}
      >
        <Button
          width={200}
          height={50}
          disabled={this.state.wait2 == true}
          color={
            this.state.wait2 == true ? Prolar.color.gray1 : Prolar.color.error
          }
          onPress={() => {
            this.setState({ wait2: true });
            let id = this.state.list[this.state.delete].id;
            DeleteLocationApi(id).then(res => {
              if (res.errors.length == 0) {
                this.setState({ visibleModal: false, wait2: false });
                this.componentWillMount();
              } else {
                this.setState({
                  error: res.errors,
                  visibleModal: false,
                  wait2: false
                });
              }
            });
          }}
        >
          <Text
            label="حذف"
            color={Prolar.color.white}
            fontSize={Prolar.size.font_md}
          />
          {this.state.wait2 == true && (
            <ActivityIndicator
              style={{
                position: "absolute",
                right: 25 * Prolar.size.unit
              }}
              size="large"
              color={Prolar.color.primary}
            />
          )}
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

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={{ backgroundColor: Prolar.color.gray0 }}>
        <Modal
          isVisible={this.state.visibleModal}
          style={styles.bottomModal}
          onBackButtonPress={() => this.setState({ visibleModal: false })}
        >
          {this.renderModalContent()}
        </Modal>

        {this.state.error != undefined && (
          <DropDown message={this.state.error} alertType="warn" title="خطا" />
        )}

        <Header style={Prolar.style.header.container}>
          <Left style={Prolar.style.header.left_}>
            <HeaderButton
              name="arrow-back"
              onPress={Prolar.navigator(this, -1)}
            />
          </Left>

          <Body style={Prolar.style.header.body_}>
            <Title style={Prolar.style.header.title}>آدرس های منتخب</Title>
          </Body>
          <Right />
        </Header>

        <Content padder style={[Prolar.style.content, { flex: 1 }]}>
          <ScrollView style={{ paddingBottom: 95 * Prolar.size.unit }}>
            {this.state.list === undefined ? (
              <ActivityIndicator size="large" color={Prolar.color.primary} />
            ) : (
              this.renderList()
            )}
          </ScrollView>
        </Content>
        <View
          flex={0}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          style={{
            marginBottom: 30 * Prolar.size.unit,
            marginTop: 10 * Prolar.size.unit,
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "transparent"
          }}
        >
          <Button
            icon="add"
            onPress={this.addNewLocation}
            iconStyle={{
              color: Prolar.color.white,
              marginRight: 18 * Prolar.size.unit
            }}
            width={200}
            height={50}
            color={Prolar.color.primary}
          >
            <Text
              label="ثبت آدرس جدید"
              color={Prolar.color.white}
              fontSize={Prolar.size.font_md}
            />
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = {
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
