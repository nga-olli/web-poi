<template>
  <el-row class="main-content">
    <header-top></header-top>
    <el-col :span="24">
      <div style="text-align: right;">
        <div class="el-search el-col-5">
          <div class="panelbody-box-search">
            <el-input type="text" size="small" placeholder="Search...">
               <template slot="prepend"><i class="el-icon-search"></i></template>
            </el-input>
          </div>
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
  @State(state => state.entities.data)
  entities;
  @State(state => state.entities.totalItems)
  totalItems;
  @State(state => state.entities.recordPerPage)
  recordPerPage;
  @State(state => state.entities.query)
  query;
  @Watch("$route")
  onPageChange() {
    this.initData();
  }

  loading: boolean = false;
  searchactive: boolean = false;

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

  created() {
    this.initData();
  }

  async initData() {
    this.loading = true;
    await this.listAction({ query: this.$route.query });
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
</style>


