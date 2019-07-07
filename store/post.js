
// 仓库
export const state = () => ({
  posts: [
  ]
})

// 方法
export const mutations = {
  setPostInfo(state, data) {
    state.posts.unshift(data)
    if (state.posts.length > 5) {
      state.posts.length = 5
    }
  },
  clearPostInfo(state) {
    state.posts = []
  }
}
