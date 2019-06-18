<template>
	<v-card
		:class="{'delete': deleting}"
		class="py-2 no-shadow card-reply">
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
					<span class="v-textarea-override no-shadow" v-if="onEdit">
						<text-area :field="form.editReply"/>
					</span>

					<pre
						v-else
						class="d-inline word-break"
						v-text="replyData.content" />
					<v-card-actions class="pa-0">
						<!-- count reply character -->
						<span
							v-if="onEdit"
							class="grey--text caption">
							{{ form.editReply.value.length }}
						</span>
						<!-- datetime -->
						<span
							v-else
							class="grey--text caption">
							Date time
						</span>
						<v-spacer></v-spacer>

						<template v-if="onEdit">
							<v-btn
								flat
								small
								:ripple=false
								v-t="'btn-cancel'"
								@click="cancelEdit">
							</v-btn>
							<v-btn
								color="primary"
								flat
								small
								:ripple=false
								v-t="'btn-save'"
								:disabled="checkValidEdit"
								@click="saveEdit">
							</v-btn>
						</template>
						<!-- *options: edit/delete -->
						<v-menu
							v-else
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
const initForm = () => ({
	editReply: {
		label: '',
		value: '',
		errmsg: '',
		autofocus: true,
		rows: 2,
		solo: true,
		outline: true,
		maxLength: 1000,
		required: true,
		autogrow: true
	}
});

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
		},
		form: initForm(),
		deleting: false,
		onEdit: false
	}),
	computed: {
		isXS() {
			return this.$vuetify.breakpoint.xs;
		},
		isSM() {
			return this.$vuetify.breakpoint.sm;
		},
		checkValidEdit() {
			const { editReply } = this.form;
			if (editReply.value && editReply.value.length > editReply.maxLength) {
				editReply.errmsg = this.$t('err-reply-limit');
				return true;
			}
			return !this._cm.notEmpty(editReply.value);
		}
	},
	methods: {
		resetForm() {
			const { editReply } = this.form;
			editReply.value = '';
			editReply.errmsg = '';
		},
		editReply() {
			this.onEdit = true;
			this.form.editReply.value = this.replyData.content;
		},
		cancelEdit() {
			this.onEdit = false;
			this.resetForm();
		},
		saveEdit() {
			this.onEdit = false;
			const infoREdit = {
				id: this.replyData.id,
				content: this.form.editReply.value
			};
			const emiter = 'edit-question-reply';
			this.$socket.emit(emiter, infoREdit, ({ reply, errmsg }) => {
				if (errmsg) {
					// ...
					return;
				}
				console.warn(reply);
				// this.$root.$emit('edit-reply', reply);
			});
		},
		deleteReply() {
			this.deleting = true;
			const infoRDelete = {
				id: this.replyData.id
			};
			const emiter = 'delete-question-reply';
			this.$socket.emit(emiter, infoRDelete, ({ reply, errmsg }) => {
				if (errmsg) {
					this.deleting = false;
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
	.delete {
		opacity: .4;
		cursor: not-allowed;
	}
</style>
