<template>
  <q-layout view="lHh lpR lFf">

    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
          <q-toolbar-title>
            <h1>CineMatch</h1>
          </q-toolbar-title>
        <q-space />
        <q-btn dense flat round icon="tune" />
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

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="text-white">
      <q-toolbar class="tabToolbar">
        <q-tabs v-model="tab" shrink>
          <q-tab name="match"><q-icon name="favorite" size="sm"></q-icon></q-tab>
          <q-tab name="search"><q-icon name="search" size="sm"></q-icon></q-tab>
          <q-tab name="lists"><q-icon name="list_alt" size="sm"></q-icon></q-tab>
        </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { defineComponent } from 'vue'

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
    }
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
</style>