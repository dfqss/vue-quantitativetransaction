import _axios, { get, _delete } from '../lin/plugin/axios'

class FinAnalysis {
  // 分页查询财务分析指标列表
  static async getFinAnalysisIndexList(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/finAnalysisIndex/getFinAnalysisIndexList',
      data,
    })
  }
}

export { FinAnalysis as FinAnalysisModel }
