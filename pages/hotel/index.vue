<template>
  <div class="hotel">
    <!-- 顶部搜索栏 -->
    <HotelHead @sendHotelData="sendHotelData" />
    <SelectHotel :hotel="hotelData" @setRenderData="setRenderData" />
    <HotelRander :hoteldata="renderData" />
    <el-row type="flex" style="position: relative; height:50px">
      <el-pagination
        background
        :page-size="limit"
        :current-page="parseInt((start/limit) + 1)"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </div>
</template>

<script>
import HotelRander from '@/components/hotel/hotelRander.vue'
import HotelHead from '@/components/hotel/hotelHead.vue'
import SelectHotel from '@/components/hotel/selectHotel.vue'
export default {
  components: {
    HotelHead,
    SelectHotel,
    HotelRander
  },
  data() {
    return {
      limit: 20, // 分页请求的参数 每条
      start: 1, // 分页请求的开始数据
      total: 0,
      form: {
        city: '南京',
        date: ['2019-07-01', '2019-07-10'],
        hunman: 0
      }, // 搜索房间日期的数据，子传父
      hotelData: [], // 传给select要筛选的数据
      renderData: []
      // 接受select筛选过后的数据
    }
  },
  mounted() {
    this.getHoteldata()
  },
  methods: {
    // 该方法是子组件发射的自定义事件触发 接受slect子组件传来筛选后的数据
    setRenderData(arr) {
      this.renderData = arr
    },
    // 获取酒店数据方法
    getHoteldata() {
      // eslint-disable-next-line no-console
      // console.log(this.form)
      this.$router.push({
        path: `/hotel?city=74&enterTime=${
          this.form.date[0]
        }&leftTime=${this.form.date[1]}&_limit=${this.limit}&_start=${
          this.start
        }`
      })
      setTimeout(() => {
        this.$axios({
          url: '/hotels',
          query: this.$route.query
        }).then((res) => {
          // eslint-disable-next-line no-console
          console.log(res.data)
          this.renderData = res.data.data // 在没有筛选条件的时候，先给render组件渲染所欲内容
          this.hotelData = res.data.data // 发给select筛选的数据
          this.total = res.data.total
        })
      }, 300)
    },
    // 接受头部搜索信息
    sendHotelData(arr) {
      this.form = arr
      this.getHoteldata()
      // eslint-disable-next-line no-console
      // console.log(arr)
    },
    // 上一页
    handleCurrentChange(value) {
      this.start = this.limit * (value - 1)
      // eslint-disable-next-line no-console
      // console.log(value)
      this.getHoteldata()
    },
    // 下一页
    handleSizeChange(value) {
      this.limit = value
      this.getHoteldata()
    }
  }
}
</script>

<style lang='less' scoped>
.hotel {
  width: 1000px;
  margin: 0 auto;
  .pagination{
    position: absolute;
    right: 0;
    bottom: 0;
    margin:0 right;
  }
}

</style>
