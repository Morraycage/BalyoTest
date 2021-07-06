<template>
  <datepicker placeholder="Select Date" v-model="date" @selected="getFromApi"></datepicker>
</template>

<script>
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";

export default {
  name: 'DatePicker',
  components: {
    Datepicker
  },
  data() {
    return {
      date: null,
    }
  },
  methods: {
    getFromApi(date) {
      this.$emit('value', date)
    }
  }
}
</script>

<style>
  .vdp-datepicker * {
    text-align: center !important;
  }
  .vdp-datepicker__calendar {
    margin: auto !important;
    position: relative !important;
  }
</style>
