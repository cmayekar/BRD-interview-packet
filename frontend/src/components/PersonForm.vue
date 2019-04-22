<template>
    <div>
        <input type="text" placeholder="First name" v-model="personData.firstName"/>
        <input type="text" placeholder="Last name" v-model="personData.lastName"/>
        <input type="text" placeholder="Gender" v-model="personData.gender"/>
        <input type="number" placeholder="Age" v-model="personData.age"/>
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
                },
                isModalVisible: false,
            }
        },
        methods: {
            submitForm: function() {
                this.$emit('submit-person-form', this.personData);
            }
        }
    }
</script>
