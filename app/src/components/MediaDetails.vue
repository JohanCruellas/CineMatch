<template>
    <q-dialog>
        <q-card class="mediaCard">
            <section>
                <q-item>
                    <q-item-section>
                        <q-item-label class="flex justify-between">
                            <h3>{{ media.title }}</h3>
                            <q-btn v-if="likable" dense flat round class="favBtn" @click="favBtnPressed()">
                                <q-icon :name="getIcon" class="favIcon"></q-icon>
                            </q-btn>
                        </q-item-label>
                        <img :src="media.poster_path ? `https://image.tmdb.org/t/p/original/${media.poster_path}` : ''"
                            :alt="media.title" class="mediaPoster" />
                        <q-item-label caption>
                            <q-chip class="chip" dense v-for="(genreId, genreIndex) in media.genre_ids" :key="genreIndex">
                                {{ this.$store.genres.find(genre => genre.id === genreId).name }}
                            </q-chip>
                        </q-item-label>
                        <q-item-label caption>
                            <p>Date de sortie : {{ media.release_date }}</p>
                        </q-item-label>
                        <q-item-label caption>
                            <p>Note : {{ media.vote_average }} / 10</p>
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </section>
            <section>
                <q-item>
                    <p>
                        {{ media.overview.length > 0 ? media.overview : 'Pas de synopsis' }}
                    </p>
                </q-item>
            </section>
        </q-card>
    </q-dialog>
</template>

<script>
import listService from 'src/services/list.service';

export default {
    name: 'MediaDetails',
    props: {
        media: {
            type: Object,
            required: true,
        },
        likable: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            userLists: [],
            currentList: null,
            isLiked: false,
        };
    },
    computed: {
        getIcon() {
            return this.isLiked ? 'favorite' : 'favorite_border';
        }
    },
    methods: {
        favBtnPressed() {
            this.isLiked = !this.isLiked;
            if (this.isLiked) {
                this.currentList.likedMedias.push(this.media.id);
            } else {
                this.currentList.likedMedias = this.currentList.likedMedias.filter(id => id !== this.media.id);
            }
            listService.update(this.currentList);
        }
    },
    async mounted() {
        let response = await listService.getAll(this.$store.currentUser.id);
        this.userLists = response.data;
        this.currentList = this.userLists.find(list => list.mainList === true);
        this.isLiked = this.currentList.likedMedias.includes(this.media.id);
    },
};
</script>

<style lang="scss" scoped>
h3 {
    padding-left: 5px;
    font-size: medium;
    font-weight: 700;
    margin: 0px;
    color: $bgDark
}

img {
    width: 100%;
    max-height: auto;
    object-fit: cover;
    margin-bottom: 5px;
}

.chip {
    padding: 5px;
    margin: 5px;
}

p {
    padding-left: 5px;
}

.favBtn {
    height: 40px;
    width: 40px;
}

.favIcon {
    transition: all .8s ease-in-out;
    -webkit-background-clip: text;
    font-weight: 700;
    background-image: $gradientPrimary;
    ;
    -webkit-text-fill-color: transparent;
}
</style>
