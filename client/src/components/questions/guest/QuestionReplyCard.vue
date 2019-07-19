<template>
	<v-card class="py-2 no-shadow card-reply">
		<v-layout
			class="px-4"
			row
			wrap>
			<v-flex
				:class="{'pl-2': isSM}"
				xs1>
				<v-avatar
					:color="isModerator
						? 'primary'
						: 'grey lighten-2'"
					:size="icon.lg"
					class="mt-1">
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
					<pre
						class="d-inline word-break"
						v-text="replyData.content" />
					<v-card-actions class="pa-0">
						<span
							class="grey--text caption">
							{{ dateRCreated }}
						</span>
					</v-card-actions>
				</span>
			</v-flex>
		</v-layout>
	</v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'QuestionReplyCard',
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
	}),
	computed: {
		...mapGetters({
			admins: 'guest/event/getAdmins',
		}),
		dateRCreated() {
			return this._cm.dayCreate(this.replyData.created_at);
		},
		isModerator() {
			return this._cm.notEmpty(this.admins)
				? this.admins.some(el => Number(el.user_id) === Number(this.replyData.user.id))
				: [];
		},
	},
};
</script>

<style lang="css" scoped>
.card-reply {
	background-color: #f3f3f5;
}
</style>
