import _axios, { get, _delete } from '../lin/plugin/axios'

class TecAnalysis {
  // 分页查询财务分析指标列表
  static async getTecAnalysisIndexList(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/tecAnalysisIndex/getTecAnalysisIndexList',
      data,
    })
  }
}

export { TecAnalysis as TecAnalysisModel }