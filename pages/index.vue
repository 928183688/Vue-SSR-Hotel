<template>
  <div class="container">
    <!-- 轮播图 -->
    <el-carousel :interval="5000" arrow="always" height="650px">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
                background-size:contain contain;`"
        />
      </el-carousel-item>
    </el-carousel>

    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row
          type="flex"
          class="search-tab"
        >
          <span
            v-for="(item,index) in options"
            :key="index"
            :class="{active : currentIndex === index}"
            @click="handleChangeActive(index)"
          >
            <i>{{ item.name }}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row
          type="flex"
          align="middle"
          class="search-input"
        >
          <input
            v-model="searchValue"
            :placeholder="options[currentIndex].placeholder"
            @keydown.enter="handleSearch"
          >
          <i class="el-icon-search" @click="handleSearch" />
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图数据
      banners: [],
      // 搜索框数据
      options: [
        { name: '攻略', placeholder: '请输入城市', pageUrl: '/post?city=' },
        { name: '酒店', placeholder: '请输入城市搜索酒店', pageUrl: '/hotel?city=' },
        { name: '机票' }
      ],
      // 自定义索引
      currentIndex: 0,
      // 搜索框内容
      searchValue: ''
    }
  },
  mounted() {
    this.$axios({
      url: '/scenics/banners'
    }).then((res) => {
      const { data } = res.data
      this.banners = data
    })
  },
  methods: {
    // 让自定义索引和active里面的索引保持一致
    handleChangeActive(index) {
      // 保持一致
      this.currentIndex = index
      // 判断如果是机票 跳转机票路由
      const item = this.options[this.currentIndex]
      if (item.name === '机票') {
        this.$router.push('/air')
      }
    },
    // 点击 根据url拼接的城市进行搜索
    handleSearch() {
      // 已经拿到搜索框的值 searchValue 那么只要拿出数组每一项的pageUrl
      const item = this.options[this.currentIndex]
      // 直接跳转 无需判断
      this.$router.push(item.pageUrl + this.searchValue)
    }
  }
}
</script>

<style lang='less' scoped>
 .banner-image{
        width:100%;
        height:100%;
    }

.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;

    /deep/ .el-carousel__container{
        height:700px;
    }

    .banner-image{
        width:100%;
        height:100%;
    }

    .banner-content{
        z-index:9;
        width:1000px;
        position:absolute;
        left:50%;
        top:45%;
        margin-left: -500px;
        border-top:1px transparent solid;

        .search-bar{
            width:552px;
            margin:0 auto;
        }

        .search-tab{
            .active{
                i{
                color:#333;
                }
                &::after{
                background: #eee;
                }
            }

            span{
                width:82px;
                height:36px;
                display:block;
                position: relative;
                margin-right:8px;
                cursor: pointer;

                i{
                position:absolute;
                z-index:2;
                display: block;
                width:100%;
                height:100%;
                line-height:30px;
                text-align:center;
                color:#fff;
                }

                &:after{
                position: absolute;
                left:0;
                top:0;
                display:block;
                content: "";
                width:100%;
                height:100%;
                border: 1px rgba(255,255,255,.2) solid;
                border-bottom: none;
                transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
                transform-origin: bottom left;
                background: rgba(0,0,0,.5);
                border-radius:1px 2px 0 0;
                box-sizing:border-box;
                }
            }
        }

        .search-input{
            width:550px;
            height:46px;
            background:#fff;
            border-radius: 0 4px 4px 4px;
            border: 1px rgba(255,255,255,.2) solid;
            border-top:none;
            box-sizing: unset;

            input{
                flex:1;
                height:20px;
                padding: 13px 15px;
                outline: none;
                border:0;
                font-size:16px;
            }

            .el-icon-search{
                cursor :pointer;
                font-size:22px;
                padding:0 10px;
                font-weight:bold;
            }
        }
    }
}
</style>
