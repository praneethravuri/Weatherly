<template>
  <GoogleMap id="map" ref="mapRef" :api-key="apiKey" :language="language" :region="region" :center="center" :zoom="zoom"
    :min-zoom="minZoom" :max-zoom="maxZoom" :street-view-control="streetViewControl" @zoom_changed="zoomChanged"
    @click="mapClicked" />

  <Console :lat="center.lat" :lng="center.lng" @update-center="updateCenter" />
</template>
  
<script>
import { ref } from 'vue';
import { GoogleMap } from 'vue3-google-map';
import Console from './components/Console.vue';

export default {
  name: 'App',
  components: {
    GoogleMap,
    Console
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

      console.log(`Lat: ${this.center.lat} | Lng: ${this.center.lng}`);
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
  
<style>
html,
body,
#app,
#map {
  height: 100%;
}

body {
  margin: 0;
}
</style>
  