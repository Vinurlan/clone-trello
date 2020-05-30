<template>
    <div class="create-column">
        <h2>Add column</h2>
        <div class="create-column__control">
            <input class="inp" ref="cColName" type="text" placeholder="Name column" maxlength="50" @keypress.enter="createColumn">
            <button class="btn create-column__btn-create" @click="createColumn">+</button>
        </div>
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
    height: 120px;
    border: 1px solid #000;
    border-radius: 10px;
    background: rgb(221, 255, 214);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    &__control {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__btn-create {
        color: #000;
        border: 1px solid #000;
        margin-left: 5px;
        font-size: 12pt;
    }
}

</style>