import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cursor: "",
    products: [],
    totalCount: 0,
    topics: []
  },
  getters: {
    products: (state) => {
      return state.products.map((node) => node.node);
    },
    topics: (state) => {
      return state.topics.map(topic => topic.name);
    },
    cursor: (state) => {
      return state.cursor;
    },
    totalCount: (state) => {
      return state.totalCount;
    },
  },
  mutations: {
    SET_NEXT(state, payload) {
      state.cursor = payload;
    },
    SET_TOTAL_COUNT(state, payload) {
      state.totalCount = payload;
    },
    SET_TOPICS(state, payload) {
      state.topics.push(payload);
    },
    RESET_TOPICS(state) {
      state.topics = [];
    },
    RESET_PRODUCTS(state) {
      state.products = [];
    },
    GET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    UPDATE_PRODUCTS(state, payload) {
      payload.map((node) => state.products.push(node));
    },
  },
  actions: {
    getProductFromApi({ commit, state }, date) {
      const params = {
        date: date,
        cursor: state.cursor,
      };
      axios
        .post(`${process.env.VUE_APP_API_URL}/productByDay`, null, {
          params: params,
        })
        .then((response) => {
          commit("SET_TOTAL_COUNT", response.data.totalCount)
          response.data.edges.map((node) => {
            node.node.topics.edges.map((node) => {
              commit("SET_TOPICS", node.node)
            })
          })

          if (state.cursor !== "") {
            commit("UPDATE_PRODUCTS", response.data.edges);
            response.data.edges[response.data.edges.length - 1].cursor === undefined
                ? (state.cursor = "")
                : (state.cursor = response.data.edges[response.data.edges.length - 1].cursor);
          } else {
            commit("GET_PRODUCTS", response.data.edges);
            response.data.edges[response.data.edges.length - 1].cursor === undefined
              ? (state.cursor = "")
              : (state.cursor = response.data.edges[response.data.edges.length - 1].cursor);
          }

          return response
        })
        .catch((err) => console.log(err));
    },
  },
});

export default store;
