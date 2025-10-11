<!-- PixelCheckerIcon.vue -->
<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 30 30"
    role="img"
    aria-label="Pixel checker icon"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Draw the 8 squares; center (1,1) is empty -->
    <template v-for="(p, i) in positions" :key="i">
      <rect
        :x="p.x * (tile + gap)"
        :y="p.y * (tile + gap)"
        :width="tile"
        :height="tile"
        :rx="radius"
        :ry="radius"
        :fill="color"
      />
    </template>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  /** Overall icon size (px) */
  size?: number;
  /** Square (tile) size (px). If omitted, computed from size */
  tile?: number;
  /** Gap between squares (px) */
  gap?: number;
  /** Corner radius for squares (px) */
  radius?: number;
  /** Fill color for squares */
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 32,
  tile: 8,
  gap: 2,
  radius: 1.5,
  color: "#A855F7", // Tailwind violet-500
});

/**
 * Keep the viewBox at 30×30 units (3 tiles + 2 gaps in each direction).
 * If you prefer perfect scaling from `size`, you can compute tile/gap from it.
 */
const tile = computed(() => props.tile);
const gap = computed(() => props.gap);
const radius = computed(() => props.radius);
const color = computed(() => props.color);

/** 8 filled positions in a 3×3 grid, skipping the center (1,1) */
const positions = computed(() => [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 0, y: 1 },
  { x: 2, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
]);
</script>
