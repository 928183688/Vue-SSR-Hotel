<template>
  <div class="contain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hotel?city=74' }">
        酒店
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/hotel?city=74' }">
        南京酒店
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ hotel.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin:30px 0;">
      <h3 style="display:inline-block">
        {{ hotel.name }}
      </h3>
      <span style="color:orange;">
        <span class="iconfont el-icon-star-off" />
        <span class="iconfont el-icon-star-off" />
        <span class="iconfont el-icon-star-off" />
        <span class="iconfont el-icon-star-off" />
        <span class="iconfont el-icon-star-off" />
      </span>
      <p>{{ hotel.alias }}</p>
      <span class="iconfont el-icon-position" style="color:red" />
      <span>{{ hotel.area }}</span>
    </el-row>
    <el-row>
      <el-col :span="16">
        <img
          :src="`http://157.122.54.189:9093/images/hotel-pics/${img}.jpeg`"
          alt
          style="height: 360px;"
        >
      </el-col>
      <el-col :span="8" class="minimg">
        <img
          v-for="(item, index) in num"
          :key="index"
          :src="`http://157.122.54.189:9093/images/hotel-pics/${item}.jpeg`"
          alt
          @click="changeimg(item)"
        >
      </el-col>
    </el-row>

    <el-row>
      <el-table :data="tableData" style="width: 100%" align="center">
        <el-table-column prop="name" label="价格来源" align="center" />
        <el-table-column prop="bestType" label="姓名" align="center" />
        <el-table-column label="最低价格/每晚" align="center">
          <template slot-scope="scope">
            <span style="color:orange">{{ scope.row.price }}</span>
            起
            <span class="el-icon-arrow-right" style="color:orange" />
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="margin-top:20px">
      <Map />
    </el-row>
    <div>
      <el-row style="height:70px;line-height:70px;border-bottom:1px solid #ddd">
        <el-col :span="4">
          基本信息
        </el-col>
        <el-col :span="5">
          入住时间: 14:00之后
        </el-col>
        <el-col :span="5">
          离店时间: 12:00之前
        </el-col>
        <el-col :span="5">
          酒店规模: 69间客房
        </el-col>
        <el-col :span="5">
          null / null
        </el-col>
      </el-row>
      <el-row style="height:70px;line-height:70px;border-bottom:1px solid #ddd">
        <el-col :span="4">
          主要设施
        </el-col>
        <el-col :span="20">
          <el-tag
            v-for="(item, index) in hotel.hotelassets"
            :key="index"
            type="danger"
            style="margin-left:10px;"
          >
            {{ item.name }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row style="height:70px;line-height:70px;border-bottom:1px solid #ddd">
        <el-col :span="4">
          停车服务
        </el-col>
        <el-col :span="20">
          -
        </el-col>
      </el-row>
      <el-row style="height:70px;line-height:70px;border-bottom:1px solid #ddd">
        <el-col :span="4">
          停车服务
        </el-col>
        <el-col :span="20">
          -
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Map from '@/components/hotel/map.vue'
export default {
  components: {
    Map
  },
  data() {
    return {
      hotel: {},
      num: [1, 2, 3, 4, 5, 6],
      img: 1,
      tableData: [],
      discuss: {}
    }
  },
  mounted() {
    this.getHotelData()
    this.$axios({
      url: '/hotels/comments',
      params: {
        id: this.$route.params.id
      }
    }).then((res) => {
      // eslint-disable-next-line no-console
      console.log(res)
    })
  },
  methods: {
    getHotelData() {
      this.$axios({
        url: '/hotels',
        params: {
          id: this.$route.params.id
        }
      }).then((res) => {
        // eslint-disable-next-line no-console
        console.log(res)
        this.hotel = res.data.data[0]
        this.tableData = res.data.data[0].products
      })
    },
    changeimg(item) {
      this.img = item
    }
  }
}
</script>
<style lang="less" scoped>
.contain {
  width: 1000px;
  margin: 20px auto;
  overflow: hidden;
  img {
    width: 95%;
  }
  .minimg {
    height: 360px;
    overflow: hidden;
    img {
      width: 50% !important;
      padding-bottom: 9px;
      padding-left: 5px;
      box-sizing: border-box;
    }
  }
}
</style>
