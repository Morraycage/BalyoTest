<template>
  <div class="container">
    <Chart v-if="loaded" ref="pie" :chart-data="data" :options="chartOptions" />
  </div>
</template>

<script>
import Chart from "./Chart";

export default {
  name: "ChartContainer",
  components: { Chart },
  props: {
    data: {
      type: Object
    },
    loaded: {
      type: Boolean
    }
  },
  data() {
    return {
      chartOptions: {
        hoverBorderWidth: 20,
      },
    }
  }
};
</script>
