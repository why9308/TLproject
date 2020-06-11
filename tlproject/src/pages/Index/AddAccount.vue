<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>添加账号</span>
    </div>
    <div>
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="ruleForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass"></el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择用户组">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { API_ADDACC,} from "@/api/apis";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pass: "",
        region: ""
      },
      options: [
        {
          value: "选项1",
          label: "超级管理员"
        },
        {
          value: "选项2",
          label: "普通管理员"
        }
      ]
    };
  },
  methods: {
    submitForm() {
        if(this.ruleForm.pass==""||this.ruleForm.name==""||this.ruleForm.region=="")return
       API_ADDACC(this.ruleForm.name,this.ruleForm.pass,this.ruleForm.region).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，添加成功",
            type: "success"
          });
          this.ruleForm.name="",
          this.ruleForm.pass="",
          this.ruleForm.region=""


        }
      });
      
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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