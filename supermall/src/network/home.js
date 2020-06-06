import { request } from "@/network/request.js"

export function getHomeMultitada() {
  return request({
    url: '/home/multidata'
  })
}

