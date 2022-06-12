import _axios, { get, _delete } from '../lin/plugin/axios'

class StockPool {

  // 分页查询核心指标列表
  static async getStockPoolList(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/stockPool/getStockPoolList',
      data,
    })
  }

  // 批量插入股票池数据
  static async batchInsertStockPool(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/stockPool/batchInsertStockPool',
      data,
    })
  }
}

export { StockPool as StockPoolModel }
