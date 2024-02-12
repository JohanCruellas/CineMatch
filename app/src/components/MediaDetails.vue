<template>
    <q-card class="mediaCard">
        <q-card-section>
            <h6>{{ media.title }}</h6>
        </q-card-section>
    </q-card>
</template>

<script>
export default {
    name: 'MediaDetails',
    props: {
        media: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
        };
    },
    methods: {
    },
};
</script>

<style lang="scss" scoped>
.mediaCard {
    // height: 500px;
    // width: 80%;
}
</style>
