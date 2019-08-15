<template>
	<v-container grid-list-xl>
		<div class="font-weight-bold display-3 primary--text">
			#sliding
		</div>
		<v-layout
			id="not-found-page"
			row
			wrap
			align-center>
			<v-flex xs12 md7 order-md2>
				<v-img
					aspect-ratio="1.7"
					contain
					:src="require('@/assets/not_found.svg')" />
			</v-flex>
			<v-flex
				class="text-md-left text-xs-center"
				xs12
				md5
				mt-3
				order-md1>
				<div class="headline font-weight-bold primary--text">
					404
				</div>
				<div
					v-t="'err-not-found'"
					class="title font-weight-light first-letter-uppercase" />
				<v-btn class="mt-3 mx-0" color="primary" @click="backToHome">
					<v-icon small color="white" v-text="'$vuetify.icons.arrow_back'" />
					&nbsp;
					<span v-t="'btn-back-home'" />
				</v-btn>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<style lang="css" scoped>
#not-found-page {
	margin-top: 15vh;
}
</style>

<script>
export default {
	name: 'PageNotFound',
	methods: {
		backToHome() {
			this.$router.push({ name: 'home' });
		},
	},
};
</script>
