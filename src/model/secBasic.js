import _axios, { get, _delete } from '../lin/plugin/axios'

class SecBasic {
  // 分页查询财务分析指标列表
  static async getSecBasicIndexList(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/secBasicIndex/getSecBasicIndexList',
      data,
    })
  }
}

export { SecBasic as SecBasicModel }