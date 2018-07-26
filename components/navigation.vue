<template>
  <el-menu mode="horizontal" unique-opened :default-active="$route.path" router>
    <el-submenu index="/entity">
      <template slot="title">Entity</template>
      <el-menu-item index="/entity">
        <i class="el-icon-fa-navicon"></i>
        List
      </el-menu-item>
    </el-submenu>
    <el-dropdown class="avatar-container" v-if="currentUser">
      <div class="avatar-wrapper">
        <span class="user-name">
          {{ currentUser.fullName }}
        </span>
        <img v-if="currentUser.avatar !== ''" :src="currentUser.avatar" width="30" height="30" class="user-avatar">
        <img v-else src="/img/default_avatar.png" width="30" height="30" class="user-avatar">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item>
          <nuxt-link to="/logout">
            <span style="display:block;">Logout</span>
          </nuxt-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Navigation extends Vue {
  @Getter('loggedUser') currentUser
}
</script>

<style lang="scss">
.el-menu--horizontal {
  height: 45px;

  .el-menu-item {
    height: 45px;
    line-height: 45px;
  }

  .el-submenu {
    .el-menu {
      top: 50px;
    }
    .el-submenu__title {
      height: 45px;
      line-height: 45px;
    }
  }

  .avatar-container {
    height: 43px;
    display: inline-block;
    float: right;
    margin-right: 40px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 7px;
      position: relative;
      float: left;
      clear: both;

      .user-name {
        float: left;
        padding-top: 7px;
        padding-right: 10px;
      }
      .user-avatar {
        width: 30px;
        height: 30px;
        border-radius: 15px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 10px;
        font-size: 12px;
      }
    }
  }

  .locale-container {
    cursor: pointer;
    float: right;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 14px;
    font-size: 14px;
    border-right: 1px solid #ecf0f1;
    padding-right: 15px;
  }
}
</style>
