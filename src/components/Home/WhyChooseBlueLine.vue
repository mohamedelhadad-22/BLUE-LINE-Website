<template>

    <div class="why_blue_line">
        <div class="container why_blue_line_container">
            <div class="why_blue_line_text">
                <h1>Why Choose Blue Line</h1>
                <p>Experience the difference with our comprehensive logistics expertise</p>
            </div>
            <div class="why_blue_line_left">
                <div class="why_images">
                    <img src="@/assets/2c156e2bd09e8cbf42bf26ce682eafb1d68f5408.jpg" alt="Why Choose Blue Line" />
                </div>
                <div class="why_boxs">
                    <div class="why_blue_line_box" v-for="box in whyBlueLineLeft" :key="box.id">
                        <div class="icon_box">
                            <img :src="box.icon" :alt="box.title" />
                        </div>
                        <h2>{{ box.title }}</h2>
                        <p>{{ box.desc }}</p>
                    </div>
                </div>
            </div>
            <div class="why_blue_line_right">
                <div class="why_boxs">
                    <div class="why_blue_line_box" v-for="box in whyBlueLineRight" :key="box.id">
                        <div class="icon_box">
                            <img :src="box.icon" :alt="box.title" />
                        </div>
                        <h2>{{ box.title }}</h2>
                        <p>{{ box.desc }}</p>
                    </div>
                </div>
                <div class="why_images">
                    <img src="@/assets/8a04e87d22d97b563617374184d6656387414a8a.jpg" alt="Why Choose Blue Line" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from "vue";
import star from "@/assets/star.svg";
import cost from "@/assets/Cost.svg";
import clock from "@/assets/clock.svg";
import returnsvg from "@/assets/returnsvg.svg";
import shield from "@/assets/Risk.svg";
import worldIcon from "@/assets/worldIcon.svg";

export default defineComponent({
    name: "WhyChooseBlueLine",
    components: {},
    props: {},
    data() {
        return {
            whyBlueLineLeft: [
                {
                    id: 1,
                    title: "Expertise in International Shipping",
                    desc: "25+ years of combined experience in global logistics with deep knowledge of international trade regulations and best practices.",
                    icon: shallowRef(worldIcon)
                },
                {
                    id: 2,
                    title: "Risk Mitigation",
                    desc: "Comprehensive insurance coverage and proactive risk management strategies to protect your valuable cargo throughout the journey.",
                    icon: shallowRef(shield)
                },
                {
                    id: 3,
                    title: "Cost-effectiveness",
                    desc: "Optimized routing and consolidated shipments to reduce costs while maintaining service quality and delivery timelines.",
                    icon: shallowRef(cost)
                },
            ],
            whyBlueLineRight: [
                {
                    id: 1,
                    title: "Time Efficiency & Visibility",
                    desc: "Real-time tracking and transparent communication ensuring you're always informed about your shipment's status and location.",
                    icon: clock
                },
                {
                    id: 2,
                    title: "Flexibility & Scalability",
                    desc: "Adaptable solutions that grow with your business needs, from small parcels to large-scale freight operations.",
                    icon: returnsvg
                },
                {
                    id: 3,
                    title: "Value-added Services",
                    desc: "Comprehensive support including warehousing, packaging, inspection, and customs documentation for complete peace of mind.",
                    icon: star
                },
            ],
        };
    },
    methods: {},
});

</script>

<style scoped>
.why_blue_line {
    display: flex;
    width: 100%;
    max-width: 1440px;
    max-height: 1798px;
    padding: 128px 0;
    flex-direction: column;
    align-items: center;
    gap: 52px;
    background: #F8F9FC;
}

.why_blue_line_container {
    display: flex;
    flex-direction: column;
    gap: 48px
}

.why_blue_line_text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    text-align: center;
    margin-bottom: 50px;
}

.why_blue_line_text h1 {
    color: #1E2225;
    text-align: center;
    font-size: 44px;
    font-weight: 600;
    line-height: 48.4px;
}

.why_blue_line_text p {
    color: #71717A;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
}

.why_blue_line_right,
.why_blue_line_left {
    display: flex;
    flex-direction: row;
    gap: 42px;
    width: 100%;
    align-items: center;
}

.why_images {
    width: 100%;
    max-width: 50%;
    overflow: hidden;
}

.why_images img {
    width: 100%;
    height: 100%;
    max-height: 600px;
    object-fit: cover;
}

.why_blue_line_left .why_images img {
    border-radius: 0 0 103px 0;
    background: url(<path-to-image>) lightgray 50% / cover no-repeat;
}

.why_blue_line_right .why_images img {
    border-radius: 0 0 0 103px;
    background: url(<path-to-image>) lightgray 50% / cover no-repeat;
}

.why_boxs {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 50%;
    justify-content: center;
}

.why_blue_line_box {
    width: 100%;
    display: flex;
    max-width: 592px;
    max-height: 212px;
    padding: 25px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    border-radius: 0 0 65px 0;
    border: 1px solid #E5E7EB;
    background: #FFF;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.why_blue_line_box .icon_box {
    display: flex;
    width: 52px;
    padding: 12px;
    justify-content: center;
    align-items: center;
    border-radius: 1440px;
    background: #F4EBFF
}

.why_blue_line_box .icon_box img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    flex: 1 0 0;
}
</style>