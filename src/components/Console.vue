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
        <div v-for="(weatherEntry, index) in weatherData" :key="index">
            <div class="search-result">
                <div v-for="(value, key) in weatherEntry" :key="key">
                    <p>{{ key }}: {{ value }}</p>
                </div>
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
                try {
                    const response = await fetch(weatherURL);
                    const currentPlaceData = await response.json();
                    if (currentPlaceData.cod === 200) {
                        console.log(JSON.stringify(currentPlaceData));
                        const weatherEntry = {
                            Place: address[place],
                            latitude: currentPlaceData.coord.lat,
                            longitude: currentPlaceData.coord.lon,
                            weather: currentPlaceData.weather.description,
                            temperature: currentPlaceData.main.temp,
                            feelsLikeTemp: currentPlaceData.main.feels_like,
                            minimumTemp: currentPlaceData.main.temp_min,
                            maximumTemp: currentPlaceData.main.temp_max,
                            pressure : currentPlaceData.main.pressure,
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
                        console.log(JSON.stringify(weatherEntry));
                        this.weatherData.push(weatherEntry);
                    } else {
                        console.log("City not found!");
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
    border: 2px solid $text-color-1;
    margin: 10px 0px;
    padding: 5px;
    border-radius: 8px;
}
</style>
