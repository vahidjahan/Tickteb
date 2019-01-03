import { Prolar } from "../prolar/Prolar";
import { ApiCall } from "../prolar/ApiCall";
import rnFetchBlob from "rn-fetch-blob";
import { SourceData } from "../prolar/ApiLinks";

let res;

// let prepareData = data => {
//   // var formData = new FormData()

//   // for (var k in data) {
//   //   if (k != 'image') {
//   //     formData.append(k, data[k])
//   //   } else {
//   //     formData.append(k, {
//   //       filename: data.image.st.filename,
//   //       type: `image/${data.image.ty}`,
//   //       data: data.image.data
//   //     })
//   //   }
//   // }
//   // return formData

//   let ress = []
//   let temp
//   for (var key in data) {
//     if (key != 'image') {
//       temp = {
//         name: key,
//         data: JSON.stringify(data[key])
//       }
//       ress.push(temp)
//     } else {
//       ress.push({
//         name: key,
//         data: `${data[key].type};base64,${data[key].data}`
//       })
//     }
//   }

//   return ress
// }
// export const ReletivePostApi = async data => {
//   url = `${SourceData.domain}//api/Patient/Post`

//   let stringData = prepareData(data)
//   try {
//     let resp = await rnFetchBlob.fetch(
//       'POST',
//       url,
//       {
//         Authorization: Prolar.data.authorization,
//         'Content-Type': 'multipart/form-data'
//       },
//       // element with property `filename` will be transformed into `file` in form data
//       //   { name: 'avatar', filename: 'avatar.png', data: binaryDataInBase64 },
//       // custom content type
//       // [
//       //   {
//       //     name: 'image',
//       //     filename: data.image.st.filename,
//       //     type: `image/${data.image.ty}`,
//       //     data: data.image.data
//       //   },
//       // part file from storage
//       // {
//       //   name: 'avatar-foo',
//       //   filename: 'avatar-foo.png',
//       //   type: 'image/foo',
//       //   data: RNFetchBlob.wrap(path_to_a_file)
//       // },
//       // elements without property `filename` will be sent as plain text
//       // stringData
//       // ]  dataaaa
//       stringData
//       // ]
//       // {
//       //   name: 'info',
//       //   data: JSON.stringify({
//       //     mail: 'example@example.com',
//       //     tel: '12345678'
//       //   })
//       // }
//     )
//     if (resp.respInfo.status == 200) {
//       data = resp.json()
//       res = { message: 200, data: data.data, errors: [] }
//     } else {
//       res = {
//         message: resp.respInfo.status,
//         data: [],
//         errors: ['خطا در اعمال تغییرات']
//       }
//     }

//     return res
//   } catch (err) {
//     res = {
//       message: 1000,
//       data: [],
//       errors: ['خطا در دسترسی به سرویس']
//     }

//     return res

//     // ...
//   }
// }

export const ReletiveDeleteApi = async id => {
  params = {
    apiName: "deletePatient",
    urlParam: id,
    bodyParams: "null",
    token: Prolar.data.authorization
  };
  res = await ApiCall(params);

  return res;
};
export const ReletivePostApi = async data => {
  params = {
    apiName: "addPatient",
    urlParam: "null",
    bodyParams: data,
    token: Prolar.data.authorization
  };

  res = await ApiCall(params);

  return res;
};

export const GetReletiveApi = async id => {
  params = {
    apiName: "GetPatient",
    urlParam: id,
    bodyParams: "null",
    token: Prolar.data.authorization
  };
  res = await ApiCall(params);

  return res;
};
