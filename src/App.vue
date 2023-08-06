<template>
  <About id="about" />

  <GoogleMap id="map" ref="mapRef" :api-key="apiKey" :language="language" :region="region" :center="center" :zoom="zoom"
    :min-zoom="minZoom" :max-zoom="maxZoom" :street-view-control="streetViewControl" @zoom_changed="zoomChanged"
    @click="mapClicked" />

  <div class="console">
    <Console :lat="center.lat" :lng="center.lng" @update-center="updateCenter" id="console" />
  </div>

  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, excepturi.</p>

</template>
  
<script>
import { ref } from 'vue';
import { GoogleMap } from 'vue3-google-map';

import Console from './components/Console.vue';
import About from './components/About.vue';

export default {
  name: 'App',
  components: {
    GoogleMap,
    Console,
    About
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
@import "./styles/_variables.scss";

html,
body,
#app,
#map {
  height: 100%;
}

body {
  margin: 0;
}

#map {
  width: 72%;
  float: right;
  margin: 10px;
  border: 2px solid $bg-color-2;
  border-radius: 8px;
  padding: 10px;
}

.console {
  width: 25%;
  margin: 10px;
  padding: 10px;
  float: left;
  border: 2px solid $bg-color-2;
  border-radius: 8px;
  height: 100%;
  overflow-y: auto;
}
</style>
  