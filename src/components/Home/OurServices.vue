<template>
    <section class="our_services">
        <div class="container">
            <!-- .services_max_width -->
            <div class="container services_max_width">
                <div class="row">
                    <h1>Our Freight Services</h1>
                    <p>Comprehensive freight forwarding solutions tailored to your business needs.</p>
                </div>
                <div class="services_box">
                    <IconBox v-for="service in services" :key="service.id" :icon="service.icon" :text="service.text"
                        suffix="+" iconType="component" :isFlatIcon="true" :desc="service?.desc"
                        class="services_boxs" />
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconBox from "@/components/common/IconBox.vue";
import shipIcon from "@/assets/svg/ship1.vue";
import airFreightIcon from "@/assets/svg/AirFeightsvg.vue";
import carIcon from "@/assets/svg/carsvg.vue";
import clearanceIcon from "@/assets/svg/Clearance.vue";
import inspectionIcon from "@/assets/svg/Inspection.vue";
import insuranceIcon from "@/assets/svg/Insurance.vue";

export default defineComponent({
    name: "OurServices",
    components: { IconBox },
    props: {},
    data() {
        return {
            services: [
                {
                    id: 1,
                    icon: shipIcon,
                    text: "Sea Freight",
                    desc: "Full container (FCL) and less than container(LCL) shipping solutions worldwide."
                },
                {
                    id: 2,
                    icon: airFreightIcon,
                    text: "Air Freight",
                    desc: "Fast and reliable air freight services for time-sensitive shipments."
                },
                {
                    id: 3,
                    icon: carIcon,
                    text: "Road Freight",
                    desc: "Efficient road transport services across regions and countries."
                },
                {
                    id: 4,
                    icon: clearanceIcon,
                    text: "Customs Brokerage",
                    desc: "Expert handling of all customs documentation and procedures."
                },
                {
                    id: 5,
                    icon: inspectionIcon,
                    text: "Warehousing & Distribution",
                    desc: "Comprehensive coverage for your valuable shipments."
                },
                {
                    id: 6,
                    icon: insuranceIcon,
                    text: "Project Cargo",
                    desc: "Quality control and verification services at source."
                }
            ]
        };
    },
    methods: {},
});
</script>

<style scoped>
.our_services {
    width: 100%;
    display: flex;
    padding: 104px 0;
}

.services_max_width {
    display: flex;
    width: 100%;
    /* max-width: 960px; */
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 52px;
    margin: 0 auto;
}

.row {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    text-align: center;
}

.row h1 {
    color: #1E2225;
    text-align: center;
    font-size: 44px;
    font-weight: 600;
    line-height: 48.4px;
}

.row p {
    color: #71717A;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
}

.services_box {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
}
</style>
<style>
.services_boxs .stat-card__icon svg {
    height: 52px;
    width: 52px;
    flex: 1 0 0;
}

.services_box .stat-card__text {
    color: #1E2225;
    text-align: center;
    font-family: "Inter Tight";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
    /* 140% */
    letter-spacing: -0.4px;
}

@media (min-width:1400px) {
   .services_box .stat-card {
        min-width: 401px;
    }
}

@media (max-width: 1024px) {
    .services_box .stat-card {
        min-width: 340px;
    }
}
</style>