<template>
  <div class="add-form-container">
    <!-- <el-button type="text" icon="el-icon-plus">Add entity</el-button>
    <el-form ref="form" inline>
      <el-form-item>
        <el-input placeholder="Name"></el-input>
      </el-form-item>
      <el-form-item>
        <vue-tags-input
          placeholder="OLLI Similar"
          v-model="olliTag"
          allow-edit-tags
          :separators="[';', ',']"
          :tags="olliTags"
          class="olli-tag-container"
          @tags-changed="newTags => olliTags = newTags">
        </vue-tags-input>
      </el-form-item>
      <el-form-item>

      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="text" @click="onSubmit()" :loading="loading">
          Submit
        </el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component} from 'nuxt-property-decorator';

@Component
export default class AddForm extends Vue {
  visible: boolean = false;
  loading: boolean = false;
  olliTag: string = '';
  olliTags: any = [];
  ggTag: string = '';
  ggTags: any = [];

  onSubmit() {
    this.olliTags.map(item => {
      console.log(item)
    })

  }
}
</script>

<style lang="scss">
.add-form-container {
  display: inline-block;

  .olli-tag-container {
    .tag {
      background-color: rgba(142, 243, 93, .1) !important;
      color: #333 !important;
      font-size: .95em !important;
      border-color: rgba(103, 194, 58, .2) !important;

      .icon-close {
        color: #67c23a !important;
      }
    }
  }
}
</style>
