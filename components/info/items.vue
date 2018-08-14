<template>
  <section>
    <el-table :data="infos" style="width: 100%" row-key="id">
      <el-table-column label="Name" >
        <template slot-scope="scope">
          <div class="address-content">
            <span class="title">
              {{ scope.row.name }}
            </span>
            <span v-if="scope.row.website.length > 0" class="website">
              <i class="el-icon-fa-globe"></i>
              <small>{{ scope.row.website }}</small>
            </span>
            <span v-if="scope.row.phoneNumber.length > 0" class="phone">
              <i class="el-icon-fa-phone"></i>
              <small>{{ scope.row.phoneNumber }}</small>
            </span>
            <p class="full-address">
              <small>{{ scope.row.ggFullAddress }}</small>
            </p>
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
              <i class="el-icon-fa-times-circle text-danger"></i>
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
      <el-table-column width="50">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="onShowEditForm(scope.row.id)"  circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <no-ssr>
      <scroll-top :duration="1000" :timing="'ease'"></scroll-top>
    </no-ssr>
    <edit-form :editFormState="visible" :itemId="itemId" :hideEditForm="onHideEditForm"></edit-form>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Action } from 'vuex-class';
import DeleteButton from '~/components/delete-button.vue';
import SelectType from '~/components/info/select-type.vue';
import PublishButton from '~/components/info/publish-button.vue';
import EditForm from '~/components/info/edit-form.vue';

@Component({
  components: {
    DeleteButton,
    SelectType,
    PublishButton,
    EditForm
  }
})
export default class InfoItems extends Vue {
  @Prop() infos: any[];

  loading: boolean = false;
  visible: boolean = false;
  itemId: number = 0;

  onShowEditForm(id) {
    this.visible = true;
    this.itemId = id;
  }

  onHideEditForm() { this.visible = false; }
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
  margin-top: 5px;
  p {
    margin-top: 3px;
    margin-bottom: 3px;
  }
}
.text-primary {
  color: #0984e3;
}
.text-danger {
  color: red;
}
.title {
  color: #0984e3;
  font-weight: 600;
  margin-right: 5px;
}
.website,
.phone {
  margin-right: 15px;
  font-weight: 300;
}
.el-icon-fa-globe,
.el-icon-fa-phone {
  font-size: 12px !important;
  margin-right: 3px;
}
</style>
