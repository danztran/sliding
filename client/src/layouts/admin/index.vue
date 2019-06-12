<template>
	<div id="admin-layout">
		<v-app>
			<navbar />
			<drawer />
			<v-content class="my-3" v-if="ready">
				<v-slide-y-transition mode="out-in">
					<keep-alive>
						<router-view />
					</keep-alive>
				</v-slide-y-transition>
			</v-content>
			<event-dialog />
			<reply-question-dialog />
		</v-app>
	</div>
</template>

<script>
import NavBar from './NavBar.vue';
import Drawer from './Drawer.vue';
import EventDialog from '@/components/dials/EventDialog.vue';
import ReplyQuestionDialog from '@/components/dials/ReplyQuestion.vue';

export default {
	name: 'AdminLayout',
	data: () => ({
		ready: false
	}),
	components: {
		navbar: NavBar,
		drawer: Drawer,
		'event-dialog': EventDialog,
		'reply-question-dialog': ReplyQuestionDialog
	},
	sockets: {
		connect() {
			console.warn('connected');
		},
		event_data(data) {
			console.warn(data);
			this.$store.dispatch('admin/getCurrentEvent', data);
			this.ready = true;
		}
	},
	beforeRouteLeave(to, from, next) {
		this.$socket.emit('leave-event');
		next();
	},
	beforeCreate() {
		this.$root.$emit('show-loading-overlay');
	},
	mounted() {
		this.$socket.connect();
		this.$socket.emit('join-event', this.$route.params.code);
	}
};
</script>

<style lang="scss">
#admin-layout {
	.w-100 {
		width: 100%;
	}
	.v-content {
		margin: 5px 0 !important;
	}
	.v-content,
	.v-toolbar__content,
	.v-toolbar__extension  {
		padding: 0 20% !important;
	}
	@media only screen and (max-width: 1280px) {
		.v-content,
		.v-toolbar__content,
		.v-toolbar__extension  {
			padding: 0 10% !important;
		}
	}
	@media only screen and (max-width: 960px) {
		.v-content,
		.v-toolbar__content,
		.v-toolbar__extension  {
			padding: 0 10px !important;
		}
	}
}
</style>
