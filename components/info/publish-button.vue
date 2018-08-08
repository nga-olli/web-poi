<template>
  <el-switch
    v-model="isPublish"
    active-color="#2ecc71"
    inactive-color="#bdc3c7"
    @change="onChange()">
  </el-switch>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import { Action, State } from 'vuex-class';

@Component({
  // notifications: {
  //   importSuccess: {
  //     icon: 'fas fa-exclamation-triangle',
  //     position: 'bottomCenter',
  //     title: 'Upload success',
  //     toastOnce: true,
  //     type: 'success'
  //   }
  // }
})
export default class PublishButton extends Vue {
  // @Action('infos/import_octoparse') importAction;

  isPublish: boolean = false;

  onChange() {
    console.log(this.isPublish)
  }
}

</script>
