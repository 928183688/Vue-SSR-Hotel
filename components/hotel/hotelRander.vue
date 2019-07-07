<template>
  <div class="contain">
    <nuxt-link
      v-for="(item, index) in hoteldata"
      :key="index"
      v-loading="loading"
      class="main"
      :to="`/hotel/${item.id}.html`"
      element-loading-text="等我装逼完毕"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-row>
        <el-col :span="9">
          <img :src="item.photos" alt>
        </el-col>
        <el-col :span="9" style="margin-top:5px;">
          <h2>{{ item.name }}</h2>
          <div>
            {{ item.alias }}
            <span
              v-if="item.hoteltype.name"
              class="iconfont el-icon-star-off"
              style="color:orange"
            />
            <span v-if="item.hoteltype.name" class="iconfont el-icon-star-off" style="color:orange" />
            <span v-if="item.hoteltype.name" class="iconfont el-icon-star-off" style="color:orange" />
            {{ item.hoteltype.name }}
          </div>

          <el-row type="flex" justify="space-between" align="middle" style="margin-top:15px">
            <el-rate
              v-model="item.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            />
            <div>11条评论</div>
            <div>41篇游记</div>
          </el-row>
          <p style="margin-top:20px">
            {{ item.address }}
          </p>
        </el-col>
        <el-col :span="6" style="margin-top:25px;padding-left:70px;box-sizing:border-box">
          <el-row v-for="(second, index) in item.products" :key="index">
            <nuxt-link to="/" class="link">
              <span>{{ second.name }}</span>
              <div>
                <span style="color:orange">￥{{ second.price }}</span>
                <span class="iconfont el-icon-arrow-right" />
              </div>
            </nuxt-link>
          </el-row>
        </el-col>
      </el-row>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: {
    hoteldata: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 3000)
  },
  methods: {
    // jumpRoute(){
    //   this.$router.push("/hotels")
    // }
  }
}
</script>
<style lang="less" scoped>
.contain {
  margin-top: 20px;
  .main {
    display: block;
    margin-top: 60px;
  }
  .link {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    height: 50px;
    box-sizing: border-box;
    border-bottom: 1px solid #dddddd;
    line-height: 50px;
  }
}
img {
  width: 320px;
  height: 210px;
}
</style>
