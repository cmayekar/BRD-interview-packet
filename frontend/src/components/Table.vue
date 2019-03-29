<template>
    <div>
        <span>Table</span>
        <button v-on:click="clickedRefresh">refresh</button>
        {{rows}}
    </div>
</template>
<script>
    export default {
        props: {
            rows: {
                type: Array,
                default: null
            },
        },
        data: function () {
            return {}
        },
        methods: {
            clickedRefresh() {
                this.$emit('refresh-table');
            }
        },
        name: 'Table',
    }
</script>
