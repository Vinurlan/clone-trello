<template>
    <div class="column" >
        <div class="column__info">
            <h2 class="column__name">{{ column.name }}</h2>
            <button class="btn-delete column__btn-delete" @click="deleteColumn">&times;</button>
            <div class="column__control">
                <input class="inp column__name-row" ref="cRowName" type="text" maxlength="40" placeholder="Name row">
                <button class="btn column__btn-create-row" @click="createRow" >+</button>
            </div>
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
                @row-completed="toggleCompleted"
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
        toggleCompleted(e, indexRow) {      
            this.$emit('row-completed', e, indexRow, this.column.id)
        },

        dragUp(target, index) {
            this.$emit('drag-up', target, index, this.column.id)
            
        },
        enter() {
            console.log(true)
        }
    }
}
</script>

<style lang="scss" scoped>

.column {
    min-width: 300px;
    min-height: 300px;
    border: 1px solid #000;
    border-radius: 10px;
    margin-right: 30px;
    position: relative;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    &__btn-delete {
        position: absolute;
        top: 0;
        right: 0;
        margin: 10px;
        font-size: 15pt;
    }

    &__rows {
        width: 100%;
        padding: 5px;
    }

    &__control {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__name-row {
        background: rgb(165, 201, 207);

        &:focus {
            background: #fff;
        }
    }

    &__btn-create-row {
        color: #000;
        border: 1px solid #000;
        margin-left: 5px;
        font-size: 12pt;
    }
}

</style>