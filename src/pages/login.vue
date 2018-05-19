<template>
<div class="login-page">
  <div class="login-page-form">
    <div class="login-page-form-head">用户登录</div>
    <el-form label-width="80px">
      <el-form-item label="邮箱" required="required">
        <el-input v-model="email"></el-input>
      </el-form-item>
      <el-form-item label="密码" required="required">
        <el-input v-model="password"></el-input>
      </el-form-item>
      <el-form-item label="角色" required="required">
        <el-select v-model="role" placeholder="请选择">
          <el-option value="0" label="用户"></el-option>
          <el-option value="1" label="管理员"></el-option>
          <el-option value="2" label="狱警"></el-option>
        </el-select>

      </el-form-item>
    </el-form>
    <el-button type="primary" class="login-page-form-button" plain>登录</el-button>
  </div>

</div>

</template>
<script>
    import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue";
    import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";
    import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";

    export default {
      components: {
        ElInput,
        ElFormItem,
        ElForm},
      data() {
            return {
              email:"",
              password:"",
              role:"0"
            }
        },
        created() {
        },
        methods: {}
    }
</script>
<style lang="less" scoped>
  .login-page{
    margin-top: 200px;
    .login-page-form{
      width: 300px;
      margin: auto;
      box-shadow: 0 0 20px #ccc;
      padding: 10px;
      .login-page-form-head{
        font-size: 20px;
        font-weight: bolder;
        text-align: center;
        height: 40px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
        line-height: 40px;
      }
      .login-page-form-button{
        width: 300px;
        font-size: 14px;
      }
    }
  }


</style>
