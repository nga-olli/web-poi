export const state = () => ({
  loading: false,
  addLoading: false,
  data: [],
  query: {},
  formSource: {},
  totalItems: 0,
  recordPerPage: 0
});

export const mutations = {
  LOAD_PENDING(state) {
    state.loading = true;
  },
  LOAD_DONE(state) {
    state.loading = false;
  },
  ADD_PENDING(state) {
    state.addLoading = true;
  },
  ADD_DONE(state) {
    state.addLoading = false;
  },
  SET_DATA(state, response) {
    state.data = response || null;
  },
  ADD_DATA(state, response) {
    state.data.push(response);
  }
};

export const actions = {
  async get_all({ commit }, { piid }) {
    commit("LOAD_PENDING");

    const response = await this.$axios.$post("/", { query: `{
        getPoiNotes (
          piid: ${ piid }
        ) {
          id,
          text,
          dateCreated
        }
      }` });

    commit("LOAD_DONE");

    if (typeof response.errors === "undefined") {
      return commit("SET_DATA", response.data.getPoiNotes);
    } else {
      return response.errors;
    }
  },

  async add({ commit }, { value }) {
    commit("ADD_PENDING");

    const response = await this.$axios.$post("/", { query: `
        mutation (
          $input: JSON!
        ) {
          addPoiNote (
            input: $input
          ) {
            id,
            text,
            dateCreated
          }
        }
      `, variables: { input: value } });

    commit("ADD_DONE");

    if (typeof response.errors === "undefined") {
      return commit("ADD_DATA", response.data.addPoiNote);
    } else {
      console.dir(response)
      return response.errors;
    }
  }
};
