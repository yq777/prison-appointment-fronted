<template>
  <div class="register-page">
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
          <el-input v-model="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" required>
          <el-input v-model="confirmPassword"></el-input>
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
    methods: {
      register() {
        const pattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!pattern.test(this.email)) {
          this.$message.error("邮箱格式不正确，请输入正确的邮箱");
          return false;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .g-register-wrap {
    width: 300px;
    margin: 100px auto;
    box-shadow: 0 0 20px #ccc;
    background-color: #eee;
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
</style>
