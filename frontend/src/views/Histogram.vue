<template>
  <div class="home">
    <h1> Histogram </h1>
    <div class="histogram">
        <AgeHistogramChartContainer></AgeHistogramChartContainer>
    </div>
  </div>
</template>

<script>
  import AgeHistogramChartContainer from "../containers/AgeHistogramChartContainer";

  export default {
      components: {AgeHistogramChartContainer},
      data: function () {
      return {}
    },
    name: 'Histogram',
  }
  </script>

  <style scoped>
  .histogram {
    display: inline-block
  }
</style>
