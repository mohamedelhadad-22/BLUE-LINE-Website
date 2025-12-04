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
.icon_row{
    display: flex;
    justify-content: center;
    align-items: center;
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

/* Tablet (≤1024px) */
@media (max-width: 1024px) {
    .mission_vision {
        min-height: auto;
        max-height: none;
        padding: 80px 0 100px 0;
    }

    .mission_vision__container {
        gap: 40px;
        padding: 0 40px;
    }

    .title_row h1 {
        font-size: 36px;
        line-height: 40px;
    }

    .title_row p {
        font-size: 15px;
    }

    .mission_vision_boxs {
        gap: 40px;
    }

    .box_style {
        padding: 40px;
        gap: 20px;
        border-radius: var(--radius-none, 0) var(--radius-none, 0) var(--radius-none, 0) 80px;
        /* min-height: auto; */
        /* max-height: none; */
    }
    .box_style .box_icon {
        width: 70px;
        height: 70px;
    }

    .box_style h2 {
        font-size: 22px;
    }

    .box_style p {
        font-size: 16px;
        line-height: 26px;
    }
}

/* Mobile Landscape/Small Tablet (≤768px) */
@media (max-width: 768px) {
    .mission_vision {
        padding: 60px 0 80px 0;
    }

    .mission_vision__container {
        gap: 32px;
        padding: 0 32px;
    }

    .title_row h1 {
        font-size: 32px;
        line-height: 36px;
    }

    .title_row p {
        font-size: 14px;
    }

    .icon_row img {
        /* width: 40px; */
        /* height: auto; */
    }

    .mission_vision_boxs {
        flex-direction: column;
        gap: 32px;
    }

    .box_style {
        padding: 32px;
        gap: 16px;
        border-radius: var(--radius-none, 0) var(--radius-none, 0) var(--radius-none, 0) 60px;
        width: 100%;
        min-height: auto;
        max-height: none;
    }

    .box_style .box_icon {
        width: 60px;
        height: 60px;
    }

    .box_style h2 {
        font-size: 20px;
    }

    .box_style p {
        font-size: 15px;
        line-height: 24px;
    }
}

/* Mobile Portrait (≤480px) */
@media (max-width: 480px) {
    .mission_vision {
        padding: 40px 0 60px 0;
    }

    .mission_vision__container {
        gap: 24px;
        padding: 0 24px;
    }

    .title_row h1 {
        font-size: 28px;
        line-height: 32px;
    }

    .title_row p {
        font-size: 13px;
    }

    .icon_row img {
        /* width: 32px; */
    }

    .mission_vision_boxs {
        gap: 24px;
    }

    .box_style {
        padding: 24px;
        gap: 12px;
        border-radius: var(--radius-none, 0) var(--radius-none, 0) var(--radius-none, 0) 40px;
    }

    .box_style .box_icon {
        width: 50px;
        height: 50px;
    }

    .box_style h2 {
        font-size: 18px;
    }

    .box_style p {
        font-size: 14px;
        line-height: 22px;
    }
}

/* Extra Small Devices (≤360px) */
@media (max-width: 360px) {
    .mission_vision {
        padding: 32px 0 48px 0;
    }

    .mission_vision__container {
        gap: 20px;
        padding: 0 20px;
    }

    .title_row h1 {
        font-size: 24px;
        line-height: 28px;
    }

    .title_row p {
        font-size: 12px;
    }

    .icon_row img {
        width: 70%;
    }

    .mission_vision_boxs {
        gap: 20px;
    }

    .box_style {
        padding: 20px;
        gap: 10px;
        border-radius: var(--radius-none, 0) var(--radius-none, 0) var(--radius-none, 0) 32px;
    }

    .box_style .box_icon {
        width: 45px;
        height: 45px;
    }

    .box_style h2 {
        font-size: 16px;
    }

    .box_style p {
        font-size: 13px;
        line-height: 20px;
    }
}
</style>