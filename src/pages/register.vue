<template>
  <div class="register-page">
    <img ref="img" style="overflow: hidden" src="../assets/bg1.jpeg" alt=""/>
    <div class="g-register-wrap">
      <div class="u-title">用户注册</div>
      <el-form class="m-form" label-width="90px">
        <el-form-item label="邮箱:" required>
          <el-input v-model="email"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" required>
          <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="身份证:" required>
          <el-input v-model="idCard"></el-input>
        </el-form-item>
        <el-form-item label="密码:" required>
          <el-input type="password" v-model="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" required>
          <el-input type="password" v-model="confirmPassword"></el-input>
        </el-form-item>
        <el-form-item label="角色:" required>
          <el-select v-model="role">
            <el-option label="用户" value="0"></el-option>
            <el-option label="管理员" value="1"></el-option>
            <el-option label="狱警" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="m-button">
        <el-button type="primary" plain class="u-button" @click="register">注册</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  import StringUtils from "../utils/StringUtils";
  import axios from 'axios';

  export default {
    data() {
      return {
        email: '',
        username: '',
        idCard: '',
        password: '',
        confirmPassword: '',
        role: '0'
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
      register() {
        const pattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (StringUtils.isBlank(this.email)) {
          this.$message.error("请输入邮箱");
          return false;
        }
        if (!pattern.test(this.email)) {
          this.$message.error("邮箱格式不正确，请输入正确的邮箱");
          return false;
        }
        if (StringUtils.isBlank(this.username)) {
          this.$message.error("请输入姓名");
          return false;
        }
        if (StringUtils.isBlank(this.idCard)) {
          this.$message.error("请输入身份证");
          return false;
        }
        if (StringUtils.isBlank(this.password)) {
          this.$message.error("请输入密码");
          return false;
        }
        if (StringUtils.isBlank(this.confirmPassword)) {
          this.$message.error("请输入确认密码");
          return false;
        }
        if (this.password !== this.confirmPassword) {
          this.$message.error("您两次输入的密码不一致,请重新输入");
          return false;
        }
        axios({
          method: 'POST',
          url: '/api/register',
          'Content-Type': 'application/json',
          'X-Reply-Type': JSON,
          data: {
            id: null,
            idCard: '362528199512235021',
            mail: '1045046593@qq.com',
            name: 'yq',
            pwd: '123456'
          }
        }).then(() => {
          this.$router.replace({
            name: 'login'
          })
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .register-page {
    .g-register-wrap {
      position: fixed;
      top: 100px;
      left: 50%;
      z-index: 1;
      width: 300px;
      margin-left: -150px;
      box-shadow: 0 0 20px #ccc;
      background-color: #ACC7E6;
      .u-title {
        height: 50px;
        line-height: 50px;
        font-weight: 700;
        font-size: 20px;
        text-align: center;
        border-bottom: #ccc 1px solid;
      }
      .m-form {
        padding: 10px 10px 0;
      }
      .m-button {
        padding: 0 10px 10px;
        .u-button {
          width: 100%;
          text-align: center;
        }
      }

    }
  }


</style>
