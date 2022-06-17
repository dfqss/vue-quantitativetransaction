<template>
  <div class="container">
    <div class="title">核心指标历史查询</div>

    <div class="add-button">
      <el-form :inline="true" label-width="270px" class="demo-form-inline">
        <!-- :span为24时，铺满赤道、为8时就是占1/3，其他以此类推 -->
        <el-form-item label="股票代码">
          <el-col :span="20">
            <el-input placeholder="请输入内容" size="medium" v-model="code" @input="orderNoChange"></el-input>
          </el-col>
        </el-form-item>

        <!-- 当存在2个input时 :span加起来为48时，铺满赤道、为8时就是占1/6，其他以此类推 -->
        <el-form-item label="股票名称">
          <el-col :span="20">
            <el-input placeholder="请输入内容" size="medium" v-model="codeName" @input="orderNoChange"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="计算日期">
          <!-- <span class="demonstration">默认</span> -->
          <el-date-picker
            v-model="calDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            @change="orderNoChange"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="期数">
          <el-col :span="20">
            <el-input
              placeholder="请输入内容"
              size="medium"
              v-model="periods"
              @input="orderNoChange"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form>

      <!-- <el-button type="primary" @click="handAdd" v-permission="'废弃按钮'">废弃按钮</el-button> -->
      <el-button type="primary" @click="queryList" :loading="loading">查 询</el-button>
    </div>

    <div class="table-container">
      <el-table :data="dataList" border highlight-current-row :cell-style="{ 'text-align': 'center' }">
        <!-- <el-table-column label="序号" width="60" type="index" /> -->
        <el-table-column label="股票代码" prop="code" />
        <el-table-column label="股票名称" prop="codeName" />
        <el-table-column label="是否新股" prop="isNewShares" />
        <el-table-column label="核心指数" prop="finalCalCore" />
        <el-table-column label="期数" prop="periods" />
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
        :page-sizes="[10, 15, 20]"
        :total="total"
        :current-page.sync="curPage"
        @current-change="hCurrentChange"
        @size-change="hSizeChange"
      />
    </div>
  </div>
</template>

<script>
import { InvestmentModel } from '../../model/investment'

export default {
  name: 'List',

  data() {
    return {
      // 查询条件股票代码的默认值
      code: '',
      // 查询条件股票名称的默认值
      codeName: '',
      // 查询条件计算日期的默认值
      calDate: '',
      // 查询条件期数的默认值
      periods: null,
      // 重载标识：用于防止接口重复调用，当后台接口没有返回时一直显示加载中，此时按钮无法被点击
      loading: false,
      // 页签标题
      dialogTitle: '',
      // 分页参数
      pageParams: {
        // 页码
        page: 1,
        // 每页条数
        pagesize: 10,
      },
      // 结果列表
      dataList: [],
      // 总条数
      total: 0,
      // 当前页数
      curPage: 0,
    }
  },
  // 生命周期函数
  created() {
    this.getCoreIndexHistoryList()
  },
  methods: {
    // 点击查询按钮触发事件
    async queryList() {
      // 重置当前页数，防止输入查询条件时，页码传值错误
      this.pageParams.page = 1
      this.curPage = 1
      await this.getCoreIndexHistoryList()
    },
    // 获取核心指数列表
    async getCoreIndexHistoryList() {
      this.loading = true
      // calDate重置后会成为空对象[null]，在调用toString方法后会报错，故在此判空并赋予默认值
      if (this.calDate == null) {
        this.calDate = ''
      }
      let params = {
        code: this.code,
        codeName: this.codeName,
        calDate: this.calDate.toString(),
        periods: this.periods,
        pageNum: this.pageParams.page,
        pageSize: this.pageParams.pagesize,
      }
      try {
        const result = await InvestmentModel.getCoreIndexHistoryList(params)
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
        this.$message.error('调用核心指标历史查询API异常')
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
      await this.getCoreIndexHistoryList()
    },
    // pageSize 改变时会触发:用户调整了每页显示的条数
    async hSizeChange(pagesize) {
      // 1. 更新每页条数
      this.pageParams.pagesize = pagesize
      // 2. 重发请求
      await this.getCoreIndexHistoryList()
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
