<template>
	<div> Event Live page </div>
</template>

<script>
export default {
	name: 'AdminLayout',
	data: () => ({
		eventData: {}
	}),
	sockets: {
		connect() {
			console.warn('connected');
		},
		event_data(data) {
			console.warn(data);
		}
	},
	mounted() {
		this.$socket.connect();
		this.$socket.emit('join-event', this.$route.params.code);
	}
};
</script>
