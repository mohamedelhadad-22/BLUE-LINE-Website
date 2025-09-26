<script lang="ts">
import { defineComponent } from 'vue';

const SUBMIT_TIMEOUT = 1200;

export default defineComponent({
    name: 'FeedbackModal',
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            message: '',
            isSubmitting: false,
            hasError: false,
            isSuccess: false,
            timeoutId: null as number | null,
        };
    },
    computed: {
        isOpen(): boolean {
            return this.modelValue;
        },
        dialogId(): string {
            return 'feedback-dialog';
        },
        isArabic(): boolean {
            return this.$i18n.locale.startsWith('ar');
        },
    },
    watch: {
        modelValue(newValue: boolean) {
            if (newValue) {
                this.$nextTick(() => {
                    this.focusTextarea();
                });
            } else {
                this.resetState();
            }
        },
    },
    methods: {
        close() {
            if (this.isSubmitting) {
                return;
            }
            this.$emit('update:modelValue', false);
        },
        submit() {
            if (!this.message.trim()) {
                this.hasError = true;
                return;
            }

            this.hasError = false;
            this.isSubmitting = true;

            this.timeoutId = window.setTimeout(() => {
                this.isSubmitting = false;
                this.isSuccess = true;
                this.message = '';
                window.setTimeout(() => {
                    this.close();
                    this.isSuccess = false;
                }, 1400);
            }, SUBMIT_TIMEOUT);
        },
        focusTextarea() {
            const textarea = this.$refs.textarea as HTMLTextAreaElement | undefined;
            textarea?.focus();
        },
        resetState() {
            this.message = '';
            this.isSubmitting = false;
            this.hasError = false;
            this.isSuccess = false;
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = null;
            }
        },
    },
    beforeUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    },
});
</script>

<template>
    <teleport to="body">
        <transition name="feedback-fade">
            <div
                v-if="isOpen"
                class="feedback-backdrop"
                role="presentation"
                @click.self="close"
            >
                <div
                    class="feedback-modal"
                    role="dialog"
                    :aria-modal="true"
                    :aria-labelledby="`${dialogId}-title`"
                    :dir="isArabic ? 'rtl' : 'ltr'"
                >
                    <button class="feedback-close" type="button" @click="close" aria-label="Close">
                        ✕
                    </button>

                    <h2 class="feedback-title" :id="`${dialogId}-title`">
                        {{ $t('footer.modal.title') }}
                    </h2>

                    <textarea
                        ref="textarea"
                        v-model="message"
                        class="feedback-textarea"
                        :placeholder="$t('footer.modal.placeholder') as string"
                        :disabled="isSubmitting || isSuccess"
                    ></textarea>

                    <p v-if="hasError" class="feedback-error">
                        {{ $t('footer.modal.error') }}
                    </p>

                    <p v-if="isSuccess" class="feedback-success">
                        {{ $t('footer.modal.success') }}
                    </p>

                    <button
                        class="feedback-submit"
                        type="button"
                        @click="submit"
                        :disabled="isSubmitting || isSuccess"
                    >
                        <span v-if="isSubmitting" class="spinner" aria-hidden="true"></span>
                        {{ $t('footer.modal.submit') }}
                    </button>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<style scoped>
.feedback-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(6, 44, 45, 0.75);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1200;
    padding: 1.5rem;
}

.feedback-modal {
    position: relative;
    width: min(540px, 100%);
    padding: clamp(2rem, 4vw, 2.75rem);
    border-radius: 18px;
    background: #062c2d;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

.feedback-close {
    position: absolute;
    top: 1rem;
    inset-inline-end: 1rem;
    background: transparent;
    border: none;
    color: #7ffd63;
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.feedback-close:hover,
.feedback-close:focus-visible {
    transform: scale(1.1);
}

.feedback-title {
    margin: 0;
    font-size: clamp(1.45rem, 2vw, 1.75rem);
    font-weight: 600;
    text-align: center;
    color: #f5f9fb;
}

.feedback-textarea {
    min-height: 160px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    padding: 1rem 1.25rem;
    font-size: 1rem;
    color: #0b2a32;
    background: #ffffff;
    resize: vertical;
    outline: none;
    transition: border-color 0.2s ease;
}

.feedback-textarea:focus-visible {
    border-color: #7ffd63;
    box-shadow: 0 0 0 2px rgba(127, 253, 99, 0.25);
}

.feedback-error {
    margin: 0;
    color: #ff9f8a;
    font-size: 0.9rem;
    text-align: center;
}

.feedback-success {
    margin: 0;
    color: #7ffd63;
    font-size: 0.95rem;
    text-align: center;
}

.feedback-submit {
    border: none;
    border-radius: 9px;
    background: linear-gradient(135deg, #7eff5d, #42d882);
    color: #052a1a;
    font-weight: 600;
    font-size: 1rem;
    padding: 0.9rem;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.feedback-submit:hover,
.feedback-submit:focus-visible {
    transform: translateY(-1px);
    box-shadow: 0 16px 32px rgba(66, 216, 130, 0.3);
}

.feedback-submit:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    box-shadow: none;
}

.spinner {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(5, 42, 26, 0.5);
    border-top-color: #052a1a;
    border-radius: 50%;
    margin-inline-end: 0.5rem;
    animation: spin 0.7s linear infinite;
}

.feedback-fade-enter-active,
.feedback-fade-leave-active {
    transition: opacity 0.2s ease;
}

.feedback-fade-enter-from,
.feedback-fade-leave-to {
    opacity: 0;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 480px) {
    .feedback-modal {
        padding: 1.75rem;
    }
}
</style>
