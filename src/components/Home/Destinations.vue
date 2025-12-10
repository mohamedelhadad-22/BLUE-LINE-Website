<template>
    <section class="destinations">
        <div class="destinations__container container">
            <div class="destinations_row">
                <div class="destination_title">
                    <div class="badge">{{ $t("homeSection.map") }}</div>
                    <h2>
                        {{ $t("homeSection.destinationTitle") }}
                        <br>
                        {{ $t("homeSection.destinationTitle2") }}
                    </h2>
                    <p class="description">
                        {{ $t("homeSection.destinationDesc") }}
                    </p>
                </div>

                <div class="map_wrapper">
                    <div class="map_svg">
                        <img src="@/assets/_Vector map.svg" alt="Map" />

                        <!-- Location markers -->
                        <div class="location-marker" style="top: 44.88%; left: 53.22%;"
                            @mouseenter="showTooltip('egypt')" @mouseleave="hideTooltip">
                            <div class="marker-outer"></div>
                            <div class="marker-middle"></div>
                            <div class="marker-inner"></div>

                            <!-- Tooltip -->
                            <div class="tooltip" v-show="activeTooltip === 'egypt'">

                                <div class="tooltip-content">
                                    <div class="flag">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 20 20" fill="none">
                                            <g clip-path="url(#clip0_112_94)">
                                                <path
                                                    d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                                                    fill="#F0F0F0" />
                                                <path
                                                    d="M10.0001 -0.000488281C5.70043 -0.000488281 2.035 2.71326 0.62207 6.52127H19.3781C17.9652 2.71326 14.2997 -0.000488281 10.0001 -0.000488281Z"
                                                    fill="#D80027" />
                                                <path
                                                    d="M10.0001 20.0003C14.2997 20.0003 17.9652 17.2865 19.3781 13.4785H0.62207C2.035 17.2865 5.70043 20.0003 10.0001 20.0003Z"
                                                    fill="black" />
                                                <path
                                                    d="M13.4783 8.91303H10.8696C10.8696 8.43279 10.4802 8.04346 10 8.04346C9.51977 8.04346 9.13044 8.43279 9.13044 8.91303H6.52173C6.52173 9.3933 6.94005 9.7826 7.42028 9.7826H7.3913C7.3913 10.2629 7.78059 10.6522 8.26087 10.6522C8.26087 11.1324 8.65016 11.5217 9.13044 11.5217H10.8696C11.3499 11.5217 11.7391 11.1324 11.7391 10.6522C12.2194 10.6522 12.6087 10.2629 12.6087 9.7826H12.5798C13.06 9.7826 13.4783 9.3933 13.4783 8.91303Z"
                                                    fill="#FF9811" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_112_94">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div class="text">
                                        <div class="tooltip-header">Egypt</div>
                                        <div class="tooltip-text">
                                            5 Nouh Effendi, Wabour Al Meyah,<br>
                                            Alexandria Governorate 5423003
                                        </div>
                                    </div>
                                </div>
                                <div class="tooltip-arrow"></div>
                            </div>
                        </div>

                        <!-- Saudi Arabia marker -->
                        <div class="location-marker" style="top: 48%; left: 60%;" @mouseenter="showTooltip('saudi')"
                            @mouseleave="hideTooltip">
                            <div class="marker-outer"></div>
                            <div class="marker-middle"></div>
                            <div class="marker-inner"></div>

                            <!-- Tooltip -->
                            <div class="tooltip" v-show="activeTooltip === 'saudi'">
                                <div class="tooltip-content">
                                    <div class="flag">
                                        <img src="@/assets/Saudi-arabia-flag.png" alt="Saudi Arabia Flag" />
                                    </div>
                                    <div class="tooltip-header">Saudi Arabia</div>
                                    <div class="tooltip-text">
                                        23441 Al-Madina Al-Munawarah Branch Rd,<br>
                                        Al Faisaliyah, Kanoo Building, Jeddah
                                    </div>
                                </div>
                                <div class="tooltip-arrow"></div>
                            </div>
                        </div>

                        <!-- Add more markers as needed -->
                        <div class="location-marker" style="top: 83.2%; left: 86.43%;"></div>
                        <div class="location-marker" style="top: 86.89%; left: 93.55%;"></div>
                        <div class="location-marker" style="top: 32.17%; left: 12.7%;"></div>
                        <div class="location-marker" style="top: 41.8%; left: 15.43%;"></div>
                        <div class="location-marker" style="top: 19.88%; left: 50.88%;"></div>
                        <div class="location-marker" style="top: 45.9%; left: 66.21%;"></div>
                        <div class="location-marker" style="top: 40.78%; left: 82.32%;"></div>
                        <div class="location-marker" style="top: 14.96%; left: 56.74%;"></div>
                        <div class="location-marker" style="top: 36.07%; left: 50.1%;"></div>
                        <div class="location-marker" style="top: 77.05%; left: 29.49%;"></div>
                        <div class="location-marker" style="top: 61.07%; left: 29.49%;"></div>
                        <div class="location-marker" style="top: 27.87%; left: 54.79%;"></div>
                        <div class="location-marker" style="top: 22.95%; left: 65.43%;"></div>
                        <div class="location-marker" style="top: 15.78%; left: 75.68%;"></div>
                        <div class="location-marker" style="top: 34.43%; left: 71.78%;"></div>
                        <div class="location-marker" style="top: 28.69%; left: 83.59%;"></div>
                        <div class="location-marker" style="top: 48.36%; left: 76.07%;"></div>
                        <div class="location-marker" style="top: 4.1%; left: 35.55%;"></div>
                        <div class="location-marker" style="top: 20.49%; left: 33.59%;"></div>
                        <div class="location-marker" style="top: 15.78%; left: 16.21%;"></div>
                        <div class="location-marker" style="top: 31.76%; left: 19.34%;"></div>
                        <div class="location-marker" style="top: 32.99%; left: 27.93%;"></div>
                        <div class="location-marker" style="top: 50%; left: 54%;"></div>
                        <div class="location-marker" style="top: 54.92%; left: 55.96%;"></div>
                        <div class="location-marker" style="top: 63.52%; left: 55.18%;"></div>
                        <div class="location-marker" style="top: 62.5%; left: 49.32%;"></div>
                        <div class="location-marker" style="top: 47.54%; left: 49.32%;"></div>
                        <div class="location-marker" style="top: 72.34%; left: 53.61%;"></div>
                        <div class="location-marker" style="top: 54.1%; left: 46.97%;"></div>
                        <div class="location-marker" style="top: 46.72%; left: 44.63%;"></div>
                        <div class="location-marker" style="top: 39.96%; left: 47.36%;"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Destinations",
    data() {
        return {
            activeTooltip: null as string | null,
        };
    },
    methods: {
        showTooltip(location: string) {
            this.activeTooltip = location;
        },
        hideTooltip() {
            this.activeTooltip = null;
        },
    },
});
</script>

<style scoped>
.destinations {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 629px;
    width: 100%;
    background-color: #0a0f33;
    padding: 128px 0;
    overflow: hidden;
}

.destinations::before {
    content: '';
    position: absolute;
    top: -127px;
    left: -52px;
    width: 1443px;
    height: 628px;
    background: url("@/assets/image 9 (1).png") no-repeat;
    background-position: -22.52% -61.56%;
    background-size: 145.05% 220.53%;
    opacity: 0.17;
    pointer-events: none;
    z-index: 0;
}

.destinations__container {
    position: relative;
    z-index: 1;
}

.destinations_row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 52px;
    height: 373px;
}

.destination_title {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 534px;
    width: 534px;
    padding: 0 0 16px 8px;
    align-items: flex-start;
}

.destination_title .badge {
    display: flex;
    padding: 7px 10.5px;
    align-items: flex-start;
    background: rgba(51, 119, 255, 0.2);
    color: white;
    font-family: 'Inter';
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: -0.32px;
    margin-bottom: 6px;
}

.destination_title h2 {
    color: white;
    font-family: 'Inter Tight', sans-serif;
    font-size: 44px;
    font-weight: 600;
    line-height: 48.4px;
    letter-spacing: -0.88px;
    max-width: 256px;
    margin: 0;
    margin-bottom: 6px;
    white-space: pre-wrap;
}

.destination_title .description {
    color: #e3ebf2;
    font-family: 'Inter', sans-serif;
    font-size: 18.4px;
    font-weight: 500;
    line-height: 27.6px;
    letter-spacing: -0.32px;
    max-width: 428px;
    margin: 0;
    padding-bottom: 0.61px;
}

.map_wrapper {
    position: absolute;
    top: -48px;
    right: 40px;
    width: 1216px;
    display: flex;
    justify-content: flex-end;
}

.map_svg {
    position: relative;
    width: 1024px;
    height: 488px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.map_svg img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

/* Location Markers */
.location-marker {
    position: absolute;
    width: 40px;
    height: 40px;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: all 0.3s ease;
}

.marker-outer {
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: #84adff;
    opacity: 0.1;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
}

.marker-middle {
    position: absolute;
    width: 24px;
    height: 24px;
    background-color: #84adff;
    opacity: 0.2;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
}

.marker-inner {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #84adff;
    opacity: 1;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* Tooltip */
.tooltip {
    position: absolute;
    bottom: 52px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    z-index: 10;
    filter: drop-shadow(0px 12px 16px rgba(16, 24, 40, 0.08)) drop-shadow(0px 4px 6px rgba(16, 24, 40, 0.03));
    border-radius: 8px;
    background: #FFF;
    min-width: 300px;
}

.tooltip .flag {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.tooltip .flag img {
    width: 20px;
    height: 20px;
    object-fit: cover;
    border-radius: 100%;
}

.tooltip-content {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: center;
    justify-content: center;
}

.tooltip-header {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
    color: #101828;
    white-space: nowrap;
}

.tooltip-text {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    color: #475467;
}

.tooltip-arrow {
    width: 16px;
    height: 6px;
    position: relative;
}

.tooltip-arrow::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 6px solid #ffffff;
}

/* Hover effects */
.location-marker:hover .marker-outer {
    width: 48px;
    height: 48px;
}

.location-marker:hover .marker-middle {
    width: 28px;
    height: 28px;
}

/* Responsive Styles */

/* Large Desktop (1440px and above) - Default styles above */

/* Desktop (1024px - 1439px) */
@media (max-width: 1279px) {
    .destinations {
        padding: 100px 0;
        min-height: 550px;
    }

    .destinations::before {
        width: 100vw;
        height: 100%;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background-size: cover;
        background-position: center;
    }

    .destinations_row {
        gap: 40px;
        height: auto;
        min-height: 400px;
    }

    .destination_title {
        max-width: 400px;
        width: 100%;
        padding: 0 0 16px 0;
    }

    .destination_title h2 {
        font-size: 36px;
        line-height: 42px;
        max-width: 100%;
    }

    .destination_title .description {
        font-size: 16px;
        line-height: 24px;
        max-width: 100%;
    }

    .map_wrapper {
        position: absolute;
        top: -48px;
        right: 0px;
        max-width: 900px;
        width: auto;
    }

    .map_svg {
        width: 100%;
        max-width: 900px;
        height: auto;
        aspect-ratio: 1024 / 488;
    }
}

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) {
    .destinations {
        padding: 80px 20px;
        min-height: auto;
    }

    .destinations::before {
        width: 100vw;
        height: 100%;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background-size: cover;
        background-position: center;
    }

    .destinations_row {
        flex-direction: column;
        gap: 40px;
        height: auto;
        align-items: center;
    }

    .destination_title {
        max-width: 100%;
        width: 100%;
        text-align: center;
        align-items: center;
    }

    .destination_title h2 {
        font-size: 32px;
        line-height: 38px;
        max-width: 100%;
    }

    .destination_title .description {
        font-size: 15px;
        line-height: 22px;
        max-width: 100%;
    }

    .map_wrapper {
        position: relative;
        width: 100%;
        max-width: 800px;
        top: 0;
        right: 0;
        margin: 0 auto;
        justify-content: center;
    }

    .map_svg {
        width: 100%;
        max-width: 800px;
        height: auto;
    }

    .location-marker {
        width: 32px;
        height: 32px;
    }

    .marker-outer {
        width: 32px;
        height: 32px;
    }

    .marker-middle {
        width: 20px;
        height: 20px;
    }

    .marker-inner {
        width: 6px;
        height: 6px;
    }

    .location-marker:hover .marker-outer {
        width: 36px;
        height: 36px;
    }

    .location-marker:hover .marker-middle {
        width: 22px;
        height: 22px;
    }

    .tooltip {
        bottom: 40px;
    }

    .tooltip-content {
        padding: 10px 14px;
        max-width: 200px;
    }

    .tooltip-header {
        font-size: 11px;
        line-height: 16px;
    }

    .tooltip-text {
        font-size: 10px;
        line-height: 15px;
    }
}

/* Mobile (480px - 767px) */
@media (max-width: 767px) {
    .destinations {
        padding: 60px 20px;
    }

    .destinations::before {
        width: 100vw;
        height: 100%;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background-size: cover;
        background-position: center;
    }

    .destinations_row {
        gap: 30px;
        flex-direction: column;
        align-items: center;
    }

    .destination_title {
        padding: 0;
        gap: 8px;
        text-align: center;
        align-items: center;
    }

    .destination_title .badge {
        font-size: 12px;
        line-height: 12px;
        padding: 6px 9px;
    }

    .destination_title h2 {
        font-size: 28px;
        line-height: 34px;
        letter-spacing: -0.5px;
    }

    .destination_title .description {
        font-size: 14px;
        line-height: 20px;
    }

    .map_wrapper {
        position: relative;
        width: 100%;
        max-width: 100%;
        top: 0;
        right: 0;
        margin: 0 auto;
        justify-content: center;
    }

    .map_svg {
        width: 100%;
        max-width: 100%;
        height: auto;
    }

    .location-marker {
        width: 28px;
        height: 28px;
    }

    .marker-outer {
        width: 28px;
        height: 28px;
    }

    .marker-middle {
        width: 18px;
        height: 18px;
    }

    .marker-inner {
        width: 5px;
        height: 5px;
    }

    .location-marker:hover .marker-outer {
        width: 32px;
        height: 32px;
    }

    .location-marker:hover .marker-middle {
        width: 20px;
        height: 20px;
    }

    .tooltip {
        bottom: 35px;
    }

    .tooltip-content {
        padding: 8px 12px;
        max-width: 180px;
    }

    .tooltip-header {
        font-size: 10px;
        line-height: 14px;
    }

    .tooltip-text {
        font-size: 9px;
        line-height: 13px;
    }
}

/* Small Mobile (below 480px) */
@media (max-width: 479px) {
    .destinations {
        padding: 40px 16px;
    }

    .destinations::before {
        width: 100vw;
        height: 100%;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background-size: cover;
        background-position: center;
    }

    .destinations_row {
        gap: 24px;
        flex-direction: column;
        align-items: flex-start;
        min-height: 280px;
    }

    .destination_title {
        text-align: center;
        align-items: center;
    }

    .destination_title .badge {
        font-size: 11px;
        padding: 5px 8px;
    }

    .destination_title h2 {
        font-size: 24px;
        line-height: 30px;
    }

    .destination_title .description {
        font-size: 13px;
        line-height: 19px;
    }

    .map_wrapper {
        position: relative;
        width: 100%;
        top: 0;
        right: 0;
        margin: 0 auto;
        justify-content: center;
    }

    .map_svg {
        width: 100%;
        height: auto;
    }

    .location-marker {
        width: 24px;
        height: 24px;
    }

    .marker-outer {
        width: 24px;
        height: 24px;
    }

    .marker-middle {
        width: 16px;
        height: 16px;
    }

    .marker-inner {
        width: 4px;
        height: 4px;
    }

    .location-marker:hover .marker-outer {
        width: 28px;
        height: 28px;
    }

    .location-marker:hover .marker-middle {
        width: 18px;
        height: 18px;
    }

    .tooltip {
        bottom: 30px;
    }

    .tooltip-content {
        padding: 6px 10px;
        max-width: 150px;
    }

    .tooltip-header {
        font-size: 9px;
        line-height: 13px;
    }

    .tooltip-text {
        font-size: 8px;
        line-height: 12px;
    }

    .tooltip-arrow {
        width: 12px;
        height: 5px;
    }

    .tooltip-arrow::before {
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 5px solid #ffffff;
    }
}
</style>
