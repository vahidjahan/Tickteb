import React from 'react'

import { ScrollView, TouchableHighlight } from 'react-native'

import View from '../../public/view/PrimaryView'
import Text from '../../public/text/PrimaryText'
import IncreaseButton from './../../public/buttons/increaseDecrease'
import { Prolar } from '../../prolar/Prolar'
import ServiceRequest from './ServiceRequest'
import { log } from 'util'

let count = 0

export default class ServiceRequestAdd extends React.Component {
  static navigationOptions = { header: null }

  constructor (props) {
    super(props)
    this.state = {
      active: false,
      datas: {},
      count: 0
    }
  }

  // onPress = () => {
  //   alert(count);
  //   this.setState({ active: true });
  // };

  render () {
    let data = this.props.data
    return (
      <View style={{ width: '100%', padding: 10 * Prolar.size.unit }}>
        <ScrollView style={{ width: '100%' }}>
          <TouchableHighlight
            onPress={this.onPress}
            underlayColor='white'
            style={{ width: '100%' }}
          >
            <View
              style={[
                Prolar.style.rtlCol,
                {
                  backgroundColor: '#FFFFFF',
                  borderWidth: 2,
                  borderRadius: 5,
                  borderColor: !this.state.active
                    ? Prolar.color.cardBorder
                    : Prolar.color.gray6,
                  paddingHorizontal: 12,
                  width: '100%'
                  // height: Prolar.size.unit * 94
                }
              ]}
            >
              <Text
                style={{ margin: 10 * Prolar.size.unit, textAlign: 'right' }}
                color={Prolar.color.gray6}
                label={data.title}
                fontSize={Prolar.size.font_md}
              />
              <View
                style={[
                  Prolar.style.rtlRow,
                  { marginBottom: Prolar.size.unit * 17 }
                ]}
              >
                <Text
                  viewStyle={{
                    flexGrow: 1,
                    marginRight: 10 * Prolar.size.unit
                  }}
                  label={Prolar.rialLabel(
                    this.state.count > 0 ? data.price * count : data.price
                  )}
                  color={Prolar.color.gray4}
                  fontSize={Prolar.size.font_md}
                />
                <IncreaseButton
                  defaultValue={this.props.defaultValue}
                  getValue={value => {
                    count = value
                    this.setState({ count: count })
                    price = this.props.data.price
                    if (count > 0) {
                      this.setState({ active: true })
                      let item = {
                        count: count,
                        data: this.props.data
                      }
                      this.setState({ datas: item }, () => {
                        this.props.getValue(this.state.datas)
                      })
                    } else {
                      this.setState(
                        {
                          datas: {
                            data: null,
                            id: this.props.data.id
                          }
                        },
                        () => {
                          this.props.getValue(this.state.datas)
                        }
                      )
                      this.setState({ active: false })
                    }
                  }}
                />
              </View>
            </View>
          </TouchableHighlight>
        </ScrollView>
      </View>
    )
  }
}
