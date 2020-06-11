<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>账号列表</span>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="160"></el-table-column>
        <el-table-column prop="account" label="账号" show-overflow-tooltip width="180"></el-table-column>
        <el-table-column prop="userGroup" label="用户组" width="180"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" width="240"></el-table-column>

        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button
              size="mini"
              type="primary"
              @click="redact(scope.row),dialogFormVisible = true"
            >编辑</el-button>
            <el-dialog title="修改账号" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="账号名称" :label-width="formLabelWidth">
                  <el-input class="usernameInput" v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户组" :label-width="formLabelWidth">
                  <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                    <el-option label="普通管理员" value="普通管理员"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm(),dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
            <el-popconfirm title="确认删除这条数据吗？" @onConfirm="handleDelete(scope.$index, scope.row)">
              <el-button size="mini" type="danger" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <div style="margin-top: 20px">
        <el-button type="danger" @click="toggleSelection">批量删除</el-button>
        <el-button type="primary" @click="cancel">取消选择</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { API_ACCLIST } from "@/api/apis";
import { API_DELETE } from "@/api/apis";
import { API_BATCHDEL } from "@/api/apis";
import { API_COMPILE } from "@/api/apis";
// import {API_ACCLIST,API_DELETE,API_BATCHDEL,API_COMPILE }from "@/api/apis";
export default {
  data() {
    return {
      quantity: [],
      tableData: [],
      multipleSelection: [],
      empty: [],
      // 数据总条数
      total:0,

      // 每页条数
      pageSize: 5,
      page: 1,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        id: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    // 封装刷新
    getDate() {
      API_ACCLIST(this.page, this.pageSize).then(res => {
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    },
    redact(row) {
      console.log(row.id);
      this.form.name = row.account;
      this.form.region = row.userGroup;
      this.form.id = row.id;
    },
    confirm() {
      API_COMPILE(this.form.id, this.form.name, this.form.region).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.getDate();
        }
      });
    },
    // 批量删除
    toggleSelection() {
      let arr = this.multipleSelection;
      arr.forEach(item => {
        // console.log(item.id);
        this.quantity.push(item.id);
      });
      // JSON.stringify(this.quantity)
      if (arr.length == 0) return;
       this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           API_BATCHDEL(JSON.stringify(this.quantity)).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getDate();
        }
      });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     
    },
    // 取消全选
    cancel() {
      this.$refs.multipleTable.clearSelection();
    },
    // // 编辑
    // handleEdit(index, row) {
    //   console.log(row);
    // },
    // 删除选中数据
    handleDelete(index, row) {
      API_DELETE(row.id).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getDate();
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(`每页 ${val} 条`);
      this.getDate();
    },
    handleCurrentChange(val) {
      this.page = val;
      // console.log(`当前页: ${val}`);
      this.getDate();
    }
  },

  created() {
    // 获取账号列表
    this.getDate();
  }
};
</script>

<style lang="less" scoped>
.box-card {
  .text {
    font-size: 14px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 480px;
  }

  .usernameInput {
    width: 220px;
  }
}
</style>