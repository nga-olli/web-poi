export const state = () => ({
  data: [],
  query: {},
  formSource: {},
  totalItems: 0,
  recordPerPage: 0
});

export const mutations = {
  SET_DATA(state, response) {
    state.data = response.items || null;
    state.totalItems = response.meta.totalResults || 0;
    state.recordPerPage = response.meta.perPage || 20;
    state.query.page = response.meta.curPage || 1;
  },
  SET_TREES(state, response) {
    state.data = response || null;
  }
};

export const actions = {
  async get_trees({ commit }) {
    const response = await this.$axios.$post("/", {
      query: `{
        getTrees {
          id,
          name,
          slug,
          order,
          children
        }
      }`
    });

    return typeof response.errors === "undefined"
        ? commit("SET_TREES", response.data.getTrees)
      : response.errors;
  }
};
