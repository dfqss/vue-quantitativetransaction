<template>
  <div class="container">
    <div class="title">行业分类列表</div>

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
      </el-form>

      <!-- <el-button type="primary" @click="handAdd" v-permission="'废弃按钮'">废弃按钮</el-button> -->
      <el-button type="primary" @click="getIndustryClassList" :loading="loading">查 询</el-button>
    </div>

    <div class="table-container">
      <el-table :data="dataList" border highlight-current-row :cell-style="{ 'text-align': 'center' }">
        <!-- <el-table-column label="序号" width="60" type="index" /> -->
        <el-table-column label="股票代码" prop="code" />
        <el-table-column label="股票名称" prop="code_name" />
        <el-table-column label="所属申万行业代码" prop="industry_sw_code" />
        <el-table-column label="所属申万行业名称" prop="industry_sw" />
        <el-table-column label="所属中信行业代码" prop="industry_cit_code" />
        <el-table-column label="所属中信行业名称" prop="industry_cit" />
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
import { IndustryClassModel } from '../../model/industryClass'
import UploadImgs from '../../component/base/upload-image/index'

export default {
  name: 'List',
  components: { UploadImgs },

  // 页面数据缓存区
  data() {
    return {
      // 详情页面弹出标识 true-弹出  false-关闭
      showDialog: false,
      // 查询条件股票代码的默认值
      code: '',
      // 查询条件股票名称的默认值
      codeName: '',
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
    this.getIndustryClassList()
  },

  // 方法区
  methods: {
    // 强制更新查询参数
    orderNoChange() {
      this.$forceUpdate()
    },
    // 获取财务分析指标列表
    async getIndustryClassList() {
      this.loading = true
      let params = {
        code: this.code,
        codeName: this.codeName,
        pageNum: this.pageParams.page,
        pageSize: this.pageParams.pagesize,
      }
      try {
        const result = await IndustryClassModel.getIndustryClassList(params)
        // 此处要加判断：成功和失败要怎么处理
        // 此处要加判断：成功和失败要怎么处理
        // 此处要加判断：成功和失败要怎么处理
        // 重要的事情说三遍
        // if (res.code < window.MAX_SUCCESS_CODE) {
        //   this.$message.success(`${res.message}`)
        //   this.resetForm(formName)
        // }
        this.dataList = result.dataList
        this.total = result.totalNum
      } catch (error) {
        // this.$message.error('失败信息')
        // console.log(error)
        // if (error.code === 10020) {
        //   result = {}
        // }
      }
      // 重置当前页数，防止从第二页查询时，再点击查询按钮，页数会传输错误
      this.pageParams.page = 1
      this.loading = false
    },
    // 分页相关方法
    async hCurrentChange(curPage) {
      // alert(curPage)
      // 1. 更新页码
      this.pageParams.page = curPage
      // 2. 重发请求
      await this.getIndustryClassList()
    },
    // pageSize 改变时会触发:用户调整了每页显示的条数
    async hSizeChange(pagesize) {
      // 1. 更新每页条数
      this.pageParams.pagesize = pagesize
      // 2. 重发请求
      await this.getIndustryClassList()
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
