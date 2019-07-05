<template>
  <div style="padding:25px">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      class="demo-ruleForm"
    >
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="手机号码" />
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="ruleForm.captcha" placeholder="验证码" style="width:180px" />
        <template slot-scope="">
          <el-button v-if="show" @click="handleCaptcha">
            发送验证码
          </el-button>
          <el-button v-else disabled>
            <span>{{ "请" + time +"秒后再次输入" }}</span>
          </el-button>
        </template>
      </el-form-item>

      <el-form-item prop="nickname">
        <el-input v-model="ruleForm.nickname" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="密码" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width:100%" @click="handleRegister">
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {

  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        captcha: '',
        nickname: '',
        password: '',
        checkPass: ''
      },
      rules: {
        username: [
          { required: true, pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      time: 60,
      show: true
    }
  },
  methods: {
    // 发送验证码
    handleCaptcha() {
      if (!this.ruleForm.username) {
        this.$message.warning('手机号码不能为空')
        return
      }
      this.show = false
      const timeId = setInterval(() => {
        this.time--
        if (this.time === 0) {
          this.show = true
          clearInterval(timeId)
          this.time = 60
        }
      }, 1000)
      this.$store.dispatch('user/catchamake', this.ruleForm.username).then((res) => {
        // eslint-disable-next-line no-console
        console.log(res)
      })
      this.$axios({
        url: '/captchas',
        method: 'post',
        data: {
          tel: this.ruleForm.username
        }
      }).then((res) => {
        this.$message.success('模拟手机验证码为000000')
      })
    },

    // 注册
    handleRegister() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const { checkPass, ...prop } = this.ruleForm
          this.$store.dispatch('user/register', prop).then((res) => {
            this.$message.success('注册成功,两秒后跳转首页')
            this.ruleForm = {}
            const timeId = setInterval(() => {
              this.$router.push('/')
              clearInterval(timeId)
            }, 2000)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
