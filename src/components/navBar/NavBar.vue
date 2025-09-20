<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'navBar',
    data() {
        return {}
    },
    methods: {
        toggleLang() {
            const current = this.$i18n.locale
            this.$i18n.locale = current === 'en' ? 'ar' : 'en'
            // add the lang to the router path
            // this.$router.push({ path: `/${this.$i18n.locale}` })
        },
    },
    mounted() { },
});

</script>
<template>
    <nav class="container container--header">
        <div class="logo">Logo</div>

        <div class="lang_witch">
            <button @click="toggleLang">
                {{ $t('langSwitch') }}
            </button>
        </div>
    </nav>
</template>

<style scoped>
button {
    margin-top: 20px;
    padding: 10px 16px;
    font-size: 16px;
    cursor: pointer;
}
.container--header {
    padding: 0 2rem;
}
</style>