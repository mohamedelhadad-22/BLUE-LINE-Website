<script lang="ts">
import type { PropType, Component } from "vue";
export default {
  name: "CommonButton",
  components: {},
  props: {
    text: {
      type: String,
      required: true,
    },
    iconFirst: {
      type: Boolean,
      required: false,
    },
    fullWidth: {
      type: Boolean,
      required: false,
      nullable: true,
    },
    icon: {
      type: Object as PropType<Component>,
      required: false,
      nullable: true,
    },
    isWhiteButton: {
      type: Boolean,
      required: false,
    },
    isRedColor: {
      type: Boolean,
      required: false,
      nullable: true,
    },
    isBlueColor: {
      type: Boolean,
      required: false,
      nullable: true,
    },
    isSubmitButton: {
      type: Boolean,
      required: false,
      nullable: true,
    },
    buttonType: {
      type: String,
      required: false,
      nullable: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
<template>
  <button
    :type="isSubmitButton ? 'submit' : 'button'"
    class="common_button_default"
    :class="{
      common_button_white: isWhiteButton,
      common_button_extra_small: buttonType === 'XS',
      common_button_default: buttonType === 'S',
      common_button_medium: buttonType === 'M',
      common_button_large: buttonType === 'L',
      common_button_extra_large: buttonType === 'XL',
      common_button_full_width: fullWidth,
      common_button_red: isRedColor,
      disabled: disabled,
      isBlueColor: isBlueColor,
    }"
    :disabled="disabled"
  >
    {{ text }}
    <component
      :class="{ icon: iconFirst, icon_black: isWhiteButton }"
      v-show="icon != null"
      :is="icon"
    ></component>
  </button>
</template>

<style scoped>
.common_button {
  color: var(--color344054);
  font-size: 14px;
  font-weight: 600;
  display: flex;
  background-color: white;
  padding: 8px 12px;
  gap: 4px;
  border-radius: 4px;
  border: 1px solid var(--colorF2F4F7);
  line-height: 20px;
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  max-width: 200px;
}

.common_button_default {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  background-color: var(--color-primary);
  padding: 8px 12px;
  border: 1px solid var(--color-primary);
  line-height: 18px;
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  width: fit-content;
  max-width: 300px;
}

.english .common_button_default {
  font-weight: 600;
}

.common_button_white {
  color: var(--color344054);
  background-color: white;
  border: 1px solid var(--colorF2F4F7);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}

.common_button_extra_small {
  font-size: 12px;
}

.common_button_medium {
  padding: 10px 14px;
}

.common_button_large {
  font-size: 16px;
  padding: 10px 16px;
}

.common_button_extra_large {
  font-size: 16px;
  padding: 12px 20px;
}

.common_button_full_width {
  width: 100%;
}

.common_button_red {
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
}
.isBlueColor {
  background-color: #2aa1d8;
  border: 1px solid #2aa1d8;
}
.filter_tenure_clicked {
  background-color: var(--colorF9FAFB);
}

.common_button_left_border {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.common_button_right_border {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.icon {
  order: -1;
}

@media (max-width: 768px) {
  .common_button_default,
  .common_button_large {
    font-size: 12px;
  }
}

.disabled {
  border-radius: 4px;
  border: 1px solid #eaecf0;
  background: #f2f4f7;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  cursor: not-allowed;
}
</style>
<style>
.icon_black path {
  stroke: var(--color344054);
}
</style>
