<template>
  <div id="login-page" v-loading="loading">
    <div class="login-content">
      <div class="img">
        <div class="title">
          <img class="icon" :src="loginIcon" alt="平台icon" />
          <span>Demo管理后台</span>
        </div>
        <div class="welcomText">您好，欢迎使用</div>
      </div>
      <div class="content">
        <div class="content-rel">
          <div class="title">登录您的账号</div>
          <div class="subtitle">请注意账号安全</div>
          <div class="form-div">
            <div
              :class="['user-div', {'focusStyle': addClass[0]}, {'waringStyle': waring[0] || showTip}]"
            >
              <div class="iconfont-self">
                <i class="iconfont icon-zhanghao"></i>
              </div>
              <div class="line"></div>
              <div class="ipt-div">
                <input
                  type="text"
                  id="login-ipt-userName"
                  placeholder="请输入账号"
                  v-model.trim="form.userName"
                  @blur="blurFun('user')"
                  @focus="focusFun('user')"
                />
              </div>
            </div>
            <div
              :class="['user-div', {'focusStyle': addClass[1]}, {'waringStyle': waring[1] || showTip}]"
              style="margin-top: 26px"
            >
              <div class="iconfont-self">
                <i class="iconfont icon-mima"></i>
              </div>
              <div class="line"></div>
              <div class="ipt-div">
                <input
                  type="password"
                  id="login-ipt-pwd"
                  placeholder="请输入密码"
                  v-model.trim="form.password"
                  @keyup.enter="onlineFun"
                  @blur="blurFun('pwd')"
                  @focus="focusFun('pwd')"
                />
              </div>
            </div>
            <div class="user-div verify-code-div" style="border: 0;">
              <div
                :class="['ipt-div', {'focusStyle': addClass[2]}, {'waringStyle': waring[2] || showTip}]"
              >
                <div class="iptt-div">
                  <input
                    type="text"
                    id="login-ipt-yzm"
                    placeholder="请输入验证码"
                    @keyup.enter="onlineFun"
                    v-model="form.imageCode"
                    @blur="blurFun('yzm')"
                    @focus="focusFun('yzm')"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="img-div" @click="getImageCode">
                <img :src="verifyCodeSrc" alt="图形验证码" />
              </div>
            </div>
            <div class="err-tip">
              <el-checkbox id="login-ck-rem-pwd" v-model="checked">记住账号密码</el-checkbox>
              <span v-show="showTip" style="float: right;">{{ errText }}</span>
            </div>
          </div>
          <el-button id="login-btn-online" type="primary" class="online-btn" @click="onlineFun" :loading="btnLoading">登录</el-button>
        </div>
      </div>
    </div>
    <div class="footer">中国联通上海分公司物联网运营中心</div>
  </div>
</template>

<script>
// import CryptoJS from 'crypto-js'
// import { Local } from '../utils/storage'
import { userName, password } from '../storage/localStorage'
import loginicon from '../assets/images/login/whiteLogo.png'
import Utils from '../utils/utils'

export default {
  data () {
    return {
      btnLoading: false,
      verifyCodeIptV: '',
      verifyCodeSrc: '',
      addClass: [false, false, false],
      waring: [false, false, false],
      showTip: false,
      errText: '',
      loginIcon: loginicon,
      checked: true,
      form: {
        userName: '',
        password: '',
        imageCode: '',
        uuid: '',
        platform: 'DemoUserManage'
      },
      waringStyle: '#f56c6c',
      focusStyle: '#dcdfe6',
      userNameKey: userName,
      pwdKey: password,
      loading: false,
      urls: {
        login: '/login',
        imageCode: '/token/ImageCode'
      }
    }
  },
  mounted () {
    this.getImageCode()
    if (localStorage.getItem('userName')) {
      this.form.userName = Utils.Decrypt(
        localStorage.getItem('userName')
      )
    }
    if (localStorage.getItem('password')) {
      this.form.password = Utils.Decrypt(localStorage.getItem('password'))
    }
    this.addClass = false
  },
  methods: {
    getImageCode () {
      this.$post({
        url: this.urls.imageCode
      }).then((res) => {
        const { data } = res
        this.verifyCodeSrc = data.base64Str
        this.form.uuid = data.key
      })
    },
    focusFun (type) {
      this.showTip = false
      if (type === 'user') {
        this.addClass = [true, false, false]
      } else if (type === 'pwd') {
        this.addClass = [false, true, false]
      } else if (type === 'yzm') {
        this.addClass = [false, false, true]
      } else {
        this.addClass = [false, false, false]
      }
    },
    blurFun (type) {
      this.addClass = [false, false, false]
      if (type === 'user' && this.form.userName === '') {
        this.waring = [true, false, false]
      } else if (type === 'pwd' && this.form.password === '') {
        this.waring = [false, true, false]
      } else if (type === 'yzm' && this.form.imageCode === '') {
        this.waring = [false, false, true]
      } else {
        this.waring = [false, false, false]
      }
    },
    onlineFun () {
      if (
        this.form.userName === '' ||
        this.form.password === '' ||
        this.form.imageCode === ''
      ) {
        this.errText = '用户名/密码/验证码不能为空'
        this.showTip = true
        return
      }
      this.showTip = false
      this.loading = true
      this.btnLoading = true
      // 密码加密
      // this.form.password = Utils.Encrypt(this.form.password)
      const psw = Utils.Encrypt(this.form.password)
      const param = {}
      this.$post({
        url: this.urls.login,
        data: Object.assign(param, this.form, { password: psw }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        const { data } = res
        if (this.checked) {
          this.userNameKey = Utils.Encrypt(this.form.userName)
          localStorage.setItem('userName', this.userNameKey)
          localStorage.setItem('password', this.form.password)
        } else {
          if (localStorage.getItem('userName') && localStorage.getItem('password')) {
            localStorage.removeItem('userName')
            localStorage.removeItem('password')
          }
        }
        this.loading = false
        this.btnLoading = false
        this.getImageCode()
        sessionStorage.setItem('Authorization', data.token)
        this.$router.push({ path: '/account-list' })
      })
    }
  }
}
</script>

<style lang="scss">
@import "~scss_vars";
#login-page {
  $fontFaimly: PingFangTC-Medium;
  $color888: #888;

  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../assets/images/login/bg.png") no-repeat center center;
  background-size: cover;
  display: flex;
  // 中间内容部分
  .login-content {
    flex: 1;
    margin: 92px 216px;
    display: flex;
    box-sizing: border-box;
    position: relative;
    .img,
    .content {
      min-height: 450px;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label,
    .el-checkbox__label {
      color: #888888;
      font-size: 0.7vw;
    }
    // 左侧图
    .img {
      width: 70%;
      background: url("../assets/images/login/login.png") no-repeat center
        center;
      background-size: cover;
      display: flex;
      position: relative;
      .title {
        flex: 1;
        margin-top: 62px;
        margin-left: 62px;
        font-family: $fontFaimly;
        font-size: 1.6vw;
        color: #ffffff;
        .icon {
          width: 74px;
          height: 74px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
      .welcomText {
        font-family: $fontFaimly;
        font-size: 2.6vw;
        color: #ffffff;
        letter-spacing: 0;
        position: absolute;
        bottom: 64px;
        right: 63px;
      }
    }
    // 右侧登录信息
    .content {
      min-width: 320px;
      width: 30%;
      background-color: #fff;
      position: relative;
      .content-rel {
        width: 80%;
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        > div {
          width: 100%;
        }
        .title {
          text-align: center;
          font-family: $fontFaimly;
          font-size: 1.6vw;
          color: $color-primary;
        }
        .subtitle {
          text-align: center;
          font-family: PingFangTC-Regular;
          font-size: 0.7vw; // 14px
          color: $color888;
          margin-top: 10px;
        }
        // form 表单
        .form-div {
          /*margin: auto auto;*/
          margin-top: 1.2vw; // 46px
          div {
            box-sizing: border-box;
          }
          .user-div {
            display: flex;
            height: 50px;
            border: 1px solid;
            border-color: $color888;
            overflow: hidden;
            > div {
              line-height: 50px;
            }
            .iconfont-self {
              .iconfont {
                color: $color888;
                font-size: 1.6vw;
              }
            }
            .line {
              border-left: 1px solid $color888;
              height: 30px;
              margin: auto auto;
            }
            .ipt-div {
              margin-left: 2px;
              flex: 1;
              input {
                height: 100%;
                font-size: 0.8vw;
                width: 100%;
                border-width: 0;
                text-indent: 4px;
              }
              input:focus {
                outline: none;
              }
            }
          }
          .waringStyle {
            border-color: #f56c6c;
          }
          .focusStyle {
            border-color: #409eff;
          }
          .verify-code-div {
            margin-top: 26px;
            .ipt-div {
              border: 1px solid;
            }
            .iptt-div {
              flex: 1;
            }
            .img-div {
              width: 100px;
              margin-left: 20px;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .err-tip {
            margin-top: 10px;
            height: 20px;
            color: #f56362;
            font-size: 0.7vw;
          }
        }
        .online-btn {
          width: 100%;
          margin-top: 2vw;
          height: 50px;
          font-family: $fontFaimly;
          font-size: 1.6vw; // 24px
          color: #ffffff;
        }
      }
    }
  }
  // 页脚
  .footer {
    position: absolute;
    font-family: PingFangTC-Regular;
    font-size: 1vw;
    color: #d0d0d0;
    bottom: 30px;
    right: 0;
    left: 0;
    text-align: center;
  }
}
</style>
