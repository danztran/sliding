<template>
	<v-card
		:class="{ deleting }"
		class="py-2 no-shadow card-reply">
		<v-layout class="px-4" row wrap>
			<v-flex
				:class="{'pl-2': isSM}"
				xs1>
				<v-avatar
					class="mt-1"
					:size="icon.lg"
					:color="isModerator
						? 'primary'
						: 'grey lighten-2'">
					<v-icon
						:size="icon.sm"
						color="white"
						v-text="'$vuetify.icons.person'" />
				</v-avatar>
			</v-flex>
			<v-flex
				:class="{'pl-2' : isXS}"
				xs11>
				<span class="body-2 text-capitalize">
					{{ replyData.user.name }}
				</span>
				<span class="body-1 mb-0">
					<span v-if="onEdit" class="v-textarea-override no-shadow">
						<text-area :field="form.editReply" />
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
							{{ countCharacterEdit }}
						</span>
						<!-- datetime -->
						<span
							v-else
							class="grey--text caption">
							{{ dateRCreated }}
						</span>
						<v-spacer />

						<template v-if="onEdit">
							<v-btn
								v-t="'btn-cancel'"
								flat
								small
								:ripple="false"
								@click="cancelEdit" />
							<v-btn
								v-t="'btn-save'"
								color="primary"
								flat
								small
								:ripple="false"
								:disabled="checkValidEdit"
								@click="saveEdit" />
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
									small
									icon
									:disabled="loadingState !== ''"
									v-on="on">
									<loading--icon-circle :state.sync="loadingState">
										<template #otp-icon>
											<v-icon
												color="grey lighten-1"
												:size="icon.xs"
												v-text="'$vuetify.icons.options_dot'" />
										</template>
									</loading--icon-circle>
								</v-btn>
							</template>

							<v-list class="py-0" dense>
								<!-- *options: edit -->
								<v-list-tile v-if="canEdit" @click="editReply">
									<v-list-tile-action>
										<v-icon v-text="'$vuetify.icons.edit'" />
									</v-list-tile-action>
									<v-list-tile-content>
										<v-list-tile-title v-t="'btn-edit'" />
									</v-list-tile-content>
								</v-list-tile>

								<!-- *options: delete -->
								<v-list-tile @click="deleteReply">
									<v-list-tile-action>
										<v-icon v-text="'$vuetify.icons.delete'" />
									</v-list-tile-action>
									<v-list-tile-content>
										<v-list-tile-title v-t="'btn-delete'" />
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
import { mapGetters } from 'vuex';
import LoadingIconCircle from '@/components/pieces/LoadingIconCircle.vue';

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
		autogrow: true,
	},
});

export default {
	name: 'ReplyCard',
	components: {
		'loading--icon-circle': LoadingIconCircle,
	},
	props: {
		replyData: {
			type: Object,
			default: () => ({
				content: '',
				id: '',
				user: {
					id: null,
					name: '',
				},
			}),
		},
	},
	data: () => ({
		icon: {
			xs: 14,
			sm: 17,
			lg: 25,
		},
		form: initForm(),
		cache: '',
		deleting: false,
		onEdit: false,
		loadingState: '',
	}),
	computed: {
		...mapGetters({
			user: 'auth/user',
			admins: 'admin/event/getAdmins',
		}),
		isModerator() {
			return this.admins
				&& this.admins.some(el => Number(el.user_id) === Number(this.replyData.user.id));
		},
		checkValidEdit() {
			const { editReply } = this.form;
			if (editReply.value && editReply.value.length > editReply.maxLength) {
				editReply.errmsg = this.$t('err-reply-limit');
				return true;
			}
			return !this._cm.notEmpty(editReply.value);
		},
		countCharacterEdit() {
			const { editReply } = this.form;
			return editReply.maxLength - editReply.value.length;
		},
		dateRCreated() {
			return this._cm.dayCreate(this.replyData.created_at);
		},
		canEdit() {
			// eslint-disable-next-line
			return this.replyData.user.id == this.user.id;
		},
	},
	methods: {
		resetForm() {
			const { editReply } = this.form;
			editReply.value = '';
			editReply.errmsg = '';
			this.cache = '';
		},
		editReply() {
			this.onEdit = true;
			this.cache = this.replyData.content;
			this.form.editReply.value = this.replyData.content;
		},
		cancelEdit() {
			this.onEdit = false;
			this.resetForm();
		},
		saveEdit() {
			this.loadingState = 'loading';
			this.onEdit = false;
			this.replyData.content = this.form.editReply.value;
			const infoREdit = {
				id: this.replyData.id,
				content: this.form.editReply.value,
			};
			const emiter = 'edit-question-reply';
			this.$socket.emit(emiter, infoREdit, ({ reply, errmsg }) => {
				if (errmsg) {
					this.replyData.content = this.cache;
					this.loadingState = 'fail';
					// ...
					return;
				}
				this.resetForm();
				this.loadingState = 'success';
				this.$emit('edit-reply', reply);
			});
		},
		deleteReply() {
			this.deleting = true;
			const infoRDelete = {
				id: this.replyData.id,
			};
			const emiter = 'delete-question-reply';
			this.$socket.emit(emiter, infoRDelete, ({ reply, errmsg }) => {
				if (errmsg) {
					this.deleting = false;
					// show notify
					return;
				}
				this.$emit('delete-reply', reply);
			});
		},
	},
};
</script>

<style lang="css" scoped>
.card-reply {
	background-color: #f2f3f5;
}
.deleting {
	opacity: .4;
	cursor: not-allowed;
}
</style>
