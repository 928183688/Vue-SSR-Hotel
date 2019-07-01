<template>
  <div class="search_form">
    <div class="box" />
    <div class="text" @click="handleChangeText">
      换
    </div>
    <!-- 搜索tab -->
    <el-row type="flex" class="search_tab">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        :class="{active:currentIndex === index}"
        @click="handleChangeActive(index)"
      >
        <i :class="item.icon">{{ item.name }}</i>
      </span>
    </el-row>

    <!-- 搜索功能 -->
    <el-form
      ref="ruleForm"
      :model="form"
      status-icon
      class="searchForm"
      style="padding:25px 35px"
    >
      <el-form-item label="出发城市">
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="querySearchDepartCity"
          placeholder="请输入出发城市"
          @select="handledepartCitySelect"
        />
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="querySearchDestCity"
          placeholder="请输入到达城市"
          @select="handledestCitySelect"
        />
      </el-form-item>
      <el-form-item label="出发时间">
        <el-date-picker
          v-model="form.departDate"
          type="date"
          placeholder="请选择日期"
          style="width: 213px;"
          value-format="yyyy-MM-dd"
          @change="handleSelectTime"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" style="width:213px;marginLeft:65px" @click="handleSendSubmit">
          搜索
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 自定义属性 单程 和 往返
      tabs: [
        { icon: 'iconfont icondancheng', name: '单程' },
        { icon: 'iconfont iconshuangxiang', name: '往返' }
      ],
      // 自定义索引
      currentIndex: 0,
      form: {
        departCity: '',
        departCode: '',
        destCity: '',
        destCode: '',
        departDate: ''
      }
    }
  },
  methods: {
    // 同步索引 完事
    handleChangeActive(index) {
      if (index === 1) {
        this.$alert('此功能暂未开通', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
    },
    // 出发城市下拉框
    querySearchDepartCity(value, cb) {
      // 如果文本框内容为空 那么直接返回 不发请求
      if (!value) return
      this.$axios({
        url: 'airs/city?name=' + value
      }).then((res) => {
        // 把数据结构出来循环
        const { data } = res.data
        // 循环数据
        const newData = data.map((v) => {
          // 直接返回
          return {
            // 把数组占开
            ...v,
            // 加入一个对象 value  把市去掉 替换为空字符串
            value: v.name.replace('市', '')
          }
        })
        // 默认选中第一项
        this.form.departCity = newData[0].value
        this.form.departCode = newData[0].sort
        cb(newData)
      })
    },
    // 到达城市下拉框
    querySearchDestCity(value, cb) {
      if (!value) return
      this.$axios({
        url: 'airs/city?name=' + value
      }).then((res) => {
        const { data } = res.data
        const newData = data.map((v) => {
          return {
            ...v,
            value: v.name.replace('市', '')
          }
        })
        // 默认选中第一项
        this.form.destCity = newData[0].value
        this.form.destCode = newData[0].sort
        cb(newData)
      })
    },
    // 出发城市选中
    handledepartCitySelect(value) {
      this.form.departCity = value.value
      this.form.departCode = value.sort
    },
    // 到达城市选中
    handledestCitySelect(value) {
      this.form.destCity = value.value
      this.form.destCode = value.sort
    },
    // 修改时间
    handleSelectTime(value) {
      this.form.departDate = value
    },
    // 搜索
    handleSendSubmit() {
      // 验证规则
      const rules = {
        departValue: { message: '请在下拉框中选中出发城市', value: this.form.departCity },
        destValue: { message: '请在下拉框中选中到达城市', value: this.form.destCity },
        departDate: { message: '请输入日期', value: this.form.departDate }
      }
      // 设定一个条件
      let valid = true
      // 循环对象
      Object.keys(rules).forEach((v) => {
        // 只要进入这条判断 基本就是错误 所以可以立刻终止循环
        if (!valid) return
        // 把对象解析为变量
        const item = rules[v]
        // 判断里面得规则
        if (!item.value) {
          // 直接返回false
          valid = false
          // 弹窗
          this.$confirm(item.message, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
        }
      })
      if (!valid) return
      // 如果全部为true 就跳转
      this.$router.push({
        path: '/air/flights',
        query: this.form
      })
    },
    // 查询信息对调
    handleChangeText() {
      // 把四个值结构出来 对调
      const { departCity, departCode, destCity, destCode } = this.form
      this.form.departCity = destCity
      this.form.departCode = destCode
      this.form.destCity = departCity
      this.form.destCode = departCode
    }
  }
}
</script>

<style lang='less' scoped>
    .search_form{
        width: 360px;
        height: 350px;

        .search_tab{
            line-height: 50px;
         span {
          background:#eee;
          display: block;
          width: 50%;
          height: 50px;
          text-align: center;
          font-size: 16px;
          cursor: pointer;
          color:#666;
          box-sizing: border-box;
          border-top: 2px solid #eee;

          &.active {
            border-top-color: orange;
            background:#fff;
          }

           }
        }

   .box {
     width: 50px;
     height: 50px;
     border: 1px solid #999;
     position: absolute;
     top: 100px;
     left: 282px;
     border-left: none
   }
   .text {
    width: 20px;
     height: 20px;
     position: absolute;
     top: 115px;
     left: 324px;
     zoom: 1;
     background: #999;
     color: #fff;
     text-align: center;
     font-size: 12px;
     line-height: 20px;
     border-radius: 2px;
     cursor: pointer;
   }
    }
</style>
