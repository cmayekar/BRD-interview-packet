<template>
    <div>
        <button v-on:click="clickedRefresh">refresh</button>
        <div class="home">
        <h1> People Data </h1>
            <div class="peopleDataTable">
              <table>
                <thead>
                  <tr>
                    <td> Id </td>
                    <td> First Name </td>
                    <td> Last Name </td>
                    <td> Gender </td>
                    <td> Age </td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in rows">
                    <td> {{row.id}}</td>
                    <td> {{row.first_name}} </td>
                    <td> {{row.last_name}} </td>
                    <td> {{row.gender}} </td>
                    <td> {{row.age}} </td>
                  </tr>
                </tbody>
              </table>
            </div>
         </div>
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

<style scoped>
.peopleDataTable {
  display: inline-block
}
td {
  border: 1px solid #090909;
}
</style>

