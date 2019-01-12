<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="consignOrderPagingForm" v-model="consignOrderPagingForm" :inline="true" class="demo-form-inline">
        <el-form-item :rules="rules.shopOrderId" prop="shopOrderId" label="shopOrderId: ">
          <el-input v-model.number="consignOrderPagingForm.shopOrderId" type="number" placeholder="shopOrderId" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item label="consignCode: ">
          <el-input v-model="consignOrderPagingForm.consignCode" placeholder="consignCode" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :rules="rules.shopDeliverId" prop="shopDeliverId" label="shopDeliverId: ">
          <el-input v-model.number="consignOrderPagingForm.shopDeliverId" type="number" placeholder="shopDeliverId" style="width: 130px;" class="filter-item"/>
        </el-form-item>
        <el-form-item label="status: ">
          <el-select v-model="consignOrderPagingForm.status" clearable style="width: 110px" class="filter-item">
            <el-option v-for="item in consignOrderStatusOptions" :key="item.code" :label="item.desc" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('consignOrderPagingForm')">{{ textMap.search }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm()">{{ textMap.reset }}</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="dataList"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column align="center" label="No." width="60px" fixed="left">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column :resizable="true" align="center" label="shopOrderId" width="130px">
        <template slot-scope="scope">
          {{ scope.row.shopOrderId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Marketplace" width="105px">
        <template slot-scope="scope">
          {{ scope.row.marketplace }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="OrderType" width="105px">
        <template slot-scope="scope">
          {{ scope.row.orderType }}
        </template>
      </el-table-column>
      <el-table-column :resizable="true" align="center" label="consignCode" width="150px">
        <template slot-scope="scope">
          {{ scope.row.consignCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="userId" width="80px">
        <template slot-scope="scope">
          {{ scope.row.buyerUserId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="shopId" width="80px">
        <template slot-scope="scope">
          {{ scope.row.sellerShopId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="deliverId" width="80px">
        <template slot-scope="scope">
          {{ scope.row.shopDeliverId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="status" sortable="true" width="90px">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="sendTime" width="160px">
        <template slot-scope="scope">
          {{ scope.row.sendTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="freezeStatus" width="120px">
        <template slot-scope="scope">
          {{ scope.row.freezeStatus }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="payTime" width="160px">
        <template slot-scope="scope">
          {{ scope.row.payTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" :resizable="true" align="center" label="extra" width="80px">
        <template slot-scope="scope">
          {{ scope.row.extra }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="environment" width="120px">
        <template slot-scope="scope">
          {{ scope.row.environment }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="createTime" width="160px">
        <template slot-scope="scope">
          {{ scope.row.createTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="updateTime" width="160px">
        <template slot-scope="scope">
          {{ scope.row.updateTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" fit fixed="right" label="操作" min-width="120px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row.consignCode)">{{ textMap.view }}</el-button>
          <el-button type="text" size="small" @click="handleClick(scope.row.consignCode)">{{ textMap.edit }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="consignOrderPagingForm.pageNo" :limit.sync="consignOrderPagingForm.pageSize" align="right" @pagination="getConsignOrderPagingData" />

  </div>
</template>

<script>
import { consignOrderPaging } from '@/api/consign/ConsignOrderQueryApi'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ConsignOrderPagingTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      dataList: null,
      total: 0,
      listLoading: true,
      consignOrderPagingForm: {
        pageNo: 1,
        pageSize: 20,
        shopOrderId: undefined,
        consignCode: undefined,
        shopDeliverId: undefined,
        status: undefined
      },
      consignOrderStatusOptions: [
        { code: 100, desc: '待发货' },
        { code: 200, desc: '已发货' },
        { code: 210, desc: '已签收' },
        { code: 300, desc: '无需发货' }
      ],
      calendarTypeOptions,
      textMap: {
        view: 'View',
        edit: 'Edit',
        search: 'Search',
        reset: 'Reset'
      },
      rules: {
        shopOrderId: [{ required: false }, { type: 'number', message: '订单编号必须为数字', trigger: 'blur' }],
        shopDeliverId: [{ required: false }, { type: 'number', message: '发货地必须为数字', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getConsignOrderPagingData()
  },
  methods: {
    // 查询履约单
    getConsignOrderPagingData() {
      this.listLoading = true
      consignOrderPaging(this.consignOrderPagingForm).then(response => {
        this.total = response.data.count
        this.dataList = response.data.rows
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 300)
      })
    },
    // 提交查询
    onSubmit() {
      this.getConsignOrderPagingData()
    },
    // 重置表单
    resetForm() {
      this.restFormData()
    },
    // 重置表单model数据
    restFormData() {
      this.consignOrderPagingForm = {
        pageNo: 1,
        pageSize: 20,
        shopOrderId: undefined,
        consignCode: undefined,
        shopDeliverId: undefined,
        status: undefined
      }
    },
    // json格式化, 只是为了处理时间戳
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
