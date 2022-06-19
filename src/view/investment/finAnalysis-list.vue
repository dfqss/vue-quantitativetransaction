<template>
  <div class="container">
    <div class="title">财务分析指标列表</div>

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
      <el-button type="primary" @click="queryList('query')" :loading="loading">查 询</el-button>
      <el-button type="primary" @click="queryList('byCode')" :loading="loading">关联核心指标查询</el-button>
    </div>

    <div class="table-container">
      <el-table :data="dataList" border highlight-current-row :cell-style="{ 'text-align': 'center' }">
        <!-- <el-table-column label="序号" width="60" type="index" /> -->
        <el-table-column label="股票代码" prop="code" />
        <el-table-column label="股票名称" prop="code_name" />
        <el-table-column label="净资产收益率ROE(加权)" prop="roe_basic" />
        <el-table-column label="销售毛利率" prop="gross_profit_margin" />
        <el-table-column label="营业总收入" prop="tot_ope_rev" />
        <el-table-column label="商誉" prop="goodwill" />
        <el-table-column label="资产负债率" prop="debt_to_assets" />
        <el-table-column label="市盈率PE" prop="pe" />
        <el-table-column label="市净率PB" prop="pb" />
        <el-table-column label="每股营业总收入" prop="gr_ps" />
        <el-table-column label="每股收益EPS-基本" prop="eps_basic" />
        <el-table-column label="每股净资产BPS" prop="bps" />

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

        <el-form-item label="ROE(平均)">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.roe_avg" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="ROE(加权)">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.roe_basic" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="ROA">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.roa" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="销售毛利率">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.gross_profit_margin" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="销售净利率">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.net_profit_margin" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="营业总收入">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.tot_ope_rev" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="营业收入">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.ope_rev" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="商誉">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.goodwill" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="开发支出">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.r_and_d_costs" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="主营收入构成">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.segment_sales" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="资产负债率">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.debt_to_assets" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="现金比率">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.cash_to_current_debt" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="市盈率PE">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.pe" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="市净率PB">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.pb" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="每股营业总收入">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.gr_ps" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="每股营业收入">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.or_ps" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="每股现金流量净额">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.cf_ps" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="每股收益EPS">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.eps_basic" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="每股净资产BPS">
          <el-col :span="15">
            <el-input placeholder="" v-model="temp.bps" size="mini" disabled></el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { FinAnalysisModel } from '../../model/finAnalysis'

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
        roe_basic: '0',
        gross_profit_margin: '0',
        tot_ope_rev: '0',
        goodwill: '0',
        debt_to_assets: '0',
        pe: '0',
        pb: '0',
        gr_ps: '0',
        eps_basic: '0',
        bps: '0',
        roe_avg: '0',
        roa: '0',
        net_profit_margin: '0',
        ope_rev: '0',
        r_and_d_costs: '0',
        segment_sales: '0',
        cash_to_current_debt: '0',
        or_ps: '0',
        cf_ps: '0',
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
    this.getFinAnalysisIndexList()
  },
  // 方法区
  methods: {
    // 点击查询按钮触发事件
    async queryList(flag) {
      // 重置当前页数，防止输入查询条件时，页码传值错误
      this.pageParams.page = 1
      this.curPage = 1
      await this.getFinAnalysisIndexList(flag)
    },
    // 获取财务分析指标列表
    async getFinAnalysisIndexList(flag) {
      this.loading = true
      let params = {
        code: this.code,
        codeName: this.codeName,
        pageNum: this.pageParams.page,
        pageSize: this.pageParams.pagesize,
        flag: flag
      }
      try {
        const result = await FinAnalysisModel.getFinAnalysisIndexList(params)
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
        this.$message.error('调用财务分析指标查询API异常')
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
      this.dialogTitle = '财务分析指标详情'
      this.showDialog = true

      this.temp.code = row.code
      this.temp.code_name = row.code_name
      this.temp.roe_basic = row.roe_basic !== null && row.roe_basic !== undefined ? row.roe_basic : this.temp.roe_basic
      this.temp.gross_profit_margin = row.gross_profit_margin !== null && row.gross_profit_margin !== undefined ? row.gross_profit_margin : this.temp.gross_profit_margin
      this.temp.tot_ope_rev = row.tot_ope_rev !== null && row.tot_ope_rev !== undefined ? row.tot_ope_rev : this.temp.tot_ope_rev
      this.temp.goodwill = row.goodwill !== null && row.goodwill !== undefined ? row.goodwill : this.temp.goodwill
      this.temp.debt_to_assets = row.debt_to_assets !== null && row.debt_to_assets !== undefined ? row.debt_to_assets : this.temp.debt_to_assets
      this.temp.pe = row.pe !== null && row.pe !== undefined ? row.pe : this.temp.pe
      this.temp.pb = row.pb !== null && row.pb !== undefined ? row.pb : this.temp.pb
      this.temp.gr_ps = row.gr_ps !== null && row.gr_ps !== undefined ? row.gr_ps : this.temp.gr_ps
      this.temp.eps_basic = row.eps_basic !== null && row.eps_basic !== undefined ? row.eps_basic : this.temp.eps_basic
      this.temp.bps = row.bps !== null && row.bps !== undefined ? row.bps : this.temp.bps
      this.temp.roe_avg = row.roe_avg !== null && row.roe_avg !== undefined ? row.roe_avg : this.temp.roe_avg
      this.temp.roa = row.roa !== null && row.roa !== undefined ? row.roa : this.temp.roa
      this.temp.net_profit_margin = row.net_profit_margin !== null && row.net_profit_margin !== undefined ? row.net_profit_margin : this.temp.net_profit_margin
      this.temp.ope_rev = row.ope_rev !== null && row.ope_rev !== undefined ? row.ope_rev : this.temp.ope_rev
      this.temp.r_and_d_costs = row.r_and_d_costs !== null && row.r_and_d_costs !== undefined ? row.r_and_d_costs : this.temp.r_and_d_costs
      this.temp.segment_sales = row.segment_sales !== null && row.segment_sales !== undefined ? row.segment_sales : this.temp.segment_sales
      this.temp.cash_to_current_debt = row.cash_to_current_debt !== null && row.cash_to_current_debt !== undefined ? row.cash_to_current_debt : this.temp.cash_to_current_debt
      this.temp.or_ps = row.or_ps !== null && row.or_ps !== undefined ? row.or_ps : this.temp.or_ps
      this.temp.cf_ps = row.cf_ps !== null && row.cf_ps !== undefined ? row.cf_ps : this.temp.cf_ps
    },
    // 分页相关方法
    async hCurrentChange(curPage) {
      // alert(curPage)
      // 1. 更新页码
      this.pageParams.page = curPage
      // 2. 重发请求
      await this.getFinAnalysisIndexList()
    },
    // pageSize 改变时会触发:用户调整了每页显示的条数
    async hSizeChange(pagesize) {
      // 1. 更新每页条数
      this.pageParams.pagesize = pagesize
      // 2. 重发请求
      await this.getFinAnalysisIndexList()
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
