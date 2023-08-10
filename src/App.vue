<template>

  <About />

  <div class="content">
    <Map id="google-map" @center-updated="updateCenter" />
    <Console id="console" :lat="lat" :lng="lng" />
  </div>

  <div class="footer">
    <Footer />
  </div>

</template>
  
<script>

import Console from './components/Console.vue';
import About from './components/About.vue';
import Map from './components/Map.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Map,
    Console,
    About,
    Footer
  },
  data() {
    return {
      lat: 17.385044,
      lng: 78.486671,
    };
  },
  methods: {
    updateCenter(newCenter) {
      this.lat = newCenter.lat;
      this.lng = newCenter.lng;
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

.content {
  height: 100%;
  display: flex;
  justify-content: space-between;

  #google-map {
    flex: 4;
    margin: 10px;
  }

  #console {
    flex: 1;
    margin: 10px;
  }
}

@media only screen and (max-width: 800px) {
  .content{
    display: block;
    height: 100%;
  }

  #google-map {
    height: 50%;
  }

  #console {
    flex: 1;
    margin: 10px;
  }
}
</style>
  