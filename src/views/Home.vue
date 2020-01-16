<template>
  <el-container class="homePage">
    <el-header>
      <HeaderCom/>
    </el-header>
    <el-container>
      <navLeft />
      <el-main class="routePart">
        <transition
          name="fade"
          mode="out-in"
        >
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderCom from '@/components/HeaderCom'
import navLeft from '@/components/Nav'

export default {
  components: { navLeft, HeaderCom }
}
</script>

<style lang="scss">
.homePage {
  min-height: 100%;
}
</style>
