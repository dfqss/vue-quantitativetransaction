import _axios from '../lin/plugin/axios'

class AllIndex {
  // 分页查询财务分析指标列表
  static async uploadFile(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/upload/uploadFile',
      data,
    })
  }
}

export { AllIndex as AllIndexModel }