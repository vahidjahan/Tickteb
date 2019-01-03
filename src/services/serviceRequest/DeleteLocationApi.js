import { ApiCall } from '../../prolar/ApiCall'
import { Prolar } from '../../prolar/Prolar'

export const DeleteLocationApi = async id => {
  params = {
    apiName: 'DeleteLocation',
    bodyParams: 'null',
    token: Prolar.data.authorization,
    urlParam: id
  }
  res = await ApiCall(params)

  return res
}
