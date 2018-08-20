<template>
  <div class="filter-search">
    <div class="el-search">
      <el-select v-model="selected" placeholder="Filter">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
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
        v-for="tag in tags"
        :key="tag.name"
        closable
        :type="tag.type">
        {{tag.name}}
      </el-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"

@Component
export default class FilterSearch extends Vue {
 
  data() {
    return {
      options: [{
          value: 'Option1',
          label: 'Option1',
          selected: true,
        }, {
          value: 'Option2',
          label: 'Option2',
          selected: true,
        }, {
          value: 'Option3',
          label: 'Option3',
          selected: true,
        }, {
          value: 'Option4',
          label: 'Option4',
          selected: true,
        }, {
          value: 'Option5',
          label: 'Option5',
          selected: true,
        }],
        value: '',
      tags: [
        { name: 'Tag 1', type: '' },
        { name: 'Tag 2', type: '' },
        { name: 'Tag 3', type: '' },
        { name: 'Tag 4', type: '' },
        { name: 'Tag 5', type: '' }
      ]
    }
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


