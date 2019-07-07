<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="main">
        <h2>发表新攻略</h2>
        <p class="create-desc">
          分享你的个人游记，让更多人看到哦！
        </p>
        <el-form>
          <el-form-item>
            <el-input v-model="form.title" placeholder="请输入标题" />
          </el-form-item>

          <el-form-item>
            <VueEditor ref="vueEditor" :config="config" />
          </el-form-item>

          <el-form-item>
            <el-form-item label="选择城市">
              <el-autocomplete
                v-model="cityName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请搜索游玩城市"
                class="el-autocomplete"
                @select="handleCitySelect"
              />
            </el-form-item>
          </el-form-item>
        </el-form>
        <div class="create-button">
          <el-button type="primary" size="small" @click="handleSubmit">
            发布
          </el-button>
          <span class="submit-side">
            或者 <a href="javascript:;" @click="handleAddPost">保存到草稿</a>
          </span>
        </div>
      </div>
      <!-- 草稿箱 -->
      <div class="aside">
        <div class="draft-box">
          <h4 class="draft-title" style="font-size:13px">
            草稿箱（{{ drafts.length }}）
            <span class="editPost" @click="handleEditPost">清空所有草稿箱</span>
          </h4>
          <div class="draft-list">
            <div v-for="(item, index) in drafts" :key="index" class="draft-item">
              <div class="draft-post-title" @click="handleReEdit(item)">
                {{ item.title }} <span class="iconfont el-icon-edit" />
              </div>
              <p>{{ item.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import 'quill/dist/quill.snow.css'
let VueEditor

if (process.browser) {
  // 只在浏览器端才渲染就不会报错了
  VueEditor = require('vue-word-editor').default
}

export default {

  components: {
    VueEditor
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
        city: '' // 用于保存选中时的city id
      },
      cityName: '',
      // 草稿箱
      drafts: [],
      config: {
        modules: {
        // 工具栏
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            ['image', 'video'],
            [{ 'header': 1 }, { 'header': 2 }] // custom button values
          ]
        },
        // 主题
        theme: 'snow',
        uploadImage: {
          url: `${this.$axios.defaults.baseURL}/upload`,
          name: 'files',
          uploadSuccess(res, insert) {
            insert(this.$axios.defaults.baseURL + res.data[0].url)
          }
        },

        uploadVideo: {
          url: `${this.$axios.defaults.baseURL}/upload`,
          name: 'files',
          uploadSuccess(res, insert) {
            insert(this.$axios.defaults.baseURL + res.data[0].url)
          }
        }

      }
    }
  },
  mounted() {
    // 万金油定时器
    setTimeout(() => {
      this.drafts = this.$store.state.post.posts
    }, 200)
  },
  methods: {
    querySearchAsync(value, cb) {
      if (!value) return
      // 发起请求
      this.$axios({
        url: '/cities',
        params: {
          name: value
        }
      }).then((res) => {
        const { data } = res.data
        const newData = data.map((v) => {
          return {
            ...v,
            value: v.name.replace('市', '')
          }
        })
        this.cityName = newData[0].value
        cb(newData)
      })
    },
    // 选中下拉框菜单
    handleCitySelect(item) {
      // 城市ID
      this.form.city = item.id
      // 城市名称
      this.cityName = item.value
    },
    // 发布
    handleSubmit() {
      // 富文本框得内容
      this.form.content = this.$refs.vueEditor.editor.root.innerHTML
      const rules = {
        title: { require: true, defaults: this.form.title, message: '请输入标题' },
        content: { require: true, defaults: this.form.content, message: '请输入内容' },
        city: { require: true, defaults: this.form.city, message: '请在下拉框中选择城市' }
      }
      // 弄一个验证规则
      let valid = true
      // 遍历对象
      Object.keys(rules).forEach((v) => {
        // 错误信息
        if (!valid) return
        // 提取rules里面得对象出来 判断
        const item = rules[v]
        // 如果验证信息为true 没有填消息
        if (item.require && !item.defaults) {
          // 验证规则为false
          valid = false
          this.$confirm(item.message, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
        }
      })
      // 直接中止
      if (!valid) return

      // 在执行请求
      this.$axios({
        url: '/posts',
        method: 'POST',
        data: this.form,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then((res) => {
        if (res.data.status === 0) {
          this.$message.success(res.data.message)
          // 初始化表单
          this.form = {
            title: '',
            content: '',
            city: ''
          }
          // 富文本框清空
          this.$refs.vueEditor.editor.root.innerHTML = ''
          // 城市清空
          this.cityName = ''
          // 跳到攻略首页
          this.$router.push({
            path: '/post'
          })
        }
      })
    },
    // 保存到草稿箱
    handleAddPost() {
      const postInfo =
        {
          title: this.form.title,
          content: this.$refs.vueEditor.editor.root.innerHTML,
          cityName: this.cityName,
          time: moment().format(`YYYY-MM-DD`)
        }

      this.$store.commit('post/setPostInfo', postInfo)
      // 初始化表单
      this.form = {
        title: '',
        content: '',
        city: ''
      }
      // 富文本框清空
      this.$refs.vueEditor.editor.root.innerHTML = ''
      // 城市清空
      this.cityName = ''
    },
    // 编辑草稿箱
    handleReEdit(item) {
      this.form.title = item.title
      this.cityName = item.cityName
      this.$refs.vueEditor.editor.root.innerHTML = item.content
    },
    // 清空所有草稿箱
    handleEditPost() {
      this.$store.commit('post/clearPostInfo')
    }
  }
}
</script>

<style scoped lang="less">
    .container{
        width:1000px;
        margin:0 auto;
        padding:20px 0;
    }

    .main{
        width:750px;

        h2{
            font-weight: normal;
            font-size:22px;
            margin-bottom:10px;
        }

        .create-desc{
            font-size:12px;
            color:#999;
            margin-bottom:10px;
        }

        .submit-side{
            margin-left:10px;
            font-size: 14px;
            a{
                color:orange;
                &:hover{
                    text-decoration: underline;
                }
            }
        }

        /deep/ #editor{
            height:400px;
        }
    }

    .aside{
        width:200px;
        .draft-box{

            border:1px #ddd solid;
            padding:10px;
            .draft-title{
                margin-bottom:10px;
                font-weight: normal;
                color:#666;
            }

            .draft-item{
                margin-bottom:10px;
                font-size: 14px;

                .draft-post-title{
                    cursor: pointer;
                    &:hover{
                        color:orange;
                        text-decoration: underline;
                    }
                }

                p{
                    color:#999;
                }
            }
        }
    }
    .editPost{
      cursor: pointer;
      color: red
    }
</style>
