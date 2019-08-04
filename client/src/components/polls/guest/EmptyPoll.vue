<template>
	<v-layout
		id="empty-polls"
		align-center
		justify-center
		column
		fill-height>
		<img :src="require('@/assets/empty_poll.svg')">
		<span
			v-t="'poll-empty-title'"
			class="body-1 grey--text mt-4" />
	</v-layout>
</template>

<script>
export default {
	name: 'EmptyQuestion',
};
</script>

<style lang="css" scoped>
#empty-polls {
	height: 50vh;
}
</style>
