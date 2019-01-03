import React from 'react'
import { ScrollView } from 'react-native'

import View from '../public/view/PrimaryView'
import Text from '../public/text/PrimaryText'
import { width, height } from '../public/style/Dimension'
import { Prolar } from '../prolar/Prolar'
import { MedicalConsiderationListApi } from './MedicalConsiderationListApi'

export default class MedicalConsiderationList extends React.Component {
  static navigationOptions = { header: null }

  constructor (props) {
    super(props)
    this.state = {
      data: [],
      error: ''
    }
  }

  componentDidMount () {
    MedicalConsiderationListApi(this.props.patientId).then(res => {
      if (res.errors.length == 0) {
        this.setState({ data: res.data })
      } else {
        this.setState({ error: res.error })
      }
    })
  }

  onUpdate = () => {
    MedicalConsiderationListApi(this.props.patientId).then(res => {
      if (res.errors.length == 0) {
        this.setState({ data: res.data })
      } else {
        this.setState({ error: res.error })
      }
    })
  }

  render () {
    return (
      <View alignItems='center' justifyContent='center'>
        <ScrollView
          contentContainerStyle={medicalConsiderationListStyle.contentContainer}
        >
          {this.state.data.map((item, i) => (
            <View
              key={i}
              justifyContent='flex-end'
              flexDirection='row'
              alignItems='center'
              style={medicalConsiderationListStyle.mclCard}
            >
              <Text label={item} color='#4F616E' fontSize={15} />
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
}

const medicalConsiderationListStyle = {
  contentContainer: {
    paddingVertical: 5,
    paddingBottom: 100 * Prolar.size.unit
  },
  mclCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C0D4E3',
    borderRadius: 10,
    shadowColor: '#C0D4E3',
    shadowOffset: { width: 10, height: 27 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    paddingHorizontal: 12,
    margin: 5,
    width: width * 0.916666667,
    height: height * 0.09375
  }
}
