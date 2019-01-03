import { Prolar } from "../prolar/Prolar";
import { ApiCall } from "../prolar/ApiCall";

export const GetRequestLocationApi = async urlParams => {
  params = {
    apiName: "GetRequestLocation",
    urlParam: urlParams,
    bodyParams: "null",
    token: Prolar.data.authorization
  };
  res = await ApiCall(params);

  return res;
};
