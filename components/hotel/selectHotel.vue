<template>
  <div class="contain">
    <el-row class="select" type="flex" justify="space-around">
      <el-col :span="6" class="space">
        <el-row :span="24" type="flex" justify="space-between">
          <span>价格</span>
          <span>{{ slideNum }}</span>
        </el-row>
        <el-row :span="24">
          <el-slider v-model="searchData.slideValue" :max="max" @change="slideShow" />
        </el-row>
      </el-col>
      <el-col :span="4" class="space">
        <el-row :span="24">
          住宿等级
        </el-row>
        <el-row :span="24">
          <el-select
            v-model="searchData.hotelLevels"
            :multiple="true"
            collapse-tags
            placeholder="不限"
            style="border:none;"
            size="mini"
            :clearable="true"
          >
            <el-option
              v-for="item in hotelData.levels"
              :key="item.id"
              :label="item.name"
              :value="item.level"
            />
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="4" class="space">
        <el-row :span="24">
          住宿类型
        </el-row>
        <el-row :span="24">
          <el-select
            v-model="searchData.hotelTypes"
            :multiple="true"
            collapse-tags
            placeholder="不限"
            style="border: 0; background: transparent; outline: none;"
            size="mini"
            :clearable="true"
          >
            <el-option
              v-for="item in hotelData.types"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="4" class="space">
        <el-row :span="24">
          酒店设施
        </el-row>
        <el-row :span="24">
          <el-select
            v-model="searchData.hotelAssets"
            :multiple="true"
            collapse-tags
            placeholder="不限"
            style="border:none;"
            size="mini"
            :clearable="true"
          >
            <el-option
              v-for="item in hotelData.assets"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="4" class="space">
        <el-row :span="24">
          酒店品牌
        </el-row>
        <el-row :span="24">
          <el-select
            v-model="searchData.hotelBrands"
            :multiple="true"
            collapse-tags
            placeholder="不限"
            style="border:none;"
            size="mini"
            :clearable="true"
          >
            <el-option
              v-for="item in hotelData.brands"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    hotel: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  data() {
    return {
      searchData: {
        hotelLevels: [],
        hotelAssets: [],
        hotelBrands: [],
        hotelTypes: [],
        slideValue: 0
      },
      hotelData: [],
      max: 4000,
      slideNum: 0
    }
  },
  watch: {
    searchData: {
      handler(val, oldVal) {
        this.filterData(val)
      },
      deep: true // 深度监听所有下拉框的属性，一旦有任何一个属性改变，就会立刻触发
      // 并且将改变的整个对象传入过滤事件
    }
  },
  created: function () {
    // 初始化修改值
    this.$watch('searchData', this.filterData)
  },
  mounted() {
    this.getHotel() // 一开始就先加载筛选添加的数据
  },
  methods: {
    slideShow(value) {
      this.slideNum = value // 滑竿右侧的数值。用于显示同步
    },
    // 条件过滤的方法
    filterData(val) {
      let arr = this.hotel
      if (val.slideValue !== 0) {
        arr = arr.filter((v) => {
          return v.price <= val.slideValue // 过滤当前金额小于筛选则通过
        })
      }
      if (val.hotelLevels.length !== 0) {
        arr = arr.filter((v) => {
          return val.hotelLevels.indexOf(v.stars) !== -1 || v.stars <= Math.max(...val.hotelLevels)
          // 如果当前条件的数组内能查到过滤数据的索引则表示当前酒店通过
          // 因为星级有3.5星的，而过滤选项都是整数，所以，如果当前被过滤酒店的星级小于过滤条件数组内最大的星级，也符合
        })
      }
      if (val.hotelTypes.length !== 0) {
        arr = arr.filter((v) => {
          return val.hotelTypes.indexOf(v.hoteltype.name) !== -1
        })
      }
      if (val.hotelAssets.length !== 0) {
        arr = arr.filter((v) => {
          // v.hotelassets.type一家酒店有多个设施，需要将两个数组进行对比
          for (let i = 0; i < v.hotelassets.length; i++) {
            return val.hotelAssets.indexOf(v.hotelassets[i].name) !== -1
          }
          // 这里有问题
        })
      }
      if (val.hotelBrands.length !== 0) {
        arr = arr.filter((v) => {
          return val.hotelBrands.indexOf(v.hotelbrand) !== -1
          // 过滤符合品牌的酒店，
        })
      }
      this.$emit('setRenderData', arr)
    },
    getHotel() {
      this.$axios({
        url: '/hotels/options'
      }).then((res) => {
        this.hotelData = res.data.data
      })
    }
  }
}
</script>
<style lang="less" scoped>
.contain {
  width: 1000px;
  margin: 0 auto;
  font-size: 13px;
  .select {
    display: flex;
    background-color: #ffffff;
    padding: 10px;
    border: 1px solid #dddddd;
    .space {
      border-right: 1px solid #dddddd;
      border-collapse: collapse;
      padding-right: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      &last-child {
        border-right: none;
      }
    }
  }
}
</style>
