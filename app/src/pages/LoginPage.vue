<template>
  <div>
    <q-card class="loginCard q-pa-md">
      <q-input filled v-model="username" label="Username" lazy-rules
        :rules="[val => !!val || 'Please enter your username']"></q-input>
      <q-input filled v-model="password" label="Password" lazy-rules
        :rules="[val => !!val || 'Please enter your password']" type="password"></q-input>
      <q-btn class="q-mt-md" color="primary" label="Login" />
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.loginCard {
  width: 400px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
