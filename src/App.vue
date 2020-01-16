<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// import * as config from '@/config/env'
// export default {
//   data () {
//     return {

//     }
//   },
//   created () {
//     console.log(config.baseIP)
//     console.log(config.publicPath)
//   }
// }
</script>

<style lang="scss">
@import "~scss_vars";

body {
  margin: 0;
  padding: 0;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  font-family: $font-family;
  background-color: $color-body;
  color: $font-second-color;
}

#app {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  //primary btn color
  .el-button--primary {
    background-color: $color-primary;
    border-color: $color-primary;
  }
  .el-button--primary:focus,
  .el-button--primary:hover {
    background-color: $color-primary;
    border-color: $color-primary;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

//clear float
.clearfix:after {
  clear: both;
  display: block;
  content: "";
}

//del init style
dl,
dd,
ul,
p {
  margin: 0;
}

@for $i from 1 to 6 {
  h#{$i} {
    margin: 0;
  }
}

ul {
  list-style: none;
  padding: 0;
}

b {
  font-weight: normal;
}

i {
  font-style: normal;
}
.cursor {
  cursor: pointer;
}
// table operate style
.table-operate-style {
  color: $color-primary;
  padding-right: 10px;
}
// table thead style
.tableList {
  th {
    background: $list-header-color;
    color: #333;
  }
  .infoBtn {
    color: $color-primary;
    padding-right: 10px;
  }
  .disabled {
    opacity: 0.5;
    cursor: no-drop;
  }
  /* table operate style*/
  .tableBtnGroup {
    word-break: keep-all;
    font-size: 14px;
    .tableBtn {
      color: $color-primary;
      margin-right: 10px;
      cursor: pointer;
    }
    .disabledBtn{
      color: $font-weakTip-color;
      cursor: not-allowed;
    }
    .tableBtnReview {
      margin-right: 10px;
      cursor: pointer;
    }
    .btnDisable {
      color: #afe1ff;
      cursor: not-allowed;
    }
  }
}
/*modal tille and atn center*/
.dialog-self {
  // title
  .el-dialog__header {
    .el-dialog__title {
      font-size: 18px;
      color: #333333;
    }
  }
  // footer btn center
  .el-dialog__footer {
    min-width: 276px;
  }
  .el-button {
    border: 1px solid $color-primary;
    border-radius: 3px;
    font-size: 16px;
    width: 100px;
  }
  .el-button--default {
    color: $color-primary;
  }
  .el-button--primary {
    color: #fff;
  }
}
.floatRight {
  float: right;
}
// del form red star
/*.el-form-item.is-required .el-form-item__label:before {*/
  /*display: none;*/
/*}*/

// ipt get focus border style
.el-input__inner:focus {
  border: 1px solid #409eff;
}

/*search ipt style start*/
.searchInput {
  width: 380px;
  > input {
    border-right: 0;
  }
  .el-input-group__append {
    padding: 0;
    background-color: #fff;
    > div {
      font-size: 16px;
      padding: 0 10px;
      border-left: 1px solid #e0e0e0;
      color: #333;
      cursor: pointer;
    }
  }
}
/*search ipt style  end*/
</style>
