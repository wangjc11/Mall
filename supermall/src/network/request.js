import axios from "axios"

// 最终版本
export function request (config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000,
  })

  // 2. 拦截器  分为请求拦截和响应拦截  全局的拦截：axios.interceptors
  instance.interceptors.request.use( // use需要传递两个函数，一个请求成功，一个失败，
    config => {
      // 请求拦截的作用：1.比如congfig中某些信息不符合服务器的要求。比如header，2.每次发送网络请求的时候，可以
      // 加上一些动画，在请求成功后关闭动画 3.某些网络请求，比如需要用户登陆（token），可以先跳转到登陆界面，
      // console.log(config);  // 此处的config就是请求的对象
      return config         // 拦截后需要释放掉才能继续执行
    },
    err => {
    }
  )
  instance.interceptors.response.use( // 相应拦截，也有啷个参数，一个响应成功，一个失败
    res => {
      // 响应拦截的作用：网络请求得到数据比较多，比较乱，可以进行删选返回给then，比如只需要res中的data
      // console.log(res);  // 此处的res为相应之后得到的数据！！响应拦截也是要返回的，不然then拿不到数据,
      return res.data // 此处只返回了res中的data，所以then得到的数据就是data
    },
    err => {
    }
  )

  return instance(config)   // 因为本身axios返回的就是一个promise，所以可以直接返回
}

export function request1 (config) {
  // 1.创建axios实例
  const instance1 = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000,
  })

  // 2. 拦截器  分为请求拦截和响应拦截  全局的拦截：axios.interceptors
  instance1.interceptors.request.use( // use需要传递两个函数，一个请求成功，一个失败，
    config => {
      return config         // 拦截后需要释放掉才能继续执行
    },
    err => {
    }
  )
  instance1.interceptors.response.use( // 相应拦截，也有啷个参数，一个响应成功，一个失败
    res => {
      return res.data // 此处只返回了res中的data，所以then得到的数据就是data
    },
    err => {
    }
  )

  return instance1(config)   // 因为本身axios返回的就是一个promise，所以可以直接返回
}
