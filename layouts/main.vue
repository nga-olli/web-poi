<template>
  <div>
    <!-- <el-row class="header">
      <el-col :span="24">
        <navigation></navigation>
      </el-col>
    </el-row> -->
    <el-row class="container">
      <el-col :span="24">
        <nuxt></nuxt>
      </el-col>
    </el-row>
    <el-row class="footer"></el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Navigation from '~/components/navigation.vue'

@Component({
  components: {
    Navigation
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

</style>
