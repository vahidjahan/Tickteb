import { Prolar } from "../prolar/Prolar";
import { ApiCall } from "../prolar/ApiCall";

export const GetUserPatientListWithUserApi = async () => {
  params = {
    apiName: "GetUserPatientListWithUser",
    urlParam: "null",
    bodyParams: "null",
    token: Prolar.data.authorization
  };
  res = await ApiCall(params);

  return res;
};
