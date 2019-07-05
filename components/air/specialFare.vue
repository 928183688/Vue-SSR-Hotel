<template>
  <div class="specia">
    <el-row type="flex" justify="space-between">
      <el-col
        v-for="(item,index) in sales"
        :key="index"
        :span="6"
        class="speical_img"
      >
        <nuxt-link
          :to="`/air/flights?
      departCity=${item.departCity}&
      departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`"
        >
          <img :src="item.cover" alt="">
          <el-row class="layer-bar" type="flex" justify="space-between">
            <span>{{ item.departCity }}-{{ item.destCity }}</span>
            <span>￥{{ item.price }}</span>
          </el-row>
        </nuxt-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sales: []
    }
  },
  mounted() {
    // 图片数据
    this.$axios({
      url: 'airs/sale'
    }).then((res) => {
      this.sales = res.data.data
    })
  }
}
</script>

<style lang='less' scoped>
    .specia{
        width: 1000px;
        height: 200px;
        border: 1px solid #eee;
        padding: 20px;
        margin-bottom: 20px;
         .speical_img{
             width: 240px;
             height: 181px;
             overflow: hidden;
             position: relative;

     .layer-bar{
      position:absolute;
        bottom:0;
        left:0;
        background: rgba(0,0,0,0.5);
        color:#fff;
        height:30px;
        line-height: 30px;
        width:100%;
        box-sizing: border-box;
        padding: 0 15px;
        font-size: 14px;
        }
         }
        img{
            width: 100%;
        }

    }
</style>
