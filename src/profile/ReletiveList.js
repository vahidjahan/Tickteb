import React from 'react'
import { Thumbnail } from 'native-base'
import { TouchableOpacity } from 'react-native'

import View from '../public/view/PrimaryView'
import Text from '../public/text/PrimaryText'
import { width, height } from '../public/style/Dimension'

import { ScrollView } from 'react-native'
import { Prolar } from '../prolar/Prolar'
import ReletiveEdit from './ReletiveEdit'
import { GetReletiveApi } from './RelativeApi'

export default class ReletiveList extends React.Component {
  static navigationOptions = { header: null }
  constructor (props) {
    super(props)

    this.state = {
      relData: []
    }
  }
  componentDidUpdate () {
    if (this.props.list != undefined) {
      if (this.props.list.length != this.state.relData.length) {
        this.getData(this.props.list)
      }
    }
  }
  componentDidMount () {
    if (this.props.list != undefined) {
      if (this.props.list.length != this.state.relData.length) {
        this.getData(this.props.list)
      }
    }
  }

  state = {}
  getIndData = async id => {
    let x = await GetReletiveApi(id)

    if (x.message == 200) {
      return x.data
    } else {
      let re = {
        firstName: '',
        lastName: '',
        fixedLine: '',
        email: '',
        weight: '',
        height: '',
        nationalCode: '',
        birthDate: '',
        gender: true
      }
      return re
    }
  }
  getData = async list => {
    let li = []
    for (let i = 0; i < list.length; i++) {
      item = list[i]

      let relD = await this.getIndData(item.id)
      relD = { ...relD, fullName: item.fullName, pid: item.id }
      li.push(relD)
    }
    this.setState({ relData: li })
  }

  render () {
    return (
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            paddingTop: 16 * Prolar.size.unit,
            paddingRight: 16 * Prolar.size.unit,
            paddingLeft: 16 * Prolar.size.unit,
            paddingBottom: 80 * Prolar.size.unit
          }}
        >
          {this.state.relData != undefined &&
            this.state.relData.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  alignItems='center'
                  justifyContent='center'
                  style={{
                    flexBasis: '25%',
                    marginLeft: '3%',
                    marginRight: '3%'
                  }}
                  onPress={() => {
                    Prolar.navigator(this, 'ReletiveEdit', {
                      item: item,
                      reset: this.props.reset
                    })()
                  }}
                >
                  <View
                    flex={0}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Thumbnail
                      source={
                        item.imageUrl != undefined && item.imageUrl.length > 0
                          ? { uri: Prolar.api.domain + item.imageUrl.trim() }
                          : require('../../assets/icons/profilePicEdit.png')
                      }
                      style={reletiveListStyle.avatar}
                    />
                    <Text
                      label={item.fullName}
                      color={Prolar.color.gray6}
                      fontSize={Prolar.size.font_md}
                      style={{ textAlign: 'center' }}
                    />
                  </View>
                </TouchableOpacity>
              )
            })}
        </View>
      </ScrollView>
    )
  }
}

const reletiveListStyle = {
  avatar: {
    width: 80 * Prolar.size.unit,
    height: 80 * Prolar.size.unit,
    borderRadius: 40 * Prolar.size.unit,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 2
  }
}
