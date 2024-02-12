<template>
    <q-page class="flex justify-center items-center">
        <input class="searchInput" v-model="searchInput" placeholder="Rechercher" />
        <div class="resultWrapper">
            <q-card v-if="searchInput.length > 2" class="searchResultsCard flex justify-center">
                <div v-if="resultLoading" class="flex justify-center items-center">
                    <q-spinner size="lg"></q-spinner>
                </div>
                <div v-else-if="displayedSearchResults.length <= 0" class="self-center">Pas de résultats</div>
                <ul class="searchList" v-else>
                    <li v-for="(media, mediaIndex) in displayedSearchResults" :key="mediaIndex" v-ripple class="flex justify-center">
                        <div class="searchItem">
                            <div class="imgWrapper">
                                <img :src="media.backdrop_path ? `https://image.tmdb.org/t/p/original/${media.backdrop_path}` : ''" :alt="media.title"
                                    class="mediaBanner" />
                            </div>
                            <h6>{{ media.title }}</h6>
                        </div>
                    </li>
                </ul>
            </q-card>
            <q-pagination class="pagination" v-if="resultTotalPages > 1" v-model="resultPage" color="red" :max="resultTotalPages" :max-pages="5" :ellipses="false"
                :boundary-numbers="false" />
        </div>
    </q-page>
</template>
  
<script>
import { defineComponent } from 'vue'
import mediaService from 'src/services/media.service';
import MediaDetails from 'src/components/MediaDetails.vue';

export default defineComponent({
    name: 'SearchPage',
    components: {
        // MediaDetails
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
.resultWrapper {
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items:  center;
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

.pagination {
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
    padding: 5px 5px 5px 0px;
    height: 40px;
    margin: 15px 0px;
    border-radius: 35px;
    background-image: linear-gradient(45deg, #ff247865, #ffbb0060);
    cursor: pointer;
}

.searchItem:hover {
    background-image: $gradientNegative;
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

@media only screen and (max-width: 600px) {
    .searchItem {
        padding: 0px;
        width: 250px;
        height: fit-content;
        align-items: baseline;
        justify-content: center;
        flex-wrap: wrap;
        background-image: unset;
    }

    .searchItem>h6 {
        background-color: $bgDark;
        padding: 0px 5px;
        color: white;
        margin: 0px;
        width: 100%;
        border-radius: 0px 0px 25px 25px;
        text-align: center;
    }

    .imgWrapper {
        width: 100%;
    }


    .imgWrapper>img {
        height: 60px;
        border-radius: 25px 25px 0px 0px;
    }
}
</style>
  