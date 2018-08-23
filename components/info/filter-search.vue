<template>
  <div class="filter-search">
    <div class="el-search">
      <el-select v-model="selected" placeholder="Filter" @change="changeFilterTag()" value="Filter" >
        <el-option
          v-for="(item,index) in dataFilter"
          :key="index"
          :label="item.label"
          :value="item.value"
          v-if="item.flag === true"
          :hide-selected="true">
        </el-option>
      </el-select>
      <div class="panelbody-box-search">
        <el-input size="small" placeholder="Search">
          <template slot="prepend"><i class="el-icon-search"></i></template>
        </el-input>
      </div>
    </div>
    <div class="tag-filter">
      <el-tag
        v-for="(tag,index) in tagFilter"
        :key="index"
        :label="tag.lable"
        v-if="tag.flag === false"
        closable @close="changeFilterOption(tag)">
        {{ tag.value }}
      </el-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Action, State } from "vuex-class";

@Component
export default class FilterSearch extends Vue {
  @Prop() infos: any[];
  @Action("infos/add_filter_tag") addFilterTagAction;
  @Action("infos/add_filter_option") addFilterOptionAction;
  @State(state => state.infos.optionFilter)
  dataFilter;
  @State(state => state.infos.optionFilter)
  tagsFilters;

  selected: string = "Filter";

  changeFilterTag() {
    this.addFilterTagAction(this.selected);
  }

  changeFilterOption(tag) {
    this.addFilterOptionAction(tag);
  }
  get optionFilter() {
    return this.dataFilter;
  }
  get tagFilter() {
    return this.tagsFilters;
  }
}
</script>

<style lang="scss">
@mixin displayFlex() {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}
@mixin displayFlex1() {
  display: -webkit-flex;
  display: flex;
}

.filter-search {
  float: left;
  margin-left: 20px;
  .el-search {
    @include displayFlex1();
    border: 1px solid #ddd;
    opacity: 0.7;
    .el-select .el-input__inner {
      border: 0;
      border-right: 1px solid #ddd;
      border-radius: 0;
      height: 32px;
      line-height: 32px;
    }
    .el-select .el-select__caret {
      line-height: 32px;
    }
    .panelbody-box-search {
      margin: 0;
      .el-input-group__prepend {
        left: inherit;
        right: 20px;
      }
      .el-input__inner {
        min-width: 250px;
        border: 0;
        opacity: 1;
      }
    }
  }
  .tag-filter {
    text-align: left;
    margin-top: 10px;
    .el-tag {
      margin-right: 10px;
    }
  }
}
</style>


