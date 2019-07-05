import { Message } from 'element-ui'

// 错误拦截 axios
export default ({ $axios, redirect }) => {
  $axios.onError((res) => {
    const { message, statusCode } = res.response.data

    if (statusCode === 400) {
      Message.warning(message)
    }
    if (statusCode === 401 || statusCode === 403) {
      redirect('/user/login')
    }
  })
}
