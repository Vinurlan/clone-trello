<template>
    <div class="table-card">
        <h3>{{ table.name }}</h3>
        <p class="table-card__description">{{ table.desc }}</p>
        
        <button class="btn table-card__btn-open" @click="openTable">Open</button>
        <button class="table-card__btn-delete" @click="deleteTable">&times;</button>
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
        },
        deleteTable() {
            this.$emit('delete-table', this.table.id)
        }
    }
}
</script>

<style lang="scss" scoped>

.table-card {
    width: 400px;
    height: 300px;
    border: 1px solid #000;
    position: relative;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    &__description {
        opacity: 0.6;
    }

    &__btn-delete {
        position: absolute;
        top: 0;
        right: 0;
        margin: 10px;
        background: none;
        border: none;
        transition-property: background, color;
        transition-duration: .2s;
        border-radius: 5px;
        font-size: 20pt;

        &:hover {
            background: rgb(253, 147, 147);
            color: #fff;
        }
    }
}

</style>