<template>
    <div class="container">
        <div class="heading align-center">
            <p>Weatherly</p>
        </div>

        <div class="about align-center">
            <p>Weatherly is a user-friendly website that seamlessly integrates with Google Maps to provide you with accurate
                and up-to-date weather information for any location around the world</p>
        </div>

        <div class="links align-center">
            <a href="https://github.com/praneethravuri/weatherly" target="_blank" class="link-btn">Github</a>
            <a href="" class="link-btn" v-scroll-to="'#map'">Get Started</a>
        </div>

        <div class="tags">
            <div class="tags-wrapper">
                <p v-for="tag in tags" :key="tag">{{ tag }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "About",
    data() {
        return {
            tags: ["Vue JS", "Google Maps", "Open Weather", "Reverse Geocode"],
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

.align-center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
}

.about {
    width: 75%;
}

.heading {
    display: flex;
    align-items: center;

    p {
        font-weight: 900;
        font-size: 4.75rem;
        line-height: 1.5;
        letter-spacing: -1.5px;
        background: linear-gradient(to top right, $gradient-color-1, $gradient-color-2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}

.link-btn {
    margin: 10px;
    background-color: $bg-color-2;
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
        background: linear-gradient(to top right, $gradient-color-1, $gradient-color-2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 600;
        transition: $transition;
    }
}
</style>
  