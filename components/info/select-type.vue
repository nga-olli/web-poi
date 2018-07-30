<template>
  <div class="select-type-container">
    <el-select v-model="selected" filterable placeholder="Select type">
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.name"
        :value="item.id">
        <span class="type-name">{{ item.name }}</span>
        <span class="type-similar">{{ _truncate(item.similar.join(', ')) }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';
import { Action, State } from 'vuex-class';
import * as truncate from 'truncate';

@Component
export default class SelectType extends Vue {
  @State(state => state.entities.data) options;
  @Prop() currentType;

  loading: boolean = false;
  selected: any = null;

  created() {
    if (this.currentType !== null) {
      this.selected = this.currentType.id;
    }
  }

  _truncate(str) {
    return truncate(str, 100);
  }
}
</script>

<style>
  .type-name {
    float: left
  }
  .type-similar {
    float: right;
    color: #8492a6;
    font-size: 13px
  }
</style>
