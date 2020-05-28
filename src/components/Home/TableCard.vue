<template>
    <div class="table-card">
        <h3>{{ table.name }}</h3>
        <p>{{ table.desc }}</p>
        <button>Open</button>
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