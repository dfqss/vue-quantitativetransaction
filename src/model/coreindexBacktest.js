import _axios, { get, _delete } from '../lin/plugin/axios'
import Config from '@/config'

class Backtest {


  // 分页查询核心指标历史信息列表
  static async getBackTestList(data) {
    return _axios({
      method: 'post',
      url: Config.springURL +  'quaTraV1/BackTest/getBackTestList',
      data,
    })
  }

}

export { Backtest as BacktestModel }
