<template>
  <div class="add-tag-button">
    <el-popover
      ref="myTag"
      placement="bottom-start"
      v-model="visible">
      <div class="tagPopover">
        <vue-tags-input
          placeholder="Type similar name"
          v-model="tag"
          :allow-edit-tags="true"
          :separators="[';', ',']"
          :tags="tags"
          @tags-changed="newTags => tags = newTags">
        </vue-tags-input>
        <div class="submit-box">
          <el-button size="mini" type="text" @click="onCancel" class="cancel-button">
            Cancel
          </el-button>
          <el-button size="mini" type="text" @click="onConfirm" :loading="loading">
            Update
          </el-button>
        </div>
      </div>
    </el-popover>
    <el-badge :is-dot="tags.length > 0" class="myDot">
      <el-button
        v-popover:myTag
        icon="el-icon-fa-plus"
        size="mini"
        type="primary"
        :plain="true">
        Add similar
      </el-button>
    </el-badge>


  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";

@Component
export default class AddTagButton extends Vue {
  @Prop() id: number;
  @Prop() store: string;

  loading: boolean = false;
  visible: boolean = false;
  tag: string = '';
  tags: any = [];

  onCancel() { this.visible = false; }

  async onConfirm() {
    this.loading = true;

    await this.$store.dispatch('entities/update_similar', {
      id: this.id,
      similar: this.tags
    });

    this.loading = false;
    this.tag = '';
    this.tags = [];
    this.visible = false;

    return;
  }
}
</script>

<style>
  .add-tag-button {
    display: inline-block !important;
    margin-bottom: 6px;
  }
  .tag {
    background-color: rgba(2, 178, 245, 0.24) !important;
    color: #333 !important;
    font-size: .95em !important;
  }
  .input {
    border: none !important;
  }
  .tag .icon-close {
    color: whitesmoke
  }
  .submit-box {
    text-align: right;
    margin-right: 4px;
    margin-top: 6px;
  }
  .cancel-button {
    color: #ff000094;
  }
  .cancel-button:hover {
    color: red;
  }
  .myDot .el-badge__content.is-fixed.is-dot {
    right: 5px;
    z-index: 99999999;
    top: 3px;
  }
</style>
