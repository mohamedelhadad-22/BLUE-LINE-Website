<script lang="ts">
import { defineComponent } from "vue";
import DropDown from "@/components/DropDown.vue";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import DatePickerInput from "@/components/Reusable/DatePickerInput.vue";
import CheckboxInput from "./Reusable/CheckboxInput.vue";
import EditBenIcon from "@/assets/icons/EditBenIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";

export default defineComponent({
  name: "inputField",
  components: {
    DropDown,
    VueTelInput,
    DatePickerInput,
    CheckboxInput,
    EditBenIcon,
    CheckIcon,
  },
  props: {
    label: String,
    placeholder: String,
    type: String,
    modelValue: [String, Number, Array],
    value: [String, Number, Array],
    options: Object as () => Array<{
      value: string | number;
      label: string;
      icon?: any;
      desc: string;
    }>,
    ephemeral: {
      type: Boolean,
      default: false,
      required: false,
    },
    plusIcon: {
      type: Boolean,
      default: false,
    },
    multiSelect: {
      type: Boolean,
      default: false,
    },
    maxSelectedDisplay: {
      type: Number,
      default: 2,
    },
    required: Boolean,
    maxlength: Number,
    rows: {
      type: Number,
      default: 6,
    },
    autocomplete: String,
    error: String,
    disabled: Boolean,
    datePickerProps: {
      type: Object,
      default: () => ({
        format: "dd MMM, yyyy",
        type: "number",
        enableTimePicker: false,
        maxDate: new Date(new Date()),
        timePicker: true,
        yearPicker: false,
      }),
    },
    readonly: String,
    nextOnCompleteRef: { type: String, default: "" },
    cardBrandHint: { type: String, default: "" },
  },
  data() {
    return {
      toggle: false,
      editEnabled: false,
    };
  },

  methods: {
    normalizeDigits(input: string): string {
      if (!input) return "";
      // Map Arabic-Indic (\u0660-\u0669) and Eastern Arabic-Indic (\u06F0-\u06F9) to ASCII 0-9
      return input.replace(/[\u0660-\u0669\u06F0-\u06F9]/g, (d) => {
        const code = d.charCodeAt(0);
        // Arabic-Indic base 0x0660, Eastern Arabic-Indic base 0x06F0
        const ascii = code >= 0x06F0 ? code - 0x06F0 : code - 0x0660;
        return String(ascii);
      });
    },
    preventNonNumericInput(event: any) {
      // Allow control keys
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }
      if (typeof event === "string") {
        event = event.trim();
      }
      const allowedKeys = [
        "Backspace",
        "Tab",
        "Enter",
        "Escape",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "Home",
        "End",
      ];
      if (allowedKeys.includes(event.key)) {
        return;
      }

      const current = event.target.value;
      const next = current + event.key;

      // Allow only if the next value is a valid number
      if (/^\d*\.?\d*$/.test(next)) {
        return;
      } else {
        event.preventDefault();
      }
    },
    // Simple card pattern: group digits 4-4-4-4 (with extra tail if longer) up to 19 digits
    simpleCardPattern() {
      return { groups: [4, 4, 4, 4, 3], max: 16, cvcMax: 4 };
    },
    // Caret-preserving formatter for card number
    formatCardInput(e: InputEvent) {
      const el = e.target as HTMLInputElement;
      const prev = this.normalizeDigits(el.value);
      const selStart = el.selectionStart ?? prev.length;

      const digits = prev.replace(/\D/g, "").slice(0, 19);
      const { groups, max } = this.simpleCardPattern();
      const trimmed = digits.slice(0, max);
      const next = this.formatWithGroups(trimmed, groups);

      const countDigitsBefore = prev
        .slice(0, selStart)
        .replace(/\D/g, "").length;
      let newCaret = 0,
        seen = 0;
      while (newCaret < next.length && seen < countDigitsBefore) {
        if (/\d/.test(next[newCaret])) seen++;
        newCaret++;
      }

      el.value = next;
      this.$emit("update:modelValue", next);
      this.$nextTick(() => el.setSelectionRange(newCaret, newCaret));

      if (this.nextOnCompleteRef && trimmed.length === max) this.focusNext();
    },

    formatExpiryInput(e: InputEvent) {
      const el = e.target as HTMLInputElement;
      const prev = this.normalizeDigits(el.value);
      const caret = el.selectionStart ?? prev.length;

      let d = prev.replace(/\D/g, "").slice(0, 4);
      if (d.length === 1 && +d > 1) d = "0" + d;
      if (d.length >= 2) {
        let mm = d.slice(0, 2);
        let m = +mm;
        if (m <= 0) mm = "01";
        else if (m > 12) mm = "12";
        d = mm + d.slice(2);
      }
      const out = d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2, 4) : d;

      const digitsBefore = prev.slice(0, caret).replace(/\D/g, "").length;
      let newCaret = 0,
        seen = 0;
      while (newCaret < out.length && seen < digitsBefore) {
        if (/\d/.test(out[newCaret])) seen++;
        newCaret++;
      }

      el.value = out;
      this.$emit("update:modelValue", out);
      this.$nextTick(() => el.setSelectionRange(newCaret, newCaret));

      if (this.nextOnCompleteRef && /^\d{2}\/\d{2}$/.test(out))
        this.focusNext();

      // emit validity for parent (future-date check there)
      if (/^\d{2}\/\d{2}$/.test(out)) {
        const mm = parseInt(out.slice(0, 2), 10);
        const yy = parseInt(out.slice(3, 5), 10);
        this.$emit("validate", {
          field: "expiry",
          valid: this.isFutureExpiry(mm, yy),
          value: out,
        });
      } else {
        this.$emit("validate", { field: "expiry", valid: false, value: out });
      }
    },

    focusNext() {
      if (!this.nextOnCompleteRef) return;

      try {
        // Get the target from parent refs
        let target: any = (this.$parent as any)?.$refs?.[
          this.nextOnCompleteRef
        ];

        // Unwrap composition ref (script setup) or v-for array
        if (target && "value" in target) target = target.value;
        if (Array.isArray(target)) target = target[0];

        // 1) If it's already a DOM element
        if (target instanceof HTMLElement) {
          target.focus?.();
          return;
        }

        // 2) If it's a component instance, try exposed focus() first
        if (target && typeof target.focus === "function") {
          target.focus();
          return;
        }

        // 3) Otherwise, try to find a focusable element inside the component root
        const rootEl: any = target?.$el;
        const canQuery = rootEl && typeof rootEl.querySelector === "function";
        const el: HTMLElement | null = canQuery
          ? rootEl.querySelector(
              'input, textarea, [tabindex]:not([tabindex="-1"])'
            )
          : null;

        el?.focus?.();
      } catch {
        /* swallow – focus is a UX enhancement */
      }
    },
    isFutureExpiry(mm: number, yy2: number): boolean {
      const year = 2000 + yy2;
      const expEnd = new Date(year, mm, 0, 23, 59, 59, 999);
      const now = new Date();
      const curEnd = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );
      return expEnd >= curEnd;
    },

    formatCvcInput(e: InputEvent) {
      const el = e.target as HTMLInputElement;
      const raw = this.normalizeDigits(el.value).replace(/\D/g, "");
      // If you render card + CVC together, you can pass brand via prop to set the right max
      const { cvcMax } = this.simpleCardPattern();
      const v = raw.slice(0, cvcMax);
      el.value = v;
      this.$emit("update:modelValue", v);
    },

    formatWithGroups(rawDigits: string, groups: number[]): string {
      let out = "",
        i = 0;
      for (const g of groups) {
        if (i >= rawDigits.length) break;
        const part = rawDigits.slice(i, i + g);
        out += (out ? " " : "") + part;
        i += g;
      }
      return out;
    },

    handleCardKeydown(event: any) {
      const allowedKeys = [
        "Backspace",
        "Tab",
        "Enter",
        "Escape",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "Home",
        "End",
      ];

      if (allowedKeys.includes(event.key) || /\d/.test(event.key)) {
        return;
      }

      event.preventDefault();
    },

    handleExpiryKeydown(event: any) {
      const allowedKeys = [
        "Backspace",
        "Tab",
        "Enter",
        "Escape",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "Home",
        "End",
      ];

      if (allowedKeys.includes(event.key) || /\d/.test(event.key)) {
        return;
      }

      event.preventDefault();
    },

    handleCvcKeydown(event: any) {
      const allowedKeys = [
        "Backspace",
        "Tab",
        "Enter",
        "Escape",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "Home",
        "End",
      ];

      if (allowedKeys.includes(event.key) || /\d/.test(event.key)) {
        return;
      }

      event.preventDefault();
    },

    openEdit() {
      this.editEnabled = true;
      const input = this.$refs.editablePriceInput as HTMLInputElement;
      if (input) {
        input.focus();
        input.setSelectionRange(0, input.value.length);
      }
    },

    saveUpdate() {
      this.editEnabled = false;
      const input = this.$refs.editablePriceInput as HTMLInputElement;
      if (input) {
        input.blur();
      }
      this.editEnabled = false;
      this.$emit("update:modelValue", this.selectedValue);
    },

    handlePaste(event: any) {
      // Handle paste events for number inputs
      const paste = (
        event.clipboardData || (window as any).clipboardData
      ).getData("text");
      if (!/^\d+$/.test(paste)) {
        event.preventDefault();
      }
    },
  },
  computed: {
    selectedValue: {
      get() {
        // Prefer v-model, fallback to legacy value prop
        return (this.modelValue ?? this.value) as any;
      },
      set(value: any) {
        // Emit both modern and legacy events for compatibility
        this.$emit("update:modelValue", value);
        this.$emit("update", value);
        this.$emit("input", value);
      },
    },
  },
});
</script>

<template>
  <!-- v-auto-animate -->
  <div class="input-item">
    <!-- Label -->
    <label v-if="label"> {{ label }}{{ required ? "*" : "" }} </label>

    <!-- Dropdown (Single or Multi-select) -->
    <DropDown
      v-if="type === 'dropdown'"
      :options="options"
      :plusIcon="plusIcon"
      :multiSelect="multiSelect"
      :maxSelectedDisplay="maxSelectedDisplay"
      v-model="selectedValue"
      :placeholder="placeholder"
      :class="{ 'input-error': error }"
      :ephemeral="ephemeral"
    />

    <!-- Checkbox Input -->
    <div class="checkbox-input" v-else-if="type === 'checkbox'">
      <CheckboxInput
        :id="`selectedValue`"
        v-model="selectedValue"
        :checked="selectedValue"
        @click="$emit('update', selectedValue)"
      />
    </div>

    <!-- Card Number Input -->
    <div class="card-input" v-else-if="type === 'card'">
      <input
        type="text"
        :placeholder="placeholder || '1234 1234 1234 1234'"
        :required="required"
        :value="selectedValue"
        :class="{ 'input-error': error }"
        :disabled="disabled"
        inputmode="numeric"
        autocomplete="cc-number"
        enterkeyhint="next"
        @input="formatCardInput"
        @keydown="handleCardKeydown"
      />
      <div class="card-icon" aria-hidden="true">
        <img src="@/assets/svg/Group.svg?url" alt="" />
      </div>
    </div>

    <!-- EXPIRY -->
    <input
      v-else-if="type === 'expiry'"
      type="text"
      :placeholder="placeholder || 'MM/YY'"
      :required="required"
      :value="selectedValue"
      :class="{ 'input-error': error }"
      :disabled="disabled"
      inputmode="numeric"
      autocomplete="off"
      enterkeyhint="next"
      @input="formatExpiryInput"
      @keydown="handleExpiryKeydown"
    />

    <!-- CVC -->
    <input
      v-else-if="type === 'cvc'"
      type="text"
      :placeholder="placeholder || 'CVC'"
      :required="required"
      :value="selectedValue"
      :class="{ 'input-error': error }"
      :disabled="disabled"
      inputmode="numeric"
      :maxlength="4"
      autocomplete="cc-csc"
      enterkeyhint="done"
      @input="formatCvcInput"
      @keydown="handleCvcKeydown"
    />

    <!-- NAME ON CARD -->
    <input
      v-else-if="type === 'cc-name'"
      type="text"
      :placeholder="placeholder || 'Name on card'"
      :required="required"
      v-model="selectedValue"
      :class="{ 'input-error': error }"
      :disabled="disabled"
      autocomplete="cc-name"
      autocapitalize="words"
      spellcheck="false"
      inputmode="text"
      enterkeyhint="next"
    />

    <!-- Text Area -->
    <textarea
      v-else-if="type === 'textarea'"
      :placeholder="placeholder"
      :required="required"
      v-model="selectedValue"
      :class="{ 'input-error': error }"
      :maxlength="maxlength"
      :disabled="disabled"
      :rows="rows"
      autocomplete="off"
      class="textarea_input"
    />

    <!-- Search Input -->
    <div class="search-input" v-else-if="type === 'search'">
      <img
        src="@/assets/icons/svgs/search-icon.svg?url"
        loading="lazy"
        class="input-icon"
        alt="search"
      />
      <input
        type="text"
        :placeholder="placeholder"
        v-model="selectedValue"
        :class="{ 'input-error': error }"
        :maxlength="maxlength"
        :disabled="disabled"
        @keyup.enter="$emit('submit', selectedValue)"
        autocomplete="off"
        name="searchQuery"
        id="searchQuery"
        autocapitalize="off"
        spellcheck="false"
      />
    </div>

    <!-- Password Input -->
    <div class="password-input" v-else-if="type === 'password'">
      <input
        :type="toggle ? 'text' : 'password'"
        :placeholder="placeholder"
        :required="required"
        v-model="selectedValue"
        :class="{ 'input-error': error }"
        :maxlength="maxlength"
        :disabled="disabled"
        @keyup.enter="$emit('submit', selectedValue)"
        autocomplete="off"
        :readonly="readonly"
      />
      <div class="show-password" @click="toggle = !toggle">
        <img
          src="@/assets/icons/svgs/eye-close-icon.svg?url"
          loading="lazy"
          alt="show-password"
          v-if="!toggle"
        />
        <img
          src="@/assets/icons/svgs/eye-open-icon.svg?url"
          loading="lazy"
          alt="hide-password"
          v-else
        />
      </div>
    </div>

    <!-- Phone Input-->
    <VueTelInput
      v-else-if="type === 'phone'"
      v-model="selectedValue"
      @input="$emit('update:modelValue', selectedValue)"
      @validate="$emit('validate', $event)"
      :enabled-country-code="true"
      :fetch-country="false"
      :defaultCountry="'SA'"
      :dropdownOptions="{
        showDialCodeInList: true,
        showDialCodeInSelection: true,
        showFlags: true,
        showSearchBox: true,
        searchBoxPlaceholder: 'Search',
      }"
      :inputOptions="{
        placeholder: placeholder,
        required: required,
        disabled: disabled,
      }"
    >
      <template v-slot:arrow-icon>
        <img
          src="@/assets/icons/svgs/chevron-down.svg?url"
          loading="lazy"
          alt="dropdown-arrow"
        />
      </template>
    </VueTelInput>

    <!-- Date Input -->
    <DatePickerInput
      v-else-if="type === 'date'"
      v-model="selectedValue"
      :class="{ 'input-error': error }"
      :placeholder="placeholder"
      v-bind="datePickerProps"
      @cleared="$emit('cleared', $event)"
      @open="$emit('open', $event)"
      @closed="$emit('closed', $event)"
    />

    <!-- Price Input -->
    <div class="price_input" v-else-if="type === 'price'" v-auto-animate>
      <input
        type="number"
        :placeholder="placeholder"
        :required="required"
        v-model.number="selectedValue"
        :class="{ 'input-error': error }"
        :maxlength="maxlength"
        :disabled="disabled"
        @keydown="preventNonNumericInput"
        @keyup.enter="$emit('submit', selectedValue)"
        autocomplete="off"
      />
      <img
        src="@/assets/svg/Saudi_Riyal_Symbol-2 (1) 1.svg?url"
        loading="lazy"
        alt="Saudi_Riyal"
      />
    </div>
    <div
      class="editable_Price_input price_input"
      v-else-if="type === 'editablePrice'"
      v-auto-animate
    >
      <img
        src="@/assets/svg/Saudi_Riyal_Symbol-2 (1) 1.svg?url"
        loading="lazy"
        alt="Saudi_Riyal"
      />
      <input
        type="text"
        :placeholder="placeholder"
        :required="required"
        v-model.number="selectedValue"
        :class="{ 'input-error': error }"
        :maxlength="maxlength"
        :disabled="!editEnabled"
        @keydown="preventNonNumericInput"
        @keyup.enter="$emit('submit', selectedValue)"
        autocomplete="off"
        ref="editablePriceInput"
      />
      <div class="edit_box_icon" v-auto-animate>
        <EditBenIcon v-if="!editEnabled" @click="openEdit" />
        <CheckIcon v-else @click="saveUpdate" />
      </div>
    </div>

    <!-- Default Text Input -->
    <input
      v-else
      :type="type"
      :placeholder="placeholder"
      :required="required"
      v-model="selectedValue"
      :class="{ 'input-error': error }"
      :maxlength="maxlength"
      :disabled="disabled"
      autocomplete="off"
      @keyup.enter="$emit('submit', selectedValue)"
      :readonly="readonly"
    />
    <!-- Error Message -->
    <span class="validation_errors" v-if="error" v-auto-animate>
      {{ error }}
    </span>
    <!-- Character Limit -->
    <span class="limit" v-if="maxlength">
      {{ $t("Characterlimit") }}: {{ modelValue?.length || 0 }} /
      {{ maxlength }}
    </span>
  </div>
</template>

<style scoped>
/* .card-input {
  position: relative;
}

.card-input input {
  padding-right: 45px;
}

.card-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.input-item {
  margin-bottom: 16px;
}

.input-item label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
  font-size: 14px;
}

.input-item input,
.input-item textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  background: white;
  box-sizing: border-box;
}

.input-item input:focus,
.input-item textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-error {
  border-color: #ef4444 !important;
}

.validation_errors {
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.limit {
  color: #6b7280;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.search-input,
.password-input {
  position: relative;
}

.search-input .input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
}

.search-input input {
  padding-left: 40px;
}

.password-input .show-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 4px;
}

.password-input .show-password img {
  width: 16px;
  height: 16px;
}

.price_input {
  position: relative;
}

.price_input input {
  padding-right: 45px;
}

.price_input img {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}

.editable_Price_input {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 12px 16px;
  background: white;
}

.editable_Price_input img {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.editable_Price_input input {
  flex: 1;
  border: none;
  padding: 0;
  background: transparent;
}

.editable_Price_input input:focus {
  outline: none;
  box-shadow: none;
  border-color: transparent;
}

.edit_box_icon {
  margin-left: 8px;
  cursor: pointer;
}

.checkbox-input {
  display: flex;
  align-items: center;
}

.textarea_input {
  resize: vertical;
  min-height: 120px;
} */
.card-input {
  position: relative;
  width: 100%;
}
.card-input img {
  display: flex;
  width: 34px;
  height: 24px;
  padding: 5px 8.227px 5px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #f2f4f7;
  background: #fff;
  position: absolute;
  top: 25%;
  right: 6px;
}

.arabic .card-input img {
  right: unset;
  left: 6px;
}
input[type="number"] {
  -webkit-appearance: none;
  margin: 0;
  -moz-appearance: textfield;
}
.checkbox-input {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex-direction: column;
  height: 100%;
}

input[type="checkbox"] {
  border-radius: 4px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  width: 16px;
  height: 16px;
  appearance: none;
  -webkit-appearance: none;
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding: 0;
}

input[type="checkbox"]:checked {
  background-color: var(--Primary-500, #007bff);
  background-image: url("../../assets/checked.svg");
  background-repeat: no-repeat;
  background-position: center;
  border: none;
}

.input-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

label {
  color: var(--Dark-800, #182230);
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
}
.english label {
  font-weight: 400;
}
.vue-tel-input,
input {
  width: 100%;
  border-radius: 4px;
  padding: 14px 18px;
  border-radius: 4px;
  border: 1px solid var(--Gray-100, #f2f4f7);
  background: var(--Base-White, #fff);

  /* Shadows/shadow-xs */
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  outline: none;
}

.vue-tel-input {
  padding: 7px 18px;
}

input::placeholder {
  color: var(--Dark-300, #b0b0b0);
  text-overflow: ellipsis;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
}
.english input::placeholder {
  font-weight: 400;
}
.validation_errors input {
  border-color: var(--error);
}

.limit {
  font-size: 14px;
  color: #475467;
  font-weight: 400;
  line-height: 20px;
}

.search-input {
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--Dark-100, #e7e7e7);
  background: var(--White, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  display: flex;
  padding: 8px 12px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
}

.validation_errors {
  color: var(--Error-500, var(--error, #f04438));
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
.textarea_input {
  padding: 12px 14px;
  border-radius: 4px;
  border: 1px solid #f2f4f7;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  width: 100%;
}
.input-icon {
  width: 24px;
  height: 24px;
  /* margin-right: 8px; */
}

.search-input input {
  border: none;
  flex: 1;
  background: transparent;
  box-shadow: none;
}

.search-input input:focus {
  outline: none;
}

[dir="rtl"] .search-input input {
  text-align: right;
  /* For RTL languages */
}

[dir="rtl"] .input-icon {
  margin-right: 0;
  margin-left: 8px;
}

.search-input input:focus::placeholder {
  opacity: 0;
  /* Hides the placeholder when the input is focused */
}

.password-input {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}

.password-input input {
  padding-right: calc(1rem + 20px + 8px);
}

.show-password {
  display: flex;
  position: absolute;
  right: 1rem;
  cursor: pointer;
}

.show-password img {
  width: 20px;
  height: 20px;
}
.input-error {
  border: 1px solid red;
}
.price_input {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  width: 100%;
}

.price_input input {
  flex-grow: 1;
}

.price_input img {
  width: 14px;
  height: 14px;
  aspect-ratio: 6/7;
  position: absolute;
  left: 8px;
}
.arabic .price_input img {
  left: unset;
  right: 8px;
}

.arabic .input-item {
  align-items: flex-start;
}
.arabic .input-item input {
  text-align: right;
}
.price_input input {
  padding-right: 30px;
}
.english .price_input input {
  padding-right: 10px;
  padding-left: 30px;
}
.english .price_input img {
  left: 10px;
  right: unset;
}
.editable_Price_input input:disabled {
  background-color: #f2f4f754;
  /* cursor: not-allowed; */
}
.edit_box_icon {
  position: absolute;
  right: 14px;
  padding: 2px;
  width: 22px;
  height: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.arabic .edit_box_icon {
  left: 14px;
  right: unset;
}
/* .edit_box_icon svg {
  width: 16px;
  height: 16px;
} */
</style>

<style>
.dp__input {
  width: 100%;
  border: unset;
  padding: 14px 18px;
}
.price_input svg path {
  stroke: #4f4f4f;
}
.arabic .vti__input {
  direction: ltr;
  text-align: right;
}
</style>
