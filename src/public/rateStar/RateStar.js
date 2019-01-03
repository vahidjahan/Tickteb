import React, {Component} from 'react';
import {Button} from 'native-base';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';

import Text from '../text/PrimaryText';
import {Prolar} from '../../prolar/Prolar';
import CustomImage from '../image/CustomImage';

const stars = ['کاملا ناراضی', 'ناراضی', 'نسبتا راضی', 'راضی', 'کاملا راضی'];

export default class RateStar extends Component {
  onPress = () => {
    this.props.onPress ();
  };

  render () {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 10 * Prolar.size.unit,
        }}
      >
        {stars.map ((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              this.props.onChangeRate (index);
            }}
          >
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: 10 * Prolar.size.unit,
              }}
            >

              <CustomImage
                width={30}
                height={30}
                style={{marginRight: Prolar.size.unit * 15}}
                src={
                  index <= this.props.rate
                    ? require ('../../../assets/icons/starOn.png')
                    : require ('../../../assets/icons/starOff.png')
                }
              />
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginTop: 10 * Prolar.size.unit,
                }}
              >
                <Text
                  label={item}
                  color={
                    index === this.props.rate
                      ? Prolar.color.gray6
                      : Prolar.color.gray4
                  }
                  fontSize={Prolar.size.font_sm}
                />
              </View>
            </View>

          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

RateStar.defaultProps = {};
