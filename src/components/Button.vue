<template>
    <a :href="link ? link : null">{{ name }}</a>
</template>

<script>
export default {
    name: "Button",
    props: {
        name: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: false
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../styles/_variables.scss";

a {
    margin-right: 10px;
    background-color: $color-gray-dark;
    padding: 8px 18px;
    border-radius: 8px;
    color: $color-white-slate;
    cursor: pointer;
    transition: $transition;

    &:hover{
        background-color: lighten($color-gray, 5%);
    }
}
</style>
