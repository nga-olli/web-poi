<template>
  <div class="change-region-button">
    <el-popover
      ref="myRegion"
      placement="bottom-start"
      v-model="visible">
      <div class="tagPopover">
        Change region
        <div class="submit-box">
          <el-button size="mini" type="text" @click="onCancel" class="cancel-button">
            Cancel
          </el-button>
          <el-button size="mini" type="text" @click="onConfirm" :loading="loading">
            Done
          </el-button>
        </div>
      </div>
    </el-popover>

    <el-button
      v-popover:myRegion
      icon="el-icon-fa-times-circle"
      size="mini"
      type="text"
      class="text-danger"></el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';
import { Action } from 'vuex-class';

@Component
export default class ChangeRegionButton extends Vue {
  @Prop() item: any;

  loading: boolean = false;
  visible: boolean = false;

  onCancel() { this.visible = false; }

  async onConfirm() {
    this.loading = true;

    // await this.updateSimilarAction({
    //   id: this.id,
    //   similar: this.tags
    // });

    this.loading = false;

    this.visible = false;

    return;
  }
}
</script>

<style lang="scss">
   .el-icon-fa-times-circle {
    color: #e74c3c;
  }
  [class^="el-icon-fa-times-circle"], [class*=" el-icon-fa-times-circle"] {
    font: normal normal normal 20px/1 FontAwesome !important;
  }
</style>
