<template>
    <div class="create-table">
        <input class="inp" ref="cName" type="text" placeholder="Name">
        <input class="inp" ref="cDescription" type="text" placeholder="Description">
        <button class="btn create-table__btn-create" @click="createTable">+</button>
<!-- 
        <input ref="countCreate" type="number" placeholder="Count">
        <button @click="createMore">Create More</button>

        <button @click="deleteAll">Delete all</button> -->
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'CreateTable',
    methods: {
        deleteAll() {
            Vue.iterationStorage((key) => {
                localStorage.removeItem(key)
                this.$emit('delete')
                this.$refs.countCreate.value = ''
            })
        },
        createMore() {
            const count = +this.$refs.countCreate.value
            
            for (let i = 0; i < count; i++) {
                this.createTable(true)        
            }

            this.$refs.cName.value = ''
            this.$refs.cDescription.value = ''
        },
        async createTable(e, more = false) {
            if (!this.$refs.cName.value) return

            let id = -1
            Vue.iterationStorage((key) => {
                id = Math.max(id, +key.replace(/\D+?=/, ''))
            })
            
            const data = {
                id: ++id,
                name: this.$refs.cName.value,
                desc: this.$refs.cDescription.value,
                column: []
            }

            await localStorage.setItem(`table=${data.id}`, JSON.stringify(data))
            this.$emit('create', data)
            
            if (!more) { // Need for multi create
                this.$refs.cName.value = ''
                this.$refs.cDescription.value = ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.create-table {
    width: 400px;
    height: 300px;
    border: 1px solid #000;
    background: rgb(221, 255, 214);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 10px;

    &__btn-create {
        color: #000;
        border: 1px solid #000;

    }
}

</style>