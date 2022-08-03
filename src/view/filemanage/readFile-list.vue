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

    <hr />

    <div class="add-button">
      <el-form :inline="true" label-width="270px" class="demo-form-inline">
        <!-- :span为24时，铺满赤道、为8时就是占1/3，其他以此类推 -->
        <el-form-item label="文件名称">
          <el-col :span="20">
            <el-input placeholder="请输入内容" size="medium" v-model="fileName" @input="orderNoChange"></el-input>
          </el-col>
        </el-form-item>

        <!-- 当存在2个input时 :span加起来为48时，铺满赤道、为8时就是占1/6，其他以此类推 -->
        <el-form-item label="期数">
          <el-col :span="20">
            <el-input placeholder="请输入内容" size="medium" v-model="filePeriods" @input="orderNoChange"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="计算日期">
          <el-col :span="20">
            <el-date-picker v-model="calDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" @change="orderNoChange"> </el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="queryList" :loading="loading">查 询</el-button>
    </div>

    <div class="table-container">
      <el-table :data="dataList" border highlight-current-row :cell-style="{ 'text-align': 'center' }">
        <!-- <el-table-column label="序号" width="60" type="index" /> -->
        <el-table-column label="文件名称" prop="fileName" />
        <el-table-column label="文件路径" prop="filePath" />
        <el-table-column label="文件期数" prop="filePeriods" width="120" />
        <el-table-column label="文件读取状态" prop="status" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == '0'" type="success">未读</el-tag>
            <el-tag v-else-if="scope.row.status == '1'" type="warning">读取失败</el-tag>
            <el-tag v-else-if="scope.row.status == '2'" type="info">读取成功</el-tag>
            <el-tag v-else type="info">读取中</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="description" />
        <el-table-column label="计算日期" prop="calDate" />
      </el-table>

      <!-- 上下页调整按钮 -->
      <!-- page-size 每页显示条目个数，支持 .sync 修饰符
                page-sizes 每页显示个数选择器的选项设置
                total 总条目
                current-page.sync 当前页数，支持 .sync 修饰符
                @current-change currentPage 改变时会触发 回调参数 当前页
                @size-change pageSize 改变时会触发 -->
      <el-pagination
        layout="total,sizes,prev,pager,next,jumper"
        :page-size="pageParams.pagesize"
        :page-sizes="[8, 10, 20]"
        :total="total"
        :current-page.sync="curPage"
        @current-change="hCurrentChange"
        @size-change="hSizeChange"
      />
    </div>
  </div>
</template>

<script>
import { FilemanageModel } from '../../model/filemanage'

export default {
  // 页面数据缓存区
  data() {
    return {
      // 查询条件文件名称的默认值
      fileName: '',
      // 查询条件文件期数的默认值
      filePeriods: '',
       // 查询条件计算时间的默认值
      calDate: '',
      // 重载标识：用于防止接口重复调用，当后台接口没有返回时一直显示加载中，此时按钮无法被点击
      loading: false,
      checkList: [],
      // 重载标识：用于防止接口重复调用，当后台接口没有返回时一直显示加载中，此时按钮无法被点击
      loading: false,
      // 页签标题
      dialogTitle: '',
      // 分页参数
      pageParams: {
        // 页码
        page: 1,
        // 每页条数
        pagesize: 5,
      },
      // 结果列表
      dataList: [],
      // 总条数
      total: 8,
      // 当前页数
      curPage: 0,
      // 查询标识
      flag: '',
    }
  },

  // 生命周期函数
  created() {
    this.getBatchFilesList()
  },

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

    // 点击查询按钮触发事件
    async queryList(flag) {
      // 点击查询按钮时，重置flag值
      this.flag = flag
      // 重置当前页数，防止输入查询条件时，页码传值错误
      this.pageParams.page = 1
      this.curPage = 1
      await this.getBatchFilesList()
    },
    // 获取财务分析指标列表
    async getBatchFilesList() {
      this.loading = true
      const params = {
        fileName: this.fileName,
        filePeriods: this.filePeriods,
        calDate: this.calDate,
        pageNum: this.pageParams.page,
        pageSize: this.pageParams.pagesize,
      }
      try {
        const result = await FilemanageModel.getBatchFilesList(params)
        if (result.code == '9999') {
          this.$message.error(result.message)
          this.dataList = null
          this.total = 0
          this.loading = false
          return
        }
        this.dataList = result.dataList
        this.total = result.totalNum
      } catch (error) {
        this.$message.error('调用文件管理查询API异常')
        // this.$message.error('失败信息')
        // console.log(error)
        // if (error.code === 10020) {
        //   result = {}
        // }
      }
      // 重置当前页数，防止从第二页查询时，再点击查询按钮，页数会传输错误
      this.loading = false
    },
    // 强制更新查询参数
    orderNoChange() {
      this.$forceUpdate()
    },
    // 分页相关方法
    async hCurrentChange(curPage) {
      // alert(curPage)
      // 1. 更新页码
      this.pageParams.page = curPage
      // 2. 重发请求
      await this.getBatchFilesList()
    },
    // pageSize 改变时会触发:用户调整了每页显示的条数
    async hSizeChange(pagesize) {
      // 1. 更新每页条数
      this.pageParams.pagesize = pagesize
      // 2. 重发请求
      await this.getBatchFilesList()
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
