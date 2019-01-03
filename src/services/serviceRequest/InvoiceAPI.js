import { Prolar } from '../../prolar/Prolar'
import { ApiCall } from '../../prolar/ApiCall'

export const InvoiceApi = async details => {
  params = {
    apiName: 'getInvoice',
    urlParam: 'null',
    bodyParams: details,
    token: Prolar.data.authorization
  }
  res = await ApiCall(params)

  return res
}
