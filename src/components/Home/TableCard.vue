<template>
    <div class="table-card">
        <h3>{{ table.name }}</h3>
        <p>{{ table.desc }}</p>
        <button @click="openTable">Open</button>
    </div>
</template>

<script>
export default {
    name: 'TableCard',
    props: {
        table: {
            required: true,
            type: Object
        }
    },
    methods: {
        openTable() {
            this.$router.push({path: 'table', query: {id: this.table.id}})
        }
    }
}
</script>

<style lang="scss" scoped>

.table-card {
    width: 400px;
    height: 300px;
    border: 1px solid #000;
}

</style>