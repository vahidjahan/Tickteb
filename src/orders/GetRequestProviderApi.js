import { Prolar } from "../prolar/Prolar";
import { ApiCall } from "../prolar/ApiCall";

export const GetRequestProviderApi = async urlParams => {
  params = {
    apiName: "GetRequestProvider",
    urlParam: urlParams,
    bodyParams: "null",
    token: Prolar.data.authorization
  };
  res = await ApiCall(params);

  return res;
};
