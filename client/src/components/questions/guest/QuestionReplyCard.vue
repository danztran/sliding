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
					:size="icon.lg"
					class="mt-1"
					color="primary">
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
				<span class="mb-0 right">
					<!-- datetime -->
					<span class="grey--text caption">
						{{ dateRCreated }}
					</span>
				</span>
				<v-card-actions class="pa-0">
					<pre
						class="d-inline word-break body-1"
						v-text="replyData.content" />
				</v-card-actions>
			</v-flex>
		</v-layout>
	</v-card>
</template>

<script>
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
		dateRCreated() {
			return this._cm.dayCreate(this.replyData.created_at);
		}
	}
};
</script>

<style lang="css" scoped>
.card-reply {
	background-color: #f3f3f5;
}
</style>
