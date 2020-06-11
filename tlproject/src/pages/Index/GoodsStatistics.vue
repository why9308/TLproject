<template>
  <div class="goostat">
    <span>时间范围</span>
    <el-date-picker
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
    ></el-date-picker>
    <el-button type="primary" size="medium">查询</el-button>
    <el-card class="box-card">
        占位
    </el-card>
  </div>
  
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.goostat {
  span {
    margin-right: 10px;
  }
  .box-card{
      margin-top: 20px;
  }
  .el-button{
      margin-left: 10px;
  }
}
</style>