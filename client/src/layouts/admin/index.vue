<template>
	<div id="admin-layout" class="v-toobar-override">
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
import DashboardEventDialog from '@/components/dashboard/DashboardEventDialog.vue';
import ReplyQuestionDialog from '@/components/questions/QuestionReplyDialog.vue';

export default {
	name: 'AdminLayout',
	data: () => ({
		ready: false
	}),
	components: {
		navbar: NavBar,
		drawer: Drawer,
		'event-dialog': DashboardEventDialog,
		'reply-question-dialog': ReplyQuestionDialog
	},
	beforeCreate() {
		this.$root.$emit('show-loading-overlay');
		this.$socket.connect();
		this.$socket.emit('join-event', this.$route.params.code);
	},
	beforeRouteLeave(to, from, next) {
		this.$socket.emit('leave-event');
		this.$store.commit('admin/event/RESET');
		this.$store.commit('admin/questions/RESET');
		next();
	},
	sockets: {
		connect() {
			// console.warn('connected');
		},
		get_event(data) {
			// console.warn(data);
			this.$store.dispatch('admin/event/getCurrentEvent', data);
			this.ready = true;
		},
		new_added_question_reply(result) {
			console.warn(result);
		},
		new_edited_question_reply() {},
		new_deleted_question_reply(result) {
			console.warn(result);
		}
	}
};
</script>

<style lang="scss">
#admin-layout {

}
</style>
