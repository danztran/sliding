<template>
	<v-hover>
		<v-card
			slot-scope="{ hover }"
			class="no-shadow search-card mb-1"
			@click="toVerifyEvent">
			<v-list three-line>
				<v-list-tile>
					<v-list-tile-content>
						<v-list-tile-title :class="{'grey--text text--darken-2': !hover, 'black--text': hover}">
							{{ eventInfo.name }}
						</v-list-tile-title>
						<v-list-tile-sub-title
							class="text-uppercase"
							:class="{'grey--text text--darken-2': !hover, 'black--text': hover}">
							# {{ eventInfo.code }}
						</v-list-tile-sub-title>
						<v-list-tile-sub-title class="grey--text text--lighten-2">
							{{ eventDate }}
						</v-list-tile-sub-title>
					</v-list-tile-content>

					<v-spacer />

					<v-list-tile-action v-if="hover || isSMnXS">
						<v-btn flat icon color="primary">
							<v-icon v-text="'$vuetify.icons.arrow_forward'" />
						</v-btn>
					</v-list-tile-action>
				</v-list-tile>
			</v-list>
		</v-card>
	</v-hover>
</template>

<script>
export default {
	name: 'EventCardInfo',
	props: {
		eventInfo: {
			type: Object,
			default: () => ({
				code: '',
				name: '',
				description: '',
				end_at: '2019-06-02T00:00:00.000Z',
				start_at: '2019-06-02T00:00:00.000Z',
			}),
		},
	},
	computed: {
		eventDate() {
			const start = new Date(this.eventInfo.start_at);
			const end = new Date(this.eventInfo.end_at);
			const dateEnd = end.toUTCString().toString().substr(4, 12);
			return `${start.getDate()} ${start.getMonth() !== end.getMonth() ? start.toLocaleString('default', { month: 'long' }) : ''} - ${dateEnd}`;
		},
	},
	methods: {
		toVerifyEvent() {
			this.$router.push({ name: 'event-verify', params: { eventInfo: this.eventInfo } });
		},
	},
};
</script>

<style lang="scss" scoped>
.search-card {
	box-shadow: 0 5px 10px 0 rgba(0,0,0,.15);
	&:hover {
		cursor: pointer;
		box-shadow: 0 5px 10px 5px rgba(0,0,0,.15);
	}
}
</style>
