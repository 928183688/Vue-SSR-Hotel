<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 左侧菜单栏 -->
      <div class="menus-wrapper">
        <div class="menus-body" @mouseleave="handleMenuLeave">
          <div class="menus">
            <div
              v-for="(item, index) in cities"
              :key="index"
              class="menu-item"
              :class="{active: currentMenu === index}"
              @mouseenter="handleMenuEnter(index)"
            >
              <span>{{ item.type }}</span>
            </div>
          </div>

          <div v-if="showSubMenu" class="sub-menus">
            <ul>
              <li v-for="(item, index) in currentCities" :key="index">
                <nuxt-link :to="`/post?city=${item.city}`">
                  <i>{{ index + 1 }}</i>
                  <strong>{{ item.city }}</strong>
                  <span>{{ item.desc }}</span>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="aside-recommend">
          <h4 class="aside-title">
            推荐城市
          </h4>
          <nuxt-link to="#" class="aside-recommend-item">
            <img src="/images/pic_sea.jpeg">
          </nuxt-link>
        </div>
      </div>

      <!-- 右侧内容 -->
      <div class="post-wrapper">
        <div class="search-wrapper">
          <el-row type="flex" justify="space-between" align="middle" class="search-bar">
            <input
              v-model="city"
              type="text"
              placeholder="请输入想去的地方，比如：'广州'"
              @keyup.enter="handleSearch"
            >
            <i class="el-icon-search" @click="handleSearch" />
          </el-row>
          <div class="search-recommend">
            推荐：
            <span
              v-for="(item, index) in [`广州`, `上海`, `北京`]"
              :key="index"
              @click="handleSearch(item)"
            >{{ item }}</span>
          </div>
        </div>
        <el-row type="flex" justify="space-between" align="middle" class="post-title">
          <h4>推荐攻略</h4>
          <el-button type="primary" icon="el-icon-edit" @click="$router.push(`/post/create`)">
            写游记
          </el-button>
        </el-row>

        <div class="post-list">
          <!-- <postCard v-for="(item, index) in posts" :key="index" :data="item" /> -->
        </div>

        <el-row type="flex" justify="center" style="margin-top:10px;">
          <el-pagination
            :current-page="Math.floor(start / limit) + 1"
            :page-sizes="[3, 5, 10, 15]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script>
// import postCard from '@/components/post/postCard'

export default {
  // components: {
  //   postCard
  // },
  data() {
    return {
      currentMenu: 999,
      showSubMenu: false,

      posts: [],
      cities: [],
      currentCities: [],

      // filtersF
      city: this.$route.query.city || '',
      start: 0,
      limit: 3,
      total: 0
    }
  },
  mounted() {
  // 城市列表
    this.$axios({
      url: '/posts/cities'
    }).then((res) => {
      // eslint-disable-next-line no-console
      console.log(res)
      const { data } = res.data
      this.cities = data
    })
  },
  methods: {
    // 鼠标移出隐藏城市信息
    handleMenuLeave() {
      this.showSubMenu = false
    },
    handleMenuEnter(index) {
      this.currentMenu = index
      this.showSubMenu = true
      this.currentCities = this.cities[index].children
    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}

/* 菜单栏 */
.menus-wrapper {
  position: relative;
  width: 260px;
  z-index: 2;

  .menus {
    width: 260px;
    border: 1px #ddd solid;
    border-right: none;
    border-bottom: none;
    box-shadow: 0 0 1px #f5f5f5;
    z-index: 2;
  }

  .menu-item {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px #ddd solid;
    border-right: 1px #ddd solid;
    padding: 0 20px;
    font-size: 14px;
    position: relative;
    z-index: 2;

    &:after {
      display: block;
      content: "";
      width: 10px;
      height: 10px;
      border-right: 1px #999 solid;
      border-top: 1px #999 solid;
      transform: rotate(45deg);
      position: absolute;
      right: 20px;
      top: 15px;
    }

    &.active {
      border-right-color: #fff;
      color: orange;

      &:after {
        border-right-color: orange;
        border-top-color: orange;
      }
    }
  }

  .sub-menus {
    position: absolute;
    left: 260px;
    top: 0;
    width: 350px;
    padding: 10px 20px;
    box-sizing: border-box;
    background: #fff;
    border: 1px #ddd solid;

    ul li {
      font-size: 14px;
      line-height: 1.5;

      * {
        vertical-align: middle;
      }

      i {
        color: orange;
        font-size: 24px;
        font-style: italic;
      }

      strong {
        margin: 0 10px;
        color: orange;
        font-weight: normal;
        &:hover {
          text-decoration: underline;
        }
      }

      span {
        color: #999;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

/* 侧边栏推荐 */
.aside-recommend {
  margin-top: 20px;

  .aside-title {
    font-weight: normal;
    padding-bottom: 10px;
    border-bottom: 1px #ddd solid;
    margin-bottom: 10px;
  }

  .aside-recommend-item {
    img {
      width: 100%;
      display: block;
    }
  }
}

/*内容*/
.post-wrapper {
  width: 700px;
}

/*搜索栏*/
.search-wrapper {
  .search-bar {
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    border: 3px orange solid;

    input {
      flex: 1;
      padding: 0 20px;
      line-height: 40px;
      outline: none;
      border: none;
      background: none;
    }

    i {
      font-size: 24px;
      color: orange;
      font-weight: bold;
      margin-right: 10px;
    }
  }

  .search-recommend {
    padding: 10px 0;
    font-size: 12px;
    color: #666;

    span {
      margin-right: 5px;
      &:hover {
        color: orange;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}

/* 标题 */
.post-title {
  padding-bottom: 10px;
  border-bottom: 1px #eee solid;
  position: relative;

  h4 {
    font-weight: normal;
    font-size: 18px;
    color: orange;

    &:after {
      display: block;
      content: "";
      width: 72px;
      height: 2px;
      background: orange;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
