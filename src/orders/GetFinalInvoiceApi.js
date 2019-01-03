import { Prolar } from '../prolar/Prolar'
import { ApiCall } from '../prolar/ApiCall'

export const GetFinalInvoiceApi = async urlParam => {
  params = {
    apiName: 'GetFinalInvoice',
    bodyParams: 'null',
    token: Prolar.data.authorization,
    urlParam: urlParam
  }
  res = await ApiCall(params)

  return res
}
