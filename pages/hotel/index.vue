<template>
  <div class="hotel">
    <!-- 顶部搜索栏 -->
    <HotelHead />
  </div>
</template>

<script>
import HotelHead from '@/components/hotel/hotelHead.vue'
export default {
  components: {
    HotelHead
  },
  data() {
    return {

    }
  }
}
</script>

<style lang='less' scoped>
    .hotel{
      width: 1000px;
      margin: 0 auto;
    }
</style>
