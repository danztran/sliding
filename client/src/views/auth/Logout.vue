<template>
	<div id="logout-page">
		<bouncy-loader />
	</div>
</template>
<script>
export default {
	name: 'Logout',
	beforeCreate() {
		this.$axios.get(this.$api.auth.logout)
			.then((res) => {
				this.$store.dispatch('auth/logout', res.data);
				this.$socket.emit('update-authen');
			});
	},
};
</script>
<style lang="scss">
#logout-page {
	height: 450px;
	margin: auto;
}
</style>
