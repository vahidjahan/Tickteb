import React from "react";
import { Image, TouchableOpacity } from "react-native";

import View from "../view/PrimaryView";
import Text from "../text/PrimaryText";
import { width, height } from "./../style/Dimension";
import Button from "./../../public/buttons/PrimaryButton";
import { Prolar } from "../../prolar/Prolar";
import CustomImage from "../image/CustomImage";

export default class Gender extends React.Component {
    constructor(props) {
        super(props);

        this.onImg = require(`../../../assets/icons/radioButtonOn.png`);
        this.offImg = require(`../../../assets/icons/radioButtonOff.png`);

        this.state = { code: 0 };
    }

    femalePress = () => {
        this.setState({ code: 1 });
        this.props.setGender(true);
    };

    malePress = () => {
        this.setState({ code: 2 });
        this.props.setGender(false);
    };

    render() {
        let imgF = this.offImg;
        let imgM = this.offImg;

        switch (this.props.defaultValue) {
            case true:
                imgF = this.onImg;
                break;
            case false:
                imgM = this.onImg;
                break;
            default:
        }
        if (this.state.code == 1) {
            if (imgF == this.onImg) {
                imgF = this.offImg;
                imgF = this.onImg;
            }
            if (imgF == this.offImg) {
                imgM = this.offImg;
                imgF = this.onImg;
            }
        }

        if (this.state.code == 2) {
            if (imgM == this.onImg) {
                imgM = this.offImg;
                imgM = this.onImg;
            }
            if (imgM == this.offImg) {
                imgF = this.offImg;
                imgM = this.onImg;
            }
        }

        let imageW = 45;
        return (
            <View
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                style={this.props.viewStyle}
            >
                <Button
                    onPress={this.malePress}
                    justifyContent="flex-end"
                    style={{
                        ...genderStyle.radioButton,
                        marginRight: this.props.space / 2
                    }}
                    color={Prolar.color.white}
                >
                    <Text
                        label="مرد"
                        color="#4f616e"
                        fontSize={Prolar.size.font_md}
                    />
                    <CustomImage width={imageW} height={imageW} src={imgM} />
                </Button>

                <Button
                    onPress={this.femalePress}
                    style={{
                        ...genderStyle.radioButton,
                        marginLeft: this.props.space / 2
                    }}
                    color={Prolar.color.white}
                >
                    <Text
                        label="زن"
                        color="#4f616e"
                        fontSize={Prolar.size.font_md}
                    />
                    <CustomImage
                        width={imageW}
                        height={imageW}
                        style={imageW}
                        src={imgF}
                    />
                </Button>
            </View>
        );
    }
}

Gender.defaultProps = {
    space: 10
};

const genderStyle = {
    radioButton: {
        borderWidth: 1 * Prolar.size.unit,
        borderColor: "#f4f4f4",
        borderRadius: Prolar.size.radius,
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    }
};
