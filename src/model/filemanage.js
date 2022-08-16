import _axios, { _delete } from '../lin/plugin/axios'
import Config from '@/config'

class Filemanage {
    // 批量文件入库
    static async readCoreIndexExcel(data) {
        return _axios({
            method: 'post',
            url: Config.springURL + 'quaTraV1/importData/readCoreIndexExcel',
            data,
        })
    }

    // 读取核心指标数据
    static async importCoreIndexData(data) {
        return _axios({
            method: 'post',
            url: Config.springURL + 'quaTraV1/importData/importCoreIndexData',
            data,
        })
    }

    // 读取其他指标数据
    static async importOtherIndexData(data) {
        return _axios({
            method: 'post',
            url: Config.springURL + 'quaTraV1/importData/importOtherIndexData',
            data,
        })
    }

    // 读取上市日期数据
    static async importListingData(data) {
        return _axios({
            method: 'post',
            url: 'investmentV1/importData/importListingData',
            data,
        })
    }

    // 查询批量文件数据
    static async getBatchFilesList(data){
        return _axios({
            method: 'post',
            url: 'investmentV1/batchFiles/getBatchFilesList',
            data,
        })
    }
}

export { Filemanage as FilemanageModel }