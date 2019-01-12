<!--<template>-->
  <!--<div class="app-container">-->
    <!--<div>-->
      <!--<el-table-->
        <!--v-loading="listLoading"-->
        <!--:data="dataList"-->
        <!--element-loading-text="Loading"-->
        <!--border-->
        <!--fit-->
        <!--show-header-->
        <!--overflow="auto"-->
        <!--highlight-current-row>-->
        <!--<el-table-column align="center" label="序号" width="60px" fixed="left">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.$index + 1 }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="shopOrderId" width="130px">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.row.shopOrderId }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="Marketplace" width="105px">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.row.marketplace }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="OrderType" width="105px">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.row.orderType }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="consignCode" width="150px">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.row.consignCode }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="userId" width="80px">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.row.buyerUserId }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="shopId" width="80px">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.row.sellerShopId }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="deliverId" width="80px">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.row.shopDeliverId }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="status" width="80px">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.row.status }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="sendTime" width="160px">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.row.sendTime | formatDate }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="freezeStatus" width="120px">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.row.freezeStatus }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="payTime" width="160px">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.row.payTime | formatDate }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="extra" width="80px">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.row.extra }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="environment" width="120px">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.row.environment }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="createTime" width="160px">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.row.createTime | formatDate }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="updateTime" width="160px">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.row.updateTime | formatDate }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" fixed="right" label="操作" width="100px">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button type="text" size="small" @click="handleClick(scope.row.consignCode)">查看</el-button>-->
            <!--<el-button type="text" size="small" @click="handleClick(scope.row.consignCode)">编辑</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    <!--</div>-->
    <!--<div class="block">-->
      <!--<el-pagination-->
        <!--:total="total"-->
        <!--:current-page="1"-->
        <!--:page-sizes="[3, 5, 10, 20, 30, 40, 50]"-->
        <!--:page-size="3"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"/>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import { MessageBox } from 'element-ui'-->
<!--import { consignOrderPaging } from '@/api/consign/ConsignQueryApi'-->

<!--export default {-->
  <!--filters: {-->
    <!--statusFilter(status) {-->
      <!--const statusMap = {-->
        <!--published: 'success',-->
        <!--draft: 'gray',-->
        <!--deleted: 'danger'-->
      <!--}-->
      <!--return statusMap[status]-->
    <!--}-->
  <!--},-->
  <!--data() {-->
    <!--return {-->
      <!--pagingData: null,-->
      <!--total: null,-->
      <!--dataList: null,-->
      <!--pagingParam: {-->
        <!--pageNo: 0,-->
        <!--pageSize: 20,-->
        <!--consignCode: null-->
      <!--},-->
      <!--isRouterAlive: true,-->
      <!--listLoading: true-->
    <!--}-->
  <!--},-->
  <!--created() {-->
    <!--this.fetchData()-->
  <!--},-->
  <!--methods: {-->
    <!--fetchData() {-->
      <!--this.listLoading = true-->
      <!--consignOrderPaging(this.pagingParam).then(response => {-->
        <!--console.log(response)-->
        <!--this.pagingData = response.data-->
        <!--this.total = response.data.count-->
        <!--this.dataList = response.data.rows-->
        <!--this.listLoading = false-->
      <!--})-->
    <!--},-->
    <!--handleSizeChange() {-->
      <!--console.log('test')-->
      <!--this.pagingParam = {-->
        <!--pageNo: 0,-->
        <!--pageSize: 10,-->
        <!--consignCode: null-->
      <!--}-->
      <!--consignOrderPaging(this.pagingParam)-->
    <!--},-->
    <!--handleCurrentChange() {-->
      <!--console.log('test2')-->
      <!--MessageBox.confirm('wtf2')-->
    <!--},-->
    <!--reload() {-->
      <!--this.isRouterAlive = false-->
      <!--this.$nextTick(() => (this.isRouterAlive = true))-->
    <!--}-->
  <!--}-->
<!--}-->
<!--</script>-->
