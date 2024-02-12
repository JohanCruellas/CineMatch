<template>
  <q-layout view="lHh lpR lFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <h1>CineMatch</h1>
        </q-toolbar-title>
        <q-space />
        <q-btn dense flat round icon="tune" v-if="$route.name === 'Index'" @click="openFiltersModal()">
          <q-badge color="red" floating>{{ numberOfAppliedFilters }}</q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <q-list>
        <q-item>
          <q-avatar size="md">
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
          </q-avatar>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Profil</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container class="pageContainer">
      <router-view />
    </q-page-container>

    <q-footer elevated class="text-white">
      <q-toolbar class="tabToolbar">
        <q-tabs v-model="tab" shrink>
          <q-tab name="match"><q-icon name="favorite" size="sm" @click="$router.push({ name: 'Index' })"></q-icon></q-tab>
          <q-tab name="search"><q-icon name="search" size="sm" @click="$router.push({name : 'Search'})"></q-icon></q-tab>
          <q-tab name="lists"><q-icon name="list_alt" size="sm"></q-icon></q-tab>
        </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { defineComponent } from 'vue'
import FiltersModal from '../components/FiltersModal.vue'
import mediaService from 'src/services/media.service'

export default defineComponent({
  data() {
    return {
      leftDrawerOpen: false,
      tab: 'match'
    }
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    openFiltersModal() {
      this.$q.dialog({
        component: FiltersModal,
        parent: this,
      })
    }
  },
  computed: {
    numberOfAppliedFilters() {
      const filters = this.$store.filters;
      return Object.values(filters).filter(value => {
        if (Array.isArray(value)) {
          return value.length > 0;
        } else {
          return value !== null;
        }
      }).length;
    }
  },
  async mounted() {
    const response = await mediaService.genres();
    this.$store.genres = response.data.genres;
  }
})
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2rem;

}

.tabToolbar {
  display: flex;
  justify-content: center;
}

.pageContainer {
  background-color: $bgDark;
}
</style>