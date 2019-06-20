<template>
	<v-card class="card-hover py-3 my-2">
		<v-layout
			class="mt-2"
			row
			wrap
			align-center>
			<!-- @desc: icon event -->
			<v-flex xs2 sm1 class="text-xs-center" @click="toEventLive">
				<v-btn icon>
					<v-icon
						:size="iconSize"
						color="primary"
						v-text="'$vuetify.icons.event'" />
				</v-btn>
			</v-flex>

			<!-- @desc: event description -->
			<v-flex xs8 sm9 @click="toEventLive">
				<v-layout
					row
					justify-space-between
					align-center>
					<section>
						<div>
							<span class="body-2">
								{{ info.name }}
							</span>
							<span class="grey--text text-uppercase">
								#{{ info.code }}
							</span>
						</div>
						<span class="grey--text">
							{{ calDateStart(info.start_at) }} - {{ calDateEnd(info.end_at) }}
						</span>
					</section>
				</v-layout>
			</v-flex>

			<!-- @desc: actions -->
			<v-flex xs2 sm2 class="text-xs-center">
				<span class="otp hidden-sm-and-down pl-5">
					<v-icon
						class="iconAction"
						:size="iconSize - 3"
						v-text="'$vuetify.icons.web_slide_event'" />
					<v-icon
						class="iconAction"
						:size="iconSize - 3"
						v-text="'$vuetify.icons.mobile_slide_event'" />
				</span>

				<v-menu offset-y left>
					<template #activator="{ on: menu }">
						<v-tooltip top>
							<template #activator="{ on: tooltip }">
								<v-icon
									class="iconAction right pr-2"
									:size="iconSize"
									v-on="{ ...tooltip, ...menu }"
									v-text="'$vuetify.icons.more_vert'" />
							</template>
							<span v-t="'action-tooltip'" />
						</v-tooltip>
					</template>
					<v-list dense>
						<v-list-tile
							v-for="(item, index) in items"
							:key="index"
							class="iconAction">
							<v-list-tile-title>{{ item.title }}</v-list-tile-title>
						</v-list-tile>
					</v-list>
				</v-menu>
			</v-flex>
		</v-layout>
	</v-card>
</template>

<script>
export default {
	name: 'EventCard',
	props: {
		info: {
			type: Object,
			default: () => ({
				name: 'Name Event',
				code: 'Event code',
				start_at: '',
				end_at: ''
			})
		}
	},
	data: () => ({
		iconSize: 25,
		items: [
			{ title: 'Click Me1' },
			{ title: 'Click Me2' },
			{ title: 'Click Me3' },
			{ title: 'Click Me4' }
		]
	}),
	methods: {
		calDateStart(date) {
			return new Date(date).toGMTString().substr(0, 7).replace(',', '');
		},
		calDateEnd(date) {
			return new Date(date).toGMTString().substr(0, 16);
		},
		toEventLive() {
			const { code } = this.info;
			this.$router.push({ name: 'admin-event', params: { code } });
		}
	}
};
</script>

<style lang="scss" scoped>
.v-card {
	margin: 0 !important;
	border: 1px solid rgba(0,0,0,.1);
	box-shadow: none;
	&.py-3 {
		padding: 7px 0 12px 0 !important;
	}
}
.otp {
	opacity: 0;
	visibility: hidden;
}
.card-hover:hover {
	cursor: pointer;
	background-color: #f5f5f5;
	.otp {
		opacity: 1;
		visibility: visible;
	}
}
.iconAction.material-icons.theme--light:hover {
	color: #3595BE;
}
</style>
