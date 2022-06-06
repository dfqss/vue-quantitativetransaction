import _axios, { get, _delete } from '../lin/plugin/axios'

class IndustryClass {
  // 分页查询财务分析指标列表
  static async getIndustryClassList(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/industryClass/getIndustryClassList',
      data,
    })
  }
}

export { IndustryClass as IndustryClassModel }