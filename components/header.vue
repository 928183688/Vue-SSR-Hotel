<template>
  <header class="header">
    <div class="main">
      <el-row type="flex" justify="space-between" style="height:60px">
        <!-- logo -->
        <div class="logo">
          <nuxt-link to="/">
            <img src="@/assets/images/111.jpg" alt>
          </nuxt-link>
        </div>
        <!-- 导航条 -->
        <el-row type="flex" class="nav">
          <nuxt-link to="/">
            首页
          </nuxt-link>
          <nuxt-link to="/post">
            旅游攻略
          </nuxt-link>
          <nuxt-link to="/hotel">
            酒店
          </nuxt-link>
          <nuxt-link to="/air">
            国内机票
          </nuxt-link>
        </el-row>

        <el-dropdown v-if="$store.state.user.userInfo.token">
          <span class="el-dropdown-link">
            <img :src="$axios.defaults.baseURL +$store.state.user.userInfo.user.defaultAvatar">
            <span>{{ $store.state.user.userInfo.user.nickname }}</span>
            <i class="el-icon-caret-bottom el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <nuxt-link to="#">
                个人中心
              </nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="editLogin">
                退出
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 登录中心 -->
        <nuxt-link v-else to="/user/login">
          登录/注册
        </nuxt-link>
      </el-row>
    </div>
  </header>
</template>
<script>
export default {
  methods: {
    editLogin() {
      // 退出 清空
      this.$store.commit('user/clearUserInfo')
      // 提示
      this.$message.success('退出成功')
    }
  }
}
</script>
<style scoped lang="less">
header {
  height: 60px;
  margin: 0 auto;
  line-height: 60px;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 3px 0 #f5f5f5;
  box-sizing: border-box;
   .main {
     width: 1000px;
     height: 60px;
     margin:0 auto
   }

.logo {
  padding-top: 8px;
  img {
    width: 152px;
    height: 42px;
  }
}
.nav {
  flex: 1;
  margin: 0 20px;

  a {
    padding: 0 20px;
    &:hover,
    &:focus,
    &:active {
      border-bottom: 5px #409eff solid;
      color: #409eff;
    }
  }
  .nuxt-link-exact-active {
    background: #409eff;
    color: #fff !important;
  }
}

.el-dropdown-link {
  img {
    width: 36px;
    height: 36px;
    vertical-align: middle;
    border-radius: 100px;
  }
}
}
</style>
