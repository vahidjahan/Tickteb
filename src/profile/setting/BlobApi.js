import rnFetchBlob from 'rn-fetch-blob'
import { Prolar } from '../../prolar/Prolar'
import { SourceData } from '../../prolar/ApiLinks'

let res
export const BlobApi = async data => {
  url = SourceData.domain + data.url
  try {
    let resp = await rnFetchBlob.fetch(
      'POST',
      url,
      {
        Authorization: Prolar.data.authorization,
        'Content-Type': 'multipart/form-data'
      },
      // element with property `filename` will be transformed into `file` in form data
      //   { name: 'avatar', filename: 'avatar.png', data: binaryDataInBase64 },
      // custom content type
      [
        {
          name: 'file',
          filename: data.st.filename,
          type: `image/${data.ty}`,
          data: data.file
        },
        // part file from storage
        // {
        //   name: 'avatar-foo',
        //   filename: 'avatar-foo.png',
        //   type: 'image/foo',
        //   data: RNFetchBlob.wrap(path_to_a_file)
        // },
        // elements without property `filename` will be sent as plain text
        {
          name: 'fileType',
          data: JSON.stringify({
            fileType: data.ty
          })
        }
      ]
      // {
      //   name: 'info',
      //   data: JSON.stringify({
      //     mail: 'example@example.com',
      //     tel: '12345678'
      //   })
      // }
    )

    if (resp.respInfo.status == 200) {
      data = resp.json()
      res = { message: 200, data: data.data, errors: [] }
    } else {
      res = {
        message: resp.respInfo.status,
        data: [],
        errors: ['خطا در اعمال تغییرات']
      }
    }

    return res
  } catch (err) {
    res = {
      message: 1000,
      data: [],
      errors: ['خطا در دسترسی به سرویس']
    }

    return res

    // ...
  }
}
