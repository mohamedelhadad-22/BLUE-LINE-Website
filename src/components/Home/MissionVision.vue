<template>
    <section class="mission_vision">
        <div class="container mission_vision__container">
            <div class="title_row">
                <h1>Mission and Vision</h1>
                <p>Shrink the world into a single step</p>
            </div>
            <div class="icon_row">
                <img src="@/assets/Frame 88.svg" alt="arrow down icon" />
            </div>
            <div class="mission_vision_boxs">
                <div class="mission box_style">
                    <div class="box_icon">
                        <img src="@/assets/elements.svg" alt="our mission icon" />
                    </div>
                    <h2>Our Mission</h2>
                    <p>Our mission is to shrink the world into a single step. We don’t just move cargo—we connect
                        suppliers to their clients across the globe, transforming complex logistics into a smooth,
                        unified experience. From ocean freight to customs clearance and transportation, we streamline
                        every stage into one simple path, guided by a team of experts who walk alongside our clients,
                        offering insight before challenges arise</p>
                </div>
                <div class="vision box_style">
                    <div class="box_icon">
                        <img src="@/assets/elements_vission.svg" alt="our vision icon" />
                    </div>
                    <h2>Our Vision</h2>
                    <p>Our vision is to redefine global logistics by expanding across every country and connecting
                        manufacturers and traders through a single smart platform. We aim to build a unified application
                        that brings together all players in the supply chain, making international trade easier, faster,
                        and more transparent.</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "MissionVision",
    components: {},
    props: {},
    data() {
        return {};
    },
    methods: {},
});
</script>

<style scoped>
.mission_vision {
    display: flex;
    min-height: 979px;
    max-height: 979px;
    background-repeat: no-repeat;
    background: linear-gradient(0deg, rgba(7, 13, 34, 0.51) 0%, rgba(7, 13, 34, 0.51) 100%),
        url('@/assets/BG 03 copy 1 1 1.png') lightgray 50% / cover no-repeat;
    width: 100%;
    padding: 117px 0 133px 0;
}

.mission_vision__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 56px;
    max-width: 1216px;
    width: 100%;
}

.title_row {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* gap: 4px; */
}

.title_row h1 {
    color: #FFF;
    text-align: center;
    font-size: 44px;
    font-weight: 600;
    line-height: 48.4px;
}

.title_row p {
    color: #EEE;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 100%;
}

.mission_vision_boxs {
    display: flex;
    align-items: flex-start;
    gap: 80px;
    align-self: stretch;
}

.box_style {
    display: flex;
    padding: 48px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    flex: 1 0 0;
    border-radius: var(--radius-none, 0) var(--radius-none, 0) var(--radius-none, 0) 103px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    max-height: 484px;
    min-height: 484px;
}

.box_style .box_icon {
    display: flex;
    width: 80px;
    height: 80px;
    padding: 4.167px 4.166px 4.167px 7.5px;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
}

.box_style .box_icon img {
    width: 100%;
    height: auto;
    object-fit: cover;

}

.box_style h2 {
    color: #FFF;
    font-size: 24px;
    font-weight: 600;
    line-height: 83.28%;
}

.box_style p {
    color: #FFF;
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
}
</style>