<template>
  <div class="comHeader">
     <div class="icon">
        <img src="../assets/images/login/logo.png">
    </div>
    <div class="online-register-btn">
      <el-button @click="$refs.passwordDio.open()">修改密码</el-button>
      <el-button @click="loginOut">退出</el-button>
       <password ref="passwordDio"></password>
    </div>
  </div>
</template>
<script>
import password from './ModifyPassword'

export default {
  components: { password },
  methods: {
    loginOut () {
      this.$confirm('确认退出吗?', '提示', {}).then(() => {
        sessionStorage.removeItem('Authorization')
        this.$router.push('/')
      })
    }
  }
}

</script>
<style lang="scss">
.comHeader{
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  .icon{
    height:80%;
    img{
      height:100%;
    }
  }
}
</style>
