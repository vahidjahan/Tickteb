import { Prolar } from '../prolar/Prolar'
import { ApiCall } from '../prolar/ApiCall'

export const RateAPI = async (id, rate) => {
  bodyParams = {
    requestId: id,
    rate,
    addProvider: false
  }

  params = {
    apiName: 'rate',
    bodyParams: bodyParams,
    token: Prolar.data.authorization,
    urlParam: 'null'
  }
  res = await ApiCall(params)
  return res
}
