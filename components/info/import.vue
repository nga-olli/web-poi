<template>
  <el-upload
    action=""
    multiple
    :auto-upload="false"
    with-credentials
    :file-list="myFiles"
    :on-change="onChange"
    :on-remove="onRemove"
    >
    <el-button slot="trigger" size="mini" type="primary">
      Select Octoparse files
    </el-button>
    <el-button v-show="myFiles.length > 0" :loading="loading" style="margin-left: 10px;" size="mini" icon="el-icon-fa-upload" type="success" @click="onUpload">
      Import
    </el-button>
    <div class="el-upload__tip" slot="tip">
      Only .xsls is allowed
    </div>
  </el-upload>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import { Action, State } from 'vuex-class';

@Component
export default class ImportButton extends Vue {
  @Action('infos/import_octoparse') importAction;

  loading: boolean = false;
  myFiles: any[] = [];

  onChange(file, filelist) {
    this.myFiles = filelist;
  }

  onRemove(file, filelist) {
    this.myFiles = filelist;
  }

  async onUpload() {
    try {
      this.loading = true;
      await this.importAction({ formData: this.myFiles });
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  }
}
</script>
