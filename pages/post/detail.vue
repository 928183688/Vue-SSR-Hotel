<template>
  <el-row type="flex" justify="space-between" class="container">
    <div class="main">
      <!-- 面包屑标题 -->
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/post">
            旅游攻略
          </el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 文章大标题 -->
      <h1>{{ detail.title }}</h1>

      <!-- 文章信息 -->
      <div class="post-info">
        <span>攻略：{{ detail.created_at | timestamp }}</span>
        <span>阅读：{{ detail.watch }}</span>
      </div>

      <!-- 文章内容 -->
      <div class="post-content" v-html="detail.content" />

      <!-- 文章分享 -->
      <div class="post-ctrl">
        <el-row type="flex" justify="center">
          <div class="ctrl-item">
            <i class="iconfont iconpinglun" />
            <p>评论({{ total }})</p>
          </div>
          <div class="ctrl-item" @click="handleStar">
            <i class="iconfont iconstar1" />
            <p>收藏</p>
          </div>
          <div class="ctrl-item">
            <i class="iconfont iconfenxiang" />
            <p>分享</p>
          </div>
          <div class="ctrl-item" @click="handleLike">
            <i class="iconfont iconding" />
            <p>点赞({{ detail.like || 0 }})</p>
          </div>
        </el-row>
      </div>

      <!-- 文章评论 -->
      <div class="cmt-wrapper">
        <h4 class="cmt-title">
          评论
        </h4>

        <el-tag
          v-if="reply.nickname"
          closable
          type="info"
          class="replyTag"
          @close="handleCloseReply"
        >
          回复 @{{ reply.nickname }}
        </el-tag>

        <!-- 评论输入框 -->
        <div ref="cmtInput" class="cmt-input">
          <el-input v-model="cmtForm.content" type="textarea" resize="none" placeholder="说点什么吧..." @keydown.enter.native="handleCmtSubmit" />
        </div>
        <el-row type="flex" justify="space-between" class="cmt-input-ctrls">
          <!-- 上传图片 -->
          <div class="cmt-pics">
            <el-upload
              :action="$axios.defaults.baseURL + `/upload`"
              list-type="picture-card"
              name="files"
              :file-list="cmtForm.pics"
              :on-success="handleSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="$axios.defaults.baseURL + dialogImageUrl" alt>
            </el-dialog>
          </div>
          <div>
            <el-button type="primary" size="mini" class="cmt-submit" @click="handleCmtSubmit">
              提交
            </el-button>
          </div>
        </el-row>

        <!-- 无评论时 -->
        <div v-if="!total" class="cmt-empty">
          暂无评论，赶紧抢占沙发！
        </div>

        <!-- 评论列表 -->
        <div v-if="total" class="cmt-list">
          <div v-for="(item, index) in comments" :key="index" class="cmt-item">
            <div class="cmt-info">
              <img :src="$axios.defaults.baseURL + item.account.defaultAvatar">
              {{ item.account.nickname }}
              <i>{{ item.created_at | timestamp }}</i>
              <span>{{ item.level }}</span>
            </div>
            <div class="cmt-content">
              <!-- 评论楼层 -->
              <CommentFloor
                v-if="item.parent"
                :comment="item.parent"
                @preview="handlePictureCardPreview"
                @reply="handleReply"
              />

              <div class="cmt-new">
                <p class="cmt-message">
                  {{ item.content }}
                </p>
                <el-row type="flex">
                  <div v-for="(pic, picIndex) in item.pics" :key="picIndex" class="cmt-pic">
                    <img
                      :src="$axios.defaults.baseURL + pic.url"
                      @click="handlePictureCardPreview(pic)"
                    >
                  </div>
                </el-row>
                <div class="cmt-ctrl">
                  <a href="javascript:;" @click="handleReply(item)">回复</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <el-row v-if="total" type="flex" justify="center" style="margin-top:10px;">
          <el-pagination
            :current-page="Math.floor(start/limit) + 1"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </div>
    </div>

    <!-- 推荐文章 -->
    <div class="aside">
      <h4 class="aside-title">
        相关攻略
      </h4>
      <div class="recommend-list">
        <nuxt-link
          v-for="(item, index) in recommends"
          :key="index"
          :to="`/post/detail?id=${item.id}`"
          class="recommend-item"
        >
          <el-row type="flex" class="post-imgText">
            <el-row type="flex" align="middle" class="post-img">
              <img :src="item.images[0]" alt>
            </el-row>
            <div class="post-text">
              <div>{{ item.title }}</div>
              <p>{{ item.created_at }} 阅读 {{ item.watch }}</p>
            </div>
          </el-row>
        </nuxt-link>
      </div>
    </div>
  </el-row>
</template>

<script>
import moment from 'moment'
import CommentFloor from '@/components/post/commentFloor'

export default {
  components: {
    CommentFloor
  },

  filters: {
    // 格式化时间
    timestamp(value) {
      return moment(value).format('YYYY-MM-DD h:mm')
    }
  },
  data() {
    return {
      // 推荐攻略得信息
      recommends: [],
      // 评论用户得信息
      reply: {},
      // 缩略图得参数
      dialogImageUrl: '',
      dialogVisible: false,
      // 评论添加需要的参数
      cmtForm: {
        pics: [],
        content: '',
        follow: ''
      },
      // 文章详情数据
      detail: {},
      // 分页
      start: 0,
      limit: 5,
      total: 0,
      // 评论数据
      comments: []
    }
  },
  mounted() {
    // 请求文章数据
    this.getPostData()
    // 请求评论数据
    this.getSpeakData()
    // 请求推荐攻略数据
    this.getPostComment()
  },
  methods: {
    // 请求文章详情数据
    getPostData() {
      this.$axios({
        url: `/posts/${this.$route.query.id}`
      }).then((res) => {
        const { data } = res
        this.detail = data
        // eslint-disable-next-line no-console
        // console.log(this.detail)
      })
    },
    // 请求评论数据
    getSpeakData() {
      this.$axios({
        url: '/posts/comments',
        params: {
          post: this.$route.query.id,
          _limit: this.limit,
          _start: this.start
        }
      }).then((res) => {
        // eslint-disable-next-line no-console
        // console.log(res)
        const { data, total } = res.data
        this.comments = data
        this.total = total
      })
    },
    // 收藏
    handleStar() {
      this.$axios({
        url: '/posts/star',
        params: {
          id: this.detail.id
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then((res) => {
        if (res.data.status === 0) {
          this.$message.success(res.data.message)
        }
      })
    },
    // 点赞
    handleLike() {
      this.$axios({
        url: '/posts/like',
        params: {
          id: this.detail.id
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then((res) => {
        if (res.data.status === 0) {
          this.$message.success(res.data.message)
          this.detail.like += 1
        }
      })
    },
    // 1/2/3/4按钮
    handleSizeChange(value) {
      this.limit = value
      this.start = 0
      this.getSpeakData()
    },
    // 2、4、6、8 按钮
    handleCurrentChange(value) {
      this.start = this.limit * (value - 1)
      this.getSpeakData()
    },
    // 图片上传成功后
    handleSuccess(file) {
      // 拼全路径
      file[0].url = this.$axios.defaults.baseURL + file[0].url
      this.cmtForm.pics.push(file[0])
    },
    // 放大缩略图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 删除图片
    handleRemove(file, fileList) {
      this.cmtForm = fileList.map((v) => {
        return v.response[0]
      })
    },
    // 提交评论
    handleCmtSubmit() {
      this.$axios({
        url: '/comments',
        method: 'POST',
        data: {
          post: this.detail.id,
          content: this.cmtForm.content,
          pics: this.cmtForm.pics
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then((res) => {
        if (res.data.status === 0) {
          this.$message.success(res.data.message)
          this.cmtForm = {
            content: '',
            pics: []
          }
          // 刷新评论
          this.getSpeakData()
        }
      })
    },
    // 回复
    handleReply(comments) {
      this.reply = comments.account
      this.cmtForm.follow = comments.id
      // 点击回复 会滚到输入框上面
      window.scrollTo(0, this.$refs.cmtInput.offsetTop)
    },
    // 删除回复@
    handleCloseReply() {
      this.reply = {}
      this.cmtForm.follow = ''
    },
    // 推荐文章
    getPostComment() {
      this.$axios({
        url: '/posts/recommend',
        params: {
          id: this.detail.id
        }
      }).then((res) => {
        // eslint-disable-next-line no-console
        console.log(res)
        this.recommends = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
}

.main {
  width: 700px;

  h1 {
    padding: 20px 0;
    border-bottom: 1px #ddd solid;
  }

  .post-content {
    line-height: 1.5;

    /deep/ * {
      max-width: 700px !important;
    }

    /deep/ img {
      margin: 10px 0;
    }
  }

  .post-info {
    color: #999;
    padding: 20px;
    text-align: right;

    span {
      margin-left: 20px;
    }
  }

  .post-ctrl {
    padding: 50px 0 30px;
    .ctrl-item {
      margin: 0 20px;
      font-size: 20px;
      text-align: center;
      cursor: pointer;

      i {
        display: block;
        font-size: 28px;
        color: orange;
      }

      &:nth-child(2) {
        i {
          transform: scale(1.4);
        }
      }
      p {
        margin-top: 5px;
        font-size: 14px;
        color: #999;
      }
    }
  }

  /* 评论 */
  .cmt-wrapper {
    margin-bottom: 20px;
  }

  .replyTag {
    margin-bottom: 10px;
  }

  .cmt-title {
    font-weight: normal;
    font-size: 18px;
    margin-bottom: 20px;
  }

  .cmt-input {
    margin-bottom: 10px;
  }

  .cmt-input-ctrls {
    margin-bottom: 30px;
    /deep/ .el-upload--picture-card {
      width: 100px;
      height: 100px;
      line-height: 100px;
    }

    /deep/ .el-upload-list {
      li {
        width: 100px;
        height: 100px;
      }

      img {
        object-fit: cover;
      }
    }
  }

  .cmt-empty {
    color: #999;
    font-size: 14px;
    text-align: center;
    padding: 30px 0;
    border: 1px #ddd dashed;
  }

  .cmt-list {
    border: 1px #ddd solid;
  }

  .cmt-item {
    border-bottom: 1px #ddd dashed;
    padding: 20px 20px 5px;

    &:last-child {
      border-bottom: none;
    }

    .cmt-content {
      padding: 0 0 0 30px;
    }

    .cmt-info {
      margin-bottom: 10px;
      font-size: 12px;
      color: #666;

      * {
        vertical-align: top;
      }

      img {
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }

      i {
        color: #999;
      }
      span {
        float: right;
      }
    }
    .cmt-message {
      margin-top: 10px;
    }

    .cmt-pic {
      width: 80px;
      height: 80px;
      border-radius: 6px;
      overflow: hidden;
      margin-right: 5px;
      margin-top: 10px;
      padding: 5px;
      border: 1px #ddd dashed;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
      }
    }

    /*  这里和comment floor不一样，鼠标在最新内容上才hover */
    .cmt-new:hover {
      .cmt-ctrl {
        * {
          display: inline;
        }
      }
    }

    .cmt-ctrl {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #1e50a2;
      text-align: right;

      * {
        display: none;
      }

      a:hover {
        text-decoration: underline;
      }
    }
  }
}

/* 侧边栏 */
.aside {
  width: 280px;

  .aside-title {
    font-weight: normal;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px #ddd solid;
  }

  .recommend-item {
    display: block;
    padding: 20px 0;
    border-bottom: 1px #ddd solid;

    .post-imgText {
      .post-img {
        width: 100px;
        height: 80px;
        flex-shrink: 0;
        background: #ddd;
        overflow: hidden;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .post-text {
        flex: 1;
        position: relative;
        div {
          position: relative;
          line-height: 1.4em;
          /*设置容器高度为3倍行高就是显示3行*/
          height: 2.8em;
          overflow: hidden;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }

        p {
          position: absolute;
          bottom: 0;
          left: 0;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
