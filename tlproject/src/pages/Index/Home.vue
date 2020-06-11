<template>
  <div class="home_box">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <Son
            src="el-icon-document-checked"
            text="总订单"
            :div="totalOrder"
            color="color:rgb(18, 150, 219)"
          ></Son>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <Son src="el-icon-s-data" text="总销售额" :div="totalAmount" color="color:rgb(212, 35, 112)"></Son>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple">
          <Son src="el-icon-date" text="今日订单数" :div="todayOrder" color="color:rgb(18, 150, 219)"></Son>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple">
          <Son src="el-icon-medal-1" text="今日销售额" :div="totayAmount" color="color:rgb(26, 250, 41)"></Son>
        </div>
      </el-col>
    </el-row>

    <div>
      <el-main>
        <el-card id="echarts_box" class="box-card"></el-card>
      </el-main>
    </div>
  </div>
</template>

<script>
import Son from "./lib/Son";
import echarts from "echarts";
import {API_TOTALDATA} from "@/api/apis"
export default {
  data(){
    return{
        totalAmount:"",
        todayOrder:"",
        totalOrder:"",
        totayAmount:""
    }
  },
  components: {
    Son
  },
  mounted() {
    var myecharts = echarts.init(document.getElementById("echarts_box"));
    API_TOTALDATA().then(res=>{
      let {xData,orderData,amountData,todayOrder,totalAmount,totalOrder,totayAmount}=res.data
      this.totalAmount=totalAmount
      this. todayOrder= todayOrder
      this.totayAmount=totayAmount
      this.totalOrder=totalOrder
      let option = {
      title: {
        text: "数据统计"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["订单", "销售额"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xData
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "订单",
          type: "line",
          stack: "总量",
          data:orderData
        },
        {
          name: "销售额",
          type: "line",
          stack: "总量",
          data:amountData
        }
      ],
      
    };
    myecharts.setOption(option)     
    })
   
  }
};
</script>

<style lang="less" scoped>
.home_box {
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: white;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  i {
    font-size: 50px;
  }
  p {
    color: rgb(205, 205, 205);
    margin: 0px;
  }
  #echarts_box{
    width: 1000px;
    height: 542px;
  }
}
</style>