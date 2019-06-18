<template>
	<v-card class="py-2 no-shadow card-reply">
		<v-layout class="px-4" row wrap>
			<v-flex
				:class="{'pl-2': isSM}"
				xs1>
				<v-avatar :size="icon.lg" color="grey lighten-2">
					<v-icon
						:size="icon.sm"
						color="white"
						v-html="'$vuetify.icons.person'">
					</v-icon>
				</v-avatar>
			</v-flex>
			<v-flex
				:class="{'pl-2' : isXS}"
				xs11>
				<span class="body-2">
					{{ replyData.user.name }}
				</span>
				<span class="body-1 mb-0">
					<pre class="d-inline" v-text="replyData.content" />
					<v-card-actions class="pa-0">
						<!-- datetime -->
						<span class="grey--text caption">
							Date time
						</span>
						<v-spacer></v-spacer>

						<!-- *options: edit/delete -->
						<v-menu
							bottom
							nudge-bottom
							offset-y left>
							<template v-slot:activator="{ on }">
								<v-btn
									class="mr-1"
									v-on="on"
									small
									icon>
									<v-icon
										color="grey lighten-1"
										:size="icon.xs"
										v-html="'$vuetify.icons.options_dot'">
									</v-icon>
								</v-btn>
							</template>

							<v-list class="py-0" dense>
								<!-- *options: edit -->
								<v-list-tile @click="editReply">
									<v-list-tile-action>
										<v-icon v-html="'$vuetify.icons.edit'" />
									</v-list-tile-action>
									<v-list-tile-content>
										<v-list-tile-title v-t="'btn-edit'"></v-list-tile-title>
									</v-list-tile-content>
								</v-list-tile>

								<!-- *options: delete -->
								<v-list-tile @click="deleteReply">
									<v-list-tile-action>
										<v-icon v-html="'$vuetify.icons.delete'"></v-icon>
									</v-list-tile-action>
									<v-list-tile-content>
										<v-list-tile-title v-t="'btn-delete'"></v-list-tile-title>
									</v-list-tile-content>
								</v-list-tile>
							</v-list>
						</v-menu>
					</v-card-actions>
				</span>
			</v-flex>
		</v-layout>
	</v-card>
</template>

<script>
export default {
	name: 'ReplyCard',
	props: {
		replyData: {
			type: Object,
			default: () => ({
				content: '',
				id: '',
				user: {
					id: null,
					name: ''
				}
			})
		}
	},
	data: () => ({
		icon: {
			xs: 14,
			sm: 17,
			lg: 25
		}
	}),
	computed: {
		isXS() {
			return this.$vuetify.breakpoint.xs;
		},
		isSM() {
			return this.$vuetify.breakpoint.sm;
		}
	},
	methods: {
		editReply() {},
		deleteReply() {
			const infoReply = {
				id: this.replyData.id
			};
			this.$socket.emit('delete-question-reply', infoReply, ({ reply, errmsg }) => {
				if (errmsg) {
					// show notify
					return;
				}
				console.warn(reply);
				this.$root.$emit('delete-reply', reply);
			});
		}
	}
};
</script>

<style lang="css" scoped>
	.card-reply {
		background-color: #f2f3f5;
	}
</style>
