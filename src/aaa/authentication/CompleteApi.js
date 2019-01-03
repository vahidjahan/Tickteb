import { ApiCall } from '../../prolar/ApiCall'
import { Prolar } from '../../prolar/Prolar'

export const CompleteApi = async compData => {
  const bodyParams = compData

  params = {
    apiName: 'complete',
    bodyParams,
    token: Prolar.data.authorization,
    urlParam: 'null'
  }
  res = await ApiCall(params)

  return res
}
