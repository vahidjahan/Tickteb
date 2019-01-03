import React from 'react'
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Card,
  CardItem,
  Thumbnail
} from 'native-base'
import View from '../public/view/PrimaryView'
import Text from '../public/text/PrimaryText'
import CustomImage from '../public/image/CustomImage'
import { TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import HeaderButton from '../public/buttons/HeaderButton'

// import OrderList from "./OrderList";
import { Prolar } from '../prolar/Prolar'
import { GetUserPatientListWithUserApi } from './GetUserPatientListWithUserApi'
import { GetCompleteServiceListApi } from './OrdersApi'

export default class Orders extends React.Component {
  static navigationOptions = { header: null }

  constructor (props) {
    super(props)
    this.state = {
      completeServiceList: undefined
    }
  }

  goBack = () => {
    Prolar.navigator(this, -1)()
    // const { navigate } = this.props.navigation;
    // navigate("compeleteServiceList");
  }

  //

  componentWillMount () {
    GetCompleteServiceListApi(this.props.item.id).then(res => {
      this.setState({ completeServiceList: res.data }, () => {})
    })
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Content padder style={Prolar.style.content}>
          <ScrollView
            style={{
              paddingBottom: 50 * Prolar.size.unit
            }}
          >
            {this.state.completeServiceList !== undefined ? (
              this.state.completeServiceList.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    navigate('DoneAndStarred', {
                      item
                    })
                  }}
                >
                  <Card style={Prolar.style.card}>
                    <CardItem style={Prolar.style.cardItem}>
                      <Body style={Prolar.style.rtlCol}>
                        <View style={[Prolar.style.rtlRow, Prolar.style.row]}>
                          <CustomImage
                            width={24}
                            height={24}
                            src={Prolar.getStatusInfo(item.status).iconUrl}
                          />

                          <Text
                            label={item.status}
                            color={Prolar.getStatusInfo(item.status).color}
                            fontSize={
                              item.status === 'انصراف توسط سرویس دهنده'
                                ? Prolar.size.font_sm
                                : Prolar.size.font_md
                            }
                            style={Prolar.style.spaceText}
                          />

                          <Text
                            viewStyle={{
                              alignItems: 'flex-start',
                              flexGrow: 4
                            }}
                            label={Prolar.replaceNumberToPersion(item.date)}
                            color={Prolar.color.gray5}
                            fontSize={Prolar.size.font_md}
                          />
                        </View>

                        <View style={[Prolar.style.rtlRow, Prolar.style.row]}>
                          <Text
                            viewStyle={{
                              alignItems: 'flex-start',
                              flexGrow: 4
                            }}
                            label={
                              '#' +
                              Prolar.replaceNumberToPersion(item.trackingCode)
                            }
                            color={Prolar.color.gray4}
                            fontSize={Prolar.size.font_md}
                          />
                        </View>

                        <View style={[Prolar.style.rtlRow, Prolar.style.row]}>
                          <Thumbnail
                            source={{
                              uri:
                                Prolar.api.domain +
                                (item.imageUrl != undefined
                                  ? item.imageUrl.trim()
                                  : '')
                            }}
                            style={{
                              width: Prolar.size.unit * 30,
                              height: Prolar.size.unit * 30,
                              borderRadius:
                                (Prolar.isIOS ? 50 : 100) * Prolar.size.unit
                            }}
                          />

                          <Text
                            label={item.fullName}
                            color={Prolar.color.gray6}
                            fontSize={Prolar.size.font_md}
                            style={Prolar.style.spaceText}
                          />
                        </View>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              ))
            ) : (
              <ActivityIndicator size='large' color={Prolar.color.primary} />
            )}
          </ScrollView>
        </Content>
      </Container>
    )
  }
}
