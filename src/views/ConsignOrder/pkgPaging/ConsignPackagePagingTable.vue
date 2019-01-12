<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="consignPackagePagingForm" v-model="consignPackagePagingForm" :inline="true" class="demo-form-inline">
        <el-form-item label="consignCode: ">
          <el-input v-model="consignPackagePagingForm.consignCode" placeholder="consignCode" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item label="status: ">
          <el-select v-model="consignPackagePagingForm.status" clearable style="width: 110px" class="filter-item">
            <el-option v-for="item in consignPackageStatusOptions" :key="item.code" :label="item.desc" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('consignPackagePagingForm')">{{ textMap.search }}</el-button>
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
      <el-table-column :resizable="true" align="center" label="consignCode" width="150px">
        <template slot-scope="scope">
          {{ scope.row.consignCode }}
        </template>
      </el-table-column>
      <el-table-column :resizable="true" align="center" label="sellerShopId" width="150px">
        <template slot-scope="scope">
          {{ scope.row.sellerShopId }}
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" label="packageCode" width="80px">
        <template slot-scope="scope">
          {{ scope.row.packageCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="logisticsChannel" width="120px">
        <template slot-scope="scope">
          {{ scope.row.logisticsChannel }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="logisticsNumber" width="120px">
        <template slot-scope="scope">
          {{ scope.row.logisticsNumber }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="status" sortable="true" width="90px">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="firstTime" width="160px">
        <template slot-scope="scope">
          {{ scope.row.firstTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="takingTime" width="160px">
        <template slot-scope="scope">
          {{ scope.row.takingTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="confirmTime" width="160px">
        <template slot-scope="scope">
          {{ scope.row.confirmTime | formatDate }}
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

    <pagination v-show="total>0" :total="total" :page.sync="consignPackagePagingForm.pageNo" :limit.sync="consignPackagePagingForm.pageSize" align="right" @pagination="getConsignOrderPagingData" />

  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import { consignPackagePaging } from '@/api/consign/ConsignPackageQueryApi'
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
  name: 'ConsignPackagePagingTable',
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
      consignPackagePagingForm: {
        pageNo: 1,
        pageSize: 20,
        consignCode: undefined,
        status: undefined
      },
      consignPackageStatusOptions: [
        { code: 100, desc: '已打包' },
        { code: 110, desc: '已揽件' },
        { code: 120, desc: '已签收' }
      ],
      calendarTypeOptions,
      textMap: {
        view: 'View',
        edit: 'Edit',
        search: 'Search',
        reset: 'Reset'
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
      consignPackagePaging(this.consignPackagePagingForm).then(response => {
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
      this.resetFormData()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetFormData() {
      this.consignPackagePagingForm = {
        pageNo: 1,
        pageSize: 20,
        consignCode: undefined,
        status: undefined
      }
    },
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
