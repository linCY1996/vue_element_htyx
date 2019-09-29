import axios from 'axios';
import { Message } from 'element-ui';  //element库的消息提示，可以不用
import qs from 'qs'

const instance = axios.create({
    // baseURL:'http://47.108.66.16:8081',   //体验服
    baseURL:'http://47.108.26.160:8081', //线上服
    timeout: 20000
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var httpRequest = {
    // get请求
    get (url, params) {
      return new Promise((resolve, reject) => {
        instance({
          method: 'get',
          url: url,
          params: params
        }).then(response => {
          // 请求成功
          resolve(response.data)
        }).catch(err => {
          // 请求失败
          Message({
              showClose: true,
              message: '请求错误',
              type: 'error'
          });
          reject(err)
        })
      })
    },
    // post请求
    // post (url, data) {
    //   return new Promise((resolve, reject) => {
    //     instance({
    //       method: 'POST',
    //       url: url,
    //       data: qs.stringify(data)
    //     }).then(response => {
    //       // 请求成功
    //       resolve(response.data)
    //     }).catch(err => {
    //       // 请求失败
          // Message({
          //     showClose: true,
          //     message: '请求错误',
          //     type: 'error'
          // });
    //       reject(err)
    //     })
    //   })
    // },
    post (url, params = {}) {
      return new Promise((reslove, reject) => {
        instance({
          method:'POST',
          url:url,
          data:qs.stringify(params)
        }).then(res => {
          reslove(res.data)
        }).catch(err => {
          Message({
            showClose: true,
            message: '请求错误',
            type: 'error'
          });
          reject(err)
        })
      })
    }
    
  }
  
  export default httpRequest