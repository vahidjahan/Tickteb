import React, { Component } from 'react'

import { ScrollView, View, ActivityIndicator } from 'react-native'
import Hr from 'react-native-hr-component'

import Text from '../public/text/PrimaryText'
import CustomImage from '../public/image/CustomImage'
import { Prolar } from '../prolar/Prolar'
import Button from './../public/buttons/PrimaryButton'
import DoneAndStarredRatePopup from './DoneAndStarredRatePopup'
import { GetRequestDetailApi } from './GetRequestDetailApi'
import { GetRequestProviderApi } from './GetRequestProviderApi'
import * as timelineFunc from './TimelineItem'

export default class OngoingTimeline extends Component {
  static navigationOptions = { header: null }
  constructor () {
    super()
    this.state = {
      timeLine: undefined,
      providerData: undefined
    }

    this.child = React.createRef()
  }

  componentWillMount () {
    GetRequestDetailApi(this.props.order.id).then(res => {
      this.setState({ timeLine: res }, () => {})
    })

    GetRequestProviderApi(this.props.order.id).then(res => {
      this.setState({ providerData: res })
    })
  }

  render () {
    return this.state.timeLine
      ? <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          margin: 10 * Prolar.size.unit,
          paddingBottom: 50
        }}
        >
        {this.state.timeLine.data.timeLine.map((item, i) => (
          <View key={i} style={Prolar.style.rtlCol}>
            {i === 0
                ? <Hr
                  hrStyles={{ marginTop: 5, marginBottom: 5 }}
                  hrPadding={5}
                  lineColor={Prolar.color.gray1}
                  width={1 * Prolar.size.unit}
                  text={Prolar.replaceNumberToPersion(
                      item.dateShamsi.substring(0, 10)
                    )}
                  textStyles={Prolar.style.seenMessage}
                  />
                : this.state.timeLine.data.timeLine[i - 1].dateShamsi.substring(
                    0,
                    10
                  ) !== item.dateShamsi.substring(0, 10)
                    ? <Hr
                      hrStyles={{ marginTop: 5, marginBottom: 5 }}
                      hrPadding={5}
                      lineColor={Prolar.color.gray1}
                      width={1 * Prolar.size.unit}
                      text={Prolar.replaceNumberToPersion(
                          item.dateShamsi.substring(0, 10)
                        )}
                      textStyles={Prolar.style.seenMessage}
                      />
                    : undefined}

            {item.status === 'انصراف توسط کاربر'
                ? timelineFunc.cancelByCustomer(item)
                : item.status === 'انصراف توسط سرویس دهنده'
                    ? timelineFunc.cancelByServiceProvider(item)
                    : item.status === 'سرویس دهنده یافت نشد'
                        ? timelineFunc.noServiceProvider(item)
                        : item.status === 'ثبت شده'
                            ? timelineFunc.getVerified(item)
                            : item.status === 'پذیرفته شده'
                                ? timelineFunc.accepted(
                                    item,
                                    this.state.providerData
                                  )
                                : item.status === 'در راه'
                                    ? timelineFunc.onTheWay(
                                        item,
                                        this.state.providerData
                                      )
                                    : item.status === 'در انتظار اجازه شروع'
                                        ? timelineFunc.waitingStartPermission(
                                            item,
                                            this.state.providerData
                                          )
                                        : item.status === 'شروع شده'
                                            ? timelineFunc.startted(
                                                item,
                                                this.state.providerData
                                              )
                                            : item.status ===
                                                'تکمیل - فاکتور صادر شده'
                                                ? timelineFunc.CompletedFactorSent(
                                                    item
                                                  )
                                                : item.status ===
                                                    'تکمیل - پرداخت شده'
                                                    ? timelineFunc.getCompeletePaied(
                                                        item
                                                      )
                                                    : item.status ===
                                                        'تکمیل - ثبت گزارش'
                                                        ? timelineFunc.CompletedReportRegistered(
                                                            item
                                                          )
                                                        : timelineFunc.DefualtItem(
                                                            item
                                                          )}

            {i === this.state.timeLine.data.timeLine.length - 1
                ? undefined
                : <View style={[Prolar.style.rtlRow, { paddingRight: 20 }]}>
                  <View
                    style={{
                      borderRightColor: Prolar.color.gray1,
                      borderRightWidth: 3,
                      height: 30 * Prolar.size.unit,
                      marginRight: 14 * Prolar.size.unit
                    }}
                    />
                </View>}
          </View>
          ))}
      </ScrollView>
      : <ActivityIndicator size='large' color={Prolar.color.primary} />
  }
}
