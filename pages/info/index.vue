<template>
  <el-row class="main-content">
    <header-top></header-top>
    <el-col :span="24">
      <div class="header-right" style="text-align: right;">
        <import-button></import-button>
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
        <info-items :infos="infos"></info-items>
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
import InfoItems from '~/components/info/items.vue';
import ImportButton from '~/components/info/import.vue';
import HeaderTop from '~/components/headertop.vue';


@Component({
  layout: 'main',
  middleware: ['authenticated'],
  components: {
    HeaderTop,
    Pagination,
    InfoItems,
    ImportButton

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

<style lang="scss">

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
.el-table .el-table__row  td {
  padding: 0;
}
.el-table .el-table__row  td{
  vertical-align: top;
  &.is-center .cell {
    
    .el-icon-fa {
      line-height: 40px !important;
    }
  }
}
.el-select .el-input__inner {
    border: 0;
    background-color: transparent;
    font-size: 12px;
  }
</style>
