<!--
	@desc: question review card for Moderator mode
-->
<template>
	<v-hover>
		<v-card class="no-shadow card-question" slot-scope="{ hover }">
			<v-list subheader class="py-1">
				<v-list-tile>
					<!--
						@desc: avatar
					-->
					<v-list-tile-avatar class="pl-2" :size="icon.lg" color="grey lighten-2">
						<v-icon :size="icon.sm" color="white" v-html="'$vuetify.icons.person'"></v-icon>
					</v-list-tile-avatar>

					<!--
						@desc: info user post question
						@contains: username, time post
					-->
					<v-list-tile-content>
						<span class="body-2">
							{{ question.user.name }}
						</span>
						<span class="body-1 grey--text font-weight-light">
							<v-icon :size="icon.xs" v-html="'$vuetify.icons.like'"/>
							• Date time
						</span>
					</v-list-tile-content>

					<!--
						@desc: actions mark start, approve/dismiss question
					-->
					<v-list-tile-action v-if="hover">
						<v-list-tile>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn
										icon
										v-on="on"
										@click="markStar">
										<v-icon
											color="grey lighten-1"
											:size="icon.sm"
											v-html="'$vuetify.icons.star_border'">
										</v-icon>
									</v-btn>
								</template>
								<span v-t="'btn-not-star-question'"></span>
							</v-tooltip>

							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn
										class="mx-1"
										flat
										icon v-on="on"
										color="success"
										@click="approve">
										<v-icon
											color="success"
											:size="icon.lg"
											v-html="'$vuetify.icons.approve'">
										</v-icon>
									</v-btn>
								</template>
								<span v-t="'btn-approve-question'"></span>
							</v-tooltip>

							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn
										flat
										icon v-on="on"
										color="red"
										@click="dismiss">
										<v-icon
											color="red"
											:size="icon.lg"
											v-html="'$vuetify.icons.dismiss'">
										</v-icon>
									</v-btn>
								</template>
								<span v-t="'btn-dismiss-question'"></span>
							</v-tooltip>

						</v-list-tile>
					</v-list-tile-action>
				</v-list-tile>
			</v-list>

			<!--
				@desc: message content
			-->
			<v-card-title class="py-0 px-4">
				<p class="body-1">
					{{ question.content }}
				</p>
			</v-card-title>
		</v-card>
	</v-hover>
</template>

<script>
export default {
	name: 'QuestionCard',
	props: {
		question: {
			type: Object,
			default: () => ({
				content: '',
				id: null,
				user: {
					type: Object,
					default: () => ({
						id: null,
						name: ''
					})
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
		markStar() {},
		approve() {},
		dismiss() {}
	}
};
</script>

<style lang="scss">
</style>
