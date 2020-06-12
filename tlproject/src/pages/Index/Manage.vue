<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>店铺管理</span>
      <el-button style="float: right; padding: 3px 0" type="text">
        <el-button type="primary" size="mini" @click="modification">保存</el-button>
      </el-button>
    </div>
    <div class="Manage_box">
      <el-form :label-position="labelPosition" label-width="80px">
        <el-form-item label="店铺名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input type="textarea" v-model="formLabelAlign.bulletin"></el-input>
        </el-form-item>
        <el-form-item label="店铺头像" >
          <el-upload
            class="avatar-uploader"
            :action="UPLOAD"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <!-- avatar -->
             <img v-if="formLabelAlign.avatar" :src="IMG_UPLOAD+formLabelAlign.avatar" class="avatar">
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片" v-model="formLabelAlign.pics">
          <el-upload
            :action="UPLOAD"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="pics_success"
            :file-list="file_list"
          >
            <!-- pics -->
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" src alt />
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
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="在线支付满28减5"></el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
            <el-checkbox label="单人精彩套餐"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购"></el-checkbox>
            <el-checkbox label="单人特色套餐"></el-checkbox>
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
import { API_INFO,API_EDIT,UPLOAD,IMG_UPLOAD } from "@/api/apisss";
export default {
  data() {
    return {
      // 图片API地址
      UPLOAD:UPLOAD,
      // 店铺图片地址
      IMG_UPLOAD:IMG_UPLOAD,
      // 当前上传图片数组
      file_list:[],
      // 图片上传以后新图片名字
      pics: [],
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
      id: "",
      checkList: [],
      flag: true,
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
      this.formLabelAlign.avatar = res.imgUrl;
    },
    pics_success(res) {
      //  this.pics=res.imageUrl;
      this.pics.push(res.imgUrl);
      // console.log(this.pi
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
    },
    modification() {  
      let newObj={...this.formLabelAlign}
     newObj.supports =JSON.stringify(this.checkList),
      newObj.date= JSON.stringify(this.formLabelAlign.date),
     newObj.pics= JSON.stringify(this.pics.concat(this.formLabelAlign.pics))
      // .concat(this.file_list)
      API_EDIT(
       newObj
       
      ).then((res)=>{   
        console.log(res);
        
      })
       this.getdata();

      
      
      
    },
    // 封装
    getdata(){
      API_INFO().then(res => {   
      this.file_list=res.data.data.pics.map(i=>{ 
        return{
          url:this.IMG_UPLOAD+i
        }
      })
        this.formLabelAlign =res.data.data
      })  
          
    }
    
      
  },
  created() {
    this.getdata()
  }
};
</script>

<style lang="less" scoped>
.Manage_box {
  .el-input {
    width: 300px;
  }
  .img{
    width: 100px;
    height:100px ;
    margin-right: 5px;
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
    width: 160px;
    height: 160px;
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
    width: 160px;
    height: 160px;
    display: block;
  }
}
</style>