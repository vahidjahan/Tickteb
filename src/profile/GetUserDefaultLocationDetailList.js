import { Prolar } from "../prolar/Prolar";
import { ApiCall } from "../prolar/ApiCall";

export const GetUserDefaultLocationDetailList = async () => {
  params = {
    apiName: "GetUserDefaultLocationDetailList",
    urlParam: "null",
    bodyParams: "null",
    token: Prolar.data.authorization
  };
  res = await ApiCall(params);

  return res;
};
