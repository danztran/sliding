<template>
	<v-layout
		class="empty-question"
		align-center
		justify-center
		column
		fill-height>
		<img :src="require('@/assets/empty_question.svg')">
		<span
			v-t="'guest-empty-question'"
			class="body-1 grey--text mt-4" />
		<span
			v-t="'guest-let-ask'"
			class="subheading grey--text text--darken-1 font-weight-medium mt-1" />
	</v-layout>
</template>

<script>
export default {
	name: 'EmptyQuestion',
};
</script>

<style lang="css" scoped>
.empty-question {
	height: 50vh;
}
</style>
