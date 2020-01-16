<template>
  <el-aside class="navCons">
     <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo">
      <template v-for="(item, index) in routers[1].children">
        <el-menu-item class="menuItem" :key="index">
          <span slot="title">
            <router-link :to="item.path">{{item.title}}</router-link>
          </span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  data () {
    return {
      defaultActive: '0',
      routers: this.$router.options.routes
    }
  }
}
</script>
<style lang="scss">
.navCons{
  width:150px !important;
      .el-menu {
      border-right: none;
    }
    li {
      padding: 0 !important;
      text-align: center;
      &:first-child a{
        border-top:none;
      }
      a {
        text-decoration: none;
        color: #B5B5B5;
        display: block;
      }
      .router-link-active {
        color:#3bbbef;
        border-right: none;
      }
    }
    .el-menu-item:focus,
    .el-menu-item:hover,
    .el-submenu__title:focus,
    .el-submenu__title:hover,
    .el-menu-item.is-active,
    .menuItem {
      background: #fff;
    }
  .el-menu{
    height:100%;
  }
}
</style>
