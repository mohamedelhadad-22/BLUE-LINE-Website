<template>
    <section class="our-branches">
        <div class="container branches_container">
            <div class="news-header">
                <span class="news-title_badge">
                    Branches
                </span>
                <h2>Our Branches</h2>
                <p>Consistent, effective, and economical shipping options for enterprises across the globe.</p>
            </div>
            <div class="branches_wrapper">
                <div class="branche_content" v-for="branch in branches" :key="branch.id">
                    <div class="branche_text">
                        <div class="branche_row location">
                            <span>{{ branch.title }}</span>
                            <h2>{{ branch.location }}</h2>
                        </div>
                        <div class="branche_row" v-if="branch.address">
                            <span> Address Branch</span>
                            <h3>{{ branch.address }}</h3>
                        </div>
                        <div class="branche_row" v-if="branch.Mobile">
                            <span> Mobile</span>
                            <h3>{{ branch.Mobile }}</h3>
                        </div>
                        <div class="branche_row" v-if="branch.Phone">
                            <span>Phone:</span>
                            <h3>{{ branch.Phone }}</h3>
                        </div>
                        <div class="branche_row" v-if="branch.mail">
                            <span>Mail:</span>
                            <h3>{{ branch.mail }}</h3>
                        </div>
                    </div>
                    <div class="branche_image">
                        <img :src="branch.image" :alt="branch.location" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EgyptBranch from "@/assets/EgyptBranche_image.png"
import SaudiBranch from "@/assets/saudiBranche_image.png"

export default defineComponent({
    name: "OurBranches",
    data() {
        return {
            branches: [
                {
                    id: 1,
                    title: "Head Office",
                    location: "Saudi Branch",
                    image: SaudiBranch,
                    address: '23441 Al-Madina Al-Munawarah Branch Rd,Al Faisaliyah,Kanoo Building,Jeddah',
                    Mobile: "054 757 5530",
                    Phone: "",
                    mail: "info@blueline-sa.net"
                },
                {
                    id: 2,
                    title: "Address Branch",
                    location: "Egypt Branch",
                    image: EgyptBranch,
                    address: 'Property No. 6, Sector H, First Floor Service Center, First Settlement - New Cairo',
                    Phone: "0223555525",
                    Mobile: "0 122 3693800",
                    mail: "info@blueline-sa.net"
                }
            ]
        };
    },
});
</script>


<style scoped>
.our-branches {
    padding: 60px 0 140px 0;
}

.branches_container {
    display: flex;
    flex-direction: column;
    gap: 33px;
}

.news-header {
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: flex-start;
}

.news-header h2 {
    color: #101828;
    font-size: 48px;
    font-weight: 700;
}

.news-header p {
    color: #71717A;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
}

.news-title_badge {
    display: inline-flex;
    padding: 7px 10.5px;
    align-items: flex-start;
    background: #2970FF;
    color: #FFF;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    margin-bottom: 8px;
}

.branches_wrapper {
    display: flex;
    gap: 57px;
    flex-wrap: wrap;
    justify-content: center;
}

.branche_content {
    display: flex;
    /* height: 358px; */
    align-items: flex-start;
    gap: 19px;
    flex: 1 0 0;
}

.branche_text {
    display: flex;
    flex-direction: column;
    gap: 19px;
    flex: 1;
}

.branche_row {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.branche_row.location h2 {
    color: #1E2225;
    font-size: 32px;
    font-weight: 600;
}

.branche_row span {
    color: #71717A;
    font-size: 14px;
    font-weight: 500;
}

.branche_row h3 {
    color: #1E2225;
    font-size: 20px;
    font-weight: 500;
}

.branche_image {
    max-width: 362px;
    max-height: 378px;
}

.branche_image img {
    /* width: 200px; */
    height: auto;
    object-fit: cover;
    flex: 1 0 0;
    align-self: stretch;
    min-width: 342px;
    min-height: 360px;
    width: 100%;
    height: 100%;
    max-width: 342px;
    max-height: 368px;
}
</style>