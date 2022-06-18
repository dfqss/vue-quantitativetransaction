import _axios from '../lin/plugin/axios'

class AllIndex {

  // 上传文件
  static async uploadFile(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/upload/uploadFile',
      data,
    })
  }

  // 判断当前期数是否存在
  static async validatePeriods(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/coreIndex/validatePeriods',
      data,
    })
  }
}

export { AllIndex as AllIndexModel }