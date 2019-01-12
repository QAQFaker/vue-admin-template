import request from '@/utils/request'

export function consignPackagePaging(params) {
  return request({
    url: '/api/consign/pkg-query/paging',
    method: 'get',
    params
  })
}
