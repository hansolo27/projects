<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between">
      <h2 class="text-h4 primary--text">Проекты</h2>
      <v-btn
        icon
        color="primary"
        v-if="!list.length"
        @click="getList(), reset()"
      >
        <v-icon large>mdi-cached</v-icon>
      </v-btn>
      <project-filters @search="getSearchList" />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="list"
      class="custom mb-4"
      :loading="loadProj"
      :item-class="getClass"
      :disable-sort="true"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      loading-text="Загрузка проектов... Пожалуйста подождите"
    >
      <template v-slot:no-data>
        <v-alert :value="true" class="error--text">
          Извините, проекты не найдены :(
        </v-alert>
      </template>
    </v-data-table>
    <v-list-item class="justify-center mb-4">
      <v-pagination
        v-if="list.length"
        v-model="page"
        :length="pageCount"
        total-visible="7"
        @input="checkPage"
      >
      </v-pagination>
    </v-list-item>
    <v-list-item class="justify-center mb-4">
      <v-chip class="ma-2" color="primary" label text-color="white">
        <v-icon left> mdi-label </v-icon>
        {{ `на странице ${list.length} проектов из ${allPages}` }}
      </v-chip>
    </v-list-item>
  </v-card>
</template>
<script>
import api from "@/services/api.js";
import ProjectsFilters from "@/components/ProjectsFilters";
import helpers from "../utils/helpers";
export default {
  components: {
    "project-filters": ProjectsFilters,
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      allPages: 0,
      loadProj: true,
      filtersModal: false,
      list: [],
      savedParams: {},
      headers: [
        { text: "Название проектов", value: "title", class: "secondary--text" },
        { text: "Город", value: "city", class: "secondary--text" },
        {
          text: "Дата создания",
          value: "creationDate",
          class: "secondary--text",
        },
        { text: "Статус", value: "status.name", class: "secondary--text" },
        {
          text: "Успешные интервью",
          value: "successInterviews",
          class: "secondary--text",
        },
        {
          text: "Всего интервью",
          value: "totalInterviews",
          class: "secondary--text",
        },
        { text: "Публичность", value: "isPublic", class: "secondary--text" },
      ],
    };
  },
  methods: {
    reset() {
      this.savedParams = {};
    },
    getClass(item) {
      return item.status.value === 1
        ? "green--text"
        : item.status.value === 0
        ? "shades--text"
        : item.status.value === 2
        ? "primary--text"
        : item.status.value === 3
        ? "grey--text"
        : item.status.value === 4
        ? "deep-orange--text"
        : "";
    },
    getList() {
      this.loadProj = true;
      api
        .getProjects()
        .then((res) => {
          this.page = res.currentPage;
          this.allPages = res.totalCount;
          this.list = res;
          this.list = helpers.getValue(res.projects);
        })
        .finally(() => {
          this.loadProj = false;
        });
    },
    getSearchList(params) {
      this.savedParams = params;
      this.loadProj = true;
      api
        .getFilteredProjects(params)
        .then((res) => {
          this.page = res.currentPage;
          this.allPages = res.totalCount;
          this.list = helpers.getValue(res.projects);
        })
        .finally(() => {
          this.loadProj = false;
        });
    },
    checkPage(value) {
      api
        .getFilteredProjects({
          ...this.savedParams,
          page: value,
        })
        .then((res) => {
          this.loadProj = true;
          this.list = helpers.getValue(res.projects);
        })
        .finally(() => {
          this.loadProj = false;
        });
    },
  },
  mounted() {
    this.getList();
  },
  computed: {
    totalRecords() {
      return this.allPages;
    },
    pageCount() {
      return Math.round(this.totalRecords / this.itemsPerPage);
    },
  },
};
</script>
