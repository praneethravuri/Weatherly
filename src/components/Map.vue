<template>
    <GoogleMap id="map" ref="mapRef" :api-key="apiKey" :language="language" :region="region" :center="center" :zoom="zoom"
        :min-zoom="minZoom" :max-zoom="maxZoom" :street-view-control="streetViewControl" @zoom_changed="zoomChanged"
        @click="mapClicked" />
</template>
    
<script>

import { GoogleMap } from 'vue3-google-map';
import { ref } from 'vue';
import Console from './Console.vue';
import About from './About.vue';

export default {
    name: 'App',
    components: {
        GoogleMap,
        Console,
        About,
        Map
    },
    data() {
        return {
            apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_URL,
            language: 'en',
            region: 'US',
            center: {
                lat: 17.385044,
                lng: 78.486671,
            },
            zoom: 10,
            minZoom: 2,
            maxZoom: null,
            streetViewControl: false,
            gmap: null,
            mapRef: ref(null),
        };
    },
    methods: {
        zoomChanged() {
            if (this.gmap) {
                console.log('[GMap] Zoom:', this.gmap.getZoom());
            }
        },
        mapClicked(event) {
            this.center = {
                ...this.center,
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };
            this.$emit('center-updated', this.center);

        },
        updateCenter(newCenter) {
            this.center = { ...newCenter };
        },
    },
    watch: {
        '$data.mapRef?.ready'(ready) {
            if (ready) {
                this.gmap = this.mapRef.map;
                console.log('[GMap] Version:', this.mapRef.api.version);
            }
        },
    },
};

</script>
    
<style lang="scss">
#map {
    height: 100%;
    width: 50%;
}
</style>