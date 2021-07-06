<template>
  <div class="col-6">
    <div class="row">
      <div class="col-6 mb-5" v-for="(product, index) in products" :key="index">
        <b-card
          :title="product.name"
          :img-src="product.thumbnail.url"
          img-alt="Image"
          img-top
          tag="article"
          class="d-flex flex-column m-auto"
        >
          <b-card-text>
            {{ formatDescription(product.description) }}
          </b-card-text>

          <b-button @click="goToUrl(product.website)" variant="primary">Go to website</b-button>
        </b-card>
      </div>
      <b-row>
        <b-col>
          <b-button
            @click="loadMore(date)"
            variant="warning"
            v-if="restToShow > 0"
            >Load more</b-button
          >
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProductContainer",
  props: {
    date: {
      type: Date,
    },
  },
  data() {
    return {
      restToShow: 0,
    };
  },
  methods: {
    formatDescription(description) {
      return `${description.substr(0, 30)}...`;
    },
    async loadMore(date) {
      if (this.restToShow === 0) {
        this.$store.commit("SET_NEXT", "");
      }
      await this.$store.dispatch("getProductFromApi", date).catch((err) => {
        console.log(err);
      });
    },
    goToUrl(url) {
      window.open(url, "_blank");
    },
  },
  updated() {
    this.restToShow = this.totalCount - this.products.length;
  },
  computed: {
    ...mapGetters(["products", "cursor", "totalCount"]),
  },
};
</script>
