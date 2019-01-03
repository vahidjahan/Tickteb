import {Prolar} from '../prolar/Prolar';
import {ApiCall} from '../prolar/ApiCall';
import {log} from 'util';

export const GetCompleteServiceListApi = async id => {
  params = {
    apiName: 'GetCompleteServiceList',
    urlParam: id,
    bodyParams: 'null',
    token: Prolar.data.authorization,
  };
  res = await ApiCall (params);
  return res;
};
