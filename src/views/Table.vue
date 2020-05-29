<template>
    <div ref="table" class="table">
        <h1>Table: {{tableData.name}}</h1>
        <router-link to="/">Go Board</router-link>
        <div class="table__list">
            <Column 
                v-for="column of tableData.column"
                :key="column.id"
                :column="column"
                @delete-col="deleteColumn"
                @create-row="createRow"
                @delete-row="deleteRow"
                @drag-up="dragUp"
                
            />
            <CreateColumn @add-column="createColumn"/>
        </div>
    </div>
</template>

<script>
import Column from '@/components/Table/Column'
import CreateColumn from '@/components/Table/CreateColumn'


export default {
    name: 'Table',
    components: {
        Column, CreateColumn
    },
    data() {
        return {
            tableData: {},
            dragContainer: null,
            posContainer: null,
            dragContainerCol: null
        }
    },
    methods: {
        init() {
            this.tableData = JSON.parse(localStorage.getItem(`table=${this.$route.query.id}`))
            
            if (this.tableData == null || !this.tableData.name || this.tableData.id < 0) {
                this.$router.push('/')
            }
            
        },
        setStorage() {
            localStorage.setItem(
                `table=${this.tableData.id}`, 
                JSON.stringify(this.tableData))
        },
        createColumn(name) {
            let id = -1
            for (let i = 0; i < this.tableData.column.length; i++) {
                id = Math.max(id, this.tableData.column[i].id)
            }

            id++
            this.tableData.column.push({id, name, rows: []})

            this.setStorage()
        },
        deleteColumn(id) {
            const index = this.tableData.column.findIndex((k) => k.id == id)
            this.tableData.column.splice(index, 1)

            this.setStorage()
        },
        createRow({idCol, name}) {
            let index = this.tableData.column[idCol].rows.length
            
            this.tableData.column[idCol].rows.push({index, name, completed: false})

            this.setStorage()
        },
        deleteRow(indexRow, idCol) {
            this.tableData.column[idCol].rows.splice(indexRow, 1)

            this.setStorage()
        },

        dragUp(event) {
            const target = event.currentTarget
            console.log(event.currentTarget);
            
            target.addEventListener('mouseup', this.drop)
            this.$refs.table.addEventListener('mousemove', this.dragging)
            
            this.dragContainerCol = target.parentNode.parentNode
            this.dragContainer = target
            this.posContainer = {
                x: event.clientX - (target.offsetLeft + target.parentNode.parentNode.offsetLeft),
                y: event.clientY - (target.offsetTop + target.parentNode.parentNode.offsetTop)
            }
            console.log(this.posContainer);
            

            target.style = 'position: fixed'

            target.classList.add('row_dragging')
        },
        drop(event) {
            event.target.classList.remove('row_dragging')

            event.target.removeEventListener('mouseup', this.drop)
            this.$refs.table.removeEventListener('mousemove', this.dragging)
        },
        dragging(event) {
            const target = this.dragContainer
            
            target.style.top = event.clientY - this.posContainer.y + 'px'
            target.style.left = event.clientX - this.posContainer.x + 'px'

            // let colCurr = target.parentNode.parentNode

            // console.log(this.dragContainerCol, colCurr);
            
            
        }
    },
    mounted() {
        this.init()
        
    }
}
</script>

<style lang="scss" scoped>

.table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    &__list {
        width: 80%;
        margin: 100px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
}

</style>