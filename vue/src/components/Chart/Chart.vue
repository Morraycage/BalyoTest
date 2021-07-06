<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: ["chartData", "options"],
  methods: {
    update() {
      this.$data._chart.update();
      console.log(this.$data._chart)
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
