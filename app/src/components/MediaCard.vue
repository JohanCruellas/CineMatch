<template>
    <q-card class="card" ref="draggableCard" :class="inInteraction === false ? 'transitionDelay' : ''">
        {{ mediaIndex }}
        <q-card-section>
            <q-item>
                <q-item-section>
                    <q-item-label>{{ media.title }}</q-item-label>
                    <q-item-label caption>{{ media.release_date }}</q-item-label>
                    <q-item-label>{{ media.overview }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import interact from 'interactjs';

export default defineComponent({
    name: 'MediaCard',
    emits: ['swipeRight', 'swipeLeft'],
    props: {
        media: {
            type: Object,
            required: true,
        },
        mediaIndex: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            interactionPosition: {
                x: 0,
                y: 0,
            },
            interactionXThreshold: 100,
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
    },
    mounted() {
        const element = this.$refs.draggableCard.$el
        interact(element).draggable({
            // lockAxis: 'x',
            onmove: event => {
                this.inInteraction = true
                const x = this.interactionPosition.x + event.dx
                const y = this.interactionPosition.y + event.dy
                this.interactSetPosition({ x, y })
                // console.log(this.transformString)
            },
            onend: () => {
                const { x } = this.interactionPosition
                if (x > this.interactionXThreshold) {
                    console.log('swipe right')
                    this.$emit('swipeRight', this.media)
                } else if (x < -this.interactionXThreshold) {
                    console.log('swipe left', this.media)
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
// $gradients: (
//     linear-gradient(45deg, #a6ff00, #28bbff),
//     linear-gradient(45deg, #ffbb00, #a6ff00),
//     linear-gradient(45deg, #ff2478, #ffbb00),
//     linear-gradient(45deg, #28bbff, #ff2478),
// );

.card {
    display: none;
    position: absolute;
    align-self: center;
    height: 500px;
    max-width: 350px;
    border-radius: 35px;
    user-select: none;
    touch-action: none;
    background-image : v-bind('media.backgroundGradient');
}

.transitionDelay {
    transition: transform 0.3s;
}

@for $i from 0 through 3 {
    .card:nth-child(#{$i + 1}) {
        display: block;
        transform: translateY($i * -30px) scale(calc(1 + ($i / 20))) v-bind(transformString);
        // background-image: nth($gradients, $i + 1);
    }
}
</style>