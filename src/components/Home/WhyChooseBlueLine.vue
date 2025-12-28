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
    /* max-width: 1440px; */
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
}

.why_blue_line_right .why_images img {
    border-radius: 0 0 0 103px;
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

.why_blue_line_box h2 {
    color: #1E2225;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
}

.why_blue_line_box p {
    color: #71717A;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
}

/* Tablet styles (max-width: 1024px) */
@media (max-width: 1024px) {
    .why_blue_line {
        padding: 80px 0;
        max-height: none;
    }

    .why_blue_line_text h1 {
        font-size: 36px;
        line-height: 40px;
    }

    .why_blue_line_text {
        margin-bottom: 32px;
    }

    .why_blue_line_container {
        gap: 32px;
    }

    .why_blue_line_right,
    .why_blue_line_left {
        gap: 24px;
    }

    .why_blue_line_box {
        max-width: 100%;
        max-height: none;
        padding: 20px;
        gap: 12px;
    }

    .why_images img {
        max-height: 600px;
    }

    .why_blue_line_left .why_images img {
        border-radius: 0 0 60px 0;
    }

    .why_blue_line_right .why_images img {
        border-radius: 0 0 0 60px;
    }
}

/* Mobile landscape and small tablet (max-width: 768px) */
@media (max-width: 768px) {
    .why_blue_line {
        padding: 60px 0;
    }

    .why_blue_line_text h1 {
        font-size: 28px;
        line-height: 34px;
    }

    .why_blue_line_text p {
        font-size: 14px;
        line-height: 22px;
    }

    .why_blue_line_text {
        margin-bottom: 24px;
    }

    .why_blue_line_container {
        gap: 24px;
    }

    .why_blue_line_right,
    .why_blue_line_left {
        flex-direction: column;
        gap: 20px;
    }

    .why_images {
        max-width: 100%;
        width: 100%;
    }

    .why_boxs {
        max-width: 100%;
        width: 100%;
    }
    .why_blue_line_right .why_boxs{
        order: 2;
    }
    .why_images img {
        max-height: 300px;
        border-radius: 0 0 40px 0 !important;
    }

    .why_blue_line_right .why_images img {
        border-radius: 0 0 40px 0 !important;
    }

    .why_blue_line_box {
        padding: 18px;
        border-radius: 0 0 40px 0;
    }

    .why_blue_line_box h2 {
        font-size: 18px;
        line-height: 24px;
    }

    .why_blue_line_box p {
        font-size: 13px;
        line-height: 20px;
    }
}

/* Mobile portrait (max-width: 480px) */
@media (max-width: 480px) {
    .why_blue_line {
        padding: 40px 0;
        gap: 32px;
    }

    .why_blue_line_text h1 {
        font-size: 24px;
        line-height: 30px;
    }

    .why_blue_line_text p {
        font-size: 13px;
        line-height: 20px;
    }

    .why_blue_line_text {
        margin-bottom: 16px;
        gap: 8px;
    }

    .why_blue_line_container {
        gap: 20px;
    }

    .why_blue_line_right,
    .why_blue_line_left {
        gap: 16px;
    }

    .why_boxs {
        gap: 12px;
    }

    .why_images img {
        max-height: 250px;
        border-radius: 0 0 30px 0 !important;
    }

    .why_blue_line_box {
        padding: 16px;
        gap: 10px;
        border-radius: 0 0 30px 0;
    }

    .why_blue_line_box .icon_box {
        width: 44px;
        padding: 10px;
    }

    .why_blue_line_box .icon_box img {
        width: 24px;
        height: 24px;
    }

    .why_blue_line_box h2 {
        font-size: 16px;
        line-height: 22px;
    }

    .why_blue_line_box p {
        font-size: 12px;
        line-height: 18px;
    }
}

/* Extra small devices (max-width: 360px) */
@media (max-width: 360px) {
    .why_blue_line {
        padding: 32px 0;
    }

    .why_blue_line_text h1 {
        font-size: 20px;
        line-height: 26px;
    }

    .why_blue_line_box {
        padding: 14px;
    }

    .why_images img {
        max-height: 200px;
    }
}
</style>