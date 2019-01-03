import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'native-base';

import Text from './../text/PrimaryText';
import { Prolar } from '../../prolar/Prolar';

export default class PrimaryButton extends Component {

  onPress = () => {
    this.props.onPress();
  };

  render() {
    const {
      color,
      width,
      height,
      style,
      disabled,
      full,
      radius,
      block,
    } = this.props;
    return (

      <Button
        onPress={this.onPress}
        full={full}
        block={block}
        disabled={disabled}


        style={[
          {
            backgroundColor: color,
            width: width * Prolar.size.unit,
            height: height * Prolar.size.unit,
            borderRadius: radius * Prolar.size.unit
          },
          style
        ]}
      >
        {this.props.children}
      </Button>

    );
  }
}

PrimaryButton.defaultProps = {
  color: '#3353f1',
  disabled: false,
  full: true,
  radius: Prolar.size.radius,
  block: false

};
