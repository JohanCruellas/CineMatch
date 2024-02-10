<template>
    <q-page>
        <div class="cardStack">
            <MediaCard v-for="(media, mediaIndex) in shownMedias.slice(0, 4).reverse()" :key="mediaIndex" :media="media"
                :index="mediaIndex"></MediaCard>
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
        // Your methods here
        test() {
            console.log('test');
            this.shownMedias.splice(0, 1)
        },
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
        this.shownMedias = response.data.results;
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
