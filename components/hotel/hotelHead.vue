<template>
  <el-col class="hotel_head">
    <!-- 面包屑 -->
    <div class="hotel_mbx">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 顶部搜索栏 -->
    <el-form
      ref="ruleForm"
      :model="form"
      label-width="100px"
      style="margin-bottom:20px"
      class="demo-ruleForm"
    >
      <!-- 搜索框 -->
      <el-autocomplete
        v-model="form.city"
        :fetch-suggestions="querySearchAsync"
        placeholder="目的地"
        @select="handleSelect"
      />

      <!-- 日期狂 -->
      <el-date-picker
        v-model="form.date"
        type="daterange"
        range-separator="-"
        start-placeholder="入住日期"
        end-placeholder="离店日期"
        value-format="yyyy-MM-dd"
      />

      <!-- 儿童人数框 -->

      <el-popover placement="bottom" width="200" trigger="click" :visible-arrow="false">
        <el-input
          slot="reference"
          v-model="form.hunman"
          placeholder="人数未定"
          style="width:220px"
          suffix-icon="el-icon-user"
        />
        <el-select
          v-model="adultValue"
          size="mini"
          style="width:100px;float:left"
          @change="handleSelect"
        >
          <el-option
            v-for="item in adultOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-select
          v-model="childValue"
          size="mini"
          style="width:100px;float:left"
          @change="handleChildSelect"
        >
          <el-option
            v-for="child in childOptions"
            :key="child.value"
            :label="child.label"
            :value="child.value"
          />
        </el-select>
        <el-button type="primary" size="mini" style="margin-top:20px;float:right">
          确定
        </el-button>
      </el-popover>
      <el-button type="primary" @click="handleSubmitAC">
        查看价格
      </el-button>
    </el-form>
    <!-- 中间区域 -->
    <el-row type="flex">
      <el-col :span="12">
        <!-- 左边是区域块 -->
        <div class="hotel_left">
          <el-row type="flex">
            <div style="width:30px">
              区域:
            </div>
            <span class="area">
              <span v-for="(item,index) in areaInfo" :key="index" class="area-i">
                <nuxt-link to="#">{{ item.name }}</nuxt-link>
              </span>
            </span>
          </el-row>
        </div>
        <div class="hotel_left">
          <el-row type="flex">
            <div style="width:30px">
              攻略:
            </div>
            <span class="area">
              <span class="area-i">
                <nuxt-link
                  to="#"
                >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</nuxt-link>
              </span>
            </span>
          </el-row>
        </div>
        <div class="hotel_left">
          <el-row type="flex">
            <div style="width:30px">
              区域:
            </div>
            <span class="area">
              <span class="area-i">
                <span class="iconfont el-icon-star-off" />
                <span class="iconfont el-icon-star-off" />
                <span class="iconfont el-icon-star-off" />
                <i style="padding-left:3px">$332</i>
                <span class="iconfont el-icon-star-off" />
                <span class="iconfont el-icon-star-off" />
                <span class="iconfont el-icon-star-off" />
                <i style="padding-left:3px">$782</i>
                <span class="iconfont el-icon-star-off" />
                <span class="iconfont el-icon-star-off" />
                <span class="iconfont el-icon-star-off" />
                <i>$1278</i>
              </span>
            </span>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <Map />
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import Map from '@/components/hotel/map.vue'
export default {
  components: {
    Map
  },
  data() {
    return {
      // 区域信息
      areaInfo: [],
      // 表单信息
      form: {
        // 搜索框
        city: '南京',
        date: [],
        hunman: null
      },
      // 成人
      adultOptions: [
        {
          value: '1成人',
          label: '1'
        },
        {
          value: '2成人',
          label: '2'
        },
        {
          value: '3成人',
          label: '3'
        },
        {
          value: '4成人',
          label: '4'
        },
        {
          value: '5成人',
          label: '5'
        }
      ],
      // 儿童
      childOptions: [
        {
          value: '1儿童',
          label: '1'
        },
        {
          value: '2儿童',
          label: '2'
        },
        {
          value: '3儿童',
          label: '3'
        },
        {
          value: '4儿童',
          label: '4'
        },
        {
          value: '5儿童',
          label: '5'
        }
      ],
      adultValue: '成人',
      childValue: '儿童'
    }
  },
  mounted() {
    this.$axios({
      url: '/cities',
      params: {
        name: this.form.city
      }
    }).then((res) => {
      // eslint-disable-next-line no-console
      this.areaInfo = res.data.data[0].scenics
      // eslint-disable-next-line no-console
      console.log(res.data.data[0])
    })
  },
  methods: {
    // 搜索城市
    querySearchAsync(value, cb) {
      if (!value) return
      this.$axios({
        url: `/cities?name=` + value
      }).then((res) => {
        // eslint-disable-next-line no-console
        console.log(res)
        const { data } = res.data
        const newData = data.map((v) => {
          return {
            ...v,
            value: v.name.replace('市', '')
          }
        })
        this.form.search = newData[0].value
        cb(newData)

        // // 区域信息
        // this.areaInfo = res.data.data
        // // eslint-disable-next-line no-console
        // console.log(this.areaInfo)
      })
    },
    // 成人
    handleSelect(value) {
      this.adultValue = value
    },
    // 儿童
    handleChildSelect(value) {
      this.childValue = value
    },
    // 提交
    handleSubmitAC() {
      const AdultandChild = this.adultValue + this.childValue
      this.form.hunman = AdultandChild
      this.$emit('sendHotelData', this.form)
    }
  }
}
</script>

<style lang='less' scoped>
.hotel_head{
  margin-bottom: 30px;
}
.hotel_mbx {
  margin: 20px 0px;
}
.hotel_left {
  // width: 590px;
  font-size: 13px;
  word-spacing: 5px;
  justify-content: space-between;
  margin-top: 20px;
}
.area {
  margin-left: 50px;
  width: 400px;
  white-space: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 70px;
  .area-i {
    display: inline-block;
    padding-left: 1em;
  }
}
</style>
