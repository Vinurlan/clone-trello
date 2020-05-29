<template>
    <div class="column">
        <div class="column__info">
            <h2 class="column__name">{{ column.name }}</h2>
            <button class="column__btn-delete" @click="deleteColumn">X</button>

            <input ref="cRowName" type="text" placeholder="Name row">
            <button class="column__btn-create-row" @click="createRow" >+</button>
            <hr>
        </div>
        <div class="column__rows">
            <Row 
                v-for="(row, index) of column.rows"
                :key="row.id"
                :row="row"
                :index="index"
                @delete-row="$emit('delete-row', index, column.id)"
                @drag-up="dragUp"
                @row-completed="$emit('row-completed', index, column.id)"
            />
        </div>
    </div>
</template>

<script>
import Row from '@/components/Table/Row'

export default {
    name: 'Column',
    props: ['column'],
    components: {
        Row
    },
    methods: {
        deleteColumn() {
            this.$emit('delete-col', this.column.id)
        },
        createRow() {
            if (!this.$refs.cRowName.value.length) {
                return
            }
            
            this.$emit('create-row', {idCol: this.column.id, name: this.$refs.cRowName.value})
            this.$refs.cRowName.value = ''
        },

        dragUp(target, index) {
            this.$emit('drag-up', target, index)
            
        }
    }
}
</script>

<style lang="scss" scoped>

.column {
    min-width: 300px;
    min-height: 300px;
    border: 1px solid #000;
    margin-right: 30px;
    position: relative;

    &__btn-delete {
        position: absolute;
        top: 0;
        right: 0;
        background: none;
        border: none;
        margin: 10px;
        transition: background .2s;

        &:hover {
            background: rgb(255, 198, 198);
        }
    }

    &__rows {
        padding: 5px;
    }
}

</style>