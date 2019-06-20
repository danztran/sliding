<!--
	@desc: question review card for Moderator mode
-->
<template>
	<v-hover>
		<v-card slot-scope="{ hover }" class="no-shadow">
			<v-list subheader class="py-1">
				<v-list-tile>
					<!--
						@desc: avatar
					-->
					<v-list-tile-avatar
						class="pl-2"
						:size="icon.lg"
						color="grey lighten-2">
						<v-icon
							:size="icon.sm"
							color="white"
							v-text="'$vuetify.icons.person'" />
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
							<v-icon :size="icon.xs" v-text="'$vuetify.icons.like'" />
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
											v-text="'$vuetify.icons.star_border'" />
									</v-btn>
								</template>
								<span v-t="'btn-not-star-question'" />
							</v-tooltip>

							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn
										class="mx-1"
										flat
										icon color="success"
										v-on="on"
										@click="approve">
										<v-icon
											color="success"
											:size="icon.lg"
											v-text="'$vuetify.icons.approve'" />
									</v-btn>
								</template>
								<span v-t="'btn-approve-question'" />
							</v-tooltip>

							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn
										flat
										icon color="red"
										v-on="on"
										@click="dismiss">
										<v-icon
											color="red"
											:size="icon.lg"
											v-text="'$vuetify.icons.dismiss'" />
									</v-btn>
								</template>
								<span v-t="'btn-dismiss-question'" />
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
