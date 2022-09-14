import _axios, { get, _delete } from '../lin/plugin/axios'
import Config from '@/config'

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

  // 新增股票池数据
  static async insertStockPool(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/stockPool/insertStockPool',
      data,
    })
  }

  // 导出股票池excel文件
  static async exportStockpoolOfexcel(data) {
    //console.log(Config.baseURL) 
    // baseURL = Config.baseURL
    // console.log(baseURL)StockPool
    window.open(Config.baseURL + "/investmentV1/download/downloadFile?fileType=StockPool", '_self')
  }

}

export { StockPool as StockPoolModel }
