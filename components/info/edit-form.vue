<template>
  <el-dialog
    :visible.sync="editFormState"
    :before-close="onClose"
    v-on:open="onOpen"
    :lock-scroll="true">
    <el-row>
      <el-col :md="24" :xs="24">
        <el-col :md="24">
          <el-form autoComplete="on" label-position="left" :model="form" ref="editForm">
            <el-form-item label="Name">
              <el-input type="text" size="small" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Number">
              <el-input type="text" size="small" v-model="form.number"></el-input>
            </el-form-item>
            <el-form-item label="Street">
              <el-input type="text" size="small" v-model="form.street"></el-input>
            </el-form-item>
            <el-form-item label="Phone">
              <el-input type="text" size="small" v-model="form.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item prop="status" label="City / District / Ward">
              <el-cascader
                placeholder="Try searching: Hà Nội, Quận 1, Thị xã Rạch Giá, Phường Đông Hồ, ..."
                :options="regions"
                filterable
                change-on-select
                :props="config"
                v-model="form.region"
                style="width: 100%"
              ></el-cascader>
            </el-form-item>
            <el-form-item style="margin-top: 30px">
              <el-button type="primary" :loading="loading" @click.native.prevent="onSubmit"> Update
              </el-button>
              <!-- <el-button @click="onReset">{{ $t('default.reset') }}</el-button> -->
            </el-form-item>
          </el-form>
        </el-col>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Action, State } from 'vuex-class';

@Component
export default class EditForm extends Vue {
  @Prop() itemId: number;
  @Prop() editFormState: boolean;
  @Prop() onClose: void;

  @Action('infos/get_one') getInfoAction;
  @Action('infos/update') updateInfoAction;
  @State(state => state.regions.data) regions;

  loading: boolean = false;
  form: object = {};
  config: object = {
    label: "name",
    value: "id",
    children: "children"
  }

  $refs: {
    editForm: HTMLFormElement
  }

  async onOpen() {
    let region = [];
    const myPoiInfo = await this.getInfoAction({ id: this.itemId });
    if (myPoiInfo.city !== null) region.push(myPoiInfo.city.id);
    if (myPoiInfo.district !== null) region.push(myPoiInfo.district.id);
    if (myPoiInfo.ward !== null) region.push(myPoiInfo.ward.id);

    this.form = {
      name: myPoiInfo.name,
      number: myPoiInfo.number,
      street: myPoiInfo.street,
      phoneNumber: myPoiInfo.phoneNumber,
      region: region
    };
  }

  async onSubmit() {
    await this.updateInfoAction({
      id: this.itemId,
      input: this.form
    });
  }
}
</script>
