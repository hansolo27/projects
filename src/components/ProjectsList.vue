<template>
  <v-card>
    <v-card-title
      class="d-flex justify-space-between"
    >
      <h2 class="text-h4 primary--text">Проекты</h2>
       <v-icon
          color="primary" large
          v-if="!list.length"
          @click="getList"
        >mdi-reload</v-icon>
      <project-filters
        @search="getSearchList"
      />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="list"
      class="custom"
      :loading="loadProj"
      :item-class="getClass"
      :disable-sort="true"
      loading-text="Загрузка проектов... Пожалуйста подождите"
      :footer-props="{
        'items-per-page-text':'Проектов на странице',
      }"
    >
      <template v-slot:no-data>
      <v-alert :value="true" class="error--text">
        Извините, проекты не найдены :(
      </v-alert>
    </template>
    </v-data-table>
  </v-card>
</template>
<script>
import api from '@/services/api.js'
import ProjectsFilters from '@/components/ProjectsFilters'
import helpers from '../utils/helpers'
  export default {
    components: {
      'project-filters': ProjectsFilters,
    },
    data () {
      return {
        color:'primary--text',
        loadProj: true,
        filtersModal: false,
        list: [],
        headers: [
          { text: 'Название проектов', value: 'title', class:"secondary--text" },
          { text: 'Город', value: 'city', class:"secondary--text" },
          { text: 'Дата создания', value: 'creationDate', class:"secondary--text" },
          { text: 'Статус', value: 'status.name', class:"secondary--text" },
          { text: 'Успешные интервью', value: 'successInterviews', class:"secondary--text" },
          { text: 'Всего интервью', value: 'totalInterviews', class:"secondary--text" },
          { text: 'Публичность', value: 'isPublic', class:"secondary--text" },
        ],
      }
    },
    methods: {
      getClass(item){
        return item.status.value === 1 ? 'green--text'
          : item.status.value === 0 ? 'shades--text'
          : item.status.value === 2 ? 'primary--text'
          : item.status.value === 3 ? 'grey--text'
          : item.status.value === 4 ? 'deep-orange--text' : '';
      },
      getList() {
         this.loadProj = true
        api.getProjects().then((res) => {
          this.list = res
            this.list = helpers.getValue(res.projects)
        }).finally(() => {
          this.loadProj = false
        })
      },
      getSearchList(params) {
        this.loadProj = true
        api.getFilteredProjects(params).then((res) => {
          this.list = helpers.getValue(res.projects)
        }).finally(() => {
          this.loadProj = false
        })
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>