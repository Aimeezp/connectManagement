<template>
  <div>
    <el-form
      :inline="true"
      :model="searchForm"
      class="deviceSearch"
    >
      <el-form-item>
        <el-select
          clearable
          v-model="searchForm.platform"
          placeholder="平台名称"
        >
          <el-option
            v-for="(item, index) in platNameList"
            :label="item.label"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          clearable
          v-model="searchForm.userStatus"
          placeholder="账号有效性"
        >
          <el-option
            v-for="(item, index) in effectiveList"
            :label="item.label"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          clearable
          v-model="searchForm.gender"
          placeholder="全部性别"
        >
          <el-option
            v-for="(item, index) in sexList"
            :label="item.label"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchForm.createDateAfter"
          value-format="yyyy-MM-dd"
          :picker-options="pickerEndDateBefore"
          type="date"
          placeholder="注册开始时间"
        >
        </el-date-picker> -
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchForm.createDateBefore"
          :picker-options="pickerEndDateAfter"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="注册结束时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchForm.expireDateAfter"
          value-format="yyyy-MM-dd"
          type="date"
          :picker-options="pickerEndDateBeforeU"
          placeholder="有效开始时间"
        >
        </el-date-picker> -
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchForm.expireDateBefore"
          :picker-options="pickerEndDateAfterU"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="有效结束时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input
          clearable
          class="searchInput"
          placeholder="企业名称、联系电话等关键词"
          v-model.trim="searchForm.condition"
          @keyup.enter.native="$parent.getList(1)"
        >
          <template slot="append">
            <div
              class="cursor"
              @click="getList(1)"
            >检索</div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="addAccount">新建账号</el-button>
      </el-form-item>
    </el-form>

    <el-table
        class="taskTable"
        v-loading="loading"
        :data="tableData">
        <el-table-column
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号">
        </el-table-column>
        <el-table-column
          v-for="(item, i) in tableCol"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :key="i">
        </el-table-column>
        <el-table-column
          align="center"
          label="性别">
          <template slot-scope="{ row: {gender} }">
            <span class="taskCheck" v-if="gender===0">女士</span>
            <span class="taskPass" v-else-if="gender===1">先生</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="有效性">
          <template slot-scope="{ row: {userStatus} }">
            <span class="taskCheck" v-if="userStatus==='0'">有效</span>
            <span class="taskPass" v-else-if="userStatus==='1'">无效</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="演示平台">
          <template slot-scope="{ row: {demoVersion} }">
            <span class="taskCheck" v-if="demoVersion==='CityDemo'">联城</span>
            <span class="taskPass" v-else-if="demoVersion==='EngineDemo'">联擎</span>
            <span class="taskPass" v-else-if="demoVersion==='AllDemo'">联擎、联城</span>
            <span class="taskPass" v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="{ row: {userId} }">
            <el-button type="text" @click="userDetail(userId)">查看</el-button>
            <el-button  type="text" @click="userManagment(userId)">管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :flag="true" ref="tables" :total="total"  :paginationFun="getList" :pageSizeFun="pageSizeFun"/>
  </div>
</template>
<script>
import pagination from '@/components/Pagination'
export default {
  data () {
    return {
      loading: false,
      total: 0,
      searchForm: {
        platform: '',
        roleId: '',
        userStatus: null,
        gender: '',
        createDateAfter: '', // 开始时间
        createDateBefore: '', // 结束时间
        expireDateAfter: '',
        expireDateBefore: '',
        condition: ''
      },
      platNameList: [
        {
          value: 'CityDemo',
          label: '联城'
        },
        {
          value: 'EngineDemo',
          label: '联擎'
        },
        {
          value: 'AllDemo',
          label: '联擎、联城'
        }
      ],
      effectiveList: [
        {
          value: 0,
          label: '有效'
        },
        {
          value: 1,
          label: '无效'
        }
      ],
      sexList: [
        {
          value: 1,
          label: '先生'
        },
        {
          value: 0,
          label: '女士'
        }
      ],
      tableData: [],
      tableCol: [
        {
          label: '注册时间',
          prop: 'createDate'
        },
        {
          label: '注册手机号',
          prop: 'tel',
          sortable: 'custom'
        },
        {
          label: '姓名',
          prop: 'userName'
        },
        {
          label: '邮箱',
          prop: 'mail'
        },
        {
          label: '试用期',
          prop: 'expireDate',
          sortable: 'custom'
        }
      ],
      urls: {
        list: '/getuser',
        datail: '/userinfo',
        managmentDatail: '/viewuser'
      },
      // 注册结束时间
      pickerEndDateAfter: {
        disabledDate: (time) => {
          if (this.searchForm.createDateAfter) {
            const start = new Date(this.searchForm.createDateAfter).getTime() - 8.64e7
            return time.getTime() < start
          }
          return false
        }
      },
      // 注册开始时间
      pickerEndDateBefore: {
        disabledDate: (time) => {
          if (this.searchForm.createDateBefore) {
            const end = new Date(this.searchForm.createDateBefore).getTime() - 8.64e7 + 3600 * 1000 * 24
            return time.getTime() > end
          }
          return false
        }
      },
      // 有效结束时间
      pickerEndDateAfterU: {
        disabledDate: (time) => {
          if (this.searchForm.expireDateAfter) {
            const start = new Date(this.searchForm.expireDateAfter).getTime() - 8.64e7
            return time.getTime() < start
          }
          return false
        }
      },
      // 有效开始时间
      pickerEndDateBeforeU: {
        disabledDate: (time) => {
          if (this.searchForm.expireDateBefore) {
            const end = new Date(this.searchForm.expireDateBefore).getTime() - 8.64e7 + 3600 * 1000 * 24
            return time.getTime() > end
          }
          return false
        }
      }
    }
  },
  components: { pagination },
  mounted () {
    this.$nextTick(() => {
      this.getList(1)
    })
  },
  methods: {
    pageSizeFun () {
      this.getList()
    },
    // 账号列表
    getList (currentPage) {
      this.loading = true
      const param = {}
      Object.assign(param, this.searchForm)
      param.pageSize = this.$refs.tables.pageSize
      param.pageNumber = currentPage || 1
      this.$post({
        url: this.urls.list,
        data: param
      }).then((res) => {
        const { data, status } = res
        if (parseInt(status, 10) === 1) {
          this.loading = false
          if (data) {
            this.tableData = data.list
            this.total = data.total
          }
        }
      })
    },

    // 查看账号详情
    userDetail (userId) {
      this.$post({
        url: `${this.urls.datail}/${userId}`
      }).then((res) => {
        const { data } = res
        sessionStorage.setItem('userInfo', JSON.stringify(data))
        this.$router.push({
          path: '/account-list/account-info',
          query: {
            id: userId
          }
        })
      })
    },

    // 新建账号页面跳转
    addAccount () {
      this.$router.push({
        path: '/account-list/account-info'
      })
    },

    // 管理详情
    userManagment (userId) {
      this.$post({
        url: `${this.urls.managmentDatail}/${userId}`
      }).then((res) => {
        const { data } = res
        sessionStorage.setItem('managmentInfo', JSON.stringify(data))
        this.$router.push({
          path: '/account-list/account-managment',
          query: {
            id: userId
          }
        })
      })
    }
  }
}
</script>
<style lang="scss">
.deviceSearch {
  .searchInput {
    .btn {
      cursor: pointer;
    }
    .el-input__inner {
      border-right: 0;
    }
    .el-input-group__append {
      background: none;
      padding: 0;
      > div {
        border-left: 1px solid #e0e0e0;
        padding: 0 10px;
      }
    }
  }
}
</style>
