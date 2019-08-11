<template>
	<v-content id="search-page">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<navbar />
		<v-container
			fluid
			fill-height>
			<v-layout align-center column fill-height>
				<div class="search-wrapper">
					<transition name="page" mode="out-in">
						<router-view />
					</transition>
				</div>
			</v-layout>
		</v-container>
	</v-content>
</template>

<script>
import NavBar from './NavBar.vue';

export default {
	components: {
		navbar: NavBar,
	},
	created() {
		this.$root.$emit('hide-loading-overlay');
	},
};
</script>

<style lang="scss">
$backgroundImg: url(~@/assets/search_bg.svg);
#search-page {
	background-color: #fbfbfb;
	background-image: $backgroundImg;
	background-position: top;
	background-size: cover;
	background-attachment: fixed;

	max-height: 100vh;
	overflow: hidden;
	.search-wrapper {
		margin-top: 20vh;
		width: 400px;
	}
	.page-enter-active, .page-leave-active {
		transition: all .5s ease-out;
	}
	.page-enter, .page-leave-to {
		transform: translateY(-15px);
		opacity: 0;
	}
	@media only screen and (max-width: 600px) {
		.search-wrapper {
			padding: 0 20px;
		}
	}
}
</style>
