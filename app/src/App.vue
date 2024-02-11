<template>
  <router-view />
</template>

<script>
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import { defineComponent } from 'vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

const app = createApp({})
const pinia = createPinia()

pinia.use(piniaPluginPersistedState)

app.use(pinia)

export default defineComponent({
  name: 'App'
})
</script>
