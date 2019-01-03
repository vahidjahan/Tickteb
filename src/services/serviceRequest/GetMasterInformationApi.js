import { Prolar } from '../../prolar/Prolar'
import { ApiCall } from '../../prolar/ApiCall'

export const GetMasterInformationApi = async () => {
  params = {
    apiName: 'GetMasterInformation',
    urlParam: 'null',
    bodyParams: 'null',
    token: Prolar.data.authorization
  }
  res = await ApiCall(params)

  return res
}
