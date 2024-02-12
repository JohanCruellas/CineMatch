<template>
    <q-page>
        <div v-if="showLeftIndicator" class="indicator leftIndicator">
            <q-icon name="close" size="xl" class="indicatorIcon"></q-icon>
        </div>
        <div v-if="showRightIndicator" class="indicator rightIndicator">
            <q-icon name="done" size="xl" class="indicatorIcon"></q-icon>
        </div>
        <div class="cardStack">
            <MediaCard v-for="media in shownMedias.slice(0, 4).reverse()" :key="media.id" :media="media"
                @swipe-left="(media) => dislike(media)" @swipe-right="(media) => like(media)"
                @move-left="showLeftIndicator = true" @move-right="showRightIndicator = true"
                @reset-indicators="resetIndicators()">
            </MediaCard>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import mediaService from '../services/media.service';
import listService from '../services/list.service';
import MediaCard from '../components/MediaCard.vue';

export default defineComponent({
    name: 'IndexPage',
    components: {
        MediaCard,
    },
    data() {
        return {
            shownMedias: [],
            userLists: [],
            currentList: null,
            page: 1,
            showRightIndicator: false,
            showLeftIndicator: false,
        };
    },
    methods: {
        async like(media) {
            let response = await listService.update({
                id: this.currentList.id,
                likedMedias: [...this.currentList.likedMedias, media.id]
            });

            if (response.status === 200) {
                this.shownMedias.splice(0, 1);
                this.currentList = response.data;
            } else {
                this.$q.notify({
                    message: `Erreur`,
                    color: 'negative',
                    icon: 'warning'
                });
            }
        },
        async dislike(media) {
            let response = await listService.update({
                id: this.currentList.id,
                dislikedMedias: [...this.currentList.dislikedMedias, media.id]
            });

            if (response.status === 200) {
                this.shownMedias.splice(0, 1);
                this.currentList = response.data;
            } else {
                this.$q.notify({
                    message: `Erreur`,
                    color: 'negative',
                    icon: 'warning'
                });
            }
        },
        getBackgroundGradient(index) {
            const gradients = [
                'linear-gradient(45deg, #a6ff00, #28bbff)',
                'linear-gradient(45deg, #ffbb00, #a6ff00)',
                'linear-gradient(45deg, #ff2478, #ffbb00)',
                'linear-gradient(45deg, #28bbff, #ff2478)',
            ]
            const gradientCount = gradients.length;
            return gradients[index % gradientCount];
        },
        async discoverMedias() {
            let response = await mediaService.discover(this.page, this.$store.filters);
            let filteredShownMedias = response.data.results.filter(media => {
                return !this.currentList.likedMedias.includes(media.id) && !this.currentList.dislikedMedias.includes(media.id);
            });

            this.shownMedias = [...this.shownMedias, ...filteredShownMedias.map((media, index) => {
                return {
                    ...media,
                    backgroundGradient: this.getBackgroundGradient(index),
                };
            })];
        },
        resetIndicators() {
            this.showRightIndicator = false;
            this.showLeftIndicator = false;
        }
    },
    computed: {
    },
    watch: {
        shownMedias: {
            handler: function (val) {
                if (val.length < 4) {
                    console.log('load more')
                    this.page++;
                    this.discoverMedias();
                }
            },
            deep: true
        },
        '$store.filters': {
            handler: function (val) {
                this.page = 1;
                this.shownMedias = [];
                this.discoverMedias();
            },
            deep: true
        }
    },
    created() {
    },
    async mounted() {
        let response = await listService.getAll(this.$store.currentUser.id);
        this.userLists = response.data;
        this.currentList = this.userLists.find(list => list.mainList === true);
        this.discoverMedias();
    },
});
</script>

<style lang="scss" scoped>
.cardStack {
    min-height: inherit;
    display: flex;
    justify-content: center;
}

.indicator {
    position: absolute;
    display: flex;
    align-items: center;
    height: 100%;
    z-index: 99;
}

.leftIndicator {
    left: 0;
}

.rightIndicator {
    right: 0;
}

.indicatorIcon {
    border: 3px solid transparent;
    border-radius: 50px;
}

.leftIndicator>.indicatorIcon {
    font-weight: 700;
    background: $gradientNegative;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: 15px;
}

.rightIndicator>.indicatorIcon {
    font-weight: 700;
    background: $gradientPositive;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-right: 15px;
}
</style>
