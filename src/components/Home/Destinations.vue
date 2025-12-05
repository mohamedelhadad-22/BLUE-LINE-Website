<template>
    <section class="destinations">
        <div class="destinations__container">
            <div class="title_row">
                <h1>Explore Our Top Destinations</h1>
                <p>Discover the most popular travel spots curated just for you.</p>
            </div>
            <div class="destinations__grid">
                <!-- Destination cards would go here -->
            </div>
        </div>
    </section>

</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "Destinations",
    components: {},
    props: {},
    data() {
        return {};
    },
    methods: {},
});

</script>

<style scoped>
.destinations {
    aspect-ratio: 1443/628;
    display: flex;
    flex-direction: column;
    max-height: 628px;
    min-height: 628px;
    width: 100%;
    height: 100%;
    background: url("@/assets/Destinations_BG.png") lightgray -325px -386.583px / 145.045% 220.531% no-repeat;
}
</style>