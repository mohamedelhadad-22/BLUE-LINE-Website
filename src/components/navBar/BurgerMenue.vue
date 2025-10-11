<template>
    <!-- Backdrop -->
    <teleport to="body">
        <transition name="fade">
            <div v-if="modelValue" class="mm-backdrop" @click="close" />
        </transition>

        <!-- Panel -->
        <transition name="slide-down">
            <nav v-if="modelValue" ref="panel" class="mm-panel" role="dialog" aria-modal="true" aria-label="Main menu"
                @keydown.esc.prevent.stop="close" @keydown.tab="handleTab">

                <div class="mm-header">
                    <h2 class="sr-only">Menu</h2>
                    <button class="mm-close" @click="close" aria-label="Close menu">×</button>
                </div>

                <div class="mm-grid" :class="[{ rtl: isRtl }]">
                    <section v-for="(group, gi) in groups" :key="gi" class="mm-col">
                        <h3 class="mm-col-title">{{ group.title }}</h3>
                        <ul class="mm-links">
                            <li v-for="(item, ii) in group.items" :key="ii">
                                <RouterLink v-if="item.to && !item.external" :to="item.to" class="mm-link"
                                    @click="onNavigate(item)" ref="focusable">
                                    <span>{{ item.label }}</span>
                                    <svg v-if="item.chevron" width="18" height="18" viewBox="0 0 24 24"
                                        aria-hidden="true">
                                        <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" />
                                    </svg>
                                </RouterLink>
                                <a v-else :href="item.href || '#'" class="mm-link"
                                    :target="item.external ? '_blank' : undefined"
                                    :rel="item.external ? 'noopener noreferrer' : undefined" @click="onNavigate(item)"
                                    ref="focusable">
                                    <span>{{ item.label }}</span>
                                    <svg v-if="item.chevron" width="18" height="18" viewBox="0 0 24 24"
                                        aria-hidden="true">
                                        <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" />
                                    </svg>
                                </a>
                            </li>
                        </ul>

                        <div v-if="group.extras || (group.social && group.social.length)" class="mm-extras">
                            <template v-for="(extra, ei) in group.extras || []" :key="ei">
                                <RouterLink v-if="extra.to && !extra.external" class="mm-extra" :to="extra.to"
                                    @click="onNavigate(extra)" ref="focusable">
                                    <span>{{ extra.label }}</span>
                                    <svg v-if="extra.chevron" width="18" height="18" viewBox="0 0 24 24">
                                        <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" />
                                    </svg>
                                </RouterLink>
                                <a v-else-if="extra.href" class="mm-extra" :href="extra.href"
                                    :target="extra.external ? '_blank' : undefined"
                                    :rel="extra.external ? 'noopener noreferrer' : undefined" @click="onNavigate(extra)"
                                    ref="focusable">
                                    <span>{{ extra.label }}</span>
                                    <svg v-if="extra.chevron" width="18" height="18" viewBox="0 0 24 24">
                                        <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" />
                                    </svg>
                                </a>
                            </template>
                            <div v-if="group.social && group.social.length" class="mm-social">
                                <span>Follow us</span>
                                <a v-for="(s, si) in group.social" :key="si" class="mm-social-icon"
                                    :href="s.href || '#'" @click="onNavigate(s)" aria-label="social link">
                                    <!-- Replace with real icons as needed -->
                                    <span>{{ s.iconText || '•' }}</span>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </nav>
        </transition>
    </teleport>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { RouterLink } from 'vue-router';

type LinkItem = {
    label: string;
    href?: string;
    to?: string;
    external?: boolean;
    chevron?: boolean;
};

type SocialItem = {
    href?: string;
    iconText?: string; // placeholder (swap with svg component if you like)
};

type Group = {
    title: string;
    items: LinkItem[];
    extras?: LinkItem[];
    social?: SocialItem[];
};

export default defineComponent({
    name: 'MegaMenu',
    components: {
        RouterLink,
    },
    props: {
        modelValue: { type: Boolean, required: true },
        groups: { type: Array as PropType<Group[]>, required: true },
        lang: { type: String as PropType<'en' | 'ar'>, default: 'en' }
    },
    emits: ['update:modelValue', 'navigate'],
    data() {
        return {
            focusables: [] as HTMLElement[]
        };
    },
    computed: {
        isRtl(): boolean {
            return this.lang === 'ar';
        }
    },
    watch: {
        modelValue(v: boolean) {
            // lock body scroll
            (document.documentElement.style as any).overflow = v ? 'hidden' : '';
            if (v) this.$nextTick(this.trapFocus);
        }
    },
    mounted() {
        document.addEventListener('click', this.onDocClick);
    },
    unmounted() {
        document.removeEventListener('click', this.onDocClick);
        (document.documentElement.style as any).overflow = '';
    },
    methods: {
        close() {
            this.$emit('update:modelValue', false);
        },
        onNavigate(_item: LinkItem) {
            // If you need smooth-scroll for hash links, enable the block below:
            // if (_item.href?.startsWith('#')) {
            //   const el = document.querySelector<HTMLElement>(_item.href);
            //   if (el) el.scrollIntoView({ behavior: 'smooth' });
            // }
            this.close();
            this.$emit('navigate');
        },
        trapFocus() {
            const panel = this.$refs.panel as HTMLElement | undefined;
            if (!panel) return;
            this.focusables = Array.from(panel.querySelectorAll<HTMLElement>('a, button'))
                .filter(el => !el.hasAttribute('disabled'));
            this.focusables[0]?.focus();
        },
        handleTab(e: KeyboardEvent) {
            if (!this.focusables.length) {
                return;
            }
            const first = this.focusables[0];
            const last = this.focusables[this.focusables.length - 1];
            if (!first || !last) {
                return;
            }
            const active = document.activeElement as HTMLElement | null;
            const backwards = e.shiftKey;
            if (!backwards && active === last) {
                e.preventDefault();
                first.focus();
            } else if (backwards && active === first) {
                e.preventDefault();
                last.focus();
            }
        },
        onDocClick(e: MouseEvent) {
            if (!this.modelValue) return;
            const panel = this.$refs.panel as HTMLElement | undefined;
            const target = e.target as HTMLElement;

            // ignore clicks on the toggle button or its children
            if (target.closest('[data-mega-toggle]')) return;

            if (panel && !panel.contains(target)) this.close();
        }

    }
});
</script>

<style scoped>
/* Backdrop */
.mm-backdrop {
    position: fixed;
    top: 72px;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .25);
    z-index: 999;
}
/* Panel */
.mm-panel {
    position: fixed;
    left: 0;
    right: 0;
    top: 72px;
    background: rgba(255, 255, 255, .98);
    box-shadow: 0 8px 24px rgba(0, 0, 0, .08);
    z-index: 1000;
    padding: 24px 20px 32px;
    max-height: calc(100vh - 72px);
    overflow-y: auto;
}

/* Header (close) */
.mm-header {
    display: flex;
    justify-content: flex-end;
}

.mm-close {
    background: transparent;
    border: 0;
    font-size: 28px;
    line-height: 1;
    cursor: pointer;
}

/* Grid like screenshot */
.mm-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 8px 12px 12px;
    border-top: 1px solid #d9e7e2;
}

.mm-grid.rtl {
    direction: rtl;
}

.mm-col {
    padding-inline: 8px;
    position: relative;
}

.mm-col+.mm-col::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    inset-inline-start: -16px;
    width: 1px;
    background: #d9e7e2;
}

.mm-col-title {
    font-size: 18px;
    font-weight: 600;
    color: #0a3b33;
    margin: 8px 0 12px;
}

.mm-links {
    list-style: none;
    margin: 0;
    padding: 0;
}

.mm-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    color: #0d3a34;
    text-decoration: none;
    font-size: 15px;
}

.mm-link:hover {
    text-decoration: underline;
}

/* Extras (e-commerce + social) */
.mm-extras {
    margin-top: 12px;
    display: grid;
    gap: 10px;
}

.mm-extra {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    text-decoration: none;
    color: #0d3a34;
    font-weight: 500;
}

.mm-social {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
    color: #6b7b76;
}

.mm-social-icon {
    display: inline-flex;
}

/* Responsive */
@media (max-width: 960px) {
    .mm-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .mm-col+.mm-col::before {
        display: none;
    }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
    transition: transform .28s ease, opacity .28s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
    transform: translateY(-16px);
    opacity: 0;
}

/* a11y helper */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}
</style>




