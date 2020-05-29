<template>
    <div class="create-column">
        <h3>Add column</h3>
        <input ref="cColName" type="text" placeholder="Name" maxlength="50">
        <button @click="createColumn">+</button>
    </div>
</template>

<script>
export default {
    name: 'CreateColumn',
    methods: {
        createColumn() {
            this.$emit('add-column', this.$refs.cColName.value)
            this.$refs.cColName.value = ''
        }
    }
}
</script>

<style lang="scss" scoped>

.create-column {
    min-width: 300px;
    height: 100px;
    border: 1px solid #000;
    background: rgb(221, 255, 214);
}

</style>