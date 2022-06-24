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

  //修改股票备注
  static async updateStockPoolByCode(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/stockPool/updateStockPoolByCode',
      data,
    })
  }

  // 批量删除股票池数据
  static async batchDeleteStockPool(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/stockPool/batchDeleteStockPool',
      data,
    })
  }

}

export { StockPool as StockPoolModel }
