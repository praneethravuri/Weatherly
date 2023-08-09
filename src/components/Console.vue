<template>
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

    <div v-if="weatherData">
        <div class="searches">
            <div v-for="(weatherEntry, index) in weatherData" :key="index">
                <div class="search-result">
                    <p v-if="weatherEntry.Place"><span class="key">Place: </span><span class="value">{{ weatherEntry.Place
                    }}</span></p>
                    <p v-if="weatherEntry.latitude"><span class="key">Latitude: </span><span class="value">{{
                        weatherEntry.latitude }}</span></p>
                    <p v-if="weatherEntry.longitude"><span class="key">Longitude: </span><span class="value">{{
                        weatherEntry.longitude }}</span></p>
                    <p v-if="weatherEntry.weather"><span class="key">Weather: </span><span class="value">{{
                        weatherEntry.weather }}</span></p>
                    <p v-if="weatherEntry.temperature"><span class="key">Temperature: </span><span class="value">{{
                        weatherEntry.temperature }}</span></p>
                    <p v-if="weatherEntry.feelsLikeTemp"><span class="key">Feels Like: </span><span class="value">{{
                        weatherEntry.feelsLikeTemp }}</span></p>
                    <p v-if="weatherEntry.maximumTemp"><span class="key">Max Temperature: </span><span class="value">{{
                        weatherEntry.maximumTemp }}</span>
                    </p>
                    <p v-if="weatherEntry.minimumTemp"><span class="key">Min Temperature: </span><span class="value">{{
                        weatherEntry.minimumTemp }}</span>
                    </p>
                    <p v-if="weatherEntry.pressure"><span class="key">Pressure: </span><span class="value">{{
                        weatherEntry.pressure }}</span></p>
                    <p v-if="weatherEntry.humidity"><span class="key">Humidity: </span><span class="value">{{
                        weatherEntry.humidity }}</span></p>
                    <p v-if="weatherEntry.seaLevel"><span class="key">Sea Level: </span><span class="value">{{
                        weatherEntry.seaLevel }}</span></p>
                    <p v-if="weatherEntry.groundLevel"><span class="key">Ground Level: </span><span class="value">{{
                        weatherEntry.groundLevel }}</span></p>
                    <p v-if="weatherEntry.visibility"><span class="key">Visibility: </span><span class="value">{{
                        weatherEntry.visibility }}</span></p>
                    <p v-if="weatherEntry.windSpeed"><span class="key">Wind Speed: </span><span class="value">{{
                        weatherEntry.windSpeed }}</span></p>
                    <p v-if="weatherEntry.deg"><span class="key">Wind Deg: </span><span class="value">{{ weatherEntry.deg
                    }}</span></p>
                    <p v-if="weatherEntry.gust"><span class="key">Wind Gust: </span><span class="value">{{ weatherEntry.gust
                    }}</span></p>
                    <p v-if="weatherEntry.sunrise"><span class="key">Sunrise: </span><span class="value">{{
                        weatherEntry.sunrise }}</span></p>
                    <p v-if="weatherEntry.sunset"><span class="key">Sunset: </span><span class="value">{{
                        weatherEntry.sunset }}</span></p>
                </div>
                <br>
            </div>
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
                        const weatherEntry = {
                            Place: address[place],
                            latitude: currentPlaceData.coord.lat,
                            longitude: currentPlaceData.coord.lon,
                            weather: currentPlaceData.weather[0].description,
                            temperature: currentPlaceData.main.temp,
                            feelsLikeTemp: currentPlaceData.main.feels_like,
                            minimumTemp: currentPlaceData.main.temp_min,
                            maximumTemp: currentPlaceData.main.temp_max,
                            pressure: currentPlaceData.main.pressure,
                            humidity: currentPlaceData.main.humidity,
                            seaLevel: currentPlaceData.main.sea_level,
                            groundLevel: currentPlaceData.main.grnd_level,
                            visibility: currentPlaceData.visibility,
                            windSpeed: currentPlaceData.wind.speed,
                            deg: currentPlaceData.wind.deg,
                            gust: currentPlaceData.wind.gust,
                            sunrise: currentPlaceData.sys.sunrise,
                            sunset: currentPlaceData.sys.sunset,

                        };
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

label {
    color: $text-color-2;
}

input {
    background-color: $bg-color-2;
    border: none;
    border-radius: 5px;
    color: $text-color-2;
    padding: 5px;
}

.input {
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
}


.search {
    margin: 20px 0px;

    &-btn {
        margin: 0;
    }
}

.searches {
    margin: 10px 0px;
    padding: 5px;
    border-radius: 8px;

    p {
        display: flex;
        justify-content: space-between;
    }
}

.search-result {
    border: 2px solid $text-color-2;
    padding: 10px;
    border-radius: 8px;
}

.key,
.value {
    text-transform: capitalize;
    font-size: 1rem;
    letter-spacing: -.4px;
    line-height: 1.25rem;
}

.key {
    color: $heading-color;
    font-weight: 600;
}
</style>
