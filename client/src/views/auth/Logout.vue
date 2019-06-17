<template>
	<div id="logout-page" />
</template>
<script>
export default {
	name: 'Logout',
	beforeCreate() {
		this.$root.$emit('show-loading-overlay');
		this.$axios.get(this.$api.auth.logout)
			.then((res) => {
				this.$store.dispatch('auth/logout', res.data);
			});
	}
};
</script>
