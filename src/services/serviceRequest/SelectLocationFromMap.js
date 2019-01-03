import React, { Component } from 'react'
import {
  Container,
  Header,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Content,
  View
} from 'native-base'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'

import { headerStyle } from './../../public/style/HeaderStyle'
import { width } from './../../public/style/Dimension'
import Text from './../../public/text/PrimaryText'
import { Prolar } from '../../prolar/Prolar'
import CustomImage from '../../public/image/CustomImage'
import Button from '../../public/buttons/PrimaryButton'
import IconButton from './../../public/buttons/PrimaryIconButton'
import MapView, { Marker, Overlay } from 'react-native-maps'

import SelectLocationFromMapExactAddress from './SelectLocationFromMapExactAddress'
import { MapUrl, SourceData } from '../../prolar/ApiLinks'
import { FavoriteLocationApi } from './FavoriteLocationApi'
import HeaderButton from '../../public/buttons/HeaderButton'
import { launchCamera } from 'react-native-image-picker';

export default class SelectLocationFromMap extends Component {
  static navigationOptions = { header: null }
  constructor (props) {
    super(props)
    this.state = {
      height: 1,
      showMsg: true,
      error: '',
      initialPoint: {
        latitude: 35.761320959548634,
        longitude: 51.406905334442854
      },
      region: {
        latitude: 35.761320959548634,
        longitude: 51.406905334442854
      },
      location: ''
    }
  }

  findLocationAddress = async (lat, lon) => {
    // this.setState({ test: Date.now() })
    if (lat === undefined) {
      return
    }

    this.lastRemLat = lat
    this.lastRemLon = lon

    if (this.wait === true) {
      return
    }

    this.wait = true

    this.lastRemLat = undefined
    this.lastRemLon = undefined

    let reqUrl = MapUrl(lat, lon)
    headers = {
      'x-api-key': SourceData.mapApiKey
    }
    fetch(reqUrl, { method: 'GET', headers: headers })
      .then(res => {
        this.wait = false
        this.findLocationAddress(this.lastRemLat, this.lastRemLon)
        if (res.status == 200) {
        } else {
          this.setState({
            error: 'مکان نامعلوم است',
            location: 'مکان نامعلوم'
          })
        }
        return res.json()
      })
      .then(ress => {
        this.setState({ location: ress.address ,region:{latitude:lat,longitude:lon}})
      })
  }

  componentDidMount () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            initialPoint: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            error: null
          })
        },
        error => this.setState({ error: error.message }),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 1000
        }
      )
    } else {
      this.setState({ error: 'not working' })
    }
  }

  onExactConfirm = location => {
    location.latitude = this.state.region.latitude
    location.longitude = this.state.region.longitude
    location.description = this.state.location
    if (location.save) {
      FavoriteLocationApi(location).then(res => {
        this.props.navigation.state.params.onSelect(location)
        Prolar.navigator(this, -1)()
      })
    } else {
      this.props.navigation.state.params.onSelect(location)
      Prolar.navigator(this, -1)()
    }
    // alert(this.state.region.latitude);
  }

  _onMapReady = () => {
    this.setState({ height: '100%' })
  }

  goBack = () => {
    const { navigate } = this.props.navigation
    navigate('Services')
  }

  onRegionChangeComplete = r => {
    this.findLocationAddress(r.latitude, r.longitude)
  }
  // <Header style={Prolar.style.header.container}>
  //     <Left style={Prolar.style.header.left_}>
  //         <HeaderButton name="arrow-back" onPress={Prolar.navigator(this, -1)} />
  //     </Left>
  //     <Body style={Prolar.style.header.body_}>
  //         <Title style={Prolar.style.header.title}>انتخاب مکان جدید</Title>
  //     </Body>
  //     <Right />
  // </Header>

  render () {
    return (
      <Container style={{ backgroundColor: Prolar.color.gray0 }}>
        <Header style={Prolar.style.header.container}>
          <Left style={Prolar.style.header.left_}>
            <HeaderButton
              name='arrow-back'
              onPress={Prolar.navigator(this, -1)}
            />
          </Left>
          <Body style={Prolar.style.header.body_}>
            <Title style={Prolar.style.header.title}>انتخاب مکان جدید</Title>
          </Body>
          <Right />
        </Header>

        <View style={{ width: '100%', height: '100%' }}>
          <CustomImage
            style={{
              zIndex: 3000000,
              position: 'absolute',
              left: Prolar.screen.width / 2 - 30,
              top: Prolar.screen.height / 2 - 60 - 10,
              width: 30,
              height: 30
            }}
            src={require('./../../../assets/icons/AlternativePin.png')}
          />

          <MapView
            onPress={this.onPress}
            showsMyLocationButton
            showsUserLocation
            style={{ height: this.state.height }}
            onMapReady={this._onMapReady}
            onRegionChangeComplete={this.onRegionChangeComplete}
            initialRegion={{
              latitude: this.state.initialPoint.latitude,
              longitude: this.state.initialPoint.longitude,
              latitudeDelta: 0.0001,
              longitudeDelta: 0.0004
            }}
          />
        </View>

        {/* <View
                    style={{
                        backgroundColor: 'red',
                        position: "absolute",
                        top: Prolar.size.headerHeight,
                        left: 0,
                        paddingRight: 10 * Prolar.size.unit,
                        paddingLeft: 10 * Prolar.size.unit,
                        width: '100%',
                        height: 50,
                        alignItems: 'center',
                        zIndex: 1000,
                        opacity: 0.5
                    }}
                >
                </View> */}

        <View
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: 0,
            left: 0,
            paddingRight: 10 * Prolar.size.unit,
            paddingLeft: 10 * Prolar.size.unit,
            width: '100%',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          {this.state.showMsg && (
            <View
              flex={0}
              style={[
                Prolar.style.card,
                {
                  // backgroundColor: '#336699',

                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: '100%',
                  marginBottom: 25 * Prolar.size.unit,
                  padding: 10 * Prolar.size.unit
                }
              ]}
            >
              <TouchableOpacity
                onPress={() => this.setState({ showMsg: false })}
              >
                <Icon
                  type='Ionicons'
                  name='md-close'
                  style={{ color: Prolar.color.gray7 }}
                />
              </TouchableOpacity>

              <Text
                viewStyle={{ paddingRight: 20 * Prolar.size.unit }}
                label={
                  'برای انتخاب محل سرویس، نقشه را حرکت دهید و مکان مورد نظرتان را انتخاب نمایید.'
                }
                color={Prolar.color.gray6}
                fontSize={Prolar.size.font_md}
              />
            </View>
          )}

          <SelectLocationFromMapExactAddress
            desc={this.state.location}
            address={this.state.address}
            onConfirm={this.onExactConfirm}
            showSave={this.props.navigation.state.params.save == undefined}
          />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    borderColor: Prolar.color.cardBorder,
    width: width * 0.972222222,
    borderWidth: 1,
    borderTopLeftRadius: Prolar.size.unit * 17,
    borderTopRightRadius: Prolar.size.unit * 17,
    paddingTop: Prolar.size.unit * 13,
    marginLeft: Prolar.size.unit * 5,
    paddingBottom: Prolar.size.unit * 13
  },

  list2: {
    borderColor: Prolar.color.cardBorder,
    width: width * 0.972222222,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomLeftRadius: Prolar.size.unit * 17,
    borderBottomRightRadius: Prolar.size.unit * 17,
    paddingTop: Prolar.size.unit * 13,
    marginLeft: Prolar.size.unit * 5,
    paddingBottom: Prolar.size.unit * 13
  }
})
