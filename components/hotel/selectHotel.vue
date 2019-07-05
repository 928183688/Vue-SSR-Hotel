<template>
  <div class="contain">
    <el-row class="select" type="flex" justify="space-around">
      <el-col :span="6" class="space">
        <el-row :span="24" type="flex" justify="space-between">
          <span>价格</span>
          <span>{{ slideNum }}</span>
        </el-row>
        <el-row :span="24">
          <el-slider v-model="searchData.slideValue" :max="max" @change="slidevalue" />
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
            @change="handelLevel"
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
            @change="hotelType"
          >
            <el-option
              v-for="item in hotelData.types"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
            @change="hotelAsset"
          >
            <el-option
              v-for="item in hotelData.assets"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
            @change="hotelBrand"
          >
            <el-option
              v-for="item in hotelData.brands"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
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
      slideNum: 0,
      checkList: []
    }
  },
  mounted() {
    this.getHotel()
  },
  methods: {
    slidevalue(value) {
      this.searchData.slideValue = value
      this.$emit('setRenderData', this.searchData)
    },
    // 住宿等级
    handelLevel(value) {
      // eslint-disable-next-line no-console
      this.searchData.hotelLevels = value
      this.$emit('setRenderData', this.searchData)
    },
    // 住宿的类型
    hotelType(value) {
      this.searchData.hotelTypes = value
      this.$emit('setRenderData', this.searchData)
    },
    // 酒店类型
    hotelAsset(value) {
      this.searchData.hotelAssets = value
      this.$emit('setRenderData', this.searchData)
    },
    // 酒店品牌
    hotelBrand(value) {
      this.searchData.hotelBrands = value
      this.$emit('setRenderData', this.searchData)
    },
    // 获取酒店数据
    search() {},
    getHotel() {
      this.$axios({
        url: '/hotels/options'
      }).then((res) => {
        // eslint-disable-next-line no-console
        console.log(res)
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
