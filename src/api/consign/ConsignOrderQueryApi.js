import request from '@/utils/request'

export function consignOrderPaging(params) {
  return request({
    url: '/api/consign/order-query/paging',
    method: 'get',
    params
  })
}
