import React, { Component } from "react";
import { Container, Header, Left, Right, Icon, Body, Title } from "native-base";
import { View } from "react-native";
import { headerStyle } from "./../../public/style/HeaderStyle";
import HeaderButton from "../../public/buttons/HeaderButton";
import { StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import Carousel from "react-native-carousel-view";
import { width, height } from "./../../public/style/Dimension";
import IconButton from "./../../public/buttons/PrimaryIconButton";
import Text from "./../../public/text/PrimaryText";
import PrimaryView from "./../../public/view/PrimaryView";
import PeopleSelected from "./PeopleSelected";
import { Prolar } from "./../../prolar/Prolar";

import ServiceRequestAdd from "./ServiceReqestAdd";
import CustomImage from "../../public/image/CustomImage";
import SvgImage from "react-native-remote-svg/SvgImage";
import Swiper from "react-native-swiper";

export default class ServiceRequest extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.list = [];

    this.list = Prolar.data.services.slice(0).reverse();
    let i = this.props.navigation.state.params;
    let serviceIndex = i == undefined ? 0 : i;
    serviceIndex = this.list.length - serviceIndex - 1;

    this.state = {
      serviceIndex: serviceIndex,
      active: false,
      allData: []
    };

    // let element0 = this.list[0];
    // this.list[0] = this.list[serviceIndex];
    // this.list[serviceIndex] = element0;
  }

  goBack = () => {
    const { navigate } = this.props.navigation;
    navigate("Services");
  };

  nextPage = () => {
    let pageNum = this.state.page + 1;
    if (pageNum < 6) {
      this.setState({ page: pageNum }, () => {
        this.setState({ page: this.state.page });
      });
    }
  };

  previousPage = () => {
    let pageNum = this.state.page - 1;
    if (pageNum > -1) {
      this.setState({ page: pageNum }, () => {
        this.setState({ page: this.state.page });
      });
    }
  };
  setValue = it => {
    let x = 0;
    let item = this.state.allData.map(ite => {
      if (ite.hasOwnProperty("data")) {
        if (ite.data != null) {
          if (ite.data.id === it.id) {
            x = ite.count;
          }
        }
      }
    });
    return x;
  };
  renderSwiper() {
    if (Prolar.isIOS) {
      return (
        <Carousel
          key={this.state.serviceIndex}
          initialPage={this.state.serviceIndex}
          animate={false}
          onPageChange={p => {
            this.setState({
              serviceIndex: p
            });
          }}
          height={195 * Prolar.size.unit}
        >
          {this.list.map((item, i) => (
            <View key={i} style={styles.contentContainer}>
              <SvgImage
                style={{
                  width: Prolar.size.unit * 130,
                  height: Prolar.size.unit * 130
                }}
                source={{
                  uri:
                    Prolar.api.domain +
                    (item.imageUrl != undefined ? item.imageUrl.trim() : "")
                }}
              />

              <Text
                label={item.title}
                color={Prolar.color.primary}
                fontSize={Prolar.size.font_md}
              />
            </View>
          ))}
        </Carousel>
      );
    }
    return (
      <Swiper
        style={styles.wrapper}
        index={this.state.serviceIndex}
        onIndexChanged={index => {
          this.setState({ serviceIndex: index });
        }}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={styles.pagination}
        height={195 * Prolar.size.unit}
        loop={false}
      >
        {this.list.length > 0 &&
          this.list.map((item, i) => {
            return (
              <View key={i} style={styles.contentContainer}>
                <SvgImage
                  style={{
                    marginTop: Prolar.size.unit * 15,
                    width: Prolar.size.unit * 130,
                    height: Prolar.size.unit * 130
                  }}
                  // source={require('./1.jpg')}
                  source={{
                    uri:
                      Prolar.api.domain +
                      (item.imageUrl != undefined ? item.imageUrl.trim() : "")
                  }}
                />
                <Text
                  label={item.title}
                  color={Prolar.color.primary}
                  fontSize={Prolar.size.font_md}
                />
              </View>
            );
          })}
      </Swiper>
    );
  }
  render() {
    // alert(this.state.serviceIndex);
    return (
      <Container>
        <Header style={Prolar.style.header.container}>
          <Left style={Prolar.style.header.left_}>
            <HeaderButton
              name="arrow-back"
              onPress={Prolar.navigator(this, -1)}
            />
          </Left>
          <Body style={Prolar.style.header.body_}>
            <Title style={Prolar.style.header.title}>درخواست سرویس</Title>
          </Body>
          <Right />
        </Header>

        <ScrollView style={{ width: "100%" }}>
          <PrimaryView
            flexDirection="column"
            alignItems="center"
            style={{
              width: "100%",
              paddingBottom: 80 * Prolar.size.unit
            }}
          >
            {this.renderSwiper()}
            <PrimaryView justifyContent="center" alignItems="center">
              <Text
                label="لطفا سرویس مورد نیاز خود را انتخاب کنید"
                color={Prolar.color.gray4}
                fontSize={Prolar.size.font_sm}
                style={{
                  paddingTop: 5 * Prolar.size.unit
                }}
              />
            </PrimaryView>

            {this.list[this.state.serviceIndex].serviceItemList.map(
              (item, i) => (
                <ServiceRequestAdd
                  key={i + this.state.serviceIndex * 20}
                  data={item}
                  active={false}
                  defaultValue={this.setValue(item)}
                  getValue={value => {
                    let obj = this.state.allData.find(
                      o => o.data.id === item.id
                    );
                    if (obj) {
                      if (value.data) {
                        obj.count = value.count;
                      } else {
                        let removeItem = this.state.allData.filter(item => {
                          return item.data.id !== value.id;
                        });

                        this.state.allData = removeItem;

                        this.setState({
                          allData: removeItem
                        });
                        let removeitem2 = this.state.allData;
                      }
                    } else {
                      this.state.allData.push(value);
                    }

                    this.setState({ allData: this.state.allData }, () => {});
                  }}
                />
              )
            )}
          </PrimaryView>
        </ScrollView>

        <PeopleSelected
          data={this.state.allData}
          navigation={this.props.navigation}
          flex={0}
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: 30 * Prolar.size.unit,
            alignItems: "center",
            zIndex: 1000
          }}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: { width: width * 0.5 },
  container: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: 'transparent'
  },
  activeDot: {
    backgroundColor: Prolar.color.gray7,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  dot: {
    backgroundColor: Prolar.color.gray5,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  pagination: {
    bottom: -3,
    justifyContent: "center"
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  text: {
    color: Prolar.color.primary,
    fontSize: Prolar.size.font_md,
    textAlign: "center",
    marginRight: 82 * Prolar.size.unit,
    marginBottom: 100 * Prolar.size.unit
  }
});
