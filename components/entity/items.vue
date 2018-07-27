<template>
  <section>
    <el-table :data="entities" style="width: 100%" row-key="id">
      <el-table-column label="Name" width="250"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Similar">
        <template slot-scope="scope">
          <el-tag
            v-for="(item, key) in scope.row.similar"
            v-if="item.length > 0"
            :key="key"
            closable
            class="similar-item"
            type="success">
            {{ item }}
          </el-tag>
          <add-tag-button :id="scope.row.id"></add-tag-button>
        </template>
      </el-table-column>
      <el-table-column width="100">
        <template slot-scope="scope">
          <small>{{ scope.row.dateCreated.readable }}</small>
        </template>
      </el-table-column>

      <el-table-column width="70">
        <template slot-scope="scope">
          <el-button-group>
            <delete-button :id="scope.row.id" store="users"></delete-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <scroll-top :duration="1000" :timing="'ease'"></scroll-top>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Action } from 'vuex-class';
import DeleteButton from "~/components/delete-button.vue";
import AddTagButton from "~/components/entity/addtag-button.vue";

@Component({
  components: {
    DeleteButton,
    AddTagButton
  }
})
export default class AdminUserItems extends Vue {
  @Prop() entities: any[];

  itemId: number = 0;
}
</script>

<style lang="scss" scoped>
  .similar-item {
    margin-right: 6px;
    margin-bottom: 6px;
    color: #333;
    background-color: rgba(142, 243, 93, 0.1);
  }
</style>
