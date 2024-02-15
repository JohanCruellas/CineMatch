<template>
  <q-layout view="lHh lpR lFf">
    <q-header bordered class="text-white header">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="toolbarTitle">
          <h1>CineMatch</h1>
        </q-toolbar-title>
        <q-btn dense flat round icon="tune" v-if="$route.name === 'Index'" @click="openFiltersModal()">
          <q-badge color="red" floating>{{ numberOfAppliedFilters }}</q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" elevated class="drawer">
      <q-list class="leftDrawer">
        <q-item clickable v-ripple v-if="$store.checkAdminRights()" @click="$router.push({name : 'Admin'})">
          <q-item-section>
            <q-item-label>Admin</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="logoutBtn" clickable v-ripple @click="logout()">
          <q-item-section>
            <q-item-label>Se déconnecter <q-icon name="chevron_right"></q-icon></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="pageContainer">
      <router-view />
    </q-page-container>

    <q-footer elevated class="text-white">
      <q-toolbar class="tabToolbar">
        <q-tabs v-model="$route.name" shrink>
          <q-tab name="Index" @click="$router.push({ name: 'Index' })"><q-icon name="favorite" size="sm"></q-icon></q-tab>
          <q-tab name="Search" @click="$router.push({ name: 'Search' })"><q-icon name="search" size="sm"></q-icon></q-tab>
          <q-tab name="Social" @click="$router.push({ name: 'Social' })"><q-icon name="people" size="sm"></q-icon></q-tab>
        </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { LocalStorage } from 'quasar'
import FiltersModal from '../components/FiltersModal.vue'
import mediaService from 'src/services/media.service'

export default defineComponent({
  data() {
    return {
      leftDrawerOpen: false,
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
    },
    logout() {
      LocalStorage.clear()
      this.$router.push({ name: 'Login' })
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
    },
  },
  async mounted() {
    const response = await mediaService.genres();
    this.$store.genres = response.data.genres;
  }
})
</script>

<style lang="scss" scoped>
:deep(.drawer) {
  background-color: $bgLight;
}

.toolbarTitle {
  width: 100%;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2rem;

}

.tabToolbar {
  background-image: $gradientPrimary;
  display: flex;
  justify-content: center;
}

.header {
  background-image: $gradientPrimary;
}

.pageContainer {
  background-color: $bgDark;
}

.logoutBtn {
  background-color: #fa458b;;
  font-weight: 500;
}
</style>