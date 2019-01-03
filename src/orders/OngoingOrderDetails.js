import React, { Component } from "react";
import { Container } from "native-base";
import { TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import Text from "./../public/text/PrimaryText";
import View from "../public/view/PrimaryView";
import { Prolar } from "../prolar/Prolar";
import CustomImage from "../public/image/CustomImage";
import { GetRequestResultApi } from "./GetRequestResultApi";
import CustomLightBox from "./../public/image/CustomLightBox";

export default class OngoingOrderDetails extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      orderDetail: undefined
    };
  }

  componentWillMount() {
    GetRequestResultApi(this.props.order.id).then(res => {
      this.setState({ orderDetail: res });
    });
  }

  goBack = () => {
    const { navigation } = this.props.navigation;
    navigation("Sevices");
  };

  renderAttachment = (item, i) => {
    let url = Prolar.api.domain + item.replace("Thumbnail/", "");
    return (
      <TouchableOpacity style={{ flexBasis: "33%" }} onPress={() => {}}>
        <View
          justifyContent="center"
          alignItems="center"
          style={{
            borderWidth: 1,
            margin: 5,
            borderColor: Prolar.color.cardBorder,
            borderRadius: 10
          }}
        >
          <CustomLightBox imageUrl={url} />
        </View>
      </TouchableOpacity>
    );
  };

  renderElement = (item, i) => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        borderRightWidth: 1,
        borderColor: Prolar.color.cardBorder,
        backgroundColor: "transparent"
      }}
    >
      <Text
        label={item["value" + i + "Title"]}
        color={Prolar.color.gray4}
        fontSize={Prolar.size.font_sm}
      />
      <Text
        label={item["value" + i]}
        color={Prolar.color.gray6}
        fontSize={Prolar.size.font_lg}
      />
      <Text
        label={item["value" + i + "Measure"]}
        color={Prolar.color.gray4}
        fontSize={Prolar.size.font_sm}
      />
    </View>
  );

  renderItem = (item, i) =>
    item.value1 ? (
      <View
        key={i}
        flexDirection="row"
        style={{
          borderTopWidth: i > 0 ? 1 : 0,
          borderColor: Prolar.color.cardBorder,
          backgroundColor: "transparent"
        }}
      >
        <View
          alignItems="center"
          justifyContent="center"
          style={{
            alignItems: "stretch",
            height: "100%",
            flexDirection: "row",
            backgroundColor: "transparent"
          }}
        >
          {item.value3 ? this.renderElement(item, 3) : undefined}
          {item.value2 ? this.renderElement(item, 2) : undefined}
          {item.value1 ? this.renderElement(item, 1) : undefined}
        </View>
        <View
          alignItems="center"
          justifyContent="center"
          style={{
            height: Prolar.size.unit * 86,
            width: Prolar.size.unit * 160,
            flex: 0,
            backgroundColor: "transparent"
          }}
        >
          <Text
            style={{ textAlign: "center" }}
            label={item.title}
            color={Prolar.color.gray6}
            fontSize={Prolar.size.font_md}
          />
        </View>
      </View>
    ) : (
      undefined
    );

  renderItems = () => (
    <View
      style={{
        borderRadius: Prolar.size.unit * 5,
        borderWidth: 1,
        borderColor: Prolar.color.cardBorder
      }}
    >
      {this.state.orderDetail && this.state.orderDetail.data
        ? this.state.orderDetail.data.details
          ? this.state.orderDetail.data.details.map((item, i) =>
              this.renderItem(item, i)
            )
          : undefined
        : undefined}
    </View>
  );

  render() {
    return (
      <Container
        style={{
          paddingRight: Prolar.size.unit * 10,
          paddingLeft: Prolar.size.unit * 10
        }}
      >
        <ScrollView>
          <View style={[Prolar.style.rtlRow, , styles.list]}>
            <CustomImage
              width={27}
              height={18}
              style={{ margin: Prolar.size.unit * 5, marginRight: 10 }}
              src={require("../../assets/icons/stats.png")}
            />
            <View style={Prolar.style.rtlCol}>
              <Text
                label="ویزیت"
                color={Prolar.color.gray4}
                fontSize={Prolar.size.font_md}
              />
            </View>
          </View>
          {this.state.orderDetail ? (
            this.renderItems()
          ) : (
            <ActivityIndicator size="large" color={Prolar.color.primary} />
          )}

          <View style={[Prolar.style.rtlRow, , styles.list]}>
            <CustomImage
              width={27}
              height={18}
              style={{ margin: Prolar.size.unit * 5, marginRight: 10 }}
              src={require("../../assets/icons/notes.png")}
            />
            <View style={[Prolar.style.rtlCol]}>
              <Text
                label="توصیه ها"
                color={Prolar.color.gray4}
                fontSize={Prolar.size.font_md}
              />
            </View>
          </View>
          <View
            flexDirection="row"
            style={{
              borderWidth: 1,
              borderColor: Prolar.color.cardBorder,
              borderRadius: 10
            }}
          >
            {this.state.orderDetail && this.state.orderDetail.data ? (
              this.state.orderDetail.data.details ? (
                <View
                  justifyContent="flex-start"
                  alignItems="flex-end"
                  // style={{
                  //   borderWidth: 1,
                  //   borderColor: Prolar.color.cardBorder,
                  //   margin: Prolar.size.unit * 5,
                  //   paddingRight: Prolar.size.unit * 20,
                  //   paddingLeft: Prolar.size.unit * 20,
                  //   paddingBottom: Prolar.size.unit * 20,
                  //   borderRadius: 10,
                  //   overflow: "hidden",
                  //   textAlign: "right"
                  // }}
                >
                  {this.state.orderDetail.data.details.map(
                    (item, i) =>
                      item.providerComment ? (
                        <Text
                          key={i}
                          label={`توصیه ${item.title} : ${
                            item.providerComment
                          }`}
                          color={Prolar.color.gray6}
                          fontSize={Prolar.size.font_sm}
                          style={{ padding: 10 }}
                        />
                      ) : (
                        undefined
                      )
                  )}
                  {this.state.orderDetail.data.providerComment ? (
                    <Text
                      label={`توصیه عمومی : ${
                        this.state.orderDetail.data.providerComment
                      }`}
                      color={Prolar.color.gray6}
                      fontSize={Prolar.size.font_sm}
                      style={{ paddingTop: 10 }}
                    />
                  ) : (
                    undefined
                  )}
                </View>
              ) : (
                undefined
              )
            ) : (
              undefined
            )}
          </View>
          <View style={[Prolar.style.rtlRow, , styles.list]}>
            <CustomImage
              width={27}
              height={18}
              style={{ margin: Prolar.size.unit * 5, marginRight: 10 }}
              src={require("../../assets/icons/pictures.png")}
            />
            <View style={Prolar.style.rtlCol}>
              <Text
                label="پیوست ها"
                color={Prolar.color.gray4}
                fontSize={Prolar.size.font_md}
              />
            </View>
          </View>
          <View
            flexDirection="row"
            style={{
              flexWrap: "wrap",
              justifyContent: "center",
              height: Prolar.size.unit * 100
            }}
          >
            {this.state.orderDetail
              ? this.state.orderDetail.data
                ? this.state.orderDetail.data.attachmentUrl1
                  ? this.renderAttachment(
                      this.state.orderDetail.data.attachmentUrl1
                    )
                  : undefined
                : undefined
              : undefined}

            {this.state.orderDetail
              ? this.state.orderDetail.data
                ? this.state.orderDetail.data.attachmentUrl2
                  ? this.renderAttachment(
                      this.state.orderDetail.data.attachmentUrl2,
                      2
                    )
                  : undefined
                : undefined
              : undefined}

            {this.state.orderDetail
              ? this.state.orderDetail.data
                ? this.state.orderDetail.data.attachmentUrl3
                  ? this.renderAttachment(
                      this.state.orderDetail.data.attachmentUrl3,
                      3
                    )
                  : undefined
                : undefined
              : undefined}
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = {
  list: {
    marginTop: 20
  }
};
