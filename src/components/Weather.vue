<template>

    <pre>Address Weather: {{ addressData.address }}</pre>
</template>

<script>

export default {
    name: "Weather",
    props: {
        addressData: {
            type: Object,
            required: true
        },
    },
    methods : {
        getWeatherDetails(){
            console.log("get weather details");
        }
    },
}

</script>