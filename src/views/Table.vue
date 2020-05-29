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
                @row-completed="toggleRowCompleted"
                
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
            dragTarget: null,
            startPosTarget: null,
            dragStartTargetCol: null
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
        resetIndex(idCol) {
            this.tableData.column[idCol].rows = this.tableData.column[idCol].rows.map((k, i) => {
                k.index = i
                return k
            })
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

            this.resetIndex(idCol)
            this.setStorage()
        },
        toggleRowCompleted(indexRow, idCol) {
            console.log('click');
            
            this.tableData.column[idCol].rows[indexRow].completed = !this.tableData.column[idCol].rows[indexRow].completed
            this.setStorage()
        },

        dragUp(event) {
            event.preventDefault()
            console.log('dragStart');
            
            const target = event.currentTarget
            
            this.dragStartTargetCol = target.parentNode.parentNode
            this.dragTarget = target
            this.startPosTarget = {
                x: event.clientX - (target.offsetLeft + target.parentNode.parentNode.offsetLeft),
                y: event.clientY - (target.offsetTop + target.parentNode.parentNode.offsetTop)
            }
            
            target.style = `position: fixed; width: ${target.clientWidth}px`
            target.classList.add('row_dragging')

            target.addEventListener('mouseup', this.drop)
            this.$refs.table.addEventListener('mousemove', this.dragging)
        },
        drop() {
            const target = this.dragTarget

            // if ()

            target.style = 'position: relative'
            target.classList.remove('row_dragging')

            target.removeEventListener('mouseup', this.drop)
            this.$refs.table.removeEventListener('mousemove', this.dragging)
        },
        dragging(event) {
            const target = this.dragTarget
            
            target.style.top = event.clientY - this.startPosTarget.y + 'px'
            target.style.left = event.clientX - this.startPosTarget.x + 'px'

            // if (event.target.parentNode.parentNode.classList.contains('column')) {
            //     console.log(true);
                
            // }

            // console.log(this.dragStartTargetCol, colCurr);
                        
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