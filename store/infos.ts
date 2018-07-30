export const state = () => ({
  data: [],
  query: {},
  formSource: {},
  totalItems: 0,
  recordPerPage: 0
});

export const mutations = {
  SET_DATA(state, response) {
    state.data = response.getPoiInfos.items || null;
    state.totalItems = response.getPoiInfos.meta.totalResults || 0;
    state.recordPerPage = response.getPoiInfos.meta.perPage || 30;
    state.query.page = response.getPoiInfos.meta.curPage || 1;
  }
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

    return typeof response.errors === "undefined" ? commit("SET_DATA", response.data) : response.errors;
  }
};
