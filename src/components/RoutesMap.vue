<script lang="ts">
import { defineComponent } from 'vue';
import L, { Map as LMap, Polyline, LatLngTuple, Marker, ImageOverlay } from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import mapOverlay from '@/assets/routes-map-overlay.svg';

type Stop = {
  port: string;
  coords: LatLngTuple;
  daysFromPrev: number | null;
};

type Route = {
  id: string;
  label: string;
  code: string;
  description: string;
  color: string;
  stops: Stop[];
};

export default defineComponent({
  name: 'RoutesMap',
  props: {
    initialRouteId: {
      type: String,
      default: 'NRS',
    },
  },
  data() {
    return {
      map: null as LMap | null,
      polyline: null as Polyline | null,
      markers: [] as Marker[],
      activeRouteId: '' as string,
      routes: [
        {
          id: 'NRS',
          label: 'NRS',
          code: 'FLKM1',
          description: 'North Red Sea Service',
          color: '#63ff8c',
          stops: [
            { port: 'Jeddah', coords: [21.4858, 39.1925], daysFromPrev: null },
            { port: 'NEOM', coords: [28.2301, 34.6232], daysFromPrev: 2 },
            { port: 'Ain Sokhna', coords: [29.6, 32.3167], daysFromPrev: 4 },
            { port: 'Aqaba', coords: [29.5319, 35.006], daysFromPrev: 2 },
            { port: 'Yanbu', coords: [24.0889, 38.0656], daysFromPrev: 2 },
          ],
        },
        {
          id: 'SRS',
          label: 'SRS',
          code: 'FLKM2',
          description: 'South Red Sea Service',
          color: '#63ff8c',
          stops: [
            { port: 'Jeddah', coords: [21.4858, 39.1925], daysFromPrev: null },
            { port: 'Port Sudan', coords: [19.6158, 37.2164], daysFromPrev: 1 },
            { port: 'Jeddah', coords: [21.4858, 39.1925], daysFromPrev: 3 },
            { port: 'Djibouti', coords: [11.5721, 43.1456], daysFromPrev: 3 },
            { port: 'Aden', coords: [12.7855, 45.0187], daysFromPrev: 2 },
          ],
        },
        {
          id: 'IRS',
          label: 'IRS',
          code: 'FLKM3',
          description: 'India Red Sea Service',
          color: '#63ff8c',
          stops: [
            { port: 'Nhava Sheva', coords: [18.95, 72.95], daysFromPrev: null },
            { port: 'Mundra', coords: [22.839, 69.709], daysFromPrev: 2 },
            { port: 'Jeddah', coords: [21.4858, 39.1925], daysFromPrev: 8 },
          ],
        },
        {
          id: 'IGS',
          label: 'IGS',
          code: 'FLKM4',
          description: 'India Gulf Service',
          color: '#63ff8c',
          stops: [
            { port: 'Nhava Sheva', coords: [18.95, 72.95], daysFromPrev: null },
            { port: 'Mundra', coords: [22.839, 69.709], daysFromPrev: 2 },
            { port: 'Dammam', coords: [26.4207, 50.0888], daysFromPrev: 9 },
            { port: 'Umm Qasr', coords: [30.0362, 47.9195], daysFromPrev: 2 },
          ],
        },
      ] as Route[],
      overlay: null as ImageOverlay | null,
    };
  },
  computed: {
    activeRoute(): Route {
      return (
        this.routes.find((route) => route.id === this.activeRouteId) ?? this.routes[0]
      );
    },
  },
  created() {
    this.activeRouteId = this.initialRouteId;
  },
  mounted() {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    const mapElement = this.$refs.mapEl as HTMLDivElement | undefined;
    if (!mapElement) {
      return;
    }

    this.map = L.map(mapElement, {
      zoomControl: false,
      zoomSnap: 0.5,
      scrollWheelZoom: false,
      keyboard: false,
      doubleClickZoom: true,
      maxBoundsViscosity: 1,
    });

    const overlayBounds = L.latLngBounds([2, 20], [32, 85]);
    this.overlay = L.imageOverlay(mapOverlay, overlayBounds, { opacity: 1 }).addTo(this.map);
    this.map.fitBounds(overlayBounds, { padding: [40, 40] });
    this.map.setMaxBounds(overlayBounds);
    this.map.setMinZoom(this.map.getZoom());
    this.map.setMaxZoom(this.map.getZoom() + 4);

    this.drawActiveRoute();

    window.addEventListener('resize', this.refitBounds, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.refitBounds);
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  },
  methods: {
    setActive(id: string) {
      if (id === this.activeRouteId) {
        return;
      }
      this.activeRouteId = id;
      this.drawActiveRoute();
    },
    drawActiveRoute() {
      if (!this.map || !this.activeRoute) {
        return;
      }

      this.markers.forEach((marker) => marker.remove());
      this.markers = [];

      if (this.polyline) {
        this.polyline.remove();
        this.polyline = null;
      }

      const latLngs = this.activeRoute.stops.map((stop) => stop.coords);

      this.polyline = L.polyline(latLngs, {
        color: this.activeRoute.color,
        weight: 4,
        opacity: 0.9,
        dashArray: '6 12',
      }).addTo(this.map);

      this.activeRoute.stops.forEach((stop, index) => {
        const marker = L.marker(stop.coords, {
          icon: L.divIcon({
            className: 'routes-marker',
            html: `<span class="marker-dot"></span><span class="marker-label">${stop.port}</span>`,
            iconSize: [1, 1],
            popupAnchor: [0, -12],
          }),
        }).addTo(this.map!);

        const popupContent = index === 0
          ? `<strong>${stop.port}</strong>`
          : `<strong>${stop.port}</strong><br/>${stop.daysFromPrev} days from previous stop`;
        marker.bindPopup(popupContent);
        this.markers.push(marker);
      });

      this.refitBounds();
    },
    refitBounds() {
      if (this.map && this.polyline) {
        this.map.fitBounds(this.polyline.getBounds(), { padding: [40, 40] });
      }
    },
  },
});
</script>

<template>
  <div class="routes-wrap">
    <div class="panel">
      <span class="panel__tag">Routes</span>
      <h2 class="panel__title">Regional Connectivity with Reliable Routes</h2>
      <p class="panel__lead">
        Select a service to explore Folk Maritime port rotations and transit commitments across the Red Sea, Arabian Gulf, and India.
      </p>

      <div class="panel__tabs" role="tablist" aria-label="Shipping routes">
        <button
          v-for="route in routes"
          :key="route.id"
          class="panel__tab"
          :class="{ active: route.id === activeRouteId }"
          role="tab"
          type="button"
          :aria-selected="route.id === activeRouteId"
          @click="setActive(route.id)"
        >
          <div class="panel__tabHeader">
            <span class="panel__tabName">{{ route.description }} ({{ route.label }})</span>
            <span class="panel__tabIcon" aria-hidden="true">
              {{ route.id === activeRouteId ? '✔' : '+' }}
            </span>
          </div>
          <span class="panel__tabCode">ID# {{ route.code }}</span>
        </button>
      </div>

      <ul class="panel__legs" aria-label="Route stops">
        <li
          v-for="(stop, index) in activeRoute.stops"
          :key="`${activeRoute.id}-${index}`"
          class="panel__leg"
        >
          <span class="panel__legDot" :style="{ background: activeRoute.color }"></span>
          <span class="panel__legPort">{{ stop.port }}</span>
          <span v-if="stop.daysFromPrev !== null" class="panel__legDays">{{ stop.daysFromPrev }} days</span>
        </li>
      </ul>

      <a class="panel__cta" href="#routes">
        Check route details <span aria-hidden="true">→</span>
      </a>
    </div>

    <div class="mapShell">
      <div ref="mapEl" class="map" aria-label="Route map"></div>
    </div>
  </div>
</template>

<style scoped>
.routes-wrap {
  display: grid;
  gap: 24px;
  background: linear-gradient(135deg, #022321, #073632);
  padding: clamp(2.5rem, 6vw, 4rem);
  border-radius: 24px;
  position: relative;
  overflow: hidden;
}

.routes-wrap::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(80, 190, 120, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(80, 190, 120, 0.12) 1px, transparent 1px);
  background-size: 120px 120px;
  pointer-events: none;
  z-index: 0;
}

@media (min-width: 1024px) {
  .routes-wrap {
    grid-template-columns: minmax(320px, 380px) 1fr;
    align-items: stretch;
  }
}

.panel {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: #f2fff7;
}

.panel__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  background: rgba(99, 255, 140, 0.18);
  border-radius: 999px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #63ff8c;
  font-weight: 600;
}

.panel__title {
  margin: 0;
  font-size: clamp(2rem, 3.2vw, 3rem);
  line-height: 1.2;
}

.panel__lead {
  margin: 0;
  color: rgba(226, 255, 244, 0.7);
  line-height: 1.7;
  max-width: 28rem;
}

.panel__tabs {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(90, 220, 150, 0.2);
  background: rgba(5, 35, 33, 0.6);
}

.panel__tab {
  text-align: left;
  padding: 1rem 1.25rem;
  border: none;
  background: transparent;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.panel__tab:not(:last-child) {
  border-bottom: 1px solid rgba(90, 220, 150, 0.12);
}

.panel__tabHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-weight: 600;
}

.panel__tabIcon {
  font-size: 1rem;
}

.panel__tabCode {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(209, 255, 233, 0.55);
}

.panel__tab.active {
  background: rgba(109, 255, 105, 0.9);
  color: #012218;
}

.panel__tab.active .panel__tabCode {
  color: #013020;
}

.panel__tab:not(.active):hover {
  background: rgba(8, 53, 49, 0.85);
}

.panel__tab:focus-visible {
  outline: 2px solid rgba(109, 255, 105, 0.75);
  outline-offset: -2px;
}

.panel__legs {
  list-style: none;
  margin: 0;
  padding: 1rem 0 0;
  border-top: 1px solid rgba(90, 220, 150, 0.18);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.panel__leg {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.panel__legDot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(2, 30, 28, 0.9);
}

.panel__legPort {
  font-weight: 600;
}

.panel__legDays {
  font-size: 0.85rem;
  color: rgba(190, 250, 221, 0.7);
}

.panel__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #63ff8c;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid rgba(99, 255, 140, 0.6);
  width: fit-content;
}

.panel__cta span {
  transition: transform 0.2s ease;
}

.panel__cta:hover span,
.panel__cta:focus-visible span {
  transform: translateX(4px);
}

.panel__cta:focus-visible {
  outline: 2px solid rgba(99, 255, 140, 0.45);
  outline-offset: 4px;
}

.mapShell {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  outline: 1px solid rgba(99, 255, 140, 0.15);
  min-height: 420px;
  z-index: 1;
}

.map {
  width: 100%;
  height: 100%;
  min-height: 420px;
  background: #032924;
}

:global(.leaflet-tile-pane) {
  filter: hue-rotate(120deg) saturate(0.7) brightness(0.55);
}

.leaflet-control-attribution {
  display: none;
}

.routes-marker {
  position: relative;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.marker-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #63ff8c;
  display: inline-block;
  box-shadow: 0 0 0 4px rgba(5, 44, 43, 0.8);
}

.marker-label {
  margin-inline-start: 6px;
  background: rgba(4, 36, 32, 0.85);
  padding: 2px 6px;
  border-radius: 999px;
}

@media (max-width: 767px) {
  .panel {
    order: -1;
  }
}
</style>
