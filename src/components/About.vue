<template>
    <div class="container">
        <div class="heading flex-center">
            <p class="gradient-text">Weatherly</p>
        </div>

        <div class="about flex-center">
            <p>Weatherly is a user-friendly website that seamlessly integrates with Google Maps to provide you with accurate
                and up-to-date weather information for any location around the world</p>
        </div>

        <div class="links flex-center">
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
    name: "About",
    components: {
        Button
    },
    data() {
        return {
            tags: ["Vue JS", "Google Maps", "Open Weather", "Reverse Geocode"],
            githubLink: "https://github.com/praneethravuri/weatherly"
        };
    },
};
</script>
  
<style lang="scss" scoped>
@import "../styles/_variables.scss";

.container {
    height: 100vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.heading {
    p {
        font-weight: 900;
        font-size: 4.75rem;
    }
}

.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
}

.gradient-text {

    background: linear-gradient(to top right, $color-green, $color-yellow);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.about {
    width: 75%;
}

.link-btn {
    margin: 10px;
    background-color: $color-gray-light;
    padding: 8px 18px;
    border-radius: 8px;
}

.tags {
    margin-top: 10px;

    &-wrapper {
        display: flex;
    }

    p {
        margin: 10px 20px;
        line-height: 1.5;
        letter-spacing: -1.5px;
        font-weight: 600;
    }
}

.linkedin-link {
    margin-top: 50px;

    .copyright {
        font-size: 1rem;
    }
}
</style>
  