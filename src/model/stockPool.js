import _axios, { get, _delete } from '../lin/plugin/axios'

class StockPool {
  // 分页查询股票池列表
  // static async getCoreIndexList(page, pagesize) {
  //   const res = await get(`investmentV1/coreIndex/getcoreIndexsByPage/${page},${pagesize}`)
  //   return res
  // }

  // 分页查询核心指标列表
  static async getStockPoolList(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/stockPool/getStockPoolList',
      data,
    })
  }
}

export { StockPool as StockPoolModel }
