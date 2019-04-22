<template>
    <HistogramChart v-if="loaded" :chartData="chartData" :options="options"></HistogramChart>
</template>
<script>
    import HistogramChart from '../components/HistogramChart';

    export default {
        name: 'AgeHistogramChartContainer',
        components: {
            HistogramChart
        },
        data() {
            return {
                loaded: false,
                chartData: null,
                options: {
                    legend: {
                        display: false
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        mounted() {
            let scope = this;
            this.loaded = false;
            fetch('http://localhost:3000/countAge').then(res => {
                return res.json()
            }).then(data => {
                scope.loaded = true;
                scope.chartData = data;
            }).catch(err => {
                console.log(err);
            });
        }
    }

</script>