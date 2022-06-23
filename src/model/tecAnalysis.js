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

  // 根据code值更新LON和buying失败
  static async updateTecAnalysisIndexByCode(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/tecAnalysisIndex/updateTecAnalysisIndexByCode',
      data,
    })
  }
}

export { TecAnalysis as TecAnalysisModel }
