<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>管理员信息</span>
      </div>
      <ul>
        <li>管理员ID：{{message.id}}</li>
        <li>账号：{{message.account}}</li>
        <li>用户组：{{message.userGroup}}</li>
        <li>创建时间：{{message.ctime}}</li>
      </ul>
      <div>
        <div class="my_box">
          管理员头像：
          <el-upload
            class="avatar-uploader"
            :action="IMG_MYCENTER"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="data"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { API_ACCOUNTINFO } from "@/api/apis";
import {IMG_MYCENTER}from "@/api/apisss"
export default {
  data() {
    return {
      data: {id:localStorage.id},
      IMG_MYCENTER:IMG_MYCENTER,
      message: {
        id: "",
        ctime: "",
        account: "",
        userGroup: "",
      },
      imageUrl: '',
      dialogImageUrl: "",
      dialogVisible: false,
       
    };
  },
  methods: {
    handleAvatarSuccess() {
      window.location.reload()
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
  created() {
    var id = sessionStorage.getItem("key1");
    API_ACCOUNTINFO(id).then(res => {
      this.message.id = res.data.accountInfo.id;
      this.message.ctime = res.data.accountInfo.ctime;
      this.message.account = res.data.accountInfo.account;
      this.message.userGroup = res.data.accountInfo.userGroup;
      this.message.imgUrl = res.data.accountInfo.imgUrl;
    });   
  }
};
</script>

<style lang="less" scoped>
.box-card {
  .el-card__body {
    padding-top: 0px;
  }
  ul {
    list-style: none;
    padding-left: 0px;
    margin-top: 0px;
    li {
      margin-bottom: 10px;
      border-bottom: 1px solid #edeff3;
      padding-bottom: 10px;
    }
  }
  .my_box {
    display: flex;
    line-height: 70px;
    img {
      width: 100px;
    }
  }
}
.avatar-uploader,.el-upload {
  border: 1px dashed #d9d9d9 ;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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

</style>