<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品添加</span>
    </div>
    <div>
      <div class="add_box">
        <p>商品名称</p>
        <el-input placeholder="商品名称" v-model="name" clearable></el-input>
      </div>
      <div class="add_box">
        <p>商品分类</p>
        <el-select v-model="category" placeholder="商品选择分类">
          <el-option
            v-for="item in options"
            :key="item.cateName"
            :label="item.label"
            :value="item.cateName"
          ></el-option>
        </el-select>
      </div>
      <div class="add_box">
        <p>商品价格</p>
        <el-input-number v-model="price" @change="handleChange" :min="1" :max="999" label="描述文字"></el-input-number>
      </div>
      <div class="add_box">
        <p>商品图片</p>
        <el-upload
          action="http://127.0.0.1:5000/goods/goods_img_upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :data="data"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
      <div class="add_box">
        <p>商品描述</p>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="goodsDesc"></el-input>
      </div>
      <el-button type="primary" @click="addGoods">添加商品</el-button>
    </div>
  </el-card>
</template>

<script>
import { API_INQUIRE, API_ADDGOODS } from "@/api/apiss";
export default {
  data() {
    return {
      data: { id: localStorage.id },
      dialogImageUrl: "",
      dialogVisible: false,
      options: {},
      // 金额
      price: "",
      // 商品分类
      category: "",
      // 图片地址
      imgUrl: "",
      // 商品名字
      name: "",
      // 商品描述
      goodsDesc: ""
    };
  },
  methods: {
    // 添加商品按钮
    addGoods() {
      API_ADDGOODS(
        this.name,
        this.category,
        this.price,
        this.imgUrl,
        this.goodsDesc
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "商品添加成功",
            type: "success"
          });
          window.location.reload()
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(value) {
      console.log(value);
    },
    // 上传图片以后回调函数
    handleAvatarSuccess(res) {
      // 图片imgUrl
      this.imgUrl = res.imgUrl;
    }
  },
  created() {
    // 获取分类名称
    API_INQUIRE().then(res => {
      this.options = res.data.categories;
    });
  }
};
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

h4 {
  margin-top: 0px;
  margin-left: 10px;
}
.add_box {
  display: flex;
  p {
    margin: 0px;
    line-height: 40px;
    white-space: nowrap;
    margin: 0px 10px 20px;
  }
  .el-input {
    width: 350px;
  }
}
.el-button {
  margin-left: 85px;
  margin-top: 10px;
}
</style>