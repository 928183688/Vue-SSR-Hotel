<template>
  <div class="contain">
    <el-row class="select" type="flex" justify="space-around">
      <el-col :span="6" class="space">
        <el-row :span="24" type="flex" justify="space-between">
          <span>价格</span>
          <span>{{ slideNum }}</span>
        </el-row>
        <el-row :span="24">
          <el-slider v-model="slideValue" :max="max" @change="slidevalue" />
        </el-row>
      </el-col>
      <el-col :span="4" class="space">
        <el-row :span="24">
          住宿等级
        </el-row>
        <el-row :span="24">
          <el-select
            v-model="hotelLevels"
            :multiple="true"
            collapse-tags
            placeholder="不限"
            style="border:none;"
            size="mini"
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
            v-model="hotelTypes"
            :multiple="true"
            collapse-tags
            placeholder="不限"
            style="border: 0; background: transparent; outline: none;"
            size="mini"
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
            v-model="hotelAssets"
            :multiple="true"
            collapse-tags
            placeholder="不限"
            style="border:none;"
            size="mini"
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
            v-model="hotelBrands"
            :multiple="true"
            collapse-tags
            placeholder="不限"
            style="border:none;"
            size="mini"
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
      hotelLevels: [],
      hotelAssets: [],
      hotelBrands: [],
      hotelTypes: [],
      hotelData: [],
      slideValue: 0,
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
      this.slideNum = value
    },
    getHotelStart() {},
    getHotel() {
      this.$axios({
        url: '/hotels/options'
      }).then((res) => {
        // console.log(res)
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
