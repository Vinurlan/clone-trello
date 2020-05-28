<template>
    <div class="table">
        <h1>Table: {{tableData.name}}</h1>
        <router-link to="/">Go Board</router-link>
    </div>
</template>

<script>
export default {
    name: 'Table',
    data() {
        return {
            tableData: {},
        }
    },
    methods: {
        init() {
            this.tableData = JSON.parse(localStorage.getItem(`table=${this.$route.query.id}`))
        }
    },
    mounted() {
        this.init()
        
    }
}
</script>