<template>
  <transition>
    <div class="panel-body">
      <p>
        You logged in as <strong>{{ loggedUser.fullName }}</strong>
      </p>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { State } from 'vuex-class';

@Component({
  layout: 'main',
  middleware: ['authenticated']
})
export default class AdminPage extends Vue {
  @State(state => state.authUser) loggedUser;

  head() {
    return {
      title: 'Dashboard',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Dashboard'
        }
      ]
    };
  }
}
</script>
