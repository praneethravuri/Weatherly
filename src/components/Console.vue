<template>
    <div class="main">
        <div class="coordinates">
            <form>
                <div class="showValue">
                    <p>Latitude</p>
                    <input type="text" v-model="inputLat">
                </div>

                <div class="showValue">
                    <p>Longitude</p>
                    <input type="text" v-model="inputLng">
                </div>

                <div class="search-btn">
                    <Button @click.prevent="reverseGeoCode" name="Search" />
                </div>
            </form>
        </div>

        <div class="results">
            <div v-if="loading" class="loader"></div>
            <div v-else>
                <div class="search-results">
                    <div v-for="(weatherEntry, index) in weatherData" :dataKey="index">
                        <table>
                            <tr v-for="(weather, index) in weatherEntry" :dataKey="index">
                                <td v-if="weather.dataValue" class="dataKey">{{ weather.name }}</td>
                                <td v-if="weather.dataValue && weather.unitValue" class="dataValue">{{ weather.dataValue }}
                                    {{ weather.unitValue }}</td>
                                <td v-else-if="weather.dataValue" class="dataValue">{{ weather.dataValue }}</td>
                            </tr>
                        </table>
                        <br>
                    </div>
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
                            { name: "Temperature", dataValue: currentPlaceData.main.temp, unitValue: "℃" },
                            { name: "Feels Like", dataValue: currentPlaceData.main.feels_like, unitValue: "℃" },
                            { name: "Minimum Temperature", dataValue: currentPlaceData.main.temp_min, unitValue: "℃" },
                            { name: "Maximum Temperature", dataValue: currentPlaceData.main.temp_max, unitValue: "℃" },
                            { name: "Pressure", dataValue: currentPlaceData.main.pressure, unitValue: "hPa" },
                            { name: "Humidity", dataValue: currentPlaceData.main.humidity, unitValue: "%" },
                            { name: "Sea Level", dataValue: currentPlaceData.main.sea_level, unitValue: "hPa" },
                            { name: "Ground Level", dataValue: currentPlaceData.main.grnd_level, unitValue: "hPa" },
                            { name: "Visibility", dataValue: currentPlaceData.visibility, unitValue: "meters" },
                            { name: "Wind Speed", dataValue: currentPlaceData.wind.speed, unitValue: "m/s" },
                            { name: "Wind Deg", dataValue: currentPlaceData.wind.deg, unitValue: "°" },
                            { name: "Wind Gust", dataValue: currentPlaceData.wind.gust, unitValue: "m/s" },
                            { name: "Sunrise", dataValue: currentPlaceData.sys.sunrise, unitValue: "" },
                            { name: "Sunset", dataValue: currentPlaceData.sys.sunset, unitValue: "" },
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

    .showValue {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;

        p {
            color: $color-white-slate;
        }

        input[type="text"] {
            background-color: $color-gray;
            border: none;
            border-radius: 5px;
            color: $color-white-slate;
            padding: 5px;
        }
    }

    .search-btn {
        margin: 20px 0;
    }

}

.coordinates,
.results {
    border: 2px solid $color-gray-dark;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
}

.results {
    overflow-y: auto;
    height: 75%;

    @media only screen and (max-width: 800px) {
        height: calc(100% - 20px);
        /* Adjust the height to accommodate the scrollbar */
    }
}


.search-result {
    border: 2px solid $color-white-slate;
    padding: 10px;
    border-radius: 8px;
    background-color: $color-black;
    margin: 0px 0px 20px 0px;

    div{
        border: 2px solid red;
    }
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

.dataValue {
    text-transform: capitalize;
    font-size: 1rem;
    letter-spacing: -.4px;
    line-height: 1.25rem;
    width: 60%;
}
</style>

