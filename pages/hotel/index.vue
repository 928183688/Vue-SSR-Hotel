<template>
  <div class="hotel">
    <!-- 顶部搜索栏 -->
    <HotelHead />
    <SelectHotel />
  </div>
</template>

<script>
import HotelHead from '@/components/hotel/hotelHead.vue'
import SelectHotel from '@/components/hotel/selectHotel.vue'
export default {
  components: {
    HotelHead,
    SelectHotel
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
