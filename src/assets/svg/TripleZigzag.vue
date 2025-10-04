<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Triple zigzag icon"
  >
    <path
      d="M16 32 L72 80 L128 32 L184 80 L240 32 L240 56 L184 104 L128 56 L72 104 L16 56 Z"
      :fill="color"
    />
    <path
      d="M16 104 L72 152 L128 104 L184 152 L240 104 L240 128 L184 176 L128 128 L72 176 L16 128 Z"
      :fill="color"
    />
    <path
      d="M16 176 L72 224 L128 176 L184 224 L240 176 L240 200 L184 248 L128 200 L72 248 L16 200 Z"
      :fill="color"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TripleZigzagIcon",
  props: {
    width: {
      type: [String, Number],
      default: 64,
    },
    height: {
      type: [String, Number],
      default: 64,
    },
    color: {
      type: String,
      default: "#262262",
    },
  },
});
</script>
