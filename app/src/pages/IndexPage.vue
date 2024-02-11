<template>
    <q-page>
        <div class="cardStack">
            <MediaCard v-for="(media, mediaIndex) in shownMedias.slice(0, 4).reverse()" :key="media.id" :media="media"
                :mediaIndex="mediaIndex" @swipe-left="(media) => dislike(media)" @swipe-right="(media) => like(media)">
            </MediaCard>
        </div>
        <!-- <q-btn @click="test()" label="test" class="loadMoreButton" /> -->
    </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import mediaService from '../services/media.service';
import MediaCard from '../components/MediaCard.vue';

export default defineComponent({
    name: 'IndexPage',
    components: {
        MediaCard,
    },
    data() {
        return {
            shownMedias: [],
        };
    },
    methods: {
        async like(media) {
            console.log('like', media);
            // let response = await mediaService.like(media.id);
            // console.log(response);
            this.shownMedias.splice(0, 1);
        },
        async dislike(media) {
            console.log('dislike', media);
            // let response = await mediaService.dislike(media.id);
            // console.log(response);
            this.shownMedias.splice(0, 1);
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
        }

    },
    computed: {
        // Your computed properties here
    },
    created() {
        // Your created hook code here
    },
    async mounted() {
        // Your mounted hook code here
        let response = await mediaService.discover();
        this.shownMedias = response.data.results.map((media, index) => {
            return {
                ...media,
                backgroundGradient: this.getBackgroundGradient(index),
            };
        });
        console.log(this.shownMedias);
    },
    // Other lifecycle hooks and component options here
});
</script>

<style lang="scss" scoped>
.cardStack {
    min-height: inherit;
    position: relative;
    display: flex;
    justify-content: center;
}
</style>
