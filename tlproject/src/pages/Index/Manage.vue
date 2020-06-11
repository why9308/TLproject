<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>店铺管理</span>
      <el-button style="float: right; padding: 3px 0" type="text">
        <el-button type="primary" size="mini">保存</el-button>
      </el-button>
    </div>
    <div class="Manage_box">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="店铺名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input type="textarea" v-model="formLabelAlign.bulletin"></el-input>
        </el-form-item>
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/shop/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
          <!-- avatar -->
            <img :src='"http://127.0.0.1:5000/upload/shop/"+this.formLabelAlign.avatar' class="avatar" />
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片">
          <img  v-for="(item,index) in formLabelAlign.pics" :key="item" :src='"http://127.0.0.1:5000/upload/shop/"+formLabelAlign.pics[index]' alt="">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
          <!-- pics -->
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" src="" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input v-model="formLabelAlign.deliveryPrice"></el-input>
        </el-form-item>
        <el-form-item label="配送时间">
          <el-input v-model="formLabelAlign.deliveryTime"></el-input>
        </el-form-item>
        <el-form-item label="配送描述">
          <el-input v-model="formLabelAlign.description"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分">
          <el-input v-model="formLabelAlign.score"></el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="formLabelAlign.sellCount"></el-input>
        </el-form-item>
        <el-form-item label="活动">
          <el-checkbox-group  v-model="formLabelAlign.supports">
            <!-- <el-checkbox label="在线支付满28减5"  name="supports"></el-checkbox>
            <el-checkbox label="VC无限橙汁全场8折" name="supports"></el-checkbox>
            <el-checkbox label="单人精华套餐" name="supports"></el-checkbox>
            <el-checkbox label="单人特色套餐" name="supports"></el-checkbox> -->
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-picker
            is-range
            v-model="formLabelAlign.date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            :default-time="['00:00:00']"
            format="HH时mm分ss秒"
            value-format="HH:mm:ss"
          ></el-time-picker>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import{API_INFO} from "@/api/apisss"
export default {
  data() {
    return {
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      labelPosition: "right",
      formLabelAlign: {
        // name: "",
        // region: "",
        // type: "",
        // price: "",
        // describe: "",
        // grade: "",
        // sales: "",
        // typeval: "",
        // time: "",
        // data:""
      },
      circleUrl:
        "http://img1.imgtn.bdimg.com/it/u=2630455749,3901005152&fm=26&gp=0.jpg",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"]
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created(){
    API_INFO().then(res=>{
      console.log(res);
      this.formLabelAlign=res.data.data
      console.log(this.formLabelAlign.supports);
      console.log(this.formLabelAlign.avatar);
      console.log(this.formLabelAlign.pics);
      
      
      
    })
  }
};
</script>

<style lang="less" scoped>
.Manage_box {
  .el-input {
    width: 300px;
  }
  .el-textarea {
    width: 300px;
  }
  .avatar-uploader,
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 180px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>