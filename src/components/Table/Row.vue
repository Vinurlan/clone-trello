<template>
    <div class="row" @mousedown="dragUp">
        <p class="row__name">{{ row.name }}</p>
        <button @click="$emit('delete-row')">x</button>
    </div>
</template>

<script>
export default {
    name: 'Row',
    props: ['row', 'index'],
    methods: {
        dragUp(e) {
            this.$emit('drag-up', e, this.index)
            console.log(e.target);
            
        }
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

    &_completed {
        background: rgb(189, 189, 189);
    }

    &_dragging {
        background: rgb(168, 168, 168);
    }
}

</style>