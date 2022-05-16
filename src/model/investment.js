import { get, _delete } from '../lin/plugin/axios'

class Investment {
  // 分页查询核心指标列表
  static async getCoreIndexList(page, pagesize) {
    const res = await get(`investmentV1/coreIndex/getcoreIndexsByPage/${page},${pagesize}`)
    return res
  }

  // 获取核心指标列表的总条数
  static async getCoreIndexTotal() {
    const res = await get('investmentV1/coreIndex/getcoreIndexsTotal')
    return res
  }
}

export { Investment as InvestmentModel }
