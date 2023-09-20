import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
class Request {
  instance: AxiosInstance;
  loading: any;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://shiyansong.cn:8888/api/private/v1",
      timeout: 10000
    })
    this.interceptor()
  }
  // 请求拦截
  reqInt() {
    this.instance.interceptors.request.use((config) => {
      this.loading = ElLoading.service({
        text: '加载中...'
      })
      config.headers.Authorization = localStorage.getItem('token')
      return config
    }, err => {
      err.data = {}
      err.data.msg = "服务器连接异常 请联系管理员"
      this.loading.close()
      return err
    })
  }

  // 响应拦截
  resInt() {
    this.instance.interceptors.response.use(res => {
      this.loading.close()
      let { data, meta } = res.data
      if(meta.status === 200) {
        ElMessage.success(meta.msg)
      } else if(meta.status === 400) {
        ElMessage.error(meta.msg)
      }
      return res.data
    }, err => {
      this.loading.close()
      err.data = {}
      err.data.msg = '响应发生错误，请检查网络连接'
      return err
    })
  }

  interceptor() {
    this.reqInt()
    this.resInt()
  }

  async post(url:string, data?:any) {
    let res = await this.instance({
      method: 'post',
      url: url,
      data: data
    })
    return res
  }
}

export default new Request()