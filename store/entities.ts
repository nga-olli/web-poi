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
  UPDATE_DATA(state, response) {
    const index = state.data.findIndex(item => item.id === response.id);
    state.data.splice(index, 1, response);
  },
  DELETE_DATA(state, id) {
    const index = state.data.findIndex(item => item.id === id);
    state.data.splice(index, 1);
    state.totalItems = state.totalItems - 1;
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
              ggSimilar,
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

    return typeof response.errors === "undefined"
      ? commit("SET_DATA", response.data.getPoiTypes)
      : response.errors;
  },

  async update_similar({ commit }, { id, similar }) {
    let similarArr = [];
    await Promise.all(
      similar.map(item => {
        similarArr.push(item.text);
      })
    );

    const response = await this.$axios.$post("/", { query: `
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
            ggSimilar,
            dateCreated
          }
        }
      `, variables: { id: id, input: { similar: similarArr.join(",") } } });

    return typeof response.errors === "undefined"
      ? commit("UPDATE_DATA", response.data.updatePoiTypeSimilar)
      : response.errors;
  },

  async update_gg_similar({ commit }, { id, similar }) {
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
          updatePoiTypeGgSimilar(
            id: $id,
            input: $input
          ) {
            id,
            name,
            similar,
            ggSimilar,
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

    return typeof response.errors === "undefined"
      ? commit("UPDATE_DATA", response.data.updatePoiTypeGgSimilar)
      : response.errors;
  },

  async remove_similar_item({ commit }, { id, similarItem }) {
    const response = await this.$axios.$post("/", { query: `
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
            ggSimilar,
            dateCreated
          }
        }
      `, variables: { id: id, input: { similarItem: similarItem } } });

    return typeof response.errors === "undefined"
      ? commit("UPDATE_DATA", response.data.removePoiTypeSimilarItem)
      : response.errors;
  },

  async remove_gg_similar_item({ commit }, { id, similarItem }) {
    const response = await this.$axios.$post("/", {
      query: `
        mutation (
          $id: Int!,
          $input: JSON!
        ) {
          removePoiTypeGgSimilarItem(
            id: $id,
            input: $input
          ) {
            id,
            name,
            similar,
            ggSimilar,
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

    return typeof response.errors === "undefined"
      ? commit("UPDATE_DATA", response.data.removePoiTypeGgSimilarItem)
      : response.errors;
  },

  async delete({ commit }, { id }) {
    const response = await this.$axios.$post("/", {
      query: `
        mutation (
          $id: Int!
        ) {
          removePoiType(
            id: $id
          )
        }
      `,
      variables: {
        id: id
      }
    });

    return typeof response.errors === "undefined"
      ? commit("DELETE_DATA", id)
      : response.errors;
  }
};
