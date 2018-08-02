<template>
    <el-aside class="el-col-3">
      <el-col :span="24"><div class="logo"><img src="/img/logo-olli.png" width="40"></div></el-col>
       <el-col :span="24">
        <el-menu expand-trigger="hover" unique-opened :default-active="$route.path" router :collapse="isCollapse">
          <template>
            <el-menu-item index="/">
              <i class="el-icon-fa-bank"></i> Types
            </el-menu-item>
            <el-menu-item index="/info">
              <i class="el-icon-fa-map-marker"></i> Infomation
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
    </el-aside>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class Sidebar extends Vue {
  isCollapse: boolean = true;
}
</script>

<style lang="scss" scoped>
aside {
  position: relative;
  z-index: 1;
  box-shadow: 0 0 20px rgba(154, 158, 175, 0.68);
  -moz-box-shadow: 0 0 20px rgba(154, 158, 175, 0.68);
  -webkit-box-shadow: 0 0 20px rgba(154, 158, 175, 0.68);
}
.logo {
  padding: 20px;
}
.el-col-3 {
  width: 12.5% !important;
}

.el-menu--collapse {
  width: auto;
}
.el-menu--collapse > .el-menu-item span,
.el-menu--collapse > .el-submenu > .el-submenu__title span {
  width: auto;
  height: auto;
  visibility: visible;
}
</style>

<style lang="scss">
.el-menu--collapse > .el-menu-item .el-submenu__icon-arrow,
.el-menu--collapse > .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
  display: block;
}

.el-menu {
  border: 0;
  .el-menu-item,
  .el-submenu__title {
    height: 30px;
    line-height: 30px;
    border-right: 2px solid transparent;
    color: #878d99;
    text-transform: uppercase;
    margin-bottom: 15px;
    font-size: 12px;
    [class^="el-icon-"] {
      color: #c1b1c7;
    }
    &:hover,
    &:hover .el-icon-fa,
    &:hover .el-submenu__icon-arrow,
    &.is-active {
      background: transparent;
      border-color: #409eff;
      color: #409eff;
    }
  }
}
.el-submenu.is-opened {
  .el-submenu__title,
  .el-icon-fa,
  .el-submenu__icon-arrow {
    border-color: #409eff;
    color: #409eff;
  }
}
.el-menu--popup-right-start {
  margin-left: 0;
  .el-menu-item {
    text-transform: capitalize;
    font-size: 14px;
    &:hover {
      border-color: transparent;
    }
  }
}
</style>
