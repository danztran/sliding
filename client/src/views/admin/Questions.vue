<template>
	<div>This is Admin Questions page</div>
</template>

<script>
export default {
	name: 'AdminQuestions',
	sockets: {
		event_questions(data) {
			console.warn(data);
		}
	},
	created() {
		this.$socket.emit('get-questions');
	}
};
</script>

<style>
</style>
