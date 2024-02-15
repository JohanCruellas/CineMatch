<template>
    <q-page class="flex justify-center items-center">
        <input class="searchInput" v-model="searchInput" placeholder="Rechercher un film" />
        <div class="resultWrapper">
            <q-card v-if="searchInput.length > 2" class="searchResultsCard flex justify-center">
                <div v-if="resultLoading" class="flex justify-center items-center">
                    <q-spinner size="lg"></q-spinner>
                </div>
                <div v-else-if="displayedSearchResults.length <= 0" class="self-center">Pas de résultats</div>
                <MediaList v-else :media-list="displayedSearchResults" ></MediaList>
            </q-card>
            <q-pagination class="pagination" v-if="resultTotalPages > 1 && searchInput.length > 2" v-model="resultPage" color="red" :max="resultTotalPages" :max-pages="5" :ellipses="false"
                :boundary-numbers="false" />
        </div>
    </q-page>
</template>
  
<script>
import { defineComponent } from 'vue'
import mediaService from 'src/services/media.service';
import MediaDetails from 'src/components/MediaDetails.vue';
import MediaList from 'src/components/MediaList.vue';

export default defineComponent({
    name: 'SearchPage',
    components: {
        MediaList
    },
    data() {
        return {
            searchInput: '',
            displayedSearchResults: [],
            resultLoading: false,
            resultPage: 1,
            resultTotalPages: 1
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
            let response = await mediaService.search(this.searchInput, this.resultPage)
            this.displayedSearchResults = response.data.results
            this.resultTotalPages = response.data.total_pages
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
    },
    watch: {
        searchInput(newValue, oldValue) {
            this.resultPage = 1
            this.resultTotalPages = 1
            if (newValue.length > 2)
                this.debouncedSearch();
        },
        resultPage(newValue, oldValue) {
            if(newValue !== oldValue) {
                this.performSearch()
            }
        }
    },
    mounted() {
    }
})
</script>
  
<style lang="scss" scoped>
@import "../css/mixins.scss";

.resultWrapper {
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items:  center;
}

.searchResultsCard {
    @include gradient-border;
    width: 80%;
    height: 90%;
    background-color: white;
    border-radius: 35px;
    overflow: scroll;
    margin-bottom: 10px;
}

.searchList {
    width: 100%;
    list-style-type: none;
    padding: 0px 20px;
}
</style>
  