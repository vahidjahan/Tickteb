import { Prolar } from "../prolar/Prolar";
import { ApiCall } from "../prolar/ApiCall";

export const FinancialTransactionApi = async () => {
  params = {
    apiName: "GetTransactionUserReport",
    urlParam: "null",
    bodyParams: "null",
    token: Prolar.data.authorization
  };
  res = await ApiCall(params);

  return res;
};
