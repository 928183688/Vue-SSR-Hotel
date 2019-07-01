// 暴露三大模块

// 状态
export const state = () => ({
  userInfo: {
    token: '',
    user: {}
  }
})

// 事件方法
export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  },
  clearUserInfo(state) {
    state.userInfo = {
      token: '',
      user: {}
    }
  }
}

// 异步处理操作
export const actions = {
  // 登录接口
  login({ commit }, data) {
    return this.$axios({
      url: '/accounts/login',
      method: 'post',
      data
    }).then((res) => {
      commit('setUserInfo', res.data)
      // 返回数据
      return Promise.resolve(res)
    })
  },
  // 注册接口
  register({ commit }, data) {
    return this.$axios({
      url: '/accounts/register',
      method: 'post',
      data
    }).then((res) => {
      commit('setUserInfo', res.data)
      // 返回数据
      Promise.resolve()
    })
  }

}
