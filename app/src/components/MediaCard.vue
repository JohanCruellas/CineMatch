<template>
    <q-card class="card" ref="draggableCard" :class="inInteraction === false ? 'transitionDelay' : ''">
        <q-card-section class="cardPoster">
            <img :src="media.backdrop_path ? `https://image.tmdb.org/t/p/w300/${media.backdrop_path}` : media.poster_path ? `https://image.tmdb.org/t/p/w300/${media.poster_path}` : ''"
                :alt="media.title" class="mediaPoster" />
        </q-card-section>
        <q-card-section class="cardText">
            <q-item class="itemText">
                <q-item-section class="flex">
                    <q-item-label>{{ media.title }}</q-item-label>
                    <q-item-label caption>
                        <q-chip dense v-for="(genreId, genreIndex) in shownGenres" :key="genreIndex">
                            {{ this.$store.genres.find(genre => genre.id === genreId).name }}
                        </q-chip>
                        <q-chip dense v-if="media.genre_ids.length > 2">
                            + {{ media.genre_ids.length - 2 }}
                            <q-tooltip>
                                <div v-for="(genreId, genreIndex) in hiddenGenres" :key="genreIndex">
                                    {{ this.$store.genres.find(genre => genre.id === genreId).name }}
                                </div>
                            </q-tooltip>
                        </q-chip>
                    </q-item-label>
                    <q-item-label caption>{{ media.release_date }}</q-item-label>
                    <q-item-label caption>{{ media.vote_average }} / 10</q-item-label>
                    <q-item-label class="overviewText">
                        {{ media.overview.length > 0 ? media.overview : 'Pas de synopsis' }}</q-item-label>
                    <q-space></q-space>
                    <q-item-label class="flex justify-center">
                        <q-btn flat round icon="expand_more" @click="openDetails()" />
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import interact from 'interactjs';
import MediaDetails from './MediaDetails.vue';

export default defineComponent({
    name: 'MediaCard',
    emits: ['swipeRight', 'swipeLeft', 'moveRight', 'moveLeft', 'resetIndicators'],
    props: {
        media: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            interactionPosition: {
                x: 0,
                y: 0,
            },
            interactionXThreshold: 150,
            inInteraction: false,
        };
    },
    computed: {
        transformString() {
            const { x, y } = this.interactionPosition;
            const distanceFromOrigin = Math.sqrt(x * x + y * y);
            const rotationDirection = x < 0 ? -1 : 1;
            const rotationAngle = rotationDirection * (distanceFromOrigin / 30);
            return `translate3D(${x}px, ${y}px, 0) rotate(${rotationAngle}deg)`;
        },
        cardOnRight() {
            const { x } = this.interactionPosition
            return x > this.interactionXThreshold
        },
        cardOnLeft() {
            const { x } = this.interactionPosition
            return x < -this.interactionXThreshold
        },
        shownGenres() {
            return this.media.genre_ids.slice(0, 2);
        },
        hiddenGenres() {
            return this.media.genre_ids.slice(2);
        },
    },
    methods: {
        interactSetPosition(coordinates) {
            const { x = 0, y = 0 } = coordinates
            this.interactionPosition = { x, y }
        },
        resetCardPosition() {
            this.inInteraction = false
            this.interactSetPosition({ x: 0, y: 0 })
        },
        openDetails() {
            this.$q.dialog({
                component: MediaDetails,
                parent: this,
                componentProps: {
                    media: this.media
                }
            })
        }
    },
    watch: {
        cardOnRight(value) {
            if (value) {
                this.$emit('moveRight')
            } else {
                this.$emit('resetIndicators')
            }
        },
        cardOnLeft(value) {
            if (value) {
                this.$emit('moveLeft')
            } else {
                this.$emit('resetIndicators')
            }
        },
    },
    async mounted() {
        const element = this.$refs.draggableCard.$el
        interact(element).draggable({
            onmove: event => {
                this.inInteraction = true
                const x = this.interactionPosition.x + event.dx
                const y = this.interactionPosition.y + event.dy
                this.interactSetPosition({ x, y })
            },
            onend: () => {
                const { x } = this.interactionPosition
                if (x > this.interactionXThreshold) {
                    this.$emit('swipeRight', this.media)
                } else if (x < -this.interactionXThreshold) {
                    this.$emit('swipeLeft', this.media)
                }
                this.resetCardPosition()
            }
        })
    },
    beforeUnmount() {
        interact(this.$refs.draggableCard).unset()
    },
});
</script>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    position: absolute;
    align-self: center;
    height: 500px;
    width: 80%;
    max-width: 350px;
    border-radius: 35px;
    user-select: none;
    touch-action: none;
    background-image: v-bind('media.backgroundGradient');
    cursor: grab !important;
}

.cardPoster {
    padding: 0;
    height: 150px;
    margin: 5px 5px 0px 5px;
    overflow: hidden;
}

.cardPoster>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cardText {
    flex: 1;
    background-color: white;
    box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    margin: 0px 5px 5px 5px;
    padding-bottom: 10px;
    max-height: 350px;
}

.itemText {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.overviewText {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: 5;
    -webkit-line-clamp: 10;
    margin-bottom: 10px;
}

.transitionDelay {
    transition: transform 0.3s;
}

@for $i from 0 through 3 {
    .card:nth-child(#{$i + 1}) {
        transform: translateY($i * -30px) scale(calc(1 + ($i / 20))) v-bind(transformString);
    }
}

@media screen and (max-width: 600px) {
    .card {
        width: 70%;
    }

    .overviewText {
        line-clamp: 3;
        -webkit-line-clamp: 4;
    }
}

@media screen and (max-height: 850px) {
    .card {
        align-self: flex-end;
        margin-bottom: 25px;
    }
}
</style>