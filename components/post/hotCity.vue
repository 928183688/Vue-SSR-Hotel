<template>
  <div class="hot_city">
    <div
      v-for="(item,index)
        in hotCity"
      :key="index"
      class="hot_title"
      @click="focusChange"
    >
      <span>{{ item.type }}</span>
      <span class="hot_list" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotCity: [],
      currentIndex: 0,
      show: false
    }
  },
  mounted() {
    this.$axios({
      url: 'posts/cities'
    }).then((res) => {
      // eslint-disable-next-line no-console
      console.log(res)
      const { data } = res.data
      this.hotCity = data
    })
  },
  methods: {
    focusChange() {
      this.show = !this.show
    }
  }
}
</script>

<style lang='less' scoped>
.hot_city {
  width: 260px;
  border: 1px solid #ddd;
  border-right: none;
  border-bottom: none;
  box-shadow: 0 0 1px #f5f5f5;
  z-index: 2;

  .hot_title {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    padding: 0 20px;
    font-size: 14px;
    position: relative;
    z-index: 2;

     .hot_list {
    display: block;
    width: 10px;
    height: 10px;
    border-right: 1px solid #999;
    border-top: 1px solid #999;
    transform: rotate(45deg);
    position: absolute;
    right: 20px;
    top: 15px;

  }

    &:hover{
        color: orange
    }

  }

}
</style>
