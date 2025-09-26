<script lang="ts">
import { defineComponent } from 'vue';
import FooterPageLayout from '@/components/common/FooterPageLayout.vue';

export default defineComponent({
    name: 'SuggestionsView',
    components: { FooterPageLayout },
    methods: {
        openFooterFeedback() {
            const footerButton = document.querySelector('.footer-feedback__cta');
            if (footerButton instanceof HTMLElement) {
                footerButton.dispatchEvent(new Event('click', { bubbles: true }));
            }
        },
    },
});
</script>

<template>
    <FooterPageLayout page-key="suggestions" @open-feedback="openFooterFeedback" />
</template>
