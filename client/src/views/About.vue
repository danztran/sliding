<template>
	<div class="about">
		<h1>This is an about welcome page</h1>
		<h2 v-t="'welcome'"></h2>
		<button @click="changeLocale">Change Language</button>
	</div>
</template>

<script>
import { loadLanguageAsync } from '@/modules/vue-i18n-setup';

export default {
	data() {
		return {
			locale: ''
		};
	},
	methods: {
		changeLocale() {
			loadLanguageAsync(this.$i18n.locale === 'en' ? 'vi' : 'en');
			this.locale = this.$i18n.locale;
		}
	}
};
</script>
