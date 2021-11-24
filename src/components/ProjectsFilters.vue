<template>
  <v-card justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Поиск
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5 primary--text">Параметры поиска</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
              >
                <v-text-field
                v-model="params.title"
                append-icon="mdi-magnify"
                label="Название проекта"
                single-line
                hide-details
              ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="params.page"
                >
                  <template v-slot:label>
                    Страница
                  </template>
              </v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="staticStatus"
                  filled
                  label="Статус"
                  dense
                  v-model="params.status"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-switch
                  v-model="params.isPublic"
                  :label="params.isPublic ? 'Публичный' : 'Приватный'"
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
          <small>*Выберите нужные параметры поиска</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Выход
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="search"
          >
            Поиск
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
        params: {
          title: null,
          page: 1,
          status: null,
          isPublic: null,
        },
        staticStatus: [{value: 0, text: 'Draft'}, {value: 1, text: 'Active'},
          {value: 2, text: 'Finished'}, {value: 3, text: 'Archive'},
          {value: 4, text: 'Canceled'}]
      }
    },
    methods: {
      search(){
        this.$emit('search', this.params);
        this.dialog = false;
      }
    },
  }
</script>