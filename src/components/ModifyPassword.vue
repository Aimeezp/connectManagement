<template>
  <section class="passwordCons">
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="30%"
      center>
      <el-form :model="passwordFrom" :rules="rules" ref="passwordFrom" label-width="130px">
        <el-form-item label="请输入旧密码：" prop="oldUserPassword">
          <el-input clearable v-model="passwordFrom.oldUserPassword" placeholder="请输入旧密码" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="userPassword">
          <el-input clearable v-model="passwordFrom.userPassword" placeholder="新密码" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：" prop="reNewPsw">
          <el-input clearable v-model="passwordFrom.reNewPsw" placeholder="确认新密码" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item class="footerBtn">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitPassword('passwordFrom')" :loading="loading">保存</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </section>
</template>

<script>
import Utils from '../utils/utils'
import { newPass } from '@/assets/js/passwordRules'

export default {
  data () {
    const rePassWord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value !== this.passwordFrom.userPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      dialogVisible: false,
      passwordFrom: {
        oldUserPassword: '',
        userPassword: '',
        reNewPsw: ''
      },
      rules: {
        oldUserPassword: [
          { required: false, trigger: 'blur' },
          { min: 1, max: 20, message: '字符长度8~20之间,由大写字母、小写字母和数字组成' }
        ],
        userPassword: [
          { required: true, validator: newPass, trigger: 'blur' },
          { min: 8, max: 20, message: '字符长度8~20之间,由大写字母、小写字母和数字组成' }
        ],
        reNewPsw: [
          { required: true, validator: rePassWord, trigger: 'blur' },
          { min: 8, max: 20, message: '字符长度8~20之间,由大写字母、小写字母和数字组成' }
        ]
      },
      urls: {
        editPSW: '/altermanagepassword'
      }
    }
  },
  methods: {
    open () {
      this.dialogVisible = true
    },
    submitPassword (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$post({
            url: this.urls.editPSW,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              oldPassword: Utils.Encrypt(this.passwordFrom.oldUserPassword),
              newPassword: Utils.Encrypt(this.passwordFrom.userPassword)
            }
          }).then((res) => {
            const { status } = res
            this.loading = false
            if (parseInt(status, 10) === 1) {
              this.loading = true
              this.dialogVisible = false
              this.$message.success(' 修改密码成功！')
            }
          })
        }
      })
    }
  }
}
</script>
