<template>
	<div id="home-page">
		<h1>This is Home page</h1>
		<router-link :to="{ name: 'login' }">
			<h2 v-t="'loginFormTitle'" />
		</router-link>
	</div>
</template>
<style scoped>
#home-page {
	text-align: center;
	margin-top: 10%;
}
</style>
<script>
export default {
};
</script>
