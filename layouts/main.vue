<template>
  <div>
    <!-- <el-row class="header">
      <el-col :span="24">
        <navigation></navigation>
      </el-col>
    </el-row> -->
    <el-row class="container">
      <sidebar></sidebar>
      <el-col :span="21">
        <nuxt></nuxt>
      </el-col>
    </el-row>
    <el-row class="footer"></el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Navigation from '~/components/navigation.vue'
import Sidebar  from '~/components/sidebar.vue'


@Component({
  components: {
    Navigation,
    Sidebar
  }
})
export default class MainLayout extends Vue {}
</script>

<style lang="scss">
@import '../assets/scss/_reset';

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Lato, Helvetica, sans-serif;
  color: #333447;
  line-height: 1.6em;
  font-weight: 500;
  font-size: 0.95rem;
}

.container.el-row {
    display: flex;
    display: -webkit-flex;
  }
  .panel-body {
    padding: 20px;
    min-height: 100vh;
    max-height: 100%;
    background: #fff;

    .no-content {
      display: block;
      position: fixed;
      top: 50%;
      left: 50%;
      color: #8f8f8f;
      text-align: center;
      i {
        &:before {
          font-size: 80px;
        }
      }
    }

  }


</style>
