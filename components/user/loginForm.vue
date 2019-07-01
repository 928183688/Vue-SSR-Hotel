/* eslint-disable no-console */
<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    class="form"
  >
    <!-- 账号 -->
    <el-form-item class="form-item" prop="username">
      <el-input
        v-model="form.username"
        placeholder="用户名/手机"
      />
    </el-form-item>

    <!-- 密码 -->
    <el-form-item class="form-item" prop="password">
      <el-input
        v-model="form.password"
        placeholder="密码"
        type="password"
      />
    </el-form-item>

    <!-- 忘记密码 -->
    <p class="form-text">
      <nuxt-link to="#">
        忘记密码
      </nuxt-link>
    </p>
    <!-- 登录提交 -->
    <el-button
      class="submit"
      type="primary"
      @click="handleLoginSubmit"
    >
      登录
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: '', // 登录用户名/手机
        password: '' // 登录密码
      },
      // 表单规则
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 用action异步
          this.$store.dispatch('user/login', this.form).then((res) => {
            this.form = {}
            this.$message.success('欢迎你！' + res.data.user.nickname)
            const timeId = setInterval(() => {
              this.$router.push('/')
              clearInterval(timeId)
            }, 2000)
          })

          // 不用action异步
          // this.$axios({
          //   url: 'wwww',
          //   method: 'post',
          //   data: this.form
          // }).then((res) => {
          //   this.$store.commit('user/login', res.data)
          //   this.form = {}
          //   this.$router.push('/')
          //   this.$message.success('登录成功')
          // })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>
