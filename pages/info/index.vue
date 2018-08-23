<template>
  <el-row class="main-content page-info">
    <header-top></header-top>
    <el-col :span="24">
      <div class="header-right" style="text-align: right;">
       <div class="el-search el-col-5">
          <div class="panelbody-box-search">
            <el-input size="small" placeholder="Search"
              v-model="form.q"
              @keyup.enter.native="onSearch"
              clearable
              @clear="onReset()">
              <template slot="prepend" @click="onSearch"><i class="el-icon-search"></i></template>
            </el-input>
          </div>

          <!-- <div class="panelbody-box-search">
            <el-autocomplete size="small" placeholder="Search..." :fetch-suggestions="onSearch" @select="onSearchChoose" :trigger-on-focus="false">
               <template slot="prepend"><i class="el-icon-search"></i></template>
               <template slot-scope="{ item }">
                <div class="value">{{ item.id }}</div>
                <span class="link">{{ item.name }}</span>
              </template>
            </el-autocomplete>
          </div> -->
        </div>
        <filter-search></filter-search>
        <import-button></import-button>
        <pagination :totalItems="totalItems" :currentPage="query.page" :recordPerPage="recordPerPage"></pagination>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="panel-body">
        <info-items :infos="infos"></info-items>
      </div>
      <div class="pagination-bottom">
        <pagination :totalItems="totalItems" :currentPage="query.page" :recordPerPage="recordPerPage"></pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import { Action, State } from "vuex-class";
import Pagination from "~/components/pagination.vue";
import InfoItems from "~/components/info/items.vue";
import ImportButton from "~/components/info/import.vue";
import HeaderTop from "~/components/headertop.vue";
import FilterSearch from "~/components/info/filter-search.vue";
const querystring = require("querystring");

@Component({
  layout: "main",
  middleware: ["authenticated"],
  components: {
    HeaderTop,
    Pagination,
    InfoItems,
    ImportButton,
    FilterSearch
  }
})
export default class PoiInfoPage extends Vue {
  @Action("infos/get_all") listAction;
  @Action("entities/get_all") listEntitiesAction;
  @Action("regions/get_trees") getTreesAction;

  @State(state => state.infos.data)
  infos;
  @State(state => state.infos.totalItems)
  totalItems;
  @State(state => state.infos.recordPerPage)
  recordPerPage;
  @State(state => state.infos.query)
  query;
  @Watch("$route")
  onPageChange() {
    this.initData();
  }

  form: object = {};

  async onSearch() {
    this.query.page = 1;
    const pageUrl = `?${querystring.stringify(this.form)}&${querystring.stringify(this.query)}`;
    return this.$router.push(pageUrl);
  }

  onReset() {
    return this.$router.push("/info");
  }

  head() {
    return {
      title: "Information",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Information"
        }
      ]
    };
  }

  created() {
    this.initData();
  }

  async initData() {
    await this.listAction({ query: this.$route.query });
    await this.listEntitiesAction({
      query: {
        limit: 300
      }
    });
    await this.getTreesAction();
    this.form = {
      q: this.$route.query.q || ""
    };
  }
}
</script>

<style lang="scss">
.page-info {
  .el-select-dropdown__wrap {
    max-height: none;
    padding: 15px 0 30px 0;
    overflow: hidden;
    .el-select-dropdown__list {
      height: auto;
      max-height: 274px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }
  .header-right > div {
    display: inline-block;
    .el-upload__tip {
      display: inline-block;
    }
  }
  .el-table thead.is-group th {
    padding: 0;
    line-height: 40px;
    font-weight: normal;
    font-size: 13px;
  }
  .el-table .el-table__row td {
    padding: 0;
  }
  .el-table .el-table__row td.is-center {
    // vertical-align: top;
    // padding-top: 10px;
  }
  .el-select .el-input__inner {
    border: 0;
    background-color: transparent;
    font-size: 12px;
  }
  .address-content {
    .el-collapse {
      border: 0;
      padding-bottom: 10px;
    }
    .el-collapse-item__header {
      border: 0;
      background-color: transparent;
      color: #409eff;
      font-weight: bold;
      font-size: 13px;
      padding: 8px 0 0;
      height: auto;
      line-height: 25px;
      position: relative;
      .el-collapse-item__arrow {
        line-height: inherit;
      }
      .full-address {
        line-height: 15px;
        color: #303133;
        font-weight: normal;
        padding-right: 20px;
        margin-top: 0;
      }
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
    .el-collapse-item__wrap {
      background-color: transparent;
      border: 0;
    }
  }
  .address-content .el-collapse-item.is-active + .el-table .el-table__row td.is-center {
    vertical-align: top;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(0, 119, 243, 0.04);
  }
}
</style>
