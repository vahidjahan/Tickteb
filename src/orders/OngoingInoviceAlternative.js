import React, { Component } from "react";
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Left,
    Right,
    Icon,
    Body,
    Title
} from "native-base";
import { TouchableOpacity, ScrollView } from "react-native";
import View from "../public/view/PrimaryView";
import { headerStyle } from "./../public/style/HeaderStyle";
import Text from "./../public/text/PrimaryText";
import { Prolar } from "../prolar/Prolar";
import Button from "../public/buttons/PrimaryButton";
import OngoingInoviceChargeWallet from "./OngoingInoviceChargeWallet";

export default class OngoingInoviceAlternative extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            page: 0
        };
        this.child = React.createRef();
    }

    goBack = () => {
        const { navigation } = this.props.navigation;
        navigation("Sevices");
    };

    setPage = page => {
        this.setState({ page }, () => {
            // alert(page);
        });
    };
    onOngoingChargeWallet = () => {
        this.child.current.handleOpen();
    };
    render() {
        var item = ["گرفتن فشارخون"];

        return (
            <Container>
                <ScrollView>
                    <Content>
                        <List
                            style={{
                                paddingBottom: 12 * Prolar.size.unit,
                                borderBottomWidth: 0
                            }}
                        >
                            <ListItem
                                itemHeader
                                first
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: Prolar.color.gray4
                                }}
                            >
                                <View
                                    flexDirection="row"
                                    flex={1}
                                    justifyContent="flex-end"
                                    alignItem="center"
                                >
                                    <Text
                                        label="سرویس ها درخواستی"
                                        color={Prolar.color.gray4}
                                        fontSize={Prolar.size.font_md}
                                    />
                                </View>
                            </ListItem>
                            <ListItem>
                                <View flexDirection="row">
                                    <View
                                        flex={40}
                                        justifyContent="center"
                                        alignItem="center"
                                    >
                                        <Text
                                            color={Prolar.color.gray6}
                                            fontSize={Prolar.size.font_md}
                                            label="۵۴۰۰۰۰۰ تومان"
                                        />
                                    </View>
                                    <View
                                        flex={60}
                                        flexDirection="row"
                                        justifyContent="flex-end"
                                        alignItem="flex-start"
                                    >
                                        <Text
                                            label="گرفتن فشار خون - X2"
                                            color={Prolar.color.gray6}
                                            fontSize={Prolar.size.font_md}
                                            style={{
                                                fontFamily: Prolar.fontFamily
                                            }}
                                        />
                                    </View>
                                </View>
                            </ListItem>
                            <ListItem>
                                <View flexDirection="row">
                                    <View
                                        flex={40}
                                        justifyContent="flex-start"
                                        alignItem="center"
                                    >
                                        <Text
                                            color={Prolar.color.gray6}
                                            fontSize={Prolar.size.font_md}
                                            label="۵۴۰۰۰۰۰ تومان"
                                        />
                                    </View>
                                    <View
                                        flex={60}
                                        flexDirection="row"
                                        justifyContent="flex-end"
                                        alignItem="flex-start"
                                    >
                                        <Text
                                            label="پزشک عمومی"
                                            color={Prolar.color.gray6}
                                            fontSize={Prolar.size.font_md}
                                        />
                                    </View>
                                </View>
                            </ListItem>
                            <ListItem
                                itemHeader
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: Prolar.color.gray4
                                }}
                            >
                                <View
                                    flexDirection="row"
                                    flex={1}
                                    justifyContent="flex-end"
                                    alignItem="center"
                                >
                                    <Text
                                        label="هدیه تیک طب"
                                        color={Prolar.color.gray4}
                                        fontSize={Prolar.size.font_md}
                                    />
                                </View>
                            </ListItem>
                            <ListItem>
                                <View flexDirection="row">
                                    <View
                                        flex={40}
                                        justifyContent="flex-start"
                                        alignItem="center"
                                    >
                                        <Text
                                            color={Prolar.color.gray6}
                                            fontSize={Prolar.size.font_md}
                                            label="رایگان"
                                        />
                                    </View>
                                    <View
                                        flex={60}
                                        flexDirection="row"
                                        justifyContent="flex-end"
                                        alignItem="flex-start"
                                    >
                                        <Text
                                            label="سنجش ضربان قلب ونبض"
                                            color={Prolar.color.gray6}
                                            fontSize={Prolar.size.font_md}
                                        />
                                    </View>
                                </View>
                            </ListItem>
                            <ListItem>
                                <View flexDirection="row">
                                    <View
                                        flex={40}
                                        justifyContent="flex-start"
                                        alignItem="center"
                                    >
                                        <Text
                                            color={Prolar.color.gray6}
                                            fontSize={Prolar.size.font_md}
                                            label="رایگان"
                                        />
                                    </View>
                                    <View
                                        flex={60}
                                        flexDirection="row"
                                        justifyContent="flex-end"
                                        alignItem="flex-start"
                                    >
                                        <Text
                                            label="سنجش دمای بدن"
                                            color={Prolar.color.gray6}
                                            fontSize={Prolar.size.font_md}
                                        />
                                    </View>
                                </View>
                            </ListItem>
                            <ListItem
                                itemHeader
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: Prolar.color.gray4
                                }}
                            >
                                <View
                                    flexDirection="row"
                                    flex={1}
                                    justifyContent="flex-end"
                                    alignItem="center"
                                >
                                    <Text
                                        label="اقلام مصرفی"
                                        color={Prolar.color.gray4}
                                        fontSize={Prolar.size.font_md}
                                    />
                                </View>
                            </ListItem>
                            <ListItem>
                                <View flexDirection="row">
                                    <View
                                        flex={40}
                                        justifyContent="flex-start"
                                        alignItem="center"
                                    >
                                        <Text
                                            color={Prolar.color.gray6}
                                            fontSize={Prolar.size.font_md}
                                            label="رایگان"
                                        />
                                    </View>
                                    <View
                                        flex={60}
                                        flexDirection="row"
                                        justifyContent="flex-end"
                                        alignItem="flex-start"
                                    >
                                        <Text
                                            label="سرنگ - X۲"
                                            color={Prolar.color.gray6}
                                            fontSize={Prolar.size.font_md}
                                        />
                                    </View>
                                </View>
                            </ListItem>
                            <ListItem
                                itemHeader
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: Prolar.color.gray4
                                }}
                            >
                                <View
                                    flexDirection="row"
                                    flex={1}
                                    justifyContent="flex-end"
                                    alignItem="center"
                                >
                                    <Text
                                        label="هزینه های اضافه شده"
                                        color={Prolar.color.gray4}
                                        fontSize={Prolar.size.font_md}
                                    />
                                </View>
                            </ListItem>
                            <ListItem style={{ borderBottomWidth: 0 }}>
                                <View flexDirection="row">
                                    <View
                                        flex={40}
                                        justifyContent="flex-start"
                                        alignItem="center"
                                    >
                                        <Text
                                            color={Prolar.color.gray6}
                                            fontSize={Prolar.size.font_md}
                                            label="۳۴۰۰۰ تومان"
                                        />
                                    </View>
                                    <View
                                        flex={60}
                                        flexDirection="row"
                                        justifyContent="flex-end"
                                        alignItem="flex-start"
                                    >
                                        <Text
                                            label="هزینه ایاب و ذهاب"
                                            color={Prolar.color.gray6}
                                            fontSize={Prolar.size.font_md}
                                        />
                                    </View>
                                </View>
                            </ListItem>

                            <View
                                style={{
                                    borderBottomWidth: 0,
                                    backgroundColor: "#ECF8F3"
                                }}
                            >
                                <View
                                    style={{
                                        borderTopWidth: 1,
                                        borderTopColor: Prolar.color.success,
                                        marginLeft: 10 * Prolar.size.unit
                                    }}
                                    flexDirection="row"
                                >
                                    <View
                                        flex={40}
                                        justifyContent="flex-start"
                                        alignItem="center"
                                        style={{
                                            backgroundColor: "#ECF8F3"
                                        }}
                                    >
                                        <Text
                                            style={{
                                                marginTop: 10 * Prolar.size.unit
                                            }}
                                            color={Prolar.color.success}
                                            fontSize={Prolar.size.font_md}
                                            label="۶۴۷۰۰۰ تومان"
                                        />
                                    </View>
                                    <View
                                        flex={60}
                                        flexDirection="row"
                                        justifyContent="flex-end"
                                        alignItem="flex-start"
                                        style={{
                                            backgroundColor: "#ECF8F3"
                                        }}
                                    >
                                        <Text
                                            style={{
                                                marginTop: 10 * Prolar.size.unit
                                            }}
                                            label="مجموع کل "
                                            color={Prolar.color.success}
                                            fontSize={Prolar.size.font_md}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View
                                justifyContent="center"
                                alignItem="center"
                                style={{ backgroundColor: "#ebf4f0" }}
                            >
                                <Button
                                    style={{
                                        flex: 1,
                                        alignSelf: "center",
                                        marginBottom: 20,
                                        marginTop: 18 * Prolar.size.unit
                                    }}
                                    onPress={this.onOngoingChargeWallet}
                                    color={Prolar.color.success}
                                    width={200}
                                    height={50}
                                >
                                    <Text
                                        style={{ textAlign: "center" }}
                                        label="پرداخت نقدی"
                                        fontSize={Prolar.size.font_md}
                                    />
                                </Button>
                            </View>
                        </List>
                    </Content>
                </ScrollView>
            </Container>
        );
    }
}
