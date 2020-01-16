<template>
  <div class="accountFrom">
    <el-form :model="accountFrom" :rules="rules" ref="accountFrom" label-width="150px">
      <el-form-item label="账号：" prop="account">
        <el-input clearable v-model="accountFrom.account" placeholder="请输入账号(手机号码)" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="登录密码：" prop="userPassword">
        <el-input clearable v-model="accountFrom.userPassword" placeholder="请输入登录密码" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="再次输入登录密码：" prop="reLoginPsw">
        <el-input clearable v-model="accountFrom.reLoginPsw" placeholder="再次输入登录密码" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="userName">
        <el-input clearable v-model="accountFrom.userName" placeholder="请输入姓名" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="mail">
        <el-input clearable v-model="accountFrom.mail" placeholder="请输入邮箱" :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-select v-model="accountFrom.gender" :disabled="isEdit">
          <el-option :label="item.label" :value="item.value" v-for="(item, index) in sexList" :key="index" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="有效期：">
        <el-input  v-model="accountFrom.lastDay"  disabled></el-input>
      </el-form-item>
      <el-form-item label="到期日期：">
        <el-input  v-model="accountFrom.expireDate"  disabled></el-input>
      </el-form-item>
      <el-form-item label="演示版本：">
        <el-select v-model="accountFrom.demoVersion" :disabled="isEdit">
          <el-option v-for="(item, index) in demoList" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="footerBtn">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submitAccount('accountFrom')" :loading="loading">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Utils from '../../utils/utils'
import { newPass, emailPass, telPass } from '@/assets/js/passwordRules'

export default {
  data () {
    const rePassWord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value !== this.accountFrom.userPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      isPSW: this.$route.query.id,
      isEdit: false,
      accountFrom: {
        account: '',
        userPassword: '',
        reLoginPsw: '',
        reSerPassword: '',
        reReLoginPsw: '',
        userName: '',
        mail: '',
        gender: 1,
        expireDate: '',
        lastDay: '注册之日起30天内有效',
        demoVersion: 'EngineDemo'
      },
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
      rules: {
        account: [
          { required: true, validator: telPass, trigger: 'blur' },
          { max: 20, message: '最大长度20个字符' }
        ],
        userPassword: [
          { required: true, validator: newPass, trigger: 'blur' },
          { min: 8, max: 20, message: '字符长度8~20之间,由大写字母、小写字母和数字组成' }
        ],
        reLoginPsw: [
          { required: true, validator: rePassWord, trigger: 'blur' },
          { min: 8, max: 20, message: '字符长度8~20之间,由大写字母、小写字母和数字组成' }
        ],
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { max: 20, message: '最大长度20个字符' }
        ],
        mail: [
          { required: false, validator: emailPass, trigger: 'blur' },
          { max: 50, message: '最大长度50个字符' }
        ]
      },
      urls: {
        add: '/adduser',
        editPSW: '/alterpassword'
      }
    }
  },
  mounted () {
    this.formDatas()

    // 默认到期日期：当前日期+30days
    var dateCur = new Date()
    var dateCur2 = new Date(dateCur)
    dateCur2.setDate(dateCur.getDate() + 30)
    if (dateCur2.getMonth() < 9) {
      this.accountFrom.expireDate = `${dateCur2.getFullYear()}-0${dateCur2.getMonth() + 1}-${dateCur2.getDate()}`
    } else {
      this.accountFrom.expireDate = `${dateCur2.getFullYear()}-${dateCur2.getMonth() + 1}-${dateCur2.getDate()}`
    }

    if (this.isPSW) this.isEdit = true

    if (!this.isPSW) {
      this.accountFrom.account = ''
      this.accountFrom.userPassword = ''
    }
  },
  methods: {
    formDatas () {
      if (this.isPSW) {
        Object.assign(this.accountFrom, JSON.parse(sessionStorage.getItem('userInfo')))
      }
    },
    submitAccount (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const param = {}
          const psw = Utils.Encrypt(this.accountFrom.userPassword)
          this.loading = true
          // 修改密码
          if (this.isPSW) {
            this.$post({
              url: this.urls.editPSW,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: Object.assign(param, { userPassword: psw, userId: this.isPSW })
            }).then((res) => {
              const { status } = res
              this.loading = false
              if (parseInt(status, 10) === 1) {
                this.$router.push({
                  path: '/account-list'
                })
                this.$message.success(' 修改密码成功！')
              }
            })
          } else { // 新建账户
            this.$post({
              url: this.urls.add,
              data: Object.assign(param, this.accountFrom, { userPassword: psw })
            }).then((res) => {
              const { status } = res
              this.loading = false
              if (parseInt(status, 10) === 1) {
                this.$router.push({
                  path: '/account-list'
                })
                this.$message.success(' 新建账户成功！')
              }
            })
          }
        }
      })
    },
    cancel () {
      this.formDatas()
      this.$router.push({ path: '/account-list' })
    }
  }
}
</script>
<style lang="scss">
.accountFrom{
   width:30%;
   margin: 3% auto;
   .el-select{
     width:100%;
   }
   .el-form-item{
     margin-bottom: 30px;
   }
}
</style>
