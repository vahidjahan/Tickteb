import { Prolar } from '../prolar/Prolar'
import { ApiCall } from '../prolar/ApiCall'

export const CancelRequestApi = async urlParams => {
  params = {
    apiName: 'CancelRequest',
    urlParam: urlParams,
    bodyParams: 'null',
    token: Prolar.data.authorization
  }
  res = await ApiCall(params)

  return res
}
