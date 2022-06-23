<template>
  <div class="container">
    <div class="title">股票池列表</div>

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
      <el-button type="primary" @click="batchDeleteStockPool" :loading="loading">移出股票池</el-button>
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
        <el-table-column label="资本市场指标" prop="capitalMarket" />
        <el-table-column label="期数" prop="periods" />
        <el-table-column label="行业名称(申万)" prop="industry_sw" />
        <!-- 单元格编辑 -->
        <el-table-column label="备注" prop="remark" show-overflow-tooltip>
          <template slot-scope="props">
            <div v-if="!props.row.editFlag" class="table-edit">
              <div @click="handleEdit(props.row)" class="content">{{ props.row.remark }}</div>
              <div class="cell-icon" @click="handleCellEdit(props.row)"><i class="el-icon-edit"></i></div>
            </div>
            <div v-else class="table-edit">
              <el-input v-model="props.row.remark" placeholder></el-input>
              <div class="cell-icon-edit">
                <div class="cell-save" @click="handleCellSave(props.row)"><i class="el-icon-check"></i></div>
                <div class="cell-cancel" @click="handleCellCancel(props.row)"><i class="el-icon-close"></i></div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" prop="create_time" />
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
      // 单元格编辑相关
      editRow: 0,
      showTooltip: true,
    }
  },
  // 生命周期函数
  created() {
    this.getStockPoolList()
  },
  methods: {
    // 点击查询按钮触发事件
    async queryList() {
      // 重置当前页数，防止输入查询条件时，页码传值错误
      this.pageParams.page = 1
      this.curPage = 1
      await this.getStockPoolList()
    },
    // 获取股票池列表
    async getStockPoolList() {
      this.loading = true
      const params = {
        code: this.code,
        codeName: this.codeName,
        pageNum: this.pageParams.page,
        pageSize: this.pageParams.pagesize,
      }
      try {
        const result = await StockPoolModel.getStockPoolList(params)
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
        this.$message.error('调用股票池查询API异常')
      }
      this.loading = false
    },
    // 批量删除股票池数据
    async batchDeleteStockPool() {
      this.loading = true
      console.log(this.multipleSelection)
      if (this.multipleSelection == null || this.multipleSelection.length == 0) {
        this.$notify.info({ title: '提示', message: '请选择你要删除的股票信息' })
        this.loading = false
        return
      }
      const params = {
        deleteData: this.multipleSelection,
      }
      try {
        const result = await StockPoolModel.batchDeleteStockPool(params)
        await this.getStockPoolList()
        if (result.code == '0000') {
          this.$notify({ title: '成功', message: result.message, type: 'success' })
        } else {
          this.$message.error(result.message)
        }
      } catch (error) {
        this.$message.error('调用股票池批量删除API异常')
      }
      // 调用服务以后，需要把勾选清除掉
      this.$refs.multipleTable.clearSelection()
      this.loading = false
      this.getCoreIndexList()
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
      const judge = true
      // if (this.multipleSelection.length != 0) {
      //   judge = this.multipleSelection.some(item => {
      //     return item.code === row.code
      //   })
      // }
      return !(row.inPoolStatus == 'in')
    },
    // 单元格编辑
    handleEdit(self, index, row) {
      self.handleCellEdit(row)
      console.log(index, row)
    },
    handleCellEdit(row) {
      row.editFlag = true // eslint-disable-line
      this.tempEditRemark = row.remark
      this.editRow++
    },
    handleCellSave(row) {
      row.editFlag = false // eslint-disable-line
      setTimeout(() => {
        this.editRow--
        this.updateStockPoolByCode(row)
        this.$message({
          type: 'success',
          message: '修改成功',
        })
      }, 1000)
    },
    handleCellCancel(row) {
      row.editFlag = false // eslint-disable-line
      console.log(this.tempEditRemark)
      row.remark = this.tempEditRemark // eslint-disable-line
      this.editRow--
    },
    async updateStockPoolByCode(row) {
      this.loading = true
      const params = {
        code: row.code,
        remark: row.remark,
      }
      console.log(params)
      try {
        const result = await StockPoolModel.updateStockPoolByCode(params)
      } catch (error) {
        this.$message.error('修改股票备注API异常')
      }
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
      await this.getStockPoolList()
    },
    // pageSize 改变时会触发:用户调整了每页显示的条数
    async hSizeChange(pagesize) {
      // 1. 更新每页条数
      this.pageParams.pagesize = pagesize
      // 2. 重发请求
      await this.getStockPoolList()
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
  .table-edit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .content {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .cell-icon {
      cursor: pointer;
      color: #3963bc;
      font-size: 16px;
    }
    .cell-icon-edit {
      display: flex;
      margin-left: 20px;
      width: 50px;
      justify-content: space-between;
      .cell-cancel {
        cursor: pointer;
        color: #3963bc;
        font-size: 16px;
      }
      .cell-save {
        cursor: pointer;
        color: #3963bc;
        font-size: 16px;
        margin-right: -20px;
      }
    }
  }
}
</style>
