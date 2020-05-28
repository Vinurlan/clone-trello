<template>
  <div class="home">
    <div class="home__list">
      <div class="home__loader" v-if="!loading">
        <CreateTable @create="addTable" @delete="deleteAllTable" />
        <TableCard 
          v-for="table of filterTables"
          :key="table.id"
          :table="table"
        />
      </div>
      <div class="home__loader-empty" v-else>
        <CreateTable  @create="addTable"  @delete="deleteAllTable" />
        <h2>No Tables</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import CreateTable from '@/components/Home/CreateTable.vue'
import TableCard from '@/components/Home/TableCard.vue'

export default {
  name: 'Home',
  components: {
    CreateTable, TableCard
  },
  computed: {
    filterTables() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.tableList.sort((a, b) => a.id > b.id ? 1 : -1)
    },
    loading() {
      return !this.tableList.length
    }
  },
  data() {
    return {
      tableList: [],
      // loading: true
    }
  },
  methods: {
    async loadTables() {

      Vue.iterationStorage(key => {
        this.tableList.push(JSON.parse(localStorage.getItem(key)))
      })

    },
    addTable(data) {
      this.tableList.push(data)
    },
    deleteAllTable() {
      this.tableList = []
    }
  },
  mounted() {
    this.loadTables()
  }
}
</script>


<style lang="scss" scoped>

.home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__list {
    width: 80%;
    height: 80%;
    margin: 100px auto;
  }

  &__loader, &__loader-empty {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

</style>