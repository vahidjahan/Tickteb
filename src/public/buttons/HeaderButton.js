import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from "native-base";
import { Prolar } from '../../prolar/Prolar';

export default class HeaderButton extends Component {

    onPress = () => {
        this.props.onPress();
    };

    render() {
        const {
            name,
            type,
            onPress,
            color,
        } = this.props;

        let style_ = {};
        if (color != undefined) {
            style_ = {
                color
            };
        }

        return (
            <TouchableOpacity onPress={onPress}
                style={{
                    padding: 5,
                    height: '100%',
                    justifyContent: 'center'
                }}
            >
                <Icon name={name} type={type} style={[Prolar.style.header.icon, style_]} />
            </TouchableOpacity>
        );
    }
}