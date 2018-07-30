<template>
  <el-row class="main-content">
    <header-top></header-top>
    <el-col :span="24">
      <div style="text-align: right;">

        <div class="el-search el-col-5">
          <div class="box-search">
            <button type="submit" class="searchButton">
                <i class="el-icon-search"></i>
            </button>
            <input type="text" class="searchTerm" placeholder="Search...">

          </div>
        </div>
        <el-button type="text" icon="el-icon-plus">Add entity</el-button>
        <pagination :totalItems="totalItems" :currentPage="query.page" :recordPerPage="recordPerPage"></pagination>
        <div class="el-limit-filter ">

          <el-select v-model="value8" filterable placeholder="Select limit">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span>per page </span>
        </div>

      </div>
    </el-col>
    <el-col :span="24">
      <div class="panel-body">
        <entity-items :entities="entities"></entity-items>
      </div>
      <div class="pagination-bottom">
        <pagination :totalItems="totalItems" :currentPage="query.page" :recordPerPage="recordPerPage"></pagination>
      </div>

    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import { Action, State } from 'vuex-class';
import Pagination from '~/components/pagination.vue';
import EntityItems from '~/components/entity/items.vue';
import HeaderTop from '~/components/headertop.vue';

@Component({
  layout: 'main',
  middleware: ['authenticated'],
  components: {
    Pagination,
    EntityItems,
    HeaderTop
  }
})
export default class MainPage extends Vue {
  @Action('entities/get_all') listAction;
  @State(state => state.authUser) loggedUser;
  @State(state => state.entities.data) entities;
  @State(state => state.entities.totalItems) totalItems;
  @State(state => state.entities.recordPerPage) recordPerPage;
  @State(state => state.entities.query) query;
  @Watch('$route')
  onPageChange() { this.initData() }

  loading: boolean = false;
  searchactive: boolean = false;

  head() {
    return {
      title: 'Dashboard',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Dashboard'
        }
      ]
    };
  }
  data() {
      return {
        options: [{
          value: '5',
          label: '5'
        }, {
          value: '10',
          label: '10'
        }, {
          value: '20',
          label: '20'
        }, {
          value: '50',
          label: '50'
        }, {
          value: '100',
          label: '100'
        }],
        value8: '20'
      }
  }

  created() { this.initData(); }

  async initData() {
    this.loading = true;
    await this.listAction({ query: this.$route.query })
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
.pagination-bottom {
  margin-bottom: 50px;
  text-align: right;
}
.box-search {
  position: relative;
  margin-top: 5px;
  margin-left: 20px;
  input{
    position: relative;
    width: 100%;
    box-sizing: border-box;
    font-size: 13px;
    background: 0 0;
    border: 1px solid #ddd;
    padding-right: 14px;
    padding-left: 36px;
    height: 25px;
    line-height: 25px;
    border-radius: 0;
    color: #666;
    border-radius: 0;
    opacity: .5;
    &:focus, &:active {
      outline: none;
      border-color: #38B7EA;
    }
  }
  button {
    position: absolute;
    left: 2px;
    top: 2px;
    border: 0;
    font-size: 15px;
    color: #666;
    background: transparent;
    z-index: 10;
    cursor: pointer;
    &:focus, &:active {
      outline: none;
    }
  }
}


</style>

<style lang="scss">
.el-limit-filter {
  display: inline-block;
  margin-right: 20px;
  .el-select .el-input  {
    width: 50px;
    border-radius: 0;
    margin-right: 5px;
    input {
      border-radius: 0;
      border: 0;
      height: 26px;
      font-size: 13px;
      padding-right: 21px;
      background: #dddddd7d;
      padding-left: 5px;
      text-align: center;
    }
    .el-input__icon {
      line-height: 26px;
      font-size: 11px;
      width: 19px;
      color: #000;
    }
  }
  span {
    font-size: 12px;
    color: #9a9898;
  }
}

</style>

