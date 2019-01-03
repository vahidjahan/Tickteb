import { Prolar } from "../prolar/Prolar";
import { ApiCall } from "../prolar/ApiCall";



export const GetUserPatientList = async () => {
  params = {
    apiName: "GetUserPatientList",
    urlParam: "null",
    bodyParams: "null",
    token: Prolar.data.authorization
  };
  res = await ApiCall(params);

  return res;
};
