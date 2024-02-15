<template>
    <q-page class="flex justify-center items-center">
        <q-card class="adminCard">
            <h1>Gestion des utilisateurs</h1>
            <q-table :rows="userList" :columns="columns" row-key="id">
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn flat dense round icon="engineering" @click="editRoles(props.row)" />
                        <q-btn flat dense round icon="delete" @click="deleteUser(props.row)" />
                    </q-td>
                </template>
            </q-table>
        </q-card>
        <q-dialog v-model="editRolesModal">
            <q-card>
                <q-card-section>
                    <h6>Modifier les rôles de {{ targetUser.username }}</h6>
                </q-card-section>
                <q-card-section>
                    <q-checkbox v-for="(role, roleIndex) in roles" :key="roleIndex" v-model="targetUserRoles" :label="role.name" :val="role.id" />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Annuler" @click="editRolesModal = false" />
                    <q-btn class="createBtn" flat label="Valider" @click="validateRoles" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>
  
<script>
import { defineComponent } from 'vue'
import userService from 'src/services/user.service';
import roleService from 'src/services/role.service';

export default defineComponent({
    name: 'AdminPage',
    components: {
    },
    data() {
        return {
            userList: [],
            columns: [
                {
                    name: 'username',
                    label: `Nom d'utilisateur`,
                    field: 'username',
                    align: 'left',
                    sortable: true
                },
                {
                    name: 'email',
                    label: 'Email',
                    field: 'email',
                    align: 'left',
                    sortable: true
                },
                {
                    name: 'role',
                    label: 'Rôle',
                    field: 'role',
                    align: 'left',
                    sortable: true
                },
                {
                    name: 'actions',
                    label: 'Actions',
                    field: 'actions',
                    align: 'left'
                }
            ],
            targetUser: null,
            targetUserRoles: [],
            editRolesModal: false,
            roles: []
        }
    },
    methods: {
        deleteUser(user) {
            this.$q.dialog({
                title: 'Suppression',
                message: `Voulez-vous vraiment supprimer l'utilisateur ${user.username} ?`,
                persistent: true,
                ok: {
                    label: 'Oui',
                    color: 'negative'
                },
                cancel: {
                    label: 'Non',
                    color: 'positive'
                }
            }).onOk(async () => {
                let response = await userService.delete(user.id);
                if (response.status === 200) {
                    this.userList = this.userList.filter(u => u.id !== user.id);
                } else {
                    this.$q.notify({
                        color: 'negative',
                        message: 'Erreur lors de la suppression de l\'utilisateur',
                        position: 'top'
                    });
                }
            });
        },
        editRoles(user) {
            this.targetUser = user;
            this.targetUserRoles = user.roles.map(r => r.id);
            this.editRolesModal = true;
        },
        async validateRoles() {
            let response = await roleService.update(this.targetUser.id, this.targetUserRoles);
            if (response.status === 200) {
                this.editRolesModal = false;
                this.$q.notify({
                    color: 'positive',
                    message: 'Rôles modifiés avec succès',
                    position: 'top'
                });
            } else {
                this.$q.notify({
                    color: 'negative',
                    message: 'Erreur lors de la modification des rôles',
                    position: 'top'
                });
            }
        }
    },
    watch: {
    },
    async mounted() {
        let userResponse = await userService.getAll();
        this.userList = userResponse.data.users.filter(u => u.id !== this.$store.currentUser.id);

        console.log(this.userList);

        let rolesResponse = await roleService.getAll();
        this.roles = rolesResponse.data;

        console.log(this.roles);
    }
})
</script>
  
<style lang="scss" scoped>
h1 {
    text-align: center;
    font-size: 16px;
}

.adminCard {
    width: 80%;
    min-height: 500px;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
  