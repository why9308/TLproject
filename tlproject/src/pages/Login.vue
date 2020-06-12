<template>
  <!-- 登陆页面 -->
  <div class="login">
    <div class="login_box">
      <h4>饿吗外卖管理系统</h4>
      <el-input placeholder="请输入用户名" v-model="acc" clearable></el-input>
      <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
      <el-button @click="clickLogin" type="primary">登陆</el-button>
    </div>
  </div>
</template>

<script>
import { API_LOGIN } from "@/api/apis";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      isflag: true
    };
  },
  methods: {
    clickLogin() {
      if (this.isflag == false) return;
      API_LOGIN(this.acc, this.pwd).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，登陆成功",
            type: "success"
          })
          sessionStorage.setItem("key",this.pwd)
          sessionStorage.setItem("key1",res.data.id)
          localStorage.token=res.data.token
          localStorage.id=res.data.id
          localStorage.acc=this.acc
          localStorage.role=res.data.role
          setTimeout(() => {
            this.$router.push("/index/home")
          }, 1500);
        } else {
        
          this.$message.error("登陆失败,账号或密码有误");
        }
      });
      setTimeout(() => {
        this.isflag = true;
      }, 3000);
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  // background: rgb(45, 58, 75);
  background:url("../assets/imgs/timg.jpg") no-repeat;
  background-size:100% 100%;
  height: 100%;
  width: 100%;
  .login_box {
    width: 320px;
    height: 260px;
    text-align: center;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: aliceblue;
    border-radius: 5px ;
    h4 {
      color: slategrey;
      margin-bottom: 20px;
    }
    div {
      margin-bottom: 20px;
    }
    button {
      width: 100%;
    }
    .el-input{
      width: 90%;
    }
    .el-button{
      width: 90%;
    }
  }
}
</style>