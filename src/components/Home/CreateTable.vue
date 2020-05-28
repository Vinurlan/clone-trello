<template>
    <div class="create-table">
        <input ref="cName" type="text" placeholder="Name" required>
        <input ref="cDescription" type="text" placeholder="Description">
        <button @click="createTable">+</button>

        <input ref="countCreate" type="number" placeholder="Count">
        <button @click="createMore">Create More</button>

        <button @click="deleteAll">Delete all</button>
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
        createTable(more = false) {
            if (!this.$refs.cName.value) return

            let id = -1
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i).replace(/=\d+/, '') === 'table') {
                    id = Math.max(id, +localStorage.key(i).replace(/\D+?=/, ''))
                    
                }
            }
            
            const data = {
                id: ++id,
                name: this.$refs.cName.value,
                desc: this.$refs.cDescription.value
            }

            localStorage.setItem(`table=${data.id}`, JSON.stringify(data))
            this.$emit('create', data)

            if (!more) {
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
}

</style>