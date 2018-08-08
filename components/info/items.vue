<template>
  <section>
    <el-table :data="infos" style="width: 100%" row-key="id">
      <el-table-column label="Name" >
        <template slot-scope="scope">
          <div class="address-content">
            <strong class="text-primary">
              {{ scope.row.name }}
            </strong>
            <div class="showless">
              <p><small>{{ scope.row.ggFullAddress }}</small></p>
              <p v-if="scope.row.website.length > 0">
                <i class="el-icon-fa-globe"></i> &nbsp;
                <small>{{ scope.row.website }}</small>
              </p>
              <p v-if="scope.row.phoneNumber.length > 0">
                <i class="el-icon-fa-phone"></i> &nbsp;
                <small>{{ scope.row.phoneNumber }}</small>
              </p>
              <p>
                <i class="el-icon-fa-compass"></i> &nbsp;
                <small>Lat: <strong>{{ scope.row.lat }}</strong></small>
                &nbsp;
                <small>Lng: <strong>{{ scope.row.lng }}</strong></small>
              </p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Publish?" align="center" width="100">
        <template slot-scope="scope">
          <publish-button :id="scope.row.id" :status="scope.row.status"></publish-button>
        </template>
      </el-table-column>
      <el-table-column label="Type" align="center" width="200">
        <template slot-scope="scope">
          <select-type :currentType="scope.row.type" :info="scope.row"></select-type>
        </template>
      </el-table-column>
      <el-table-column label="Number" width="120" align="center">
        <template slot-scope="scope">
          <small v-if="scope.row.number.length > 0">{{ scope.row.number }}</small>
          <div v-else>
            <i class="el-icon-fa-times-circle text-danger"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Street" width="140" align="center">
        <template slot-scope="scope">
          <small v-if="scope.row.street.length > 0">{{ scope.row.street }}</small>
          <div v-else>
            <i class="el-icon-fa-times-circle text-danger"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Region" width="300" align="center">
        <el-table-column label="Ward" width="150" align="center">
          <template slot-scope="scope">
            <small v-if="scope.row.ward !== null">{{ scope.row.ward.name }}</small>
            <div v-else>
              <change-region-button :item="scope.row"></change-region-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="District" width="150" align="center">
          <template slot-scope="scope">
            <small v-if="scope.row.district !== null">{{ scope.row.district.name }}</small>
            <div v-else>
              <i class="el-icon-fa-times-circle text-danger"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="City" width="150" align="center">
          <template slot-scope="scope">
            <small v-if="scope.row.city !== null">{{ scope.row.city.name }}</small>
            <div v-else>
              <i class="el-icon-fa-times-circle text-danger"></i>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <no-ssr>
      <scroll-top :duration="1000" :timing="'ease'"></scroll-top>
    </no-ssr>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Action } from 'vuex-class';
import DeleteButton from '~/components/delete-button.vue';
import ChangeRegionButton from '~/components/info/change-region-button.vue';
import SelectType from '~/components/info/select-type.vue';
import PublishButton from '~/components/info/publish-button.vue';

@Component({
  components: {
    DeleteButton,
    ChangeRegionButton,
    SelectType,
    PublishButton
  }
})
export default class InfoItems extends Vue {
  @Prop() infos: any[];
}
</script>

<style lang="scss" scoped>

  .similar-item {
    margin-right: 6px;
    margin-bottom: 6px;
    color: #333;
    background-color: rgba(142, 243, 93, 0.1);
    font-size: 12px;
  }
  .address-content {
    p {
      margin-top: 3px;
      margin-bottom: 3px;
    }
  }
  .text-primary {
    color: #0984e3;
  }
  .el-icon-fa-times-circle.text-danger {
    color: #e74c3c;
    cursor: pointer;
  }
  [class^="el-icon-fa-times-circle"], [class*=" el-icon-fa-times-circle"] {
    font: normal normal normal 20px/1 FontAwesome !important;
  }
  .el-table__row  {
      cursor: pointer;
    .showless {
    -webkit-transition: max-height 0.3s;
    -moz-transition: max-height 0.5s;
    -ms-transition: max-height 1s;
    -o-transition: max-height 1s;
    transition: max-height 0.3s;
    max-height: 0;
    padding: 10px 0;
    }
    &:hover .showless {
      max-height: 300px;
    }
  }
  .address-content .text-primary {
    font-size: 13px;
  }

</style>
