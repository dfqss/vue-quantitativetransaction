<template>
  <div class="container">
    <div class="title">八大指标文件上传</div>

    <div class="add-button">
      <el-select size="medium" v-model="fileType" placeholder="请选择指标文件类型" clearable="">
        <el-option label="核心指标-按期计算" value="HXZB-AQJS"></el-option>
        <el-option label="核心指标-往期重算" value="HXZB-REC8"></el-option>
        <el-option label="财务分析指标" value="CWFXZB"></el-option>
        <el-option label="成长指标" value="CZZB"></el-option>
        <el-option label="杜邦分析指标" value="DBFXZB"></el-option>
        <el-option label="股票估值" value="GPGZ"></el-option>
        <el-option label="技术分析指标" value="JSFXZB"></el-option>
        <el-option label="行业分类" value="HYFL"></el-option>
        <el-option label="证券基础指标" value="ZQJCZB"></el-option>
        <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> -->
      </el-select>

      <el-upload
        size="small"
        class="upload-demo"
        drag
        multipe
        :on-change="handleChange"
        :file-list="fileList"
        action=""
        :limit="1"
        :auto-upload="false"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :before-remove="beforeRemove"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template v-slot:tip>
          <div class="el-upload-tip el-upload-tip--small" style="margin-bottom: 20px">
            只能上传xlsx文件，且不超过5MB
            <!-- <a style="cursor: pointer" href="http://kano.guahao-test.com/Wnx42440019?token=Mjk4MzQ4NDUzZDE2NjlhNjRlNTRhYWYwMzFmMDg2YjFfTUQ1COUSTOM">点击下载上传模板</a> -->
          </div>
        </template>
      </el-upload>
      <br>
      <el-button size="small" type="success" @click="UploadFile" :loading="loading">提 交</el-button>
    </div>
  </div>
</template>

<script>
import { AllIndexModel } from '../../model/allIndex'

export default {
  // 页面数据缓存区
  data() {
    return {
      loading: false,
      fileType: '',
      fileList: [],
    }
  },

  // 生命周期函数
  created() {},

  // 方法区
  methods: {
    handleChange(file) {
      this.fileList = [file]
    },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList)
    // },
    // handlePreview(file) {
    //   console.log(file)
    // },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceed(files, fileList) {
      this.$message.warning('当前只允许单文件上传')
    },

    async UploadFile () {
      this.loading = true
      if(this.fileList.length <= 0){
        this.$message.error('请选择要上传的文件');
        return
      }
      const formData = new FormData();
      formData.append('files', this.fileList[0].raw)
      formData.append('fileType', this.fileType)
      const result = await AllIndexModel.uploadFile(formData)
      this.loading = false
      // this.showResult = true;
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
  // /deep/ .el-upload-list__item-name{width:200px!important}
  /deep/ .el-upload-list__item{width:150px!important}
}
</style>
