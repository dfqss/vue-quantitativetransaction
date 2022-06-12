<template>
  <div class="container">
    <div class="title">投资标初选列表</div>

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
      <el-button type="primary" @click="queryList" :loading="loading">查 询</el-button>
      <el-button type="primary" @click="batchInsertStockPool" :loading="loading">加入股票池</el-button>
    </div>

    <div class="table-container">
      <el-table
        :data="dataList"
        border
        highlight-current-row
        :cell-style="{ 'text-align': 'center' }"
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :row-key="rowKeyInit"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" :selectable="selectInit" reserve-selection align="center" width="55" />
        <!-- <el-table-column label="序号" width="60" type="index" /> -->
        <el-table-column label="股票代码" prop="code" />
        <el-table-column label="股票名称" prop="codeName" />
        <el-table-column label="是否新股" prop="isNewShares" />
        <el-table-column label="核心指数" prop="finalCalCore" />
        <el-table-column label="期数" prop="periods" />
        <el-table-column label="计算日期" prop="calDate" />
        <el-table-column label="入池状态" v-if="false" prop="inPoolStatus" />
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
import { StockPoolModel } from '../../model/stockPool'

export default {
  name: 'List',

  data() {
    return {
      // 查询条件股票代码的默认值
      code: '',
      // 查询条件股票名称的默认值
      codeName: '',
      // 重载标识：用于防止接口重复调用，当后台接口没有返回时一直显示加载中，此时按钮无法被点击
      loading: false,
      // 页签标题
      dialogTitle: '',
      // 选项值
      multipleSelection: [],
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
    this.getCoreIndexList()
  },
  methods: {
    // 点击查询按钮触发事件
    async queryList() {
      // 重置当前页数，防止输入查询条件时，页码传值错误
      this.pageParams.page = 1
      this.curPage = 1
      await this.getCoreIndexList()
    },
    // 事件：获取核心指数列表
    async getCoreIndexList() {
      this.loading = true
      let params = {
        code: this.code,
        codeName: this.codeName,
        pageNum: this.pageParams.page,
        pageSize: this.pageParams.pagesize,
      }
      try {
        const result = await InvestmentModel.getCoreIndexList(params)
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
        this.$message.error('调用核心指数查询API异常')
      }
      this.loading = false
    },
    // 批量插入股票池数据
    async batchInsertStockPool() {
      this.loading = true
      if(this.multipleSelection == null || this.multipleSelection.length == 0) {
        this.$notify.info({title: '提示', message: '请选择你要入池的股票信息'});
        this.loading = false
        return
      }
      let params = {
        insertData: this.multipleSelection,
      }
      try {
        const result = await StockPoolModel.batchInsertStockPool(params)
        if (result.code == '0000') {
          this.$notify({ title: '成功', message: result.message, type: 'success'});
        } else {
          this.$message.error(result.message)
        }
      } catch (error) {
        this.$message.error('调用股票池批量添加API异常')
      }
      // 调用服务以后，需要把勾选清除掉
      this.$refs.multipleTable.clearSelection()
      this.loading = false
      this.getCoreIndexList()
    },
    // 强制更新查询参数
    orderNoChange() {
      this.$forceUpdate()
    },
    // row-key定义
    rowKeyInit(row) {
      return row.code
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
      // this.$emit(
      //   'batchInsertCoreIndex',
      //   val.map(item => {
      //     return {
      //       id: item.code,
      //       defectStatus: item.defectStatus,
      //     }
      //   }),
      // )
    },
    // 限制表格勾选，勾选规则:需要是同一类型的数据
    selectInit(row) {
      // 限制逻辑，返回true则为可勾选，反之则禁止勾选
      let judge = true
      // if (this.multipleSelection.length != 0) {
      //   judge = this.multipleSelection.some(item => {
      //     return item.code === row.code
      //   })
      // }
      return !(row.inPoolStatus == 'in')
    },
    // 分页相关方法
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
