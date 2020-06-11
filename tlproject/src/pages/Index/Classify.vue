<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品分类</span>
      <el-button type="primary" @click="dialogFormVisible = true" style="float: right;">添加分类</el-button>
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="catename" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addclass(),dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="分类名称" prop="cateName"></el-table-column>
        <el-table-column label="是否使用" prop="state">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row),dialogFormVisible1 = true"
            >编辑</el-button>
            <el-dialog title="修改分类" :visible.sync="dialogFormVisible1">
              <el-form v-model="form">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                
                  <el-form-item label="是否启用" :label-width="formLabelWidth">
                    <template slot-scope="scope">
                    <el-switch
                      v-model="value2"
                      @change="changeSwitch($event,scope.row,scope.$index)"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    ></el-switch>
                    </template>
                  </el-form-item>
                
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="edit(),dialogFormVisible1 = false">确 定</el-button>
              </div>
            </el-dialog>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
    </div>
  </el-card>
</template>

<script>
import {
  API_ADDCATE,
  API_CATELIST,
  API_DELCATE,
  API_EDITCATE
} from "@/api/apiss";
export default {
  data() {
    return {
      multipleSelection: [],
      // 模态框是否启用
      value1: false,
      // 总条数
      total: 0,
      // 每页条数
      pageSize: 5,
      // 当前页
      page: 1,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      catename: "",
      formLabelWidth: "120px",
      tableData: [],
      search: "",
      value2:"",
      // 编辑模态框值
      form: {
        name: "",
        id: "",
        state: ""
      }
    };
  },

  created() {
    this.getdata();   
  },
  methods: {
    // 封装刷新函数  
    getdata() {
      API_CATELIST(this.page, this.pageSize).then(res => {
        console.log(res);
        this.total = res.data.total;
        // let arr = res.data.data.map(res.data.state);
        // console.log(arr);
        let arr = res.data.data.map(item => {
          if (item.state == "1") {
            item.state = true;
          } else {
            item.state = false;
          }
          return item;
        });

        this.tableData = arr;
      });
    },
    // 修改swich值
    changeSwitch() {      
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 修改分类
    handleEdit(row) {
      this.form.name = row.cateName;
      this.form.id = row.id;
      this.form.state = row.state;
      this.value2=this.form.state
    },
    // 提交更新
    edit() {
      API_EDITCATE(this.form.id, this.form.name, this.value2.toString()).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "更新分类成功",
            type: "success"
          });
          this.getdata();
        } else {
          this.$message.error("更新失败,请稍后再试");
        }
      });
    },  
    // 删除分类
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API_DELCATE(row.id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getdata();
          }
        });
      });
    },
    // 每页条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getdata();
    },
    // 当前页码
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.getdata();
    },
    // 添加分类
    addclass() {
      if (this.catename == "") return;
      API_ADDCATE(this.catename, this.value1.toString()).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "添加分类成功",
            type: "success"
          });
          // 刷新页面
          this.getdata();
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 10px;
}
.el-input__inner {
  width: 200px;
}
</style>