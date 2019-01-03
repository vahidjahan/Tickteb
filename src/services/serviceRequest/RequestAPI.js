import { Prolar } from "../../prolar/Prolar";
import { ApiCall } from "../../prolar/ApiCall";

export const RequestApi = async body => {
  params = {
    apiName: "Request",
    urlParam: "null",
    bodyParams: body,
    token: Prolar.data.authorization
  };

  res = await ApiCall(params);

  return res;
};
