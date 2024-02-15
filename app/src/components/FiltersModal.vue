<template>
    <q-dialog>
        <q-card class="filterCard">
            <q-card-section>
                <q-item>
                    <q-item-section>
                        <q-select v-model="$store.filters.genres" clearable :options="genresOptions" multiple
                            label="Genres" />
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-select v-model="$store.filters.releaseYearMin" clearable :options="releaseYearOptions"
                            label="Après l'année" />
                    </q-item-section>
                </q-item>
                <!-- <q-select v-model="$store.filters.releaseYearMax" clearable :options="releaseYearOptions" label="Avant l'année" /> -->
                <q-item>
                    <q-item-section>
                        <q-select v-model="$store.filters.rating" clearable :options="ratingOptions"
                            label="Note minimale" />
                    </q-item-section>
                </q-item>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
import mediaService from 'src/services/media.service';

export default {
    name: 'AccountModal',
    data() {
        return {
            genresOptions: [],
            ratingOptions: Array.from({ length: 11 }, (_, index) => index)
        };
    },
    computed: {
        releaseYearOptions() {
            const year = new Date().getFullYear()
            return Array.from({ length: year - 1900 }, (value, index) => 1901 + index).reverse()
        }
    },
    methods: {
        log() {
            console.log(this.$store.filters);
        },
        filterLanguages(val, update, abort) {
            update(() => {
                const needle = val.toLowerCase();
                this.filteredLanguagesOptions = this.languagesOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
            });
        },
    },
    async mounted() {
        let genreResponse = await mediaService.genres();
        this.genresOptions = genreResponse.data.genres.map(genre => {
            return {
                label: genre.name,
                value: genre.id
            };
        });
    }
};
</script>

<style lang="scss" scoped>
@import "../css/mixins.scss";
.filterCard {
    @include gradient-border;
    border-radius: 35px;
    width: 80%;
    max-width: 500px;
}
</style>
