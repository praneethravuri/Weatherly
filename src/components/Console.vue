<template>
    <div class="main">
        <div class="lat-lng">
            <form>
                <div class="input-lat input">
                    <p>Latitude</p>
                    <input type="text" v-model="inputLat">
                </div>

                <div class="input-lng input">
                    <p>Longitude</p>
                    <input type="text" v-model="inputLng">
                </div>

                <div class="search">
                    <Button @click.prevent="reverseGeoCode" name="Search" id="search-btn" />
                </div>
            </form>
        </div>

        <div class="results" v-for="(weatherEntry, index) in weatherData" :key="index">
            <div class="search-result">
                <p v-for="(property, propIndex) in weatherEntry" :key="propIndex">
                    <span class="key">{{ property.name }}: </span><span class="value">{{ property.value }}</span>
                </p>
            </div>
            <br>
        </div>
    </div>
</template>

<script>

import Button from './Button.vue';

export default {
    name: "Console",
    components: {
        Button
    },
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
            const duplicateKeys = [];
            for (const place in address) {
                let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${address[place]}&units=metric&appid=${this.apiKey}`;
                try {
                    const response = await fetch(weatherURL);
                    const currentPlaceData = await response.json();
                    if (currentPlaceData.cod === 200 && !duplicateKeys.includes(address[place])) {
                        let weatherEntry = [
                            { name: "Place", value: address[place] },
                            { name: "Latitude", value: currentPlaceData.coord.lat },
                            { name: "Longitude", value: currentPlaceData.coord.lon },
                            { name: "Clouds", value: currentPlaceData.weather[0].description },
                            { name: "Temperature", value: currentPlaceData.main.temp },
                            { name: "Feels Like", value: currentPlaceData.main.feels_like },
                            { name: "Minimum Temperature", value: currentPlaceData.main.temp_min },
                            { name: "Maximum Temperature", value: currentPlaceData.main.temp_max },
                            { name: "Pressure", value: currentPlaceData.main.pressure },
                            { name: "Humidity", value: currentPlaceData.main.humidity },
                            { name: "Sea Level", value: currentPlaceData.main.sea_level },
                            { name: "Ground Level", value: currentPlaceData.main.grnd_level },
                            { name: "Visibility", value: currentPlaceData.main.visibility },
                            { name: "Wind Speed", value: currentPlaceData.wind.speed },
                            { name: "Wind Deg", value: currentPlaceData.wind.deg },
                            { name: "Wind Gust", value: currentPlaceData.wind.gust },
                            { name: "Sunrise", value: currentPlaceData.sys.sunrise },
                            { name: "Sunset", value: currentPlaceData.sys.sunset },
                        ];
                        this.weatherData.push(weatherEntry);
                        duplicateKeys.push(address[place]);
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

.main {
    overflow-y: auto;
    border: 2px solid $color-white-slate;
    padding: 10px;
    border-radius: 8px;

    .input {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;

        p {
            color: $color-white-slate;
        }

        input {
            background-color: $color-gray;
            border: none;
            border-radius: 5px;
            color: $color-white-slate;
            padding: 5px;
        }
    }

    .search {
        margin: 20px 0;

        &-btn {
            margin: 0;
        }
    }

    .search-result {
        border: 2px solid $color-gray-light;
        padding: 10px;
        border-radius: 8px;
        background-color: $color-black;

        .key {
            color: $color-white-slate;
            font-weight: 600;
            font-size: 1rem;
            letter-spacing: -.4px;
            line-height: 1.25rem;
        }

        .value {
            text-transform: capitalize;
            font-size: 1rem;
            letter-spacing: -.4px;
            line-height: 1.25rem;
        }
    }
}
</style>

