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
    state.recordPerPage = response.meta.perPage || 30;
    state.query.page = response.meta.curPage || 1;
  },
  UPDATE_DATA(state, response) {
    const index = state.data.findIndex(item => item.id === response.id);
    state.data.splice(index, 1, response);
  },
};

export const actions = {
  async get_all({ commit }, { query }) {
    const response = await this.$axios.$post("/", {
      query: `{
        getPoiInfos(
          opts: {
          curPage: ${typeof query.page !== "undefined" ? query.page : 1},
          perPage: ${typeof query.limit !== "undefined" ? query.limit : 30},
          q: "${typeof query.q !== "undefined" ? query.q : ""}",
          sort: "${typeof query.sort !== "undefined" ? query.sort : "-id"}"
        }
        ) {
          items {
            type { id, name },
            id,
            name,
            similar,
            number,
            street,
            ward { id, name},
            district { id, name},
            city { id, name},
            lat,
            lng,
            website,
            phoneNumber,
            rating,
            ggFullAddress,
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

    return typeof response.errors === "undefined" ? commit("SET_DATA", response.data.getPoiInfos) : response.errors;
  },

  async change_type({ commit }, { id, typeId }) {
    const response = await this.$axios.$post("/", { query: `
        mutation changePoiType(
          $id: Int!,
          $typeId: Int!
        ) {
          changePoiType(
            id: $id,
            typeId: $typeId
          ) {
            type { id, name },
            id,
            name,
            similar,
            number,
            street,
            ward { id, name},
            district { id, name},
            city { id, name},
            lat,
            lng,
            website,
            phoneNumber,
            rating,
            ggFullAddress,
            dateCreated
          }
        }
      `,
      variables: {
        id: parseInt(id),
        typeId: parseInt(typeId)
      }
    });

    return typeof response.errors === "undefined" ? commit("UPDATE_DATA", response.data.changePoiType) : response.errors;
  }
};
