<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>添加账号</span>
    </div>
    <div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oldPwd">
          <el-input type="text" v-model="ruleForm.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { API_OLDPWD } from "@/api/apis";
import {API_EDITPWD} from "@/api/apis";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      var oldpwd = sessionStorage.getItem("key");
      var oldid = sessionStorage.getItem("key1");
      if (this.ruleForm.oldPwd == "" || this.ruleForm.oldPwd !== oldpwd) {
        this.$message.error("原密码有误");
        return;
      }
      API_OLDPWD(oldpwd, oldid).then(res => {
        if (res.data.code == 0) {
          console.log("成功");
        }
      });
      API_EDITPWD(this.ruleForm.pass,oldid).then(res=>{
        if(res.data.code == 0){
          this.$message({
            message: "修改密码成功，请重新登陆",
            type: "success"
          })
          setTimeout(()=>{
            sessionStorage.removeItem("key")
            sessionStorage.removeItem("key1")
              location.hash="/"
          },1500)
        }
      })

    }
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
  .el-input {
    width: 300px;
  }
}
</style>