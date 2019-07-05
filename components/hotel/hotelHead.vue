<template>
  <div class="hotel_head">
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
        v-model="form.search"
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
        <el-button
          type="primary"
          size="mini"
          style="margin-top:20px;float:right"
          @click="handleSubmitAC"
        >
          确定
        </el-button>
      </el-popover>
      <el-button type="primary">
        查看价格
      </el-button>
    </el-form>
    <!-- 中间区域 -->
    <div type="flex" justify="space-between">
      <!-- 左边是区域块 -->
      <div class="hotel_left">
        <div>
          区域:
          <nuxt-link v-for="(item,index) in areaInfo" :key="index" to="#">
            {{ item.name }}
          </nuxt-link>
        </div>
        <div>攻略</div>
        <div>均价</div>
      </div>

      <!-- 右边是地图 -->
      <select id="" v-model="city" name="">
        <option value="广州">
          广州
        </option>
        <option value="深圳">
          深圳
        </option>
      </select>
      <input v-model="start" type="text" placeholder="请输入出发地点">
      <input v-model="end" type="text" placeholder="到达点">
      <button @click="handleSearch">
        搜索
      </button>
      <div id="container" />
      <div id="panel" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 城市
      city: '广州',
      start: '',
      end: '',
      map: null,
      // 区域信息
      areaInfo: [],
      // 表单信息
      form: {
        // 搜索框
        search: '南京',
        date: '',
        hunman: ''
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
    window.onLoad = function () {
      // eslint-disable-next-line no-undef
      const map = new AMap.Map('container', {
        zoom: 11, // 级别
        // center: [116.397428, 39.90923], // 中心点坐标
        viewMode: '3D' // 使用3D视图
      })

      // 插件
      // eslint-disable-next-line no-undef
      const toolbar = new AMap.ToolBar()
      map.addControl(toolbar)

      // 创建一个 Marker 实例：
      // eslint-disable-next-line no-undef
      const marker = new AMap.Marker({
        // eslint-disable-next-line no-undef
        position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        content:
          '<div class="iconfont icon-dingwei" style="font-size:30px;color:blue"></div>', // 自定义点标记覆盖物内容
        title: '北京'
      })
      // 将创建的点标记添加到已有的地图实例：
      map.add(marker)
    }
    const key = 'b1112d4143278dc98b66dae026ef0eee'
    const url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad&plugin=AMap.ToolBar,AMap.Driving`
    const jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
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
    },
    // 查询路线
    handleSearch() {
      // eslint-disable-next-line no-undef
      this.map = new AMap.Map('container', {
        zoom: 11, // 级别
        // center: [116.397428, 39.90923], // 中心点坐标
        viewMode: '3D' // 使用3D视图
      })
      // eslint-disable-next-line no-undef
      const driving = new AMap.Driving({
        // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
        // eslint-disable-next-line no-undef
        policy: AMap.DrivingPolicy.LEAST_TIME,
        panel: 'panel',
        map: this.map
      })
      const points = [
        { keyword: this.start, city: this.city },
        { keyword: this.end, city: this.city }
      ]

      driving.search(points, function (status, result) {
        // 未出错时，result即是对应的路线规划方案
      })
    }
  }
}
</script>

<style lang='less' scoped>
.hotel_mbx {
  margin: 20px 0px;
}
.hotel_left {
  width: 590px;
}
#container {
  width: 500px;
  height: 500px;
}
#panel {
  position: fixed;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 10px;
  right: 10px;
  width: 280px;
}
#panel .amap-call {
  background-color: #009cf9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
</style>
