import request from './http'
// 登录接口
export const userLogin = (data: {username: string, password: string}) => {
  return request.post('login', data)
}