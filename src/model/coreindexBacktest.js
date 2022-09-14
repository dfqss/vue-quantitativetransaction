import _axios, { get, _delete } from '../lin/plugin/axios'
import Config from '@/config'

class Backtest {


  // 分页查询核心指标历史信息列表
  static async getBackTestList(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/backtest/getBacktestList',
      data,
    })
  }

    // 导出股票池excel文件
    static async exportCodeIndexBackOfexcel(data) {
      //console.log(Config.baseURL) 
      // baseURL = Config.baseURL
      // console.log(baseURL)StockPool
      window.open(Config.baseURL + `investmentV1/download/downloadFile?fileType=${data.fileType}&periods=${data.periods}`, '_self')
    }

}

export { Backtest as BacktestModel }
