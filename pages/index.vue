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
    <el-footer class="el-col el-col-24">
      <div class="copyright">Copyright © 2018 olli-ai.com. All Rights Reserved	. Designed by Olli-team</div>
    </el-footer>
    <footer></footer>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import { Action, State } from "vuex-class";
import Pagination from "~/components/pagination.vue";
import EntityItems from "~/components/entity/items.vue";
import HeaderTop from "~/components/headertop.vue";
import Footer from "~/components/footer.vue";

@Component({
  layout: "main",
  middleware: ["authenticated"],
  components: {
    Pagination,
    EntityItems,
    HeaderTop,
    Footer,
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
  data() {
    return {
      options: [
        {
          value: "5",
          label: "5"
        },
        {
          value: "10",
          label: "10"
        },
        {
          value: "20",
          label: "20"
        },
        {
          value: "50",
          label: "50"
        },
        {
          value: "100",
          label: "100"
        }
      ],
      value8: "20"
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

<style lang="scss">



</style>

