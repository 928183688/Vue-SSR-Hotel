<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{ data.info.departCity }} - {{ data.info.destCity }}
        /
        {{ data.info.departDate }}
      </el-col>
      <el-col :span="4">
        <el-select

          v-model="filteritems.airport"
          size="mini"
          placeholder="起飞机场"
        >
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select

          v-model="filteritems.flightTimes"
          size="mini"
          placeholder="起飞时间"
        >
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from}:00 - ${item.to}:00`"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="filteritems.company" size="mini" placeholder="航空公司">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="filteritems.airSize" size="mini" placeholder="机型">
          <el-option
            v-for="(item,index) in sizeOptions"
            :key="index"
            :label="item.name"
            :value="item.size"
          />
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button
        type="primary"
        round
        plain
        size="mini"
        @click="handleFiltersCancel"
      >
        撤销
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      // 是一个对象
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data() {
    return {
      // 机型大中小
      sizeOptions: [
        { name: '大', size: 'L' },
        { name: '中', size: 'M' },
        { name: '小', size: 'D' }
      ],
      filteritems: {
        airport: '', // 机场
        flightTimes: '', // 出发时间
        company: '', // 航空公司
        airSize: '' // 机型大小
      }
    }
  },
  watch: {
    filteritems: {
      handler: function (val, oldVal) {
        // eslint-disable-next-line no-console
        this.handleFilter(val)
      },
      deep: true
    }
  },
  methods: {
    // 筛选函数
    handleFilter(value) {
      // eslint-disable-next-line no-unused-vars
      let arr = this.data.flights
      // 机票
      if (value.airport !== '') {
        arr = arr.filter((v) => {
          return v.org_airport_name === value.airport
        })
      }
      // 时间
      if (value.flightTimes !== '') {
        const timeString = value.flightTimes.split('-')
        const from = timeString[0].split(':')[0]
        const to = timeString[1].split(':')[0]
        arr = arr.filter((v) => {
          const depTime = +v.dep_time.split(':')[0]
          return from <= depTime && to > depTime
        })
      }
      // 航班
      if (value.company !== '') {
        arr = arr.filter((v) => {
          return v.airline_name === value.company
        })
      }
      // 机型
      if (value.airSize !== '') {
        arr = arr.filter((v) => {
          return v.plane_size === value.airSize
        })
      }
      this.$emit('setDataList', arr)
    },
    // 撤回
    handleFiltersCancel() {
      this.filteritems.airport = ''// 机场
      this.filteritems.flightTimes = '' // 出发时间
      this.filteritems.company = '' // 航空公司
      this.filteritems.airSize = '' // 机型大小
    }
  }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>
