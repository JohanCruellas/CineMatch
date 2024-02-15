<template>
  <div class="page fullscreen text-white text-center q-pa-md flex flex-center">
    <div>
      <h1 style="font-size: 30vh">
        404
      </h1>

      <section class="text-h2" style="opacity:.4">
        Il n'y a rien ici
      </section>

      <q-btn
        class="q-mt-xl"
        color="secondary"
        text-color="white"
        unelevated
        to="/"
        label="Retour à l'accueil"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>

<style lang="scss" scoped>
  .page {
    background-color: $primary;
  }
</style>
```