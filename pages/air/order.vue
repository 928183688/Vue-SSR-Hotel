<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <OrderForm :data="infoData" @setAllPrice="setAllPrice" />

      <!-- 侧边栏 -->
      <OrderAside :data="infoData" :all-price="allPrice" />
    </el-row>
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm.vue'
import OrderAside from '@/components/air/orderAside.vue'
export default {
  components: {
    OrderForm,
    OrderAside
  },
  data() {
    return {
      infoData: {
        insurances: [], // 初始化保险数据
        seat_infos: {}
      },
      // 计算金额
      allPrice: 0
    }
  },
  mounted() {
    this.$axios({
      url: `/airs/${this.$route.query.id}`,
      params: {
        seat_xid: this.$route.query.seat_xid
      }
    }).then((res) => {
      this.infoData = res.data
    })
  },
  methods: {
    setAllPrice(pic) {
      this.allPrice = pic
    }
  }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }

    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>
