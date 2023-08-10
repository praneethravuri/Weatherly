<template>
    <div class="container">
        <div class="heading">
            <h1 class="gradient-text">Weatherly</h1>
            <p class="tagline">Weatherly is a user-friendly website that seamlessly integrates with Google Maps to provide
                you with accurate
                and up-to-date weather information for any location around the world</p>
        </div>

        <div>
            <Button name="Github" :link="githubLink" target="_blank" />
            <Button name="Get Started" v-scroll-to="'#google-map'" />
        </div>

        <div class="tags">
            <div class="tags-wrapper">
                <p class="gradient-text" v-for="tag in tags" :key="tag">{{ tag }}</p>
            </div>
        </div>

    </div>
</template>

<script>

import Button from './Button.vue';

export default {
    name: 'About',
    components: {
        Button
    },
    data() {
        return {
            tags: ["Vue JS", "Google Maps", "Open Weather", "Reverse Geocode"],
            githubLink: "https://github.com/praneethravuri/weatherly"
        };
    },
}

</script>

<style lang="scss" scoped>
.container {
    text-align: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
        margin: 15px 0px;
    }
}

.heading {

    width: 80%;
    margin: auto;

    h1 {
        font-size: 4.5rem;
    }
}

.tags-wrapper {
    display: flex;

    p {
        margin: 10px;
    }
}

@media only screen and (max-width: 600px) {
    .container {
        height: 50vh;
    }

    .heading {
        h1 {
            font-size: 3rem;
        }
    }
}

@media only screen and (max-width: 320px){
    .container{
        height: 75vh;
    }

}

@media only screen and (max-width: 380px){
    .container{
        height: 75vh;
    }

}

@media only screen and (min-width: 381px) and (max-width: 599px){
    .container{
        height: 75vh;
    }

}

@media only screen and (max-width: 800px) {
    .container{
        height: 40vh;
    }
}

</style>