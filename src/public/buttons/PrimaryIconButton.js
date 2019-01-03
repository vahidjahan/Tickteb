import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Icon} from 'native-base';
import {Prolar} from '../../prolar/Prolar';

export default class PrimaryIconButton extends Component {
  onPress = () => {
    this.props.onPress ();
  };

  render () {
    const {
      color,
      icon,
      width,
      height,
      style,
      disabled,
      full,
      radius,
      iconColor,
      iconFlex,
      textFlex,
      iconStyle,
    } = this.props;
    return (
      <View>
        <Button
          iconRight
          onPress={this.onPress}
          full={full}
          disabled={disabled}
          style={[
            {
              backgroundColor: color,
              width: width * Prolar.size.unit,
              height: height * Prolar.size.unit,
              borderRadius: radius * Prolar.size.unit,
              ...style,
            },
          ]}
        >
          <View
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            flex={1}
          >
            <View
              flex={1}
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              // style={{flexShrink: 1}}
            >
              {this.props.children}
            </View>
            <View
              flex={0}
              flexDirection="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Icon
                type={this.props.iconType}
                style={{color: iconColor, fontSize: 30, ...iconStyle}}
                name={icon}
              />
            </View>
          </View>
        </Button>
      </View>
    );
  }
}

PrimaryIconButton.defaultProps = {
  iconFlex: 1,
  textFlex: 2.5,
  color: '#3353f1',
  disabled: false,
  full: true,
  icon: 'home',
  radius: Prolar.size.radius * Prolar.size.unit,
  iconStyle: {},
  iconType: undefined,
};
