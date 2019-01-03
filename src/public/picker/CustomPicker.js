import React from "react";
import { Icon, View as NativeView, Label } from "native-base";
import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native";
import { Prolar } from "../../prolar/Prolar";
import PrimaryButton from "../buttons/PrimaryButton";
import View from "./../view/PrimaryView";
import Text from "./../text/PrimaryText";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class CustomPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: false,
            selected:
                this.props.selected == undefined ? -1 : this.props.selected
        };
    }

    onSelect = (index, selected) => {
        this.setState({ selected: index, visibleModal: false });
        this.props.onSelect(selected);
    };

    render() {
        const {
            placeholder,
            label,
            required,
            list,
            fieldName,
            viewStyle
        } = this.props;

        let bulletColor = Prolar.color.gray2;
        if (required == true) {
            bulletColor = Prolar.color.error;
        }

        return (
            <View style={[viewStyle, { paddingBottom: 3 * Prolar.size.unit }]}>
                <Label style={Prolar.style.labelStyle}>{label}</Label>
                <PrimaryButton
                    style={{
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        borderColor: Prolar.color.gray2,
                        backgroundColor: Prolar.color.gray2,
                        borderRadius: Prolar.size.radius * Prolar.size.unit,
                        width: "100%",
                        height: 50 * Prolar.size.unit
                    }}
                    onPress={() => {
                        this.setState({ visibleModal: true });
                    }}
                >
                    <View
                        style={{
                            flex: 0,
                            backgroundColor: bulletColor,
                            width: 5 * Prolar.size.unit,
                            height: 5 * Prolar.size.unit,
                            marginRight: 15 * Prolar.size.unit,
                            borderRadius: 5 * Prolar.size.unit
                        }}
                    />

                    <Text
                        viewStyle={{
                            flexGrow: 1,
                            marginRight: 15 * Prolar.size.unit
                        }}
                        label={
                            this.state.selected == -1
                                ? placeholder
                                : list[this.state.selected][fieldName]
                        }
                        color={
                            this.state.selected == -1
                                ? Prolar.color.gray4
                                : Prolar.color.gray7
                        }
                        fontSize={Prolar.size.font_md}
                    />
                    <Icon
                        name="chevron-down"
                        type="Entypo"
                        style={{
                            color: Prolar.color.gray4
                        }}
                    />
                </PrimaryButton>

                <Modal
                    onRequestClose={() =>
                        this.setState({ visibleModal: false })
                    }
                    isVisible={this.state.visibleModal}
                >
                    <NativeView
                        style={{
                            backgroundColor: "#FFFFFF"
                        }}
                    >
                        {list.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                alignItems="center"
                                justifyContent="center"
                                onPress={() => {
                                    this.onSelect(index, list[index]);
                                }}
                            >
                                <Text
                                    label={item[fieldName]}
                                    color={
                                        this.state.selected != index
                                            ? Prolar.color.gray4
                                            : Prolar.color.gray7
                                    }
                                    fontSize={Prolar.size.font_md}
                                    viewStyle={{
                                        height: 50 * Prolar.size.unit,
                                        marginRight: 15 * Prolar.size.unit,
                                        marginLeft: 15 * Prolar.size.unit,
                                        justifyContent: "center"
                                    }}
                                />
                            </TouchableOpacity>
                        ))}
                    </NativeView>
                </Modal>
            </View>
        );
    }
}

CustomPicker.defaultProps = {
    fieldName: "label"
};
