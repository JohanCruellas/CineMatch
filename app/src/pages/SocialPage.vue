<template>
    <q-page class="flex justify-center items-center">
        <input class="searchInput" v-model="searchInput" placeholder="Rechercher un utilisateur" />
        <div class="resultWrapper">
            <q-card v-if="searchInput.length > 2" class="searchResultsCard flex justify-center">
                <div v-if="resultLoading" class="flex justify-center items-center">
                    <q-spinner size="lg"></q-spinner>
                </div>
                <div v-else-if="displayedSearchResults.length <= 0" class="self-center">Pas de résultats</div>
                <ul class="searchList" v-else>
                    <li v-for="(user, userIndex) in displayedSearchResults" :key="userIndex" class="flex justify-center">
                        <div class="searchItem">
                            <h6>{{ user.username }}</h6>
                            <q-btn class="joinBtn" round flat icon="join_inner" size="sm" @click="openJointMedias(user)">
                                <q-tooltip>
                                    Lister les films en commun
                                </q-tooltip>
                            </q-btn>
                        </div>
                    </li>
                </ul>
            </q-card>
        </div>
        <q-dialog v-model="communModal">
            <q-card>
                <q-card-section>
                    <h6>Films en commun avec {{ targetUser.username }}</h6>
                </q-card-section>
                <q-card-section>
                    <MediaList :media-list="jointMediaList"></MediaList>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>
  
<script>
import { defineComponent } from 'vue'
import userService from 'src/services/user.service';
import MediaList from 'src/components/MediaList.vue';
import mediaService from 'src/services/media.service';

export default defineComponent({
    name: 'SocialPage',
    components: {
        MediaList
    },
    data() {
        return {
            searchInput: '',
            displayedSearchResults: [],
            jointMediaList : [],
            resultLoading: false,
            communModal: false,
        }
    },
    computed: {
        debouncedSearch: function () {
            return this.debounce(this.performSearch, 500);
        },
    },
    methods: {
        async performSearch() {
            this.resultLoading = true
            let response = await userService.getAll({ username: this.searchInput })
            this.displayedSearchResults = response.data.users
            console.log(response)
            // this.resultTotalPages = response.data.total_pages
            this.resultLoading = false
        },
        debounce(func, delay) {
            let timeoutId;
            return function () {
                const context = this;
                const args = arguments;
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    func.apply(context, args);
                }, delay);
            };
        },
        async openJointMedias(targetUser) {
            let response = await mediaService.getJointMedias(targetUser.id)
            this.jointMediaList = response.data
            this.targetUser = targetUser
            this.communModal = true
        }
    },
    watch: {
        searchInput(newValue, oldValue) {
            this.resultPage = 1
            this.resultTotalPages = 1
            if (newValue.length > 2)
                this.debouncedSearch();
        },
    },
    mounted() {
    }
})
</script>
  
<style lang="scss" scoped>
.resultWrapper {
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.searchResultsCard {
    width: 80%;
    height: 90%;
    background-color: white;
    background: linear-gradient(white, white) padding-box, $gradientNegative border-box;
    border: 4px solid transparent;
    border-radius: 35px;
    overflow: scroll;
    margin-bottom: 10px;
}

.searchInput {
    margin: 15px 0px;
    height: 50px;
    border-radius: 35px;
    padding: 0px 25px;
    background: linear-gradient(white, white) padding-box, $gradientNegative border-box;
    border-radius: 50em;
    border: 4px solid transparent;
    width: 80%;
}

.searchList {
    width: 100%;
    list-style-type: none;
    padding: 0px 20px;
}

.searchItem {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    height: 40px;
    margin: 15px 0px;
    border-radius: 35px;
    background-image: linear-gradient(45deg, #ff247865, #ffbb0060);
}

.searchItem>li {
    padding: 5px;
}

.imgWrapper {
    display: flex;
    min-width: 250px;
}

.imgWrapper>img {
    height: 40px;
    width: 250px;
    object-fit: cover;
    border-radius: 25px;
}

.searchItem>h6 {
    margin: 0px 0px 0px 10px;
    font-size: medium;
}

.searchItem::after {
    content: '';
    background-image: $gradientNegative;
    position: absolute;
    width: 50%;
    height: 2px;
    bottom: -5px;
    left: 25%;
}

.joinBtn {
    border: 2px solid $bgDark;
    color: $bgDark;
    border-radius: 50%;
    padding: 5px;
    height: 30px;
    width: 30px;
}
</style>
  