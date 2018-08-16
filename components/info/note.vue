<template>
  <el-popover
    placement="left"
    trigger="manual"
    v-model="visible"
    width="500">
    <el-row style="margin-bottom: 10px;">
      <el-col :span="20">
        <el-input
          type="textarea"
          placeholder="Write something"
          :autosize="{ minRows: 2 }"
          v-model="note">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button
          type="primary"
          size="small"
          class="add-button"
          @click="onAdd()"
          :loading="addLoading">
          Add
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table v-loading.lock="loading" :data="notes" width="100%">
        <el-table-column label="Notes">
          <template slot-scope="scope">
            <small><i>{{ scope.row.dateCreated.readable }}</i></small> &nbsp;
            {{ scope.row.text }}
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-button
      slot="reference" @click="onShow()"
      icon="el-icon-fa-book"
      circle
      size="mini"
      :type="hasNote ? 'warning' : ''"
      :loading="localLoading"
      class="note-button">
    </el-button>
  </el-popover>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Action, State } from 'vuex-class';

@Component({
  notifications: {
    addSuccess: {
      icon: 'fas fa-check',
      position: 'bottomRight',
      title: 'Note',
      toastOnce: true,
      type: 'success'
    }
  }
})
export default class Note extends Vue {
  @Prop() id: number; // poi info id
  @Prop() hasNote: boolean;
  @Action('notes/add') addNoteAction;
  @Action('notes/get_all') getNotesAction;
  @State(state => state.notes.loading) loading;
  @State(state => state.notes.addLoading) addLoading;
  @State(state => state.notes.data) notes;

  localLoading: boolean = false;
  visible: boolean = false;
  note: string = '';

  addSuccess: ({ message: string, timeout: number }) => void;

  async onShow() {
    this.visible = !this.visible;
    this.localLoading = true;
    await this.getNotesAction({ piid: this.id });
    this.localLoading = false;
  }

  async onAdd() {
    const errors = await this.addNoteAction({ value: {
      piid: this.id,
      text: this.note
    } });

    if (typeof errors === 'undefined') {
      this.note = '';
      this.addSuccess({
        message: 'Added',
        timeout: 1000
      })
    }
  }
}
</script>

<style lang="scss">
.note-button {
  display: inline;
  margin-left: 10px;
}
.add-button {
  margin: 10px 0 0 15px;
}
</style>
