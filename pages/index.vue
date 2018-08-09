<template>
  <el-row class="main-content page-type">
    <header-top></header-top>
    <el-col :span="24">
      <div style="text-align: right;">
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
        <el-button type="text" icon="el-icon-plus">Add entity</el-button>
        <pagination :totalItems="totalItems" :currentPage="query.page" :recordPerPage="recordPerPage"></pagination>
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
import { Vue, Component, Watch } from "nuxt-property-decorator";
import { Action, State } from "vuex-class";
import Pagination from "~/components/pagination.vue";
import EntityItems from "~/components/entity/items.vue";
import HeaderTop from "~/components/headertop.vue";
const querystring = require('querystring');

@Component({
  layout: "main",
  middleware: ["authenticated"],
  components: {
    Pagination,
    EntityItems,
    HeaderTop
  }
})
export default class MainPage extends Vue {
  @Action("entities/get_all") listAction;
  @Action("entities/suggest") suggestAction;
  @State(state => state.entities.data) entities;
  @State(state => state.entities.totalItems) totalItems;
  @State(state => state.entities.recordPerPage) recordPerPage;
  @State(state => state.entities.query) query;
  @Watch("$route")
  onPageChange() {
    this.initData();
  }

  loading: boolean = false;
  form: object = {};

  head() {
    return {
      title: "Dashboard",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Dashboard"
        }
      ]
    };
  }

  async onSearch() {
    this.query.page = 1;
    const pageUrl = `?${querystring.stringify(this.form)}&${querystring.stringify(this.query)}`;
    return this.$router.push(pageUrl);
  }

  onReset() { return this.$router.push('/'); }

  created() {
    this.initData();
  }

  async initData() {
    this.loading = true;
    await this.listAction({ query: this.$route.query });
    this.loading = false;

    this.form = {
      q: this.$route.query.q || ''
    };
  }
}
</script>

<style lang="scss" scoped>
</style>


