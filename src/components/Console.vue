<template>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, pariatur.</p>

    <div class="lat-lng">
        <form action="">
            <div class="input-lat">
                <label for="">Latitude</label>
                <input type="text" v-model="inputLat">
            </div>

            <div class="input-lng">
                <label for="">Longitude</label>
                <input type="text" v-model="inputLng">
            </div>

            <button @click.prevent="reverseGeoCode">Search</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "Console",
    props: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            inputLat: this.lat,
            inputLng: this.lng,
        };
    },
    methods: {
        reverseGeoCode() {
            const geoCodeURL = `https://geocode.maps.co/reverse?lat=${this.inputLat}&lon=${this.inputLng}`;
            console.log(geoCodeURL);
        }
    }
}
</script>
