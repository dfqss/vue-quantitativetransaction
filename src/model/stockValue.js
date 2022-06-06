import _axios, { get, _delete } from '../lin/plugin/axios'

class StockValue {
  // 分页查询财务分析指标列表
  static async getStockValueList(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/stockValue/getStockValueList',
      data,
    })
  }
}

export { StockValue as StockValueModel }