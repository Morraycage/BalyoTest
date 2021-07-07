<template>
  <div id="app">
    <notifications group="notification"></notifications>
    <div class="container">
      <div class="row justify-content-center mb-5">
        <DatePicker @value="getDate"></DatePicker>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="row">
            <div class="col-12">
              <Loader v-if="loading"></Loader>
              <ChartContainer
                :data="chartData"
                :loaded="loaded"
              ></ChartContainer>
            </div>
          </div>
        </div>
        <Loader v-if="loading"></Loader>
        <ProductContainer :date="date"></ProductContainer>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "./components/DatePicker";
import ChartContainer from "./components/Chart/ChartContainer";
import ProductContainer from "./components/ProductContainer";
import { mapGetters } from "vuex";
import Loader from "./components/Loader";

export default {
  name: "App",
  components: {
    Loader,
    ProductContainer,
    ChartContainer,
    DatePicker,
  },
  data() {
    return {
      counter: 0,
      loading: false,
      loaded: false,
      date: null,
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Saas", "tres", "Tech"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [1, 3, 5],
          },
        ],
      },
    };
  },
  methods: {
    getDate(date) {
      this.$store.commit("RESET_PRODUCTS");
      this.$store.commit("RESET_TOPICS");

      this.date = date;

      this.$store.dispatch("getProductFromApi", date)
    },
    colorRandom() {
      return `#${Math.floor(
        Math.random() * (1000000 - 9999999) + 9999999
      ).toString(16)}`;
    },
    formatDataForPie() {
      let newTopics = new Map();
      this.loaded = false;

      this.topics?.map((topicName) => {
        this.topics?.push(topicName);
        newTopics.set(topicName, (newTopics.get(topicName) ?? 0) + 1);
      });

      this.chartData = {
        labels: [...newTopics.keys()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: this.topics?.map(this.colorRandom),
            data: [...newTopics.values()],
          },
        ],
      };

      this.loaded = true;
    },
  },
  watch: {
    topics() {
      this.formatDataForPie()
    }
  },
  computed: {
    ...mapGetters(["topics"]),
  },
  mounted() {
    this.$notify({
      group: "notification",
      title: "Welcome message",
      text: "Welcome to Display Product Hunt Products",
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
