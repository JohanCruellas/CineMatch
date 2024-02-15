<template>
  <div class="cardWrapper">
    <q-card class="loginCard q-pa-md">
      <q-form @submit="login">
        <q-input filled v-model="username" label="Nom d'utilisateur" lazy-rules
          :rules="[val => !!val || `Veuillez entrer votre nom d'utilisateur`]"></q-input>
        <q-input filled v-model="password" label="Mot de passe" lazy-rules
          :rules="[val => !!val || 'Veuillez entrer votre mot de passe']" type="password"></q-input>
        <div class="flex column">
          <q-btn class="q-mt-md loginBtn" label="Connexion" type="submit" />
          <q-chip class="q-mt-md createAccountChip" label="Créer un compte" clickable @click="openAccountModal()" />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { LocalStorage } from 'quasar'
import AccountModal from '../components/AccountModal.vue'
import userService from '../services/user.service'

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    openAccountModal() {
      this.$q.dialog({
        component: AccountModal,
        parent: this
      })
    },
    async login() {
      let response = await userService.login(this.username, this.password)
      if (response.status === 200) {
        const { user, token } = response.data
        this.$store.currentUser = user
        LocalStorage.set('token', token)
        this.$router.push({ name: 'Index' })

      } else {
        if (response.status === 401) {
          this.$q.notify({
            message: 'Nom d\'utilisateur ou mot de passe incorrect',
            color: 'negative',
            icon: 'warning'
          })
        } else {
          this.$q.notify({
            message: 'Erreur lors de la connexion',
            color: 'negative',
            icon: 'warning'
          })
        }
      }
    }
  },
  mounted() {
  }
})
</script>

<style lang="scss" scoped>
// import mixins.scss
@import "../css/mixins.scss";

.cardWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: $bgDark;
}

.loginCard {
  @include gradient-border;
  border-radius: 35px;
  width: 90%;
  max-width: 500px;
}

.loginBtn {
  color : white;
  background-image: $gradientPrimary;
  max-width: 200px;
  margin: 0 auto;
  margin-top: 15px;
}

.createAccountChip {
  @include gradient-border;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
