<template>
  <div class="container">
    <div class="main">
      <!-- 表单顶部 -->
      <el-row type="flex" class="tabs">
        <span
          v-for="(item,index) in ['登录','注册']"
          :key="index"
          :class="{active:currentIndex === index}"
          @click="handleChangeActive(index)"
        >
          {{ item }}
        </span>
      </el-row>
      <!-- 登录组件 -->
      <Loginform v-if="currentIndex === 0" />
      <!-- 注册组件 -->
      <Registerform v-if="currentIndex === 1" />
    </div>
  </div>
</template>

<script>
import Loginform from '@/components/user/loginForm.vue'
import Registerform from '@/components/user/registerForm.vue'
export default {
  components: {
    Loginform,
    Registerform
  },
  data() {
    return {
      // 自定义索引
      currentIndex: 0
    }
  },
  methods: {
    handleChangeActive(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped lang="less">
.container {
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  height: 700px;
  min-width: 1000px;
    .main{
      position: absolute;
      width: 400px;
      top: 55%;
      left: 50%;
      transform: translate(-50%,-50%);
       background:#fff;
      line-height: 50px;
      overflow: hidden;
      .tabs {
        span {
          background:#eee;
          display: block;
          width: 50%;
          height: 50px;
          text-align: center;
          font-size: 16px;
          cursor: pointer;
          color:#666;
          box-sizing: border-box;
          border-top: 2px solid #eee;

          &.active {
            color: orange;
            border-top-color: orange;
            background:#fff;
            font-weight: bold;
          }
        }
      }
    }
}
</style>
