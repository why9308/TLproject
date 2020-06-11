<template>
  <div class="orderstats">
    <span>时间范围：</span>
     <el-date-picker
      v-model="value2"
      type="datetimerange"
      align="right"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '00:00:00']"
      value-format="yyyy-MM-dd HH:mm:ss"
      unlink-panels>
    </el-date-picker>
    <!-- <el-date-picker
      v-model="value"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']"
      value-format="yyyy-MM-dd HH:mm:ss"
    ></el-date-picker> -->
    <el-button type="primary" size="medium" @click="orderbtn">查询</el-button>
    <el-card id="echarts_box" class="box-card">占位111</el-card>
  </div>
</template>

<script>
import { API_ORDERTOTAL } from "@/api/apis";
import echarts from "echarts";
export default {
  data() {
    return {
      value2: '',
      date:'["2020-1-1","2020-12-30 "]',
      time:[]

    };
  },
  mounted() {
    var myecharts = echarts.init(document.getElementById("echarts_box"));
    API_ORDERTOTAL(this.date.toString()).then(res => {
      console.log(res);
      
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
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
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
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "下单金额",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ],
            markPoint: {
              data: [
                { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      };
      myecharts.setOption(option)
    });
    
  },
  methods:{       
      orderbtn(){       
       this.time=`["${this.value2[0]}"`+','+`"${this.value2[1]}"]`;   
        API_ORDERTOTAL(this.time.toString()).then(res=>{
          console.log(res);  
        })
        
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
  #echarts_box{
     width: 1109px;
    height: 542px;
  }
}
</style>