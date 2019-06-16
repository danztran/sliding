<template>
	<v-card class="ml-5 no-shadow card-question">
		<v-list subheader class="py-1">
			<v-list-tile>
				<!-- @desc: avatar -->
				<v-list-tile-avatar
					class="pl-2"
					:size="icon.lg"
					color="grey lighten-2">
					<v-icon
						:size="icon.sm"
						color="white"
						v-html="'$vuetify.icons.person'">
					</v-icon>
				</v-list-tile-avatar>

				<v-list-tile-content>
					<span class="body-2">
						{{ replyData.user.name }}
					</span>
					<span class="body-1 grey--text font-weight-light">
						• Date time
					</span>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>

		<v-card-title class="py-0 px-4">
			<p class="body-1 mb-0">
				{{ replyData.content }}
			</p>
		</v-card-title>

		<v-card-actions class="py-0">
			<v-list-tile class="grow">
				<!-- *reply -->
				<v-layout
					align-center
					justify-end>

					<!-- *options button -->
					<v-menu bottom nudge-bottom offset-y left>
						<template v-slot:activator="{ on }">
							<v-btn
								v-on="on"
								class="ma-0"
								icon>
								<v-icon
									color="grey lighten-1"
									:size="icon.sm"
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
				</v-layout>
			</v-list-tile>
		</v-card-actions>
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
	methods: {
		editReply() {},
		deleteReply() {}
	}
};
</script>
