<template>
  <div class="post">
    <div class="post_title">
      <!-- 热门城市 -->
      <HotCity />
      <!-- 推荐城市 -->
      <div>222</div>
    </div>
    <div class="post_goodlist">
      <!-- 搜索框 -->
      <div>搜索</div>
      <div>推荐:广州上海北京</div>
      <!-- 推荐攻略 -->
      <div>推荐攻略</div>
    </div>
  </div>
</template>

<script>
import HotCity from '@/components/post/hotCity.vue'
export default {
  components: {
    HotCity
  },
  data() {
    return {

    }
  }
}
</script>

<style lang='less' scoped>
    .post {
      width: 1000px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

    }
        .post_title{
            width: 260px;
          }
          .post_goodlist{
            width: 700px;
            background: green;
          }

</style>
