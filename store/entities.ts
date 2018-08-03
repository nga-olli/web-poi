export const state = () => ({
  data: [],
  query: {},
  formSource: {},
  totalItems: 0,
  recordPerPage: 0
});

export const mutations = {
  SET_DATA(state, response) {
    state.data = response.getPoiTypes.items || null;
    state.totalItems = response.getPoiTypes.meta.totalResults || 0;
    state.recordPerPage = response.getPoiTypes.meta.perPage || 20;
    state.query.page = response.getPoiTypes.meta.curPage || 1;
  },
  UPDATE_SIMILAR(state, response) {
    const index = state.data.findIndex(item => item.id === response.updatePoiTypeSimilar.id);
    state.data.splice(index, 1, response.updatePoiTypeSimilar);
  },
  REMOVE_SIMILAR_ITEM(state, response) {
    const index = state.data.findIndex(item => item.id === response.removePoiTypeSimilarItem.id);
    state.data.splice(index, 1, response.removePoiTypeSimilarItem);
  }
};

export const actions = {
  async get_all({ commit }, { query }) {
    const response = await this.$axios.$post("/", {
      query: `{
        getPoiTypes (
          opts: {
            curPage: ${typeof query.page !== "undefined" ? query.page : 1},
            perPage: ${typeof query.limit !== "undefined" ? query.limit : 20},
            q: "${typeof query.q !== "undefined" ? query.q : ""}",
            sort: "${typeof query.sort !== "undefined" ? query.sort : "-id"}"
          }
          ) {
          items {
              id,
              name,
              similar,
              dateCreated
          },
          meta {
              curPage,
              perPage,
              totalPages,
              totalResults
          }
        }
      }`
    });

    return typeof response.errors === "undefined" ? commit("SET_DATA", response.data) : response.errors;
  },

  async update_similar({ commit }, { id, similar }) {
    let similarArr = [];
    await Promise.all(
      similar.map(item => {
        similarArr.push(item.text);
      })
    );

    const response = await this.$axios.$post("/", {
      query: `
        mutation (
          $id: Int!,
          $input: JSON!
        ) {
          updatePoiTypeSimilar(
            id: $id,
            input: $input
          ) {
            id,
            name,
            similar,
            dateCreated
          }
        }
      `,
      variables: {
        id: id,
        input: {
          similar: similarArr.join(",")
        }
      }
    });

    return typeof response.errors === "undefined" ? commit("UPDATE_SIMILAR", response.data) : response.errors;
  },

  async remove_similar_item({ commit }, { id, similarItem }) {
    const response = await this.$axios.$post("/", {
      query: `
        mutation (
          $id: Int!,
          $input: JSON!
        ) {
          removePoiTypeSimilarItem(
            id: $id,
            input: $input
          ) {
            id,
            name,
            similar,
            dateCreated
          }
        }
      `,
      variables: {
        id: id,
        input: {
          similarItem: similarItem
        }
      }
    });

    return typeof response.errors === "undefined" ? commit("REMOVE_SIMILAR_ITEM", response.data) : response.errors;
  }
};
