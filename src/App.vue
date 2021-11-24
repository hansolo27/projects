<template>
  <v-container>
    <v-app class="pa-6">
      <project-list/>
    </v-app>
  </v-container>
</template>

<script>
import ProjectList from './components/ProjectsList.vue';
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    ProjectList,
  },
};
</script>
