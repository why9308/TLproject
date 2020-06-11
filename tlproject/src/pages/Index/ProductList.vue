<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品列表</span>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <span>
                  <img :src='"http://127.0.0.1:5000/upload/imgs/goods_img/"+props.row.imgUrl' alt />
                </span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img :src='"http://127.0.0.1:5000/upload/imgs/goods_img/"+scope.row.imgUrl' alt />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
        <el-table-column label="操作" prop="operation">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="compile(scope.row),dialogFormVisible = true">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
              <el-form v-model="form">
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item label="商品分类" :label-width="formLabelWidth">
                  <el-select v-model="form.category" placeholder="商品选择分类">
                          <el-option
                            v-for="item in options"
                            :key="item.cateName"
                            :label="item.label"
                            :value="item.cateName"
                          ></el-option>
                        </el-select>
                </el-form-item>
                 <el-form-item label="商品价格" :label-width="formLabelWidth">
                  <el-input v-model="form.price" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item label="商品地址" :label-width="formLabelWidth">
                   <el-upload
                    action="http://127.0.0.1:5000/goods/goods_img_upload"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handleAvatarSuccess"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>

                </el-form-item>
                 <el-form-item label="商品描述" :label-width="formLabelWidth">
                  <el-input v-model="form.goodsDesc" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="update(scope.row),dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
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
import { API_LIST, API_DEL,API_EDIT,API_INQUIRE} from "@/api/apiss";
export default {
  data() {
    return {
      options:{},
       dialogImageUrl: '',
        dialogVisible: false,
      pageSize: 5,
      total: 1,
      page: 1,
      tableData: [{}],
       dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          category: '',
          price: '',
          imgUrl: '',
          goodsDesc: '',
        },
        formLabelWidth: '120px'
    };
  },
  methods: {
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    // 编辑数据
    compile(row){
         
        API_INQUIRE().then(res=>{
          this.options=res.data.categories
        })
        this.form=row
       this.data=row.id       
    },
    // 上传图片回调函数
    handleAvatarSuccess(res){
        console.log(res.imgUrl);
        this.form.imgUrl=res.imgUrl   
    },
    // 编辑更新
    update(row){           
      API_EDIT(this.form.name,this.form.category,this.form.price,this.form.imgUrl,this.form.goodsDesc,row.id).then(res=>{
        if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "更新成功!"
            });
            this.getDate();

            
          } else{
            this.$message.error("编辑失败,请稍后再试");
          }
      })       
    },
     // 封装刷新
    getDate() {  
      API_LIST(this.page, this.pageSize).then(res => {
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    },
    // 分页每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(`每页 ${val} 条`);
      this.getDate();
    },
    // 分页当前页
    handleCurrentChange(val) {
      this.page = val;
      // console.log(`当前页: ${val}`);
      this.getDate();
    },
    // 删除数据
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API_DEL(row.id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getDate();
          } else {
            this.$message.error("删除失败,请稍后再试");
          }
        });
      });
    }
  },
  created() {
    this.getDate();
  }
};
</script>

<style lang="less" scoped>
.el-main {
  background: white;
  padding: 20px 0px;
  h4 {
    margin-top: 0px;
    margin-left: 10px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  img{
    width: 100px;
  }
}
</style>