<template>
    <div ref="row" class="row" draggable @dragstart="dragUp" @click="toggleCompleted">
        <p class="row__name">{{ row.name }}</p>
        <button class="btn-delete" @click="$emit('delete-row')">&times;</button>
    </div>
</template>

<script>
export default {
    name: 'Row',
    props: ['row', 'index'],
    watch: {
        'row.completed'() {
            this.$refs.row.classList.toggle('row_completed')
        }
    },
    methods: {
        init() {
            if (this.row.completed) {
                this.$refs.row.classList.add('row_completed')
            }
        },
        dragUp(e) {
            this.$emit('drag-up', e, this.index)
        },
        toggleCompleted(e) {
            this.$emit('row-completed', e, this.index)
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style lang="scss" scoped>

.row {
    width: 99%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin: 5px auto;
    border: 1px solid #000;
    border-radius: 5px;
    background: rgb(225, 246, 255);
    cursor: pointer;
    
    p {
        overflow-wrap: anywhere;
    }

    &_completed {
        background: rgb(189, 189, 189);
    }

    &_dragging {
        width: 150px;
        opacity: 0.5;
    }

    &_last {
        opacity: 0.2;
    }

}

</style>