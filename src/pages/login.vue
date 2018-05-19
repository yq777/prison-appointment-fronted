<template>
  <div class="login-page">
    <img ref="img" style="overflow: hidden" src="../assets/bg1.jpeg" alt=""/>
    <div class="login-page-form">
      <div class="login-page-form-head">用户登录</div>
      <el-form label-width="80px">
        <el-form-item label="邮箱" required="required">
          <el-input v-model="email"></el-input>
        </el-form-item>
        <el-form-item label="密码" required="required">
          <el-input type="password" v-model="password"></el-input>
        </el-form-item>
        <el-form-item label="角色" required="required">
          <el-select v-model="role" placeholder="请选择">
            <el-option value="0" label="用户"></el-option>
            <el-option value="1" label="管理员"></el-option>
            <el-option value="2" label="狱警"></el-option>
          </el-select>

        </el-form-item>
      </el-form>
      <el-button @click="login" type="primary" class="login-page-form-button" plain>登录</el-button>
    </div>

  </div>

</template>
<script>
  import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue";
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
  import StringUtils from "../utils/StringUtils";

  export default {
    components: {
      ElInput,
      ElFormItem,
      ElForm
    },
    data() {
      return {
        email: "",
        password: "",
        role: "0"
      }
    },
    created() {
    },
    mounted() {
      let w = window.innerWidth;
      let h = window.innerHeight;
      console.log(this.$refs.img);
      this.$refs.img.width = w;
      this.$refs.img.height = h;
    },
    methods: {
      login() {
        if (StringUtils.isBlank(this.email)) {
          this.$message.error("请输入邮箱");
          return false;
        }
        const pattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!pattern.test(this.email)) {
          this.$message.error("邮箱格式不正确，请输入正确的邮箱");
          return false;
        }
        if (StringUtils.isBlank(this.password)) {
          this.$message.error("请输入密码");
          return false;
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .login-page {
    .login-page-form {
      position: fixed;
      top: 100px;
      left: 50%;
      z-index: 1;
      width: 300px;
      margin-left: -150px;
      background-color: #ACC7E6;
      box-shadow: 0 0 20px #ccc;
      padding: 10px;
      .login-page-form-head {
        font-size: 20px;
        font-weight: bolder;
        text-align: center;
        height: 40px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
        line-height: 40px;
      }
      .login-page-form-button {
        width: 300px;
        font-size: 14px;
      }
    }
  }


</style>
