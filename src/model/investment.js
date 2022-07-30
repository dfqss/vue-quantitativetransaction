import _axios, { get, _delete } from '../lin/plugin/axios'
import Config from '@/config'

class Investment {
  // 分页查询核心指标列表
  // static async getCoreIndexList(page, pagesize) {
  //   const res = await get(`investmentV1/coreIndex/getcoreIndexsByPage/${page},${pagesize}`)
  //   return res
  // }

  // 分页查询核心指标列表
  static async getCoreIndexList(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/coreIndex/getCoreIndexList',
      data,
    })
  }

  // 分页查询核心指标历史信息列表
  static async getCoreIndexHistoryList(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/coreIndex/getCoreIndexHistoryList',
      data,
    })
  }

  // 根据code删除核心指标列表
  static async deleteCoreIndexByCode(data) {
    return _axios({
      method: 'post',
      url: 'investmentV1/coreIndex/updateCoreIndexByCode',
      data,
    })
  }

  // 导出股票池excel文件
  static async exportCoreIndexlOfexcel(data){
    window.open(Config.baseURL + "/investmentV1/download/downloadFile?fileTpye=CoreIndex", '_self')
  }
}

export { Investment as InvestmentModel }
