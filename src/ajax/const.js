import 'whatwg-fetch'
import qs from 'qs'

function parseJSON(response) {
  return response.json()
}

function checkStatus(response) {
  
  if (response.status >= 200 && response.status < 300) {
    return response
  } 

  const error = new Error(response.statusText)
  error.response = response
  throw error
}
function Salert(info){
    swal({
        title: info,
        type: 'warning',
        text: "",
        timer: 2000,
    })
}
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(function(data) {
        if(data.code == 100){
            Salert('验证码获取太频繁')
        } else if(data.code == 20){
            Salert('用户不存在')
        } else if(data.code == 1){
            Salert('系统错误')
        } else if(data.code == 4){
            Salert('非法访问')
        } else if(data.code == 21){
            Salert('用户已经存在')
        } else if(data.code == 22){
            Salert('用户状态已经改变')
        } else if(data.code == 101){
            Salert('验证码获取次数限制')
        } else if(data.code == 102){
            Salert('验证码错误')
        } else if(data.code == 103){
            Salert('密码错误')
        } else if(data.code == 104){
            Salert('第一次登录需要设置密码')
        } else if(data.code == 105){
            Salert('不是子级行政区划')
        } else if(data.code == 106){
            Salert('身份证已经存在')
        } else if(data.code == 500){
            Salert('action 不存在')
        } else if(data.code == 501){
            Salert('app不存在')
        } else if(data.code == 502){
            Salert('已经提交代理申请')
        } else if(data.code == 503){
            Salert('申请不存在')
        } else if(data.code == 504){
            Salert('已经是雇员了')
        } else if(data.code == 505){
            Salert('手机号已经被占用')
        } else if(data.code == 506){
            Salert('用户拥有的代理商数量达到最大值')
        } else if(data.code == 507){
            Salert('app拥有的代理商数目达到最大值')
        } else if(data.code == 508){
            Salert('代理公司不存在')
        } else if(data.code == 509){
            Salert('雇员不存在')
        } else if(data.code == 510){
            Salert('用户资料缺少')
        }
        return data
    })
    .catch(() => {
      alert('系统错误')
    })
}

export function post(url, data, token) {
  return request(url, {
    method: 'post',
    headers: {
      'token': token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    body: qs.stringify(data)
  })
}