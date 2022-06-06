import _axios, { get, _delete } from '../lin/plugin/axios'

class DupontAnalysis {
  // 分页查询财务分析指标列表
  static async getDupontAnalysisIndexList(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/dupontAnalysisIndex/getDupontAnalysisIndex',
      data,
    })
  }
}

export { DupontAnalysis as DupontAnalysisModel }