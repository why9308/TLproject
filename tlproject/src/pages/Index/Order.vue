<template>
  <div class="Index_box">
    <div>
      <!-- <el-row :gutter="20">
              <el-col :span="5">
                <div class="grid-content bg-purple">
                  
               <span>订单号：</span><el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple">
                 收货人： <el-input placeholder="请输入内容" v-model="input2" clearable></el-input>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple">
                  手机号： <el-input placeholder="请输入内容" v-model="input3" clearable></el-input>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple">
                  订单状态：<el-input placeholder="请输入内容" v-model="input4" clearable></el-input>
                </div>
              </el-col>
      </el-row>-->
      <!-- <div class="order_box">
              订单号：
              <el-input placeholder="请输入订单号" v-model="from.orderNo" clearable></el-input>
            </div>
            <div class="order_box">
              收货人：
              <el-input placeholder="请输入收货人" v-model="from.consignee" clearable></el-input>
            </div>
            <div class="order_box">
              手机号：
              <el-input placeholder="请输入手机号" v-model="from.phone" clearable></el-input>
            </div>
            <div class="order_box">
              订单状态：
              <el-input placeholder="请输入订单状态" v-model="from.orderState" clearable></el-input>
            </div>
          </div>
          <div>
            <div class="block">
              <span class="demonstration">选择时间</span>
              <el-date-picker
                v-model="value"
                type="datetimerange"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '00:00:00']"
                value-format="yyyy-MM-dd HH:mm:ss"
                unlink-panels
              ></el-date-picker>
              <el-button type="primary" @click="orderbtn">查询</el-button>
      </div>-->
      <el-form :inline="true" :model="orderSearch" class="demo-form-inline">
        <el-form-item label="订单号">
          <el-input v-model="orderSearch.orderNo" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="orderSearch.consignee" placeholder="收货人"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="orderSearch.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="orderSearch.orderState" placeholder="订单状态">
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="选择时间">
          <el-date-picker
            v-model="value"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00']"
            format="yyyy年MM月dd日 HH时mm分ss秒"
            value-format="yyyy-MM-dd HH:mm:ss"
            unlink-panels
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="orderNo" label="订单号" width="100"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="100"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="100"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="100"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="150"></el-table-column>
        <el-table-column label="送达时间" prop="deliveryTime" width="100"></el-table-column>
        <el-table-column label="用户备注" prop="remarks" width="100"></el-table-column>
        <el-table-column label="订单金额" prop="orderAmount" width="100"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row),dialogFormVisible = true"
              type="text"
              size="small"
            >查看</el-button>
            <el-button
              type="text"
              size="small"
              @click="compile(scope.row),dialogFormVisible1 = true"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="查看详情" :visible.sync="dialogFormVisible">
        <el-form v-model="form">
          <el-form-item label="订单id" :label-width="formLabelWidth">
            <el-input :disabled="flag" v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单号" :label-width="formLabelWidth">
            <el-input :disabled="flag" v-model="form.orderNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="下单时间" :label-width="formLabelWidth">
            <el-input :disabled="flag" v-model="form.orderTime" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input :disabled="flag" v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input :disabled="flag" v-model="form.consignee" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="送货地址" :label-width="formLabelWidth">
            <el-input :disabled="flag" v-model="form.deliverAddress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="送达时间" :label-width="formLabelWidth">
            <el-input :disabled="flag" v-model="form.deliveryTime" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input :disabled="flag" v-model="form.remarks" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单金额" :label-width="formLabelWidth">
            <el-input :disabled="flag" v-model="form.orderAmount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单状态" :label-width="formLabelWidth">
            <el-input :disabled="flag" v-model="form.orderState" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改资料" :visible.sync="dialogFormVisible1">
        <el-form v-model="form">
          <el-form-item label="订单id" :label-width="formLabelWidth">
            <el-input disabled v-model="form1.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单号" :label-width="formLabelWidth">
            <el-input v-model="form1.orderNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="下单时间" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                :default-time="['00:00:00', '12:00:00']"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="form1.orderTime"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="form1.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="form1.consignee" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="送货地址" :label-width="formLabelWidth">
            <el-input v-model="form1.deliverAddress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="送达时间" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                :default-time="['00:00:00', '24:00:00']"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="form1.deliveryTime"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form1.remarks" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单金额" :label-width="formLabelWidth">
            <el-input v-model="form1.orderAmount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单状态" :label-width="formLabelWidth">
             <el-select v-model="form1.orderState" placeholder="订单状态">
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
          </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="update(),dialogFormVisible1 = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
// 
import {
  API_ORDERLIST,
  API_ORDER_DETAIL,
  API_ORDER_EDIT,
  API_ORDERLIST1
} from "@/api/apisss";
import moment from "moment"
export default {
  data() {
    return {
      value: "",
      orderSearch: { orderNo: "", phone: "", consignee: "", orderState: "" },
      tableData: [],
      pageSize: 5,
      page: 1,
      total: 1,
      time: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogTableVisible1: false,
      dialogFormVisible1: false,
      formLabelWidth: "120px",
      form: {
        // data:[],
        id: "",
        orderNo: "",
        orderTime: "",
        phone: "",
        consignee: "",
        deliverAddress: "",
        deliveryTime: "",
        remarks: "",
        orderAmount: "",
        orderState: ""
      },
      form1: {
        // data:[],
        id: "",
        orderNo: "",
        orderTime: "",
        phone: "",
        consignee: "",
        deliverAddress: "",
        deliveryTime: "",
        remarks: "",
        orderAmount: "",
        orderState: ""
      },
      flag: true
    };
  },
  methods: {
    // 封装刷新
    getdata() {
      API_ORDERLIST(this.page, this.pageSize).then(res => {
        this.total = res.data.total;
        this.tableData = res.data.data;
        this.tableData.forEach(v=>{
         v.orderTime=moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss")
         v.deliveryTime=moment(v.deliveryTime).format("YYYY-MM-DD hh:mm:ss")
        })
      });
    },
    // 查询
    search() {    
      API_ORDERLIST1(
        this.page,
        this.pageSize,
        this.orderSearch.orderNo,
        this.orderSearch.consignee,
        this.orderSearch.phone,
        this.orderSearch.orderState,
        this.value
      ).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.tableData.forEach(v=>{
         v.orderTime=moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss")
         v.deliveryTime=moment(v.deliveryTime).format("YYYY-MM-DD hh:mm:ss")
        })
      });
    },
    // 修改
    compile(res) {
      this.form1 = res;
    },
    // 确认修改
    update() {
      API_ORDER_EDIT(
        this.form1.id,
        this.form1.orderNo,
        this.form1.orderTime,
        this.form1.phone,
        this.form1.consignee,
        this.form1.deliverAddress,
        this.form1.deliveryTime,
        this.form1.remarks,
        this.form1.orderAmount,
        this.form1.orderState
      ).then(res => {
        if(res.data.code==0){
          this.$message({
            message: "修改成功",
            type: "success"
          });
        }else{
           this.$message.error("更新失败,请稍后再试");
        }
      });
    },
    // 查看详情
    handleClick(row) {
      API_ORDER_DETAIL(row.id).then(res => {
        this.flag = true;
        this.form = res.data.data;
      });
    },
    // 分页每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(`每页 ${val} 条`);
      this.getdata(this.pageSize);
    },
    // 分页当前页
    handleCurrentChange(val) {
      this.page = val;
      // console.log(`当前页: ${val}`);
       this.getdata(this.page);
    }
  },
  created() {
    // 获取数据
    this.getdata();
  }
};
</script>

<style lang="less" scoped>
.Index_box {
  background: rgb(240, 242, 245);
  a {
    text-decoration: none;
    color: #303133;
  }
  .el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
    justify-content: space-between;
    div {
      line-height: 60px;
    }
  }
  .el-main {
    background: white;
    > div {
      display: flex;
      margin: 10px 0;
      button {
        margin-left: 10px;
      }
    }
    .order_box {
      > div {
        width: 60%;
      }
    }
  }
  .el-aside {
    color: #333;
  }
}
</style>