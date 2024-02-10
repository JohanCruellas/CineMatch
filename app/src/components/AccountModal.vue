<template>
    <q-dialog v-model="showModal" persistent>
        <q-card>
            <q-card-section>
                <q-form @submit="createAccount">
                    <q-input v-model="username" label="Username" outlined required></q-input>
                    <q-input v-model="email" label="Email" outlined required></q-input>
                    <q-input v-model="password" label="Password" type="password" outlined required></q-input>
                    <q-card-actions align="right">
                        <q-btn label="Cancel" color="primary" @click="closeModal" />
                        <q-btn type="submit" label="Create Account" color="primary" />
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
