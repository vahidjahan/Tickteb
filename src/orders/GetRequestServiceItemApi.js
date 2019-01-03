import { Prolar } from "../prolar/Prolar";
import { ApiCall } from "../prolar/ApiCall";

export const GetRequestServiceItemApi = async urlParams => {
  params = {
    apiName: "GetRequestServiceItem",
    urlParam: urlParams,
    bodyParams: "null",
    token: Prolar.data.authorization
  };
  res = await ApiCall(params);

  return res;
};
