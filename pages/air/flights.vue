<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFliter
          :data="cacheFlightsData"
          @setDataList="setDataList"
        />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsInfo
          v-for="(item,index) in dataList"
          :key="index"
          :data="item"
        />

        <!-- 分页 -->
        <el-row type="flex" justify="center" style="margin-top:10px;">
          <!-- size-change：切换条数时候触发 -->
          <!-- current-change：选择页数时候触发 -->
          <!-- current-page: 当前页数 -->
          <!-- page-size：当前条数 -->
          <!-- total：总条数 -->
          <el-pagination
            :current-page="pageIndex"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="flightsData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>

// import moment from 'moment'
import FlightsListHead from '@/components/air/flightsListHead.vue'
import FlightsInfo from '@/components/air/flightsInfo.vue'
import FlightsFliter from '@/components/air/flightsFliter.vue'
import FlightsAside from '@/components/air/flightsAside.vue'
export default {
  components: {
    FlightsListHead,
    FlightsInfo,
    FlightsFliter,
    FlightsAside
  },
  data() {
    return {
      // 机票总数据
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      // 拷贝一份总数居
      cacheFlightsData: {
        flights: [],
        info: {},
        options: {}
      },
      // 机票列表数据
      dataList: [],
      pageSize: 10,
      pageIndex: 1

    }
  },
  // 监听url得变化
  watch: {
    $route() {
      this.getdata()
    }
  },
  // 先调接口
  mounted() {
    this.getdata()
  },
  methods: {
    // 设置DataList数据
    setDataList(arr) {
      // 点击过滤后 要改变页数 改变数组 改变数组的长度
      if (arr) {
        this.pageIndex = 1
        this.flightsData.flights = arr
        this.flightsData.total = arr.length
      }
      // 分页器的算法 ((1 - 1) * 5, 5)    (0,5) (1,5)(2,5)
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )
    },
    // 切换页数触发
    handleCurrentChange(value) {
      // 这是切换页数的按钮 每次切换一次
      this.pageIndex = value
      this.setDataList()
    },
    // 切换条数触发
    handleSizeChange(value) {
      // 这是选择页面可以分配多少条数据的功能 所以是 this.pageSize = value 因为pageSize是每页多少条数据
      this.pageSize = value
      this.setDataList()
    },
    getdata() {
      this.$axios({
        url: 'airs',
        params: this.$route.query
      }).then((res) => {
      // eslint-disable-next-line no-console
        console.log(res)
        // 总数据
        this.flightsData = res.data
        // 机票列表数据
        this.dataList = this.flightsData.flights
        // 无法改变原来的值 需要拷贝多一份总数据
        this.cacheFlightsData = { ...res.data }
        // 分页
        this.setDataList()
      })
    }
  }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    }
</style>
