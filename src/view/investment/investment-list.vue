<template>
  <div class="container">
    <div class="title">投资标初选列表</div>
    <div class="add-button">
      <el-button type="primary" @click="handAdd" v-permission="'废弃按钮'">废弃按钮</el-button>
    </div>
    <div class="table-container">
      <el-table :data="coreIndexList" border highlight-current-row :cell-style="{ 'text-align': 'center' }">
        <el-table-column label="序号" width="60" type="index" />
        <el-table-column label="股票代码" prop="code" />
        <el-table-column label="股票名称" prop="codeName" />
        <el-table-column label="是否新股" prop="isNewShares" />
        <el-table-column label="核心指数" prop="finalCalCore" />
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
import UploadImgs from '../../component/base/upload-image/index'

export default {
  name: 'List',
  components: { UploadImgs },

  data() {
    return {
      pageParams: {
        // 页码
        page: 1,
        // 每页条数
        pagesize: 10,
      },
      // 核心指数列表
      coreIndexList: [],
      // 总条数
      total: 0,
      // 当前页数
      curPage: 0,
    }
  },
  // 生命周期函数
  created() {
    this.getCoreIndexList()
    this.getCoreIndexTotal()
  },
  methods: {
    // 获取核心指数列表
    async getCoreIndexList() {
      this.coreIndexList = await InvestmentModel.getCoreIndexList(this.pageParams.page, this.pageParams.pagesize)
    },
    // 获取核心指数总条数
    async getCoreIndexTotal() {
      this.total = await InvestmentModel.getCoreIndexTotal()
    },
    // 分页
    async hCurrentChange(curPage) {
      // alert(curPage)
      // 1. 更新页码
      this.pageParams.page = curPage
      // 2. 重发请求
      await this.getCoreIndexList()
    },
    // pageSize 改变时会触发:用户调整了每页显示的条数
    async hSizeChange(pagesize) {
      // 1. 更新每页条数
      this.pageParams.pagesize = pagesize
      // 2. 重发请求
      await this.getCoreIndexList()
    },
    // 分页组件删除最后一条数据后 跳转异常处理
    // 分页异常的处理
    // 判断是不是最后一条数据 如果是的话 则请求上一页的数据
    // if (this.coreIndexList.length === 1) {
    //     this.page--
    //     if (this.page <= 0) {
    //         this.page = 1
    //     }
    // }
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
