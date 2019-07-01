<template>
  <section class="container">
    <!-- 国内机票图标 -->
    <h2 class="air-title">
      <span class="iconfont iconfeiji" />
      <i>国内机票</i>
    </h2>

    <el-row type="flex" justify="space-between">
      <!-- 搜索栏 -->
      <SearchForm />
      <!-- banner广告位 -->
      <div class="sale-banner">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg">
      </div>
    </el-row>

    <!-- 广告 -->
    <el-row type="flex" class="statement">
      <el-col :span="8">
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;" />
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont iconbaozheng" style="color:green;" />
        <span>出行保证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont icondianhua" style="color:#409EFF;" />
        <span>7x24小时服务</span>
      </el-col>
    </el-row>

    <!-- 特价机票图标 -->
    <h2 class="air-sale-title">
      <span class="iconfont icontejiajipiao" />
      <i>特价机票</i>
    </h2>
    <!-- 特价机票 -->
    <Specialfare />
  </section>
</template>

<script>
import SearchForm from '@/components/air/searchForm'
import Specialfare from '@/components/air/SpecialFare'
export default {
  components: {
    SearchForm,
    Specialfare
  },
  data() {
    return {}
  }
}
</script>

<style lang='less' scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .air-title {
    color: orange;
    font-size: 20px;
    margin: 15px 0;
  }
  span {
    font-size: 20px;
  }
.statement{
  margin:15px 0;
  border:1px #ddd solid;
  background:#f5f5f5;
  height: 58px;
  padding:10px 0;
  box-sizing:border-box;

  > div{
    text-align: center;
    line-height: 38px;
    border-right:1px #ddd solid;

    &:last-child{
      border-right: none;
    }

    *{
      vertical-align: middle;
    }

    i{
      font-size:30px;
    }
    span {
      font-size: 16px
    }
  }
}

 .air-sale-title{
   font-size: 20px;
   color: #409eff;
   margin-bottom: 15px;
 }

}
</style>
