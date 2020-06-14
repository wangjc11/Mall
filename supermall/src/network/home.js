import { request, request1 } from "@/network/request.js"

export function getHomeMultitada() {
  return request({
    url: '/home/multidata'
  })
}

export function getGoodsDate(type,page){
  return request1({
    url: '/home/data',
    params: {
      type,
      page,
    }
  })
}
