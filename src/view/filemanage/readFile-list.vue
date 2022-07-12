<template>
  <div class="container">
    <div class="title">文件管理</div>

    <div class="add-button">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="批量文件入库"></el-checkbox>
        <el-checkbox label="读取核心指标文件"></el-checkbox>
        <el-checkbox label="读取其他指标文件"></el-checkbox>
        <el-checkbox label="读取上市日期文件"></el-checkbox>
      </el-checkbox-group>

      <br />
      <el-button size="small" type="success" @click="executeTask" :loading="loading">确 认</el-button>
    </div>
  </div>
</template>

<script>
import { FilemanageModel } from '../../model/filemanage'

export default {
  // 页面数据缓存区
  data() {
    return {
      loading: false,
      checkList: [],
    }
  },

  // 生命周期函数
  created() {},

  // 方法区
  methods: {
    // 执行读取任务
    async executeTask() {
      this.loading = true
      if (this.checkList == null || this.checkList.length <= 0) {
        this.$notify({ title: '警告', message: '请选择需要执行的任务', type: 'warning' })
        this.loading = false
        return
      }
      if (this.checkList.includes('批量文件入库')) {
        await this.readCoreIndexExcel()
      }
      if (this.checkList.includes('读取核心指标文件')) {
        await this.importCoreIndexData()
      }
      if (this.checkList.includes('读取其他指标文件')) {
        await this.importOtherIndexData()
      }
      if (this.checkList.includes('读取上市日期文件')) {
        await this.importListingData()
      }
      this.loading = false
    },
    // 批量文件入库
    async readCoreIndexExcel() {
      let params = {}
      try {
        const result = await FilemanageModel.readCoreIndexExcel(params)
        if (result.code == '0000') {
          this.$notify({ title: '成功', message: result.message, type: 'success' })
        } else {
          this.$message.error(result.message)
        }
      } catch (error) {
        this.$message.error('调用文件上传API异常')
      }
    },
    // 读取核心指标文件
    async importCoreIndexData() {
      let params = {}
      try {
        const result = await FilemanageModel.importCoreIndexData(params)
        if (result.code == '0000') {
          this.$notify({ title: '成功', message: result.message, type: 'success' })
        } else {
          this.$message.error(result.message)
        }
      } catch (error) {
        this.$message.error('调用文件上传API异常')
      }
    },
    // 读取其他指标数据
    async importOtherIndexData() {
      let params = {}
      try {
        const result = await FilemanageModel.importOtherIndexData(params)
        if (result.code == '0000') {
          this.$notify({ title: '成功', message: result.message, type: 'success' })
        } else {
          this.$message.error(result.message)
        }
      } catch (error) {
        this.$message.error('调用文件上传API异常')
      }
    },
    // 读取上市日期数据
    async importListingData() {
      let params = {}
      try {
        const result = await FilemanageModel.importListingData(params)
        if (result.code == '0000') {
          this.$notify({ title: '成功', message: result.message, type: 'success' })
        } else {
          this.$message.error(result.message)
        }
      } catch (error) {
        this.$message.error('调用文件上传API异常')
      }
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }
  .add-button {
    padding: 20px 40px;
  }
  .table-container {
    padding: 0 40px 20px 40px;
  }
}
</style>
