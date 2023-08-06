<template>
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

    {{ addressData }}
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
            addressData: '',
            weatherData: '',
            apiKey: import.meta.env.VITE_OPEN_WEATHER_API_URL,
        };
    },
    watch: {
        lat(newValue) {
            this.inputLat = newValue;
        },
        lng(newValue) {
            this.inputLng = newValue;
        },
    },
    methods: {
        async reverseGeoCode() {
            const geoCodeURL = `https://geocode.maps.co/reverse?lat=${this.inputLat}&lon=${this.inputLng}`;

            try {
                const response = await fetch(geoCodeURL);
                this.addressData = await response.json();
                if(!this.addressData.error){
                    this.updateCenter();
                    this.getWeatherDetails(this.addressData.address);
                }
                else{
                    console.log("error!!!")
                }

            }
            catch (error) {
                console.log(error);
            }
        },

        updateCenter() {
            this.$emit("update-center", {
                lat: parseFloat(this.inputLat),
                lng: parseFloat(this.inputLng),
            })
        },

        getWeatherDetails(address){
            for(const place in address){
                let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${address[place]}&units=metric&appid=${this.apiKey}`
                //console.log(address[place]);
                console.log(weatherURL);
            }
        }
    }
}
</script>
