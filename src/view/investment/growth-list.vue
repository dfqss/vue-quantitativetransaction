<template>
  <div class="container">
    <div class="title">成长指标列表</div>

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
    </div>

    <div class="table-container">
      <el-table :data="dataList" border highlight-current-row :cell-style="{ 'text-align': 'center' }">
        <!-- <el-table-column label="序号" width="60" type="index" /> -->
        <el-table-column label="股票代码" prop="code" />
        <el-table-column label="股票名称" prop="code_name" />
        <el-table-column label="基本每股收益" prop="yoy_eps_basic" />
        <el-table-column label="营业总收入(同比)" prop="yoy_tr" />
        <el-table-column label="营业利润(同比)" prop="yoy_op" />
        <el-table-column label="净资产" prop="yoy_equity" />
        <el-table-column label="研发费用同比增长" prop="fa_yoy" />
        <el-table-column label="总负债" prop="yoy_debt" />
        <el-table-column label="总资产" prop="yoy_assets_tb" />
        <el-table-column label="每股净资产" prop="yoy_bps" />

        <el-table-column label="操作" fix="right">
          <template slot-scope="scope">
            <el-button @click="handleDetali(scope.row)">详情</el-button>
          </template>
        </el-table-column>
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

    <el-dialog
      :title="dialogTitle"
      width="1310px"
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="resetForm"
    >
      <!-- el-form的label-width设置的是所有el-form-item的label宽度，el-form-item设置的为自己的宽度，优先级：el-form-item优先 -->
      <el-form ref="form" :inline="true" :model="temp" label-width="120px">
        <el-form-item label="股票代码" label-width="120px">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.code" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="股票名称">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.code_name" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="基本每股收益">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.yoy_eps_basic" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="营业总收入(同比)">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.yoy_tr" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="营业利润(同比)">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.yoy_op" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="净资产">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.yoy_equity" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="研发费用同比增长">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.fa_yoy" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="总负债">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.yoy_debt" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="总资产">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.yoy_assets_tb" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="每股净资产">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.yoy_bps" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="营业收入(同比)">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.yoy_or" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="利润总额">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.yoy_ebt" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="净利润">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.yoy_profit" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="资产总计">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.yoy_assets_hb" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="营业总收入(N年)">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.growth_gr" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="营业总成本">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.growth_gc" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="营业收入(N年)">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.growth_or" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="营业利润(N年)">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.growth_op" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="营业收入(单季.环比)">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.qfa_cgr_sales" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="营业利润(单季.环比)">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.qfa_cgr_op" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="净利润(单季.环比)">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.qfa_cgr_profit" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { GrowthModel } from '../../model/growth'

export default {
  name: 'List',

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
      // 详情数据
      temp: {
        code: null,
        code_name: null,
        yoy_eps_basic: '0',
        yoy_tr: '0',
        yoy_op: '0',
        yoy_equity: '0',
        fa_yoy: '0',
        yoy_debt: '0',
        yoy_assets_tb: '0',
        yoy_bps: '0',
        yoy_or: '0',
        yoy_ebt: '0',
        yoy_profit: '0',
        yoy_assets_hb: '0',
        growth_gr: '0',
        growth_gc: '0',
        growth_or: '0',
        growth_op: '0',
        qfa_cgr_sales: '0',
        qfa_cgr_op: '0',
        qfa_cgr_profit: '0',
      },
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
    this.getGrowthIndexList()
  },
  // 方法区
  methods: {
    // 点击查询按钮触发事件
    async queryList() {
      // 重置当前页数，防止输入查询条件时，页码传值错误
      this.pageParams.page = 1
      this.curPage = 1
      await this.getGrowthIndexList()
    },
    // 获取财务分析指标列表
    async getGrowthIndexList() {
      this.loading = true
      let params = {
        code: this.code,
        codeName: this.codeName,
        pageNum: this.pageParams.page,
        pageSize: this.pageParams.pagesize,
      }
      try {
        const result = await GrowthModel.getGrowthIndexList(params)
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
        this.$message.error('调用成长指标查询API异常')
      }
      this.loading = false
    },
    // 强制更新查询参数
    orderNoChange() {
      this.$forceUpdate()
    },
    // 关闭详情表单后的操作：将所有字符值重置为初始值并移除校验结果
    resetForm() {
      this.$refs.form.resetFields()
    },
    // 点击详情按钮时，给详情表单赋值
    handleDetali(row) {
      this.dialogTitle = '成长指标详情'
      this.showDialog = true

      this.temp.code = row.code
      this.temp.code_name = row.code_name
      this.temp.yoy_eps_basic = row.yoy_eps_basic !== null && row.yoy_eps_basic !== undefined ? row.yoy_eps_basic : this.temp.yoy_eps_basic
      this.temp.yoy_tr = row.yoy_tr !== null && row.yoy_tr !== undefined ? row.yoy_tr : this.temp.yoy_tr
      this.temp.yoy_op = row.yoy_op !== null && row.yoy_op !== undefined ? row.yoy_op : this.temp.yoy_op
      this.temp.yoy_equity = row.yoy_equity !== null && row.yoy_equity !== undefined ? row.yoy_equity : this.temp.yoy_equity
      this.temp.fa_yoy = row.fa_yoy !== null && row.fa_yoy !== undefined ? row.fa_yoy : this.temp.fa_yoy
      this.temp.yoy_debt = row.yoy_debt !== null && row.yoy_debt !== undefined ? row.yoy_debt : this.temp.yoy_debt
      this.temp.yoy_assets_tb = row.yoy_assets_tb !== null && row.yoy_assets_tb !== undefined ? row.yoy_assets_tb : this.temp.yoy_assets_tb
      this.temp.yoy_bps = row.yoy_bps !== null && row.yoy_bps !== undefined ? row.yoy_bps : this.temp.yoy_bps
      this.temp.yoy_or = row.yoy_or !== null && row.yoy_or !== undefined ? row.yoy_or : this.temp.yoy_or
      this.temp.yoy_ebt = row.yoy_ebt !== null && row.yoy_ebt !== undefined ? row.yoy_ebt : this.temp.yoy_ebt
      this.temp.yoy_profit = row.yoy_profit !== null && row.yoy_profit !== undefined ? row.yoy_profit : this.temp.yoy_profit
      this.temp.yoy_assets_hb = row.yoy_assets_hb !== null && row.yoy_assets_hb !== undefined ? row.yoy_assets_hb : this.temp.yoy_assets_hb
      this.temp.growth_gr = row.growth_gr !== null && row.growth_gr !== undefined ? row.growth_gr : this.temp.growth_gr
      this.temp.growth_gc = row.growth_gc !== null && row.growth_gc !== undefined ? row.growth_gc : this.temp.growth_gc
      this.temp.growth_or = row.growth_or !== null && row.growth_or !== undefined ? row.growth_or : this.temp.growth_or
      this.temp.growth_op = row.growth_op !== null && row.growth_op !== undefined ? row.growth_op : this.temp.growth_op
      this.temp.qfa_cgr_sales = row.qfa_cgr_sales !== null && row.qfa_cgr_sales !== undefined ? row.qfa_cgr_sales : this.temp.qfa_cgr_sales
      this.temp.qfa_cgr_op = row.qfa_cgr_op !== null && row.qfa_cgr_op !== undefined ? row.qfa_cgr_op : this.temp.qfa_cgr_op
      this.temp.qfa_cgr_profit = row.qfa_cgr_profit !== null && row.qfa_cgr_profit !== undefined ? row.qfa_cgr_profit : this.temp.qfa_cgr_profit
    },
    // 分页相关方法
    async hCurrentChange(curPage) {
      // alert(curPage)
      // 1. 更新页码
      this.pageParams.page = curPage
      // 2. 重发请求
      await this.getGrowthIndexList()
    },
    // pageSize 改变时会触发:用户调整了每页显示的条数
    async hSizeChange(pagesize) {
      // 1. 更新每页条数
      this.pageParams.pagesize = pagesize
      // 2. 重发请求
      await this.getGrowthIndexList()
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
