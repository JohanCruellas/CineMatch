<template>
    <q-dialog v-model="showModal">
        <q-card class="accountCard">
            <q-card-section>
                <q-form @submit="createAccount">
                    <q-input v-model="username" label="Nom d'utilisateur" borderless required class="q-mb-sm"></q-input>
                    <q-input v-model="email" label="Email" type="email" borderless required class="q-mb-sm"
                        :rules="[validateEmail]"></q-input>
                    <q-input v-model="password" label="Mot de passe" type="password" borderless required
                        class="q-mb-sm"></q-input>
                    <q-card-actions align="right">
                        <q-btn flat label="Annuler" @click="closeModal" />
                        <q-btn class="createBtn" flat type="submit" label="Créer un compte" />
                    </q-card-actions>
                </q-form>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
import userService from '../services/user.service';

export default {
    name: 'AccountModal',
    data() {
        return {
            showModal: false,
            username: '',
            email: '',
            password: '',
        };
    },
    methods: {
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        validateEmail(value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return "Entrez une adresse email valide";
            }
            return true;
        },
        async createAccount() {
            let response = await userService.create(this.username, this.email, this.password);
            if (response.status == 200) {
                this.$q.notify({
                    message: 'Compte créé avec succès',
                    color: 'positive',
                    icon: 'check',
                });
                this.closeModal();
            } else {
                this.$q.notify({
                    message: 'Erreur lors de la création du compte',
                    color: 'negative',
                    icon: 'warning',
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../css/mixins.scss';

.accountCard {
    @include gradient-border;
    border-radius: 35px;
}

.createBtn {
    color: white;
    padding: 0px 20px;
    background-image: $gradientPrimary;
    border-radius: 35px;
}
</style>
