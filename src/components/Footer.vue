<template>
    <div class="content">
        <p>Made by <a href="https://www.linkedin.com/in/praneeth-ravuri2500/" target="_blank">Praneeth Ravuri</a></p>
        <p>Copyright © 2023 Praneeth Ravuri</p>
    </div>
</template>

<script>

export default{
    name : "Footer"
}

</script>

<style lang="scss" scoped>

@import "../styles/_variables.scss";
.content{
    padding: 30px;
    display: block;
    text-align: center;
    border-top: 2px solid $color-gray-dark;

    p{
        font-size: 0.85rem;
    }
}
</style>