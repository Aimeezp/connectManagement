<template>
  <div class="magCons">
    <div class="borderCon">
      <ul class="info clearfix" >
        <li><span>姓名：</span><span>{{detailInfo.userName || '--'}}</span></li>
        <li><span>邮箱：</span><span>{{detailInfo.mail || '--'}}</span></li>
        <li><span>注册时间：</span><span>{{detailInfo.createDate || '--'}}</span></li>
        <li><span>到期日期：</span><span>{{detailInfo.expireDate || '--'}}</span><el-button type="text" class="textBtn" @click="addDate" :disabled="isAddAate">续租</el-button></li>
        <li><span>注册手机号：</span><span>{{detailInfo.tel || '--'}}</span></li>
        <li><span>性别：</span><span v-if="detailInfo.gender === 0">女士</span><span v-else-if="detailInfo.gender === 1">先生</span><span v-else>--</span></li>
        <li><span>有效期：</span><span>{{detailInfo.lastDate || '--'}}</span></li>
        <li>
          <span>演示版本：</span>
          <el-select v-model="detailInfo.demoVersion">
            <el-option v-for="(item, index) in demoList" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
          </li>
      </ul>
    </div>

    <div class="alarmCons borderCon">
      <div>告警设备：</div>
      <div>
        <el-checkbox-group v-model="alarmDevice">
          <el-checkbox
            border
            :label="item.label"
            name="alarmDevice"
            :disabled="item.disabled"
            v-for="(item, index) in alarmDeviceList"
            :key="index">
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="concactCons borderCon">
      <el-form :model="concactForm" ref="concactForm" label-width="100px" class="demo-dynamic" :rules="rules">
        <el-form-item prop="contactName" label="联系人：">
          <el-input v-model="concactForm.contactName"></el-input>
        </el-form-item>
        <el-form-item prop="tel" label="电话号码：">
          <el-input v-model="concactForm.tel"></el-input>
        </el-form-item>
        <el-form-item class="add">
          <el-button @click="addDomain('concactForm')" :disabled="addDisabled">添加</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" style="width: 60%" border>
      <el-table-column prop="contactName" align="center" label="姓名"></el-table-column>
      <el-table-column prop="tel" align="center" label="电话"></el-table-column>
      <el-table-column  align="center" label="通知方式">
         <template>
           <span>短信</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
         <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index)"
            type="text">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <p style="margin-top:10px"><span style="color:red">*</span> 每个账户最多添加3个联系人</p>
    </div>

    <div class="alarmCons borderCon">
      <div>演示场景：</div>
      <div>
        <el-checkbox-group v-model="sceneDevice">
          <el-checkbox
            border
            :label="item.label"
            :disabled="item.disabled"
            name="sceneDevice"
            v-for="(item, index) in sceneDeviceList"
            :key="index">
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <div>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submitMan" :loading="loading">提交</el-button>
    </div>
  </div>
</template>
<script>
import { telPass } from '@/assets/js/passwordRules'
export default {
  data () {
    return {
      isAddAate: true,
      loading: false,
      demoList: [
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
          label: '联城、联擎'
        }
      ],
      addDisabled: false,
      tableData: [
      ],
      infoTypeList: [
        {
          label: '短信',
          value: 0
        },
        {
          label: '语音',
          value: 1
        },
        {
          label: '短信和语音',
          value: 2
        }
      ],
      alarmDeviceList: [
        {
          disabled: true,
          label: '烟雾告警'
        },
        {
          disabled: true,
          label: '一键呼救'
        },
        {
          disabled: true,
          label: '消防栓帽'
        },
        {
          disabled: true,
          label: '红外监控'
        },
        {
          disabled: true,
          label: '窖井井盖'
        },
        {
          disabled: true,
          label: '消防地磁'
        },
        {
          disabled: true,
          label: '燃气告警'
        }
      ],
      alarmDevice: ['烟雾告警'],
      sceneDeviceList: [
        {
          disabled: true,
          label: '烟雾告警'
        },
        {
          disabled: true,
          label: '一键呼救'
        },
        {
          disabled: true,
          label: '超声波'
        },
        {
          disabled: true,
          label: '垃圾桶'
        },
        {
          disabled: true,
          label: '摄像监控'
        },
        {
          disabled: true,
          label: '消防栓帽'
        },
        {
          disabled: true,
          label: '红外监控'
        },
        {
          disabled: true,
          label: '电梯监控'
        },
        {
          disabled: true,
          label: '水表监控'
        },
        {
          disabled: true,
          label: '扬尘监控'
        },
        {
          disabled: true,
          label: '窖井井盖'
        },
        {
          disabled: true,
          label: '消防地磁'
        },
        {
          disabled: true,
          label: '环境监控'
        },
        {
          disabled: true,
          label: '水压监控'
        },
        {
          disabled: true,
          label: '噪声监控'
        },
        {
          disabled: true,
          label: '燃气告警'
        },
        {
          disabled: true,
          label: '智能灯杆'
        },
        {
          disabled: true,
          label: '空气监控'
        },
        {
          disabled: true,
          label: '水质监控'
        },
        {
          disabled: true,
          label: '温感监控'
        }
      ],
      sceneDevice: ['烟雾告警'],
      concactForm: {
        contactName: '',
        tel: ''
      },
      detailInfo: {
        createDate: '',
        userName: '',
        mail: '',
        lastDate: '注册之日起30天内有效',
        tel: '',
        gender: '',
        expireDate: '',
        demoVersion: ''
      },
      rules: {
        contactName: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' },
          { max: 20 }
        ],
        tel: [
          { required: true, validator: telPass, trigger: 'blur' }
        ]
      },
      urls: {
        managment: '/viewuser',
        sumManagment: '/alteruser'
      }
    }
  },
  mounted () {
    this.formDatas()
    // 判断当前日期是否大于到期日期 大于：disabled
    const dateInfo = (new Date(this.detailInfo.expireDate).getTime())
    const nowDate = new Date().getTime()
    if (this.detailInfo.expireDate && (nowDate > dateInfo)) {
      this.isAddAate = false
    }
  },
  methods: {
    formDatas () {
      Object.assign(this.detailInfo, JSON.parse(sessionStorage.getItem('managmentInfo')))
      this.tableData = this.detailInfo.contactList
    },

    // 续租
    addDate () {
      const date = new Date(this.detailInfo.expireDate)
      const dateNew = new Date(date)
      const expireDate = dateNew.setDate(date.getDate() + 30)
      this.detailInfo.expireDate = `${new Date(expireDate).getFullYear()}-${new Date(expireDate).getMonth() + 1}-${new Date(expireDate).getDate()}`
    },

    // 添加联系人
    addDomain (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.tableData.push(this.concactForm)
          this.concactForm = {
            contactName: '',
            tel: ''
          }
          this.addDisable()
        }
      })
    },
    // 列表最多添加3个联系人
    addDisable () {
      if (this.tableData.length === 3) this.addDisabled = true
      else this.addDisabled = false
    },
    // 提交
    submitMan (formName) {
      this.loading = true
      this.$post({
        url: this.urls.sumManagment,
        data: this.detailInfo
      }).then((res) => {
        const { status } = res
        this.loading = false
        if (parseInt(status, 10) === 1) {
          this.$router.push({
            path: '/account-list'
          })
          this.$message.success(' 提交成功！')
        }
      })
    },
    // 取消
    cancel () {
      this.formDatas()
      this.$router.push({ path: '/account-list' })
    },
    // 删除联系人
    deleteRow (row) {
      this.tableData.splice(row, 1)
      this.addDisable()
    }
  }
}
</script>
<style lang="scss">
  .magCons{
    background: #fff;
    padding: 20px;
    >div{
      margin-bottom: 30px;
    }
    .borderCon{
      border:1px solid #ccc8c8;
      padding: 10px;
    }
    .info{
      li{
        width:25%;
        float:left;
        display: flex;
        .textBtn{
          padding-left: 10px;
        }
        .el-button{
          padding-top: 0;
        }
      }
      .el-select{
        width:40%
      }
    }
    .alarmCons{
      display:flex;
      >div{
        &:nth-child(2){
          flex:1;
          .el-checkbox{
            margin-bottom: 20px;
          }
          .el-checkbox.is-bordered+.el-checkbox.is-bordered{
            margin-left: 0;
          }
        }
      }

    }
    .concactCons{
      .el-form{
        display:flex;
        .add{
          .el-form-item__content{
            margin-left: 20px !important;
          }
        }
      }
    }
  }
</style>
