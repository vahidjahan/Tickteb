import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

import View from '../view/PrimaryView'
import Text from '../text/PrimaryText'
import { width, height } from './../style/Dimension'
import CustomImage from '../image/CustomImage'

export default class Switch extends React.Component {
  state = {
    on: true,
    onImage: require(`../../../assets/icons/on.png`)
  }

  componentWillMount = () => {
    this.setState({
      on: this.props.state,
      onImage: this.getImage(this.props.state)
    })
  }

  getImage = flag => {
    if (flag == true) {
      return require(`../../../assets/icons/on.png`)
    } else {
      return require(`../../../assets/icons/off.png`)
    }
  }

  handleSwitch = () => {
    this.setState({ on: !this.state.on }, () => {
      if (this.state.on) {
        this.setState(
          {
            onImage: this.getImage(true)
          },
          () => {
            this.props.getValue('on')
          }
        )
      } else {
        this.setState(
          {
            onImage: this.getImage(false)
          },
          () => {
            this.props.getValue('off')
          }
        )
      }
    })
  }

  render () {
    return (
      <View flexDirection='row' justifyContent='center' alignItems='center'>
        <TouchableOpacity onPress={this.handleSwitch}>
          <CustomImage
            width={40}
            height={25}
            // style={{ margin: Prolar.size.unit * 15 }}
            src={this.state.onImage}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

Switch.defaultProps = {
  state: true
}
