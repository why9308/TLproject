<template>
  <div class="orderstats">
    <span>时间范围：</span>
    <el-date-picker
      v-model="time"
      type="datetimerange"
      align="right"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '00:00:00']"
      value-format="yyyy-MM-dd HH:mm:ss"
      format="yyyy年MM月dd日hh时mm分ss秒"
      unlink-panels
    ></el-date-picker>
    <el-button type="primary" size="medium" @click="orderbtn">查询</el-button>
    <el-card id="echarts_box" class="box-card"></el-card>
  </div>
</template>

<script>
import { API_ORDERTOTAL } from "@/api/apis";
import echarts from "echarts";
import moment from "moment"
export default {
  data() {
    return {
      time:[]
    };
  },
  mounted() {
      var myecharts = echarts.init(document.getElementById("echarts_box"));
      API_ORDERTOTAL(JSON.stringify(this.time)).then(res => {       
        this.time = res.data.data;
        this.time.forEach(v => {
          v.orderTime = moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss");
        });
        var time = this.time.map(item => {
          return item.orderTime;
        });
        var price=this.time.map(item=>{
          return item.orderAmount
        })
        let option = {
        title: {
          text: "数据统计",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["下单时间", "下单金额"]
        },
        toolbox: {
          show: true,
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "下单时间",
            type: "bar",
            data:  time
             
            
          },
          {
            name: "下单金额",
            type: "bar",
            data:  price
            
            
          }
        ]
      };
      myecharts.setOption(option);
      });
  },
  methods: {
    orderbtn() {
      var myecharts = echarts.init(document.getElementById("echarts_box"));
      API_ORDERTOTAL(JSON.stringify(this.time)).then(res => {       
        this.time = res.data.data;
        this.time.forEach(v => {
          v.orderTime = moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss");
        });
        var time = this.time.map(item => {
          return item.orderTime;
        });
        var price=this.time.map(item=>{
          return item.orderAmount
        })
        console.log(time);
        console.log(price);
        let option = {
        title: {
          text: "数据统计",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["下单时间", "下单金额"]
        },
        toolbox: {
          show: true,
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "下单时间",
            type: "bar",                        
          },
          {
            name: "下单金额",
            type: "bar",
            data: 
             price
           
          }
        ]
      };
      myecharts.setOption(option);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.orderstats {
  span {
    margin-right: 10px;
  }
  .box-card {
    margin-top: 20px;
  }
  .el-button {
    margin-left: 10px;
  }
  #echarts_box {
    width: 1109px;
    height: 542px;
  }
}
</style>