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
  Thumbnail,
  Content
} from 'native-base'
import { TouchableOpacity, Image, ScrollView } from 'react-native'

import View from '../../public/view/PrimaryView'
import IconButton from '../../public/buttons/PrimaryIconButton'
import Button from './../../public/buttons/PrimaryButton'
import Text from '../../public/text/PrimaryText'
import PrimaryInput from './../../public/inputs/PrimaryInput'

import { width, height } from '../../public/style/Dimension'
import CustomImage from '../../public/image/CustomImage'
import { headerStyle } from './../../public/style/HeaderStyle'
import Divider from './../../public/divider/Divider'
import { Prolar } from './../../prolar/Prolar'
import { SourceData } from './../../prolar/ApiLinks'
import { Linking } from 'react-native'
import HeaderButton from './../../public/buttons/HeaderButton'

export default class AboutUs extends React.Component {
  static navigationOptions = { header: null }

  goBack = () => {
    const { navigate } = this.props.navigation
    navigate('Setting')
  }

  goQuestionPage = () => {
    const url = SourceData.domain + SourceData.questionsPage
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
        } else {
          return Linking.openURL(url)
        }
      })
      .catch(err => console.error('An error occurred', err))
  }

  goRulesPage = () => {
    const url = SourceData.domain + SourceData.persianSiteRules
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url)
        }
      })
      .catch(err => console.error('An error occurred', err))
  }

  render () {
    return (
      <Container>
        <Header style={Prolar.style.header.container}>
          <Left style={Prolar.style.header.left_}>
            <HeaderButton name='arrow-back' onPress={this.goBack} />
          </Left>
          <Body style={Prolar.style.header.body_}>
            <Title style={Prolar.style.header.title}>درباره تیک طب</Title>
          </Body>
          <Right />
        </Header>

        <View
          alignItems='stretch'
          flexDirection='column'
          justifyContent='center'
        >
          <View flexDirection='row' justifyContent='center' alignItems='center'>
            <CustomImage
              width={150}
              height={150}
              src={require('../../../assets/icons/splashLogo.png')}
            />
          </View>
          <View
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <Text
                style={{
                  marginTop: Prolar.size.unit * 23.33,
                  paddingRight: Prolar.size.unit * 20,
                  paddingLeft: Prolar.size.unit * 20,
                  textAlign: 'center'
                }}
                label='آشنایان شما درواقع افرادی هستید که شما می‌توانید به سادگی برای آنها خدمات پزشکی درخواست‌کنید. آدرس و اطلاعات این افراد در سیستم ذخیره‌شده است و شما فقط لازم است درخواست‌کنید.'
                color={Prolar.color.gray6}
                fontSize={Prolar.size.font_md}
              />
            </ScrollView>
          </View>

          <View
            flexDirection='column'
            justifyContent='flex-start'
            alignItems='center'
            style={{ marginTop: Prolar.size.unit * 30 }}
          >
            <IconButton
              color='white'
              onPress={this.goQuestionPage}
              iconColor={Prolar.color.gray4}
              icon='arrow-forward'
              width={190}
              height={35}
              full
              style={{
                borderWidth: 1,
                borderColor: Prolar.color.gray3
              }}
            >
              <View
                flexDirection='row'
                justifyContent='center'
                alignItems='center'
                style={{
                  marginLeft: Prolar.size.unit * 5,
                  backgroundColor: 'transparent'
                }}
              >
                <Text
                  label='سوالات شما'
                  color={Prolar.color.gray6}
                  fontSize={Prolar.size.font_sm}
                />
              </View>
            </IconButton>
            <IconButton
              color='white'
              onPress={this.goRulesPage}
              iconColor={Prolar.color.gray4}
              icon='arrow-forward'
              width={190}
              height={35}
              full
              style={{
                marginTop: Prolar.size.unit * 5,
                borderWidth: 1,
                borderColor: Prolar.color.gray3
              }}
            >
              <View
                flexDirection='row'
                justifyContent='center'
                alignItems='center'
                style={{
                  marginLeft: Prolar.size.unit * 5,
                  backgroundColor: 'transparent'
                }}
              >
                <Text
                  label='قوانین و شرایط استفاده'
                  color={Prolar.color.gray6}
                  fontSize={Prolar.size.font_sm}
                />
              </View>
            </IconButton>
          </View>
        </View>
      </Container>
    )
  }
}

const styles = {
  contentContainer: {
    paddingVertical: 5,
    maxWidth: 600,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
}
