<template>
    <div ref="table" class="table">
        <h1 class="table__name">{{tableData.name}}</h1>
        <router-link to="/">&lArr; Go Board</router-link>
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
            startColId: null,
            dragTargetData: null,
            dragTarget: null,
            startPosTarget: null
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
        resetIndex() {
            for (let i = 0; i < arguments.length; i++) {
                if (!(typeof arguments[i] == 'number')) continue

                this.tableData.column[arguments[i]].rows = this.tableData.column[arguments[i]].rows.map((k, i) => {
                    k.index = i
                    return k
                })
            }
            
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
        toggleRowCompleted(e, indexRow, idCol) {
            if (this.dragTarget) {
                this.clearTargetData()
                return
            }
            if (e.target.tagName == "BUTTON") {
                return
            }

            this.tableData.column[idCol].rows[indexRow].completed = !this.tableData.column[idCol].rows[indexRow].completed
            this.clearTargetData()
            this.setStorage()
        },

        clearTargetData() {
            this.dragTarget = null
            this.startPosTarget = null
            this.dragTargetData = null
            this.startColId = null
        },
        dragUp(event, indexRow, idCol) {
            event.preventDefault()

            const target = event.currentTarget
            const boxTarget = target.getBoundingClientRect()
            
            this.startColId = idCol
            this.dragTargetData = this.tableData.column[idCol].rows[indexRow]
            this.dragTarget = target
            this.startPosTarget = {
                x: event.clientX - boxTarget.left,
                y: event.clientY - boxTarget.top
            }

            
            target.style = `position: fixed; width: ${target.clientWidth}px; z-index: 2;`
            target.classList.add('row_dragging')

            target.addEventListener('mouseup', this.drop)
            this.$refs.table.addEventListener('mousemove', this.dragging)
        },
        drop(event) {
            const target = this.dragTarget

            const colEnd = document.elementsFromPoint(event.clientX, event.clientY).find((el) => el.classList.contains('column'))

            if (colEnd) {
                const colEndName = colEnd.querySelector('.column__name').innerHTML
                const idEndCol = this.tableData.column.find(k => k.name == colEndName).id
                
                if (this.startColId !== idEndCol) {
                    this.tableData.column[idEndCol].rows.push(this.dragTargetData)
                    this.tableData.column[this.startColId].rows.splice(
                        this.dragTargetData.index, 1)

                    this.resetIndex(idEndCol, this.startColId)
                    this.setStorage()
                }
            }

            target.style = 'position: relative'
            target.classList.remove('row_dragging')

            target.removeEventListener('mouseup', this.drop)
            this.$refs.table.removeEventListener('mousemove', this.dragging)
        },
        dragging(event) {        
            const target = this.dragTarget
            
            target.style.top = event.clientY - this.startPosTarget.y + 'px'
            target.style.left = event.clientX - this.startPosTarget.x + 'px'
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

    &__name {
        border: 3px solid #000;
        border-radius: 10px;
        padding: 5px 30px;
    }

    &__list {
        width: 80%;
        margin: 100px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
    
    a {
        text-decoration: none;
        color: #000;

        &:hover {
            text-decoration: underline;
        }
    }
}

</style>