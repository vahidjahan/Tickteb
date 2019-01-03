import { Prolar } from '../../prolar/Prolar'
import { ApiCall } from '../../prolar/ApiCall'

export const ServicesApi = async () => {
  params = {
    apiName: 'GetServiceItemList',
    urlParam: 'null',
    bodyParams: 'null',
    token: Prolar.data.authorization
  }
  res = await ApiCall(params)

  return res
}
