<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "InputField",
  props: {
    type: { type: String, default: "text" },
    label: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    modelValue: { type: [String, Number], default: "" },
    required: { type: Boolean, default: false },
    maxlength: Number,
    rows: { type: Number, default: 4 },
    error: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    autocomplete: { type: String, default: "off" },
    autofocus: { type: Boolean, default: false },
  },
  emits: ["update:modelValue", "submit"],
  setup(props, { emit }) {
    const internal = ref<string | number>(
      (props.modelValue as string | number) ?? ""
    );
    const showPassword = ref(false);

    watch(
      () => props.modelValue,
      (value) => {
        internal.value = (value as string | number) ?? "";
      }
    );

    const inputType = computed(() => {
      if (props.type !== "password") {
        return props.type || "text";
      }
      return showPassword.value ? "text" : "password";
    });

    const textValue = computed(() => {
      const value = internal.value;
      return value === null || value === undefined ? "" : String(value);
    });

    const characterCount = computed(() => textValue.value.length);

    const updateValue = (value: string) => {
      let next: string | number = value;
      if (props.type === "number") {
        const parsed = value === "" ? "" : Number(value);
        next = Number.isNaN(parsed) ? "" : parsed;
      }
      internal.value = next;
      emit("update:modelValue", next);
    };

    const onKeyup = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        emit("submit", internal.value);
      }
    };

    return {
      internal,
      showPassword,
      inputType,
      textValue,
      characterCount,
      updateValue,
      onKeyup,
    };
  },
});
</script>

<template>
  <div class="input-field">
    <label v-if="label" class="input-label">
      {{ label }}<span v-if="required" aria-hidden="true">*</span>
    </label>

    <div v-if="type === 'textarea'" class="input-wrapper">
      <textarea
        :value="textValue"
        :placeholder="placeholder"
        :required="required"
        :maxlength="maxlength"
        :rows="rows"
        :disabled="disabled"
        :readonly="readonly"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        @input="updateValue(($event.target as HTMLTextAreaElement).value)"
        @keyup="onKeyup"
      ></textarea>
    </div>

    <div v-else class="input-wrapper" :class="{ 'is-password': type === 'password' }">
      <input
        :type="inputType"
        :value="textValue"
        :placeholder="placeholder"
        :required="required"
        :maxlength="maxlength"
        :disabled="disabled"
        :readonly="readonly"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        @input="updateValue(($event.target as HTMLInputElement).value)"
        @keyup="onKeyup"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="toggle-password"
        @click="showPassword = !showPassword"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
      >
        {{ showPassword ? 'Hide' : 'Show' }}
      </button>
    </div>

    <span v-if="error" class="validation-error">{{ error }}</span>
    <span v-if="maxlength" class="char-limit">
      {{ characterCount }} / {{ maxlength }}
    </span>
  </div>
</template>

<style scoped>
.input-field {
  display: grid;
  gap: 0.5rem;
}

.input-label {
  font-weight: 600;
  color: #111827;
  font-size: 0.95rem;
}

.input-wrapper {
  position: relative;
}

input,
textarea {
  width: 100%;
  font: inherit;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: #fff;
  color: #111827;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

input[disabled],
textarea[disabled] {
  background: #f3f4f6;
  color: #6b7280;
  cursor: not-allowed;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  border: none;
  background: none;
  color: #2563eb;
  font-size: 0.85rem;
  cursor: pointer;
}

.validation-error {
  color: #dc2626;
  font-size: 0.8rem;
}

.char-limit {
  color: #6b7280;
  font-size: 0.75rem;
  justify-self: end;
}
</style>
