<template>
    <ul class="mediaList">
        <li v-for="(media, mediaIndex) in mediaList" :key="mediaIndex" class="flex justify-center"
            @click="openDetails(media)">
            <div class="mediaItem">
                <div class="imgWrapper">
                    <img :src="media.backdrop_path ? `https://image.tmdb.org/t/p/w300/${media.backdrop_path}` : media.poster_path ? `https://image.tmdb.org/t/p/w300/${media.poster_path}` : ''"
                        :alt="media.title" class="mediaBanner" />
                </div>
                <h6>{{ media.title }}</h6>
            </div>
        </li>
    </ul>
</template>
  
<script>
import { defineComponent } from 'vue'
import MediaDetails from 'src/components/MediaDetails.vue';

export default defineComponent({
    name: 'MediaList',
    props: {
        mediaList : {
            type: Array,
            required: true
        }
    },
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
        openDetails(media) {
            console.log(media)
            this.$q.dialog({
                component: MediaDetails,
                parent: this,
                componentProps: {
                    media: media,
                    likable: true
                }
            })
        }
    },
    watch: {
    },
    mounted() {
    }
})
</script>
  
<style lang="scss" scoped>

.mediaList {
    width: 100%;
    list-style-type: none;
    padding: 0px 20px;
}

.mediaItem {
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

.mediaItem:hover {
    background-image: $gradientNegative;
}

.mediaItem>li {
    padding: 5px;
}
.mediaItem>h6 {
    margin: 0px 0px 0px 10px;
    font-size: medium;
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



.mediaItem::after {
    content: '';
    background-image: $gradientNegative;
    position: absolute;
    width: 50%;
    height: 2px;
    bottom: -5px;
    left: 25%;
}

@media only screen and (max-width: 600px) {
    .mediaItem {
        padding: 0px;
        width: 250px;
        height: fit-content;
        align-items: baseline;
        justify-content: center;
        flex-wrap: wrap;
        background-image: unset;
    }

    .mediaItem>h6 {
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
  