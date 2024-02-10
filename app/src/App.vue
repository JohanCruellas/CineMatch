<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

const app = createApp({})
const pinia = createPinia()

// pinia.use(() => ({ $ability: app.config.globalProperties.$ability }))
// pinia.use(piniaPluginPersistedstate)

app.use(pinia)

export default defineComponent({
  name: 'App'
})
</script>
