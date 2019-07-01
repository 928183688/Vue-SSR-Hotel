import { Message } from 'element-ui'

// 错误拦截 axios
export default ({ $axios }) => {
  $axios.onError((res) => {
    const { message, statusCode } = res.response.data

    if (statusCode === 400) {
      Message.warning(message)
    }
  })
}
