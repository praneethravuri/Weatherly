<template>
    <div class="lat-lng">
        <form>
            <div class="input-lat input">
                <label>Latitude</label>
                <input type="text" v-model="inputLat">
            </div>

            <div class="input-lng input">
                <label>Longitude</label>
                <input type="text" v-model="inputLng">
            </div>

            <div class="search">
                <a @click.prevent="reverseGeoCode" class="search-btn">Search</a>
            </div>
        </form>
    </div>

    <div v-if="weatherData">
        <div v-for="weatherEntry in weatherData" :key="weatherEntry.id">
            <div class="search-result">
                <p v-if="weatherEntry.coord">Place: {{ weatherEntry.place }}</p>
            <p v-if="weatherEntry.coord">Longitude: {{ weatherEntry.coord.lon }}</p>
            <p v-if="weatherEntry.coord">Longitude: {{ weatherEntry.coord.lat }}</p>
            <br>
            <br>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "Console",
    props: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    data() {
        return {
            inputLat: this.lat,
            inputLng: this.lng,
            addressData: '',
            weatherData: [],
            apiKey: import.meta.env.VITE_OPEN_WEATHER_API_URL,
        };
    },
    watch: {
        lat(newValue) { this.inputLat = newValue; },
        lng(newValue) { this.inputLng = newValue; },
    },
    methods: {
        async reverseGeoCode() {
            this.weatherData = [];
            const geoCodeURL = `https://geocode.maps.co/reverse?lat=${this.inputLat}&lon=${this.inputLng}`;

            try {
                const response = await fetch(geoCodeURL);
                this.addressData = await response.json();
                if (!this.addressData.error) {
                    this.updateCenter();
                    this.getWeatherDetails(this.addressData.address);
                } else {
                    console.log("error!!!");
                }
            } catch (error) {
                console.log(error);
            }
        },

        updateCenter() {
            this.$emit("update-center", { lat: parseFloat(this.inputLat), lng: parseFloat(this.inputLng) });
        },

        async getWeatherDetails(address) {
            for (const place in address) {
                let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${address[place]}&units=metric&appid=${this.apiKey}`;
                console.log(weatherURL);

                try {
                    const response = await fetch(weatherURL);
                    const currentPlaceData = await response.json();
                    console.log(currentPlaceData);

                    if (currentPlaceData.cod === "404") {
                        console.log("City not found!");
                    } else {
                        this.weatherData.push(currentPlaceData);
                        this.weatherData.push({ place: address[place] });
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },
    }
}
</script>
  
<style lang="scss" scoped>
@import "../styles/_variables.scss";

label {
    color: $text-color-2;
}

input {
    background-color: $bg-color-2;
    border: none;
    border-radius: 5px;
    color: $text-color-2;
}

.input {
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
}

.search {
    margin: 20px 0px;

    &-btn {
        background-color: $bg-color-2;
        padding: 8px 18px;
        border-radius: 8px;
        color: $text-color-1;
        border: none;
        cursor: pointer;
    }
}

.search-result{
    border: 2px solid $bg-color-2;
}
</style>
  