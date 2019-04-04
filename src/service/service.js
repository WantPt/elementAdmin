// import Vue from 'vue'
import axios from 'axios'

//  设置默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//  设置请求超时之前的毫秒数
axios.defaults.timeout = 60000
//  请求拦截器

// download url
const downloadUrl = url => {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}
axios.interceptors.request.use(
  config => {
    config.headers = {
      'customize-type': 'pc',
      'customize-token': localStorage.getItem('customize-token') ? localStorage.getItem('customize-token') : '' // 请求带上token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use((data) => {
  const code = data.data.code
  if (data.headers['customize-token']) {
    localStorage.setItem('customize-token', data.headers['customize-token'])
  }
  if (data.headers && (data.headers['content-type'] === 'application/vnd.ms-excel;charset=UTF-8')) {
    downloadUrl(data.request.responseURL)
    data.data = ''
    data.headers['content-type'] = 'text/json'
    return data
  }
  switch (code) {
    case 403 || '403':
      iview.Modal.error({
        content: data.data.msg,
        onOk: function () {
          location.href = '/#/login'
        }
      })
      break
    default:
      return data
  }
}, error => {
  return Promise.reject(error)
})
export default axios
