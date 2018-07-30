<template>
  <el-row>
    <el-col :span="24">
      <div style="text-align: right;">
        <el-button type="text" icon="el-icon-plus">Add POI</el-button>
        <pagination :totalItems="totalItems" :currentPage="query.page" :recordPerPage="recordPerPage"></pagination>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="panel-body">
        <info-items :infos="infos"></info-items>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import { Action, State } from 'vuex-class';
import Pagination from '~/components/pagination.vue';
import InfoItems from '~/components/info/items.vue';

@Component({
  layout: 'main',
  middleware: ['authenticated'],
  components: {
    Pagination,
    InfoItems
  }
})
export default class PoiInfoPage extends Vue {
  @Action('infos/get_all') listAction;
  @Action('entities/get_all') listEntitiesAction;

  @State(state => state.infos.data) infos;
  @State(state => state.infos.totalItems) totalItems;
  @State(state => state.infos.recordPerPage) recordPerPage;
  @State(state => state.infos.query) query;
  @Watch('$route')
  onPageChange() { this.initData() }

  loading: boolean = false;

  head() {
    return {
      title: 'Information',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Information'
        }
      ]
    };
  }

  created() { this.initData(); }

  async initData() {
    this.loading = true;
    await this.listAction({ query: this.$route.query })
    await this.listEntitiesAction({ query: {
      limit: 300
    } })
    this.loading = false;
  }
}
</script>

<style scoped>
</style>
