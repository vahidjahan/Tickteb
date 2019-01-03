import { Prolar } from "../prolar/Prolar";
import { ApiCall } from "../prolar/ApiCall";

export const GetRequestDetailApi = async urlParams => {
  params = {
    apiName: "GetRequestDetail",
    urlParam: urlParams,
    bodyParams: "null",
    token: Prolar.data.authorization
  };
  res = await ApiCall(params);

  return res;
};
