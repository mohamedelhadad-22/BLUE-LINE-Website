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
                        <div class="location-marker" style="top: 46%; left: 56%;" @mouseenter="showTooltip('egypt')"
                            @mouseleave="hideTooltip">
                            <div class="marker-outer"></div>
                            <div class="marker-middle"></div>
                            <div class="marker-inner"></div>

                            <!-- Tooltip -->
                            <div class="tooltip egypt" v-show="activeTooltip === 'egypt'">

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
                        <div class="location-marker" style="top: 50%; left: 60%;" @mouseenter="showTooltip('saudi')"
                            @mouseleave="hideTooltip">
                            <div class="marker-outer"></div>
                            <div class="marker-middle"></div>
                            <div class="marker-inner"></div>

                            <!-- Tooltip -->
                            <div class="tooltip saudi" v-show="activeTooltip === 'saudi'">
                                <div class="tooltip-content">
                                    <div class="flag">
                                        <img src="@/assets/Saudi-arabia-flag.png" alt="Saudi Arabia Flag" />
                                    </div>
                                    <div class="text">
                                        <div class="tooltip-header">Saudi Arabia</div>
                                        <div class="tooltip-text">
                                            23441 Al-Madina Al-Munawarah Branch Rd,<br>
                                            Al Faisaliyah, Kanoo Building, Jeddah
                                        </div>
                                    </div>
                                </div>
                                <div class="tooltip-arrow"></div>
                            </div>
                        </div>

                        <!-- Morocco -->
                        <div class="location-marker location-marker--small" style="top: 38%; left: 47.5%;"
                            @mouseenter="showTooltip('morocco')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'morocco'">Morocco</div>
                        </div>

                        <!-- Algeria -->
                        <div class="location-marker location-marker--small" style="top: 41%; left: 50.5%;"
                            @mouseenter="showTooltip('algeria')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'algeria'">Algeria</div>
                        </div>

                        <!-- Tunisia -->
                        <div class="location-marker location-marker--small" style="top: 39%; left: 52%;"
                            @mouseenter="showTooltip('tunisia')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'tunisia'">Tunisia</div>
                        </div>

                        <!-- Libya -->
                        <div class="location-marker location-marker--small" style="top: 43%; left: 53%;"
                            @mouseenter="showTooltip('libya')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'libya'">Libya</div>
                        </div>

                        <!-- Mauritania -->
                        <div class="location-marker location-marker--small" style="top: 49%; left: 47.5%;"
                            @mouseenter="showTooltip('mauritania')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'mauritania'">Mauritania</div>
                        </div>

                        <!-- Senegal -->
                        <div class="location-marker location-marker--small" style="top: 53%; left: 46.5%;"
                            @mouseenter="showTooltip('senegal')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'senegal'">Senegal</div>
                        </div>

                        <!-- Gambia -->
                        <div class="location-marker location-marker--small" style="top: 53.5%; left: 46%;"
                            @mouseenter="showTooltip('gambia')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'gambia'">Gambia</div>
                        </div>

                        <!-- Guinea -->
                        <div class="location-marker location-marker--small" style="top: 55.5%; left: 47%;"
                            @mouseenter="showTooltip('guinea')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'guinea'">Guinea</div>
                        </div>

                        <!-- Nigeria -->
                        <div class="location-marker location-marker--small" style="top: 56%; left: 50.5%;"
                            @mouseenter="showTooltip('nigeria')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'nigeria'">Nigeria</div>
                        </div>

                        <!-- Sudan -->
                        <div class="location-marker location-marker--small" style="top: 51%; left: 54.5%;"
                            @mouseenter="showTooltip('sudan')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'sudan'">Sudan</div>
                        </div>

                        <!-- Somalia -->
                        <div class="location-marker location-marker--small" style="top: 57%; left: 57%;"
                            @mouseenter="showTooltip('somalia')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'somalia'">Somalia</div>
                        </div>

                        <!-- Kenya -->
                        <div class="location-marker location-marker--small" style="top: 62%; left: 56%;"
                            @mouseenter="showTooltip('kenya')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'kenya'">Kenya</div>
                        </div>

                        <!-- Tanzania -->
                        <div class="location-marker location-marker--small" style="top: 66%; left: 55.5%;"
                            @mouseenter="showTooltip('tanzania')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'tanzania'">Tanzania</div>
                        </div>

                        <!-- Syria -->
                        <div class="location-marker location-marker--small" style="top: 38.5%; left: 57.5%;"
                            @mouseenter="showTooltip('syria')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'syria'">Syria</div>
                        </div>

                        <!-- Lebanon -->
                        <div class="location-marker location-marker--small" style="top: 40.5%; left: 57.2%;"
                            @mouseenter="showTooltip('lebanon')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'lebanon'">Lebanon</div>
                        </div>

                        <!-- Iraq -->
                        <div class="location-marker location-marker--small" style="top: 40%; left: 59.5%;"
                            @mouseenter="showTooltip('iraq')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'iraq'">Iraq</div>
                        </div>

                        <!-- Bahrain -->
                        <div class="location-marker location-marker--small" style="top: 45.5%; left: 60%;"
                            @mouseenter="showTooltip('bahrain')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'bahrain'">Bahrain</div>
                        </div>

                        <!-- Dubai (Branch) -->
                        <div class="location-marker" style="top: 46.5%; left: 60.8%;" @mouseenter="showTooltip('dubai')"
                            @mouseleave="hideTooltip">
                            <div class="marker-outer"></div>
                            <div class="marker-middle"></div>
                            <div class="marker-inner"></div>
                            <!-- <div class="tooltip" v-show="activeTooltip === 'dubai'">
                                <div class="tooltip-content">
                                    <div class="flag">
                                        <img src="@/assets/Dubai-flag.png" alt="Dubai Flag" /> 
                                    </div>
                                    <div class="text">
                                        <div class="tooltip-header">Dubai (Branch)</div>
                                        <div class="tooltip-text">
                                            Dubai Branch Office
                                        </div>
                                    </div>
                                </div>
                                <div class="tooltip-arrow"></div>
                            </div> -->
                        </div>

                        <!-- Oman (Branch) -->
                        <div class="location-marker" style="top: 49%; left: 61.5%;" @mouseenter="showTooltip('oman')"
                            @mouseleave="hideTooltip">
                            <div class="marker-outer"></div>
                            <div class="marker-middle"></div>
                            <div class="marker-inner"></div>
                            <!-- <div class="tooltip" v-show="activeTooltip === 'oman'">
                                <div class="tooltip-content">
                                    <div class="flag">
                                        <img src="@/assets/Oman-flag.png" alt="Oman Flag" />
                                    </div>
                                    <div class="text">
                                        <div class="tooltip-header">Oman (Branch)</div>
                                        <div class="tooltip-text">
                                            Oman Branch Office
                                        </div>
                                    </div>
                                </div>
                                <div class="tooltip-arrow"></div>
                            </div> -->
                        </div>

                        <!-- Yemen -->
                        <div class="location-marker location-marker--small" style="top: 54%; left: 61%;"
                            @mouseenter="showTooltip('yemen')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'yemen'">Yemen</div>
                        </div>

                        <!-- Turkey -->
                        <div class="location-marker location-marker--small" style="top: 37%; left: 56.5%;"
                            @mouseenter="showTooltip('turkey')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'turkey'">Turkey</div>
                        </div>

                        <!-- Italy -->
                        <div class="location-marker location-marker--small" style="top: 35%; left: 52.5%;"
                            @mouseenter="showTooltip('italy')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'italy'">Italy</div>
                        </div>

                        <!-- England -->
                        <div class="location-marker location-marker--small" style="top: 28%; left: 49%;"
                            @mouseenter="showTooltip('england')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'england'">England</div>
                        </div>

                        <!-- Sweden -->
                        <div class="location-marker location-marker--small" style="top: 22%; left: 53%;"
                            @mouseenter="showTooltip('sweden')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'sweden'">Sweden</div>
                        </div>

                        <!-- Russia -->
                        <div class="location-marker location-marker--small" style="top: 24%; left: 68%;"
                            @mouseenter="showTooltip('russia')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'russia'">Russia</div>
                        </div>

                        <!-- India -->
                        <div class="location-marker location-marker--small" style="top: 49%; left: 69%;"
                            @mouseenter="showTooltip('india')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'india'">India</div>
                        </div>

                        <!-- China -->
                        <div class="location-marker location-marker--small" style="top: 38%; left: 78%;"
                            @mouseenter="showTooltip('china')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'china'">China</div>
                        </div>

                        <!-- Thailand -->
                        <div class="location-marker location-marker--small" style="top: 54%; left: 78%;"
                            @mouseenter="showTooltip('thailand')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'thailand'">Thailand</div>
                        </div>

                        <!-- Malaysia -->
                        <div class="location-marker location-marker--small" style="top: 60%; left: 79.5%;"
                            @mouseenter="showTooltip('malaysia')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'malaysia'">Malaysia</div>
                        </div>

                        <!-- Indonesia -->
                        <div class="location-marker location-marker--small" style="top: 64%; left: 81%;"
                            @mouseenter="showTooltip('indonesia')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'indonesia'">Indonesia</div>
                        </div>

                        <!-- South Korea -->
                        <div class="location-marker location-marker--small" style="top: 39%; left: 85%;"
                            @mouseenter="showTooltip('southkorea')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'southkorea'">South Korea</div>
                        </div>

                        <!-- Taiwan -->
                        <div class="location-marker location-marker--small" style="top: 47%; left: 84%;"
                            @mouseenter="showTooltip('taiwan')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'taiwan'">Taiwan</div>
                        </div>

                        <!-- Brazil -->
                        <div class="location-marker location-marker--small" style="top: 69%; left: 31%;"
                            @mouseenter="showTooltip('brazil')" @mouseleave="hideTooltip">
                            <div class="tooltip-simple" v-show="activeTooltip === 'brazil'">Brazil</div>
                        </div>
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
    z-index: 1;
}

.location-marker:hover {
    z-index: 100;
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
    transition: all 0.3s ease;
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
    z-index: 200;
    filter: drop-shadow(0px 12px 16px rgba(16, 24, 40, 0.08)) drop-shadow(0px 4px 6px rgba(16, 24, 40, 0.03));
    border-radius: 8px;
    background: #FFF;

}

.tooltip.egypt {
    min-width: 240px;
}

.tooltip.saudi {
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

/* Simple tooltip for small markers */
.tooltip-simple {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: #ffffff;
    padding: 6px 12px;
    border-radius: 6px;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #101828;
    white-space: nowrap;
    z-index: 200;
    filter: drop-shadow(0px 4px 6px rgba(16, 24, 40, 0.1));
}

.tooltip-simple::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #ffffff;
}

/* Hover effects */
.location-marker:hover .marker-outer {
    width: 48px;
    height: 48px;
    opacity: 0.15;
}

.location-marker:hover .marker-middle {
    width: 28px;
    height: 28px;
    opacity: 0.3;
}

.location-marker:hover .marker-inner {
    width: 10px;
    height: 10px;
    transform: translate(-50%, -50%) scale(1.2);
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

    .tooltip-simple {
        bottom: 25px;
        font-size: 11px;
        padding: 5px 10px;
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

    .tooltip-simple {
        bottom: 22px;
        font-size: 10px;
        padding: 4px 8px;
    }

    .tooltip-simple::after {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #ffffff;
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

    .tooltip-simple {
        bottom: 20px;
        font-size: 9px;
        padding: 3px 7px;
    }

    .tooltip-simple::after {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #ffffff;
    }
}

/* Small destination markers (non-branch locations) */
.location-marker--small {
    width: 24px;
    height: 24px;
    cursor: pointer;
    z-index: 1;
}

.location-marker--small:hover {
    z-index: 50;
}

.location-marker--small::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    background-color: #84adff;
    opacity: 0.15;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
}

.location-marker--small::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: #84adff;
    opacity: 1;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
}

.location-marker--small:hover::before {
    width: 28px;
    height: 28px;
    opacity: 0.25;
}

.location-marker--small:hover::after {
    width: 8px;
    height: 8px;
    transform: translate(-50%, -50%) scale(1.2);
}

/* Responsive adjustments for small markers */
@media (max-width: 1023px) {
    .location-marker--small {
        width: 20px;
        height: 20px;
    }

    .location-marker--small::before {
        width: 20px;
        height: 20px;
    }

    .location-marker--small::after {
        width: 5px;
        height: 5px;
    }

    .location-marker--small:hover::before {
        width: 24px;
        height: 24px;
    }
}

@media (max-width: 767px) {
    .location-marker--small {
        width: 16px;
        height: 16px;
    }

    .location-marker--small::before {
        width: 16px;
        height: 16px;
    }

    .location-marker--small::after {
        width: 4px;
        height: 4px;
    }

    .location-marker--small:hover::before {
        width: 20px;
        height: 20px;
    }
}

@media (max-width: 479px) {
    .location-marker--small {
        width: 14px;
        height: 14px;
    }

    .location-marker--small::before {
        width: 14px;
        height: 14px;
    }

    .location-marker--small::after {
        width: 3px;
        height: 3px;
    }

    .location-marker--small:hover::before {
        width: 16px;
        height: 16px;
    }
}
</style>
