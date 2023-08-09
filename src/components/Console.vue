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

        <div class="results">
            <div v-if="loading" class="loader"></div>
            <div v-else>
                <div v-for="(weatherEntry, index) in weatherData" :dataKey="index">
                    <div class="search-result">
                        <table>
                            <tr v-for="(weather, index) in weatherEntry" :dataKey="index">
                                <td v-if="weather.dataValue" class="dataKey">{{ weather.name }}</td>
                                <td v-if="weather.dataValue" class="dataValue">{{ weather.dataValue }}</td>
                            </tr>
                        </table>
                    </div>
                    <br>
                </div>
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
            loading: false,
        };
    },
    watch: {
        lat(newValue) { this.inputLat = newValue; },
        lng(newValue) { this.inputLng = newValue; },
    },
    methods: {
        async reverseGeoCode() {
            this.weatherData = [];
            this.loading = true;
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
            finally {
                this.loading = false;
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
                    console.log(JSON.stringify(currentPlaceData));
                    if (currentPlaceData.cod === 200 && !duplicateKeys.includes(address[place])) {
                        let weatherEntry = [
                            { name: "Place", dataValue: address[place] },
                            { name: "Latitude", dataValue: currentPlaceData.coord.lat },
                            { name: "Longitude", dataValue: currentPlaceData.coord.lon },
                            { name: "Clouds", dataValue: currentPlaceData.weather[0].description },
                            { name: "Temperature", dataValue: currentPlaceData.main.temp },
                            { name: "Feels Like", dataValue: currentPlaceData.main.feels_like },
                            { name: "Minimum Temperature", dataValue: currentPlaceData.main.temp_min },
                            { name: "Maximum Temperature", dataValue: currentPlaceData.main.temp_max },
                            { name: "Pressure", dataValue: currentPlaceData.main.pressure },
                            { name: "Humidity", dataValue: currentPlaceData.main.humidity },
                            { name: "Sea Level", dataValue: currentPlaceData.main.sea_level },
                            { name: "Ground Level", dataValue: currentPlaceData.main.grnd_level },
                            { name: "Visibility", dataValue: currentPlaceData.visibility },
                            { name: "Wind Speed", dataValue: currentPlaceData.wind.speed },
                            { name: "Wind Deg", dataValue: currentPlaceData.wind.deg },
                            { name: "Wind Gust", dataValue: currentPlaceData.wind.gust },
                            { name: "Sunrise", dataValue: currentPlaceData.sys.sunrise },
                            { name: "Sunset", dataValue: currentPlaceData.sys.sunset },
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

.loader {
    border: 16px solid $color-gray-dark;
    border-radius: 50%;
    border-top: 16px solid $color-green-neon;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
    margin: 50% auto;
}

/* Safari */
@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}


.main {

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

}

.lat-lng,
.results {
    border: 2px solid $color-gray-dark;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
}

.results {
    overflow-y: auto;
    height: 75%;
}

.search-result {
    border: 2px solid $color-gray-dark;
    padding: 10px;
    border-radius: 8px;
    background-color: $color-black;
}

table {
    width: 100%;
    border-collapse: collapse;
}

td {
    padding: 5px;
    border-bottom: 1px solid $color-gray;
}

.dataKey {
    color: $color-white-slate;
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: -.4px;
    line-height: 1.25rem;
    width: 40%;
}

.dataValue {
    text-transform: capitalize;
    font-size: 1rem;
    letter-spacing: -.4px;
    line-height: 1.25rem;
    width: 60%;
}
</style>

