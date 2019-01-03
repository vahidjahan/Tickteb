import { Prolar } from "../prolar/Prolar";
import { ApiCall } from "../prolar/ApiCall";

export const GetRequestResultApi = async urlParams => {
  params = {
    apiName: "GetRequestResult",
    urlParam: urlParams,
    bodyParams: "null",
    token: Prolar.data.authorization
  };
  res = await ApiCall(params);

  return res;
};
