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
					<router-view />
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
		margin-top: 35vh;
		width: 400px;
	}
}
</style>
