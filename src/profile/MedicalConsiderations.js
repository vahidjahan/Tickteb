import React from 'react'
// import { Button } from "react-native";
import {
  Container,
  Header,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Tab,
  Tabs,
  TabHeading,
  ScrollableTab,
  Thumbnail
} from 'native-base'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import View from '../public/view/PrimaryView'
import Text from '../public/text/PrimaryText'
import HeaderButton from '../public/buttons/HeaderButton'
import MedicalConsiderationList from './MedicalConsiderationList'
import MedicalConsiderationAdd from './MedicalConsiderationsAdd'
import { Prolar } from '../prolar/Prolar'
import { MedicalConsiderationsApi } from './MedicalConsiderationsApi'
import { MedicalConsiderationListApi } from './MedicalConsiderationListApi'
import DropDown from '../public/dropDown/DropDown'

export default class FinancialTransaction extends React.Component {
  static navigationOptions = { header: null }

  constructor (props) {
    super(props)
    this.state = {
      data: [],
      error: '',
      dropDownError: undefined,
      refresh: true
    }
  }

  goBack = () => {
    const { navigate } = this.props.navigation
    navigate('Profile')
  }
  reset = () => {
    this.setState({ refresh: !this.state.refresh })
  }
  componentDidMount () {
    MedicalConsiderationsApi().then(res => {
      if (res.errors.length === 0) {
        this.setState({ data: res.data })
      } else {
        this.setState({ error: res.error })
      }
    })
  }

  triggerUpdate = () => {
    this.trigger.onUpdate()
  }

  dropDownError = dropDownError => {
    this.setState({ dropDownError })
  }

  render () {
    return (
      <Container>
        <Header style={Prolar.style.header.container}>
          <Left style={Prolar.style.header.left_}>
            <HeaderButton name='arrow-back' onPress={this.goBack} />
          </Left>
          <Body style={Prolar.style.header.body_}>
            <Title style={Prolar.style.header.title}>ملاحظات پزشکی</Title>
          </Body>
          <Right />
        </Header>

        {this.state.data.length !== 0 ? (
          <Tabs
            renderTabBar={() => (
              <ScrollableTab style={medicalConsiderationStyle.tabSchroll} />
            )}
            initialPage={0}
          >
            {this.state.data.map((item, i) => (
              <Tab
                key={i}
                style={medicalConsiderationStyle.tab}
                heading={
                  <TabHeading style={medicalConsiderationStyle.tabHeading}>
                    <Thumbnail
                      // source={item.imageUrl}
                      source={
                        item.imageUrl != undefined && item.imageUrl.length > 1
                          ? { uri: Prolar.api.domain + item.imageUrl.trim() }
                          : require('./../../assets/icons/profilePicEdit.png')
                      }
                    />
                    <Text
                      label={item.fullName}
                      color={
                        Prolar.isIOS ? Prolar.color.gray6 : Prolar.color.white
                      }
                      fontSize={Prolar.size.font_sm}
                      style={{ textAlign: 'center' }}
                    />
                  </TabHeading>
                }
              >
                <View
                  alignItems='center'
                  style={{
                    backgroundColor: 'transparent'
                  }}
                >
                  <View flex={1} justifyContent='center' alignItems='center'>
                    <MedicalConsiderationList
                      ref={func => (this.trigger = func)}
                      patientId={item.id}
                    />
                  </View>

                  <View
                    justifyContent='center'
                    alignItems='center'
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      margin: 25 * Prolar.size.unit,
                      backgroundColor: 'transparent'
                    }}
                  >
                    <MedicalConsiderationAdd
                      onUpdate={this.triggerUpdate}
                      patientId={item.id}
                      reset={this.reset}
                    />
                  </View>
                </View>
              </Tab>
            ))}
          </Tabs>
        ) : (
          <ActivityIndicator size='large' color={Prolar.color.primary} />
        )}
      </Container>
    )
  }
}

const medicalConsiderationStyle = {
  tab: {
    backgroundColor: '#fafafa',
    paddingTop: 10
  },
  tabHeading: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: Prolar.isIOS ? Prolar.color.white : Prolar.color.primary
  },
  tabSchroll: {
    paddingTop: 6 * Prolar.size.unit,
    backgroundColor: Prolar.isIOS ? Prolar.color.white : Prolar.color.primary,
    height: 100 * Prolar.size.unit
  }
}
