<template>
    <div>
        <span>First Name: </span>
        <input type="text" v-model="personData.firstName"/>
        <button v-on:click="submitForm">Submit</button>
    </div>
</template>
<script>
    export default {
        name: 'PersonForm',
        data: function () {
            return {
                personData: {
                    firstName: '',
                    lastName: '',
                    age: 0,
                    gender: ''
                }
            }
        },
        methods: {
            submitForm: function() {
                this.$emit('submit-person-form', this.personData);
            }
        }
    }
</script>