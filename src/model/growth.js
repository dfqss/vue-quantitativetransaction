import _axios, { get, _delete } from '../lin/plugin/axios'

class Growth {
  // 分页查询财务分析指标列表
  static async getGrowthIndexList(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/growthIndex/getGrowthIndex',
      data,
    })
  }
}

export { Growth as GrowthModel }