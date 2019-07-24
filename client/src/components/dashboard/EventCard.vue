<template>
	<v-card class="card-hover py-3 my-3">
		<v-layout
			class="mt-2"
			row
			wrap
			align-center>
			<!-- icon event -->
			<v-flex
				xs10
				sm4
				class="text-xs-center"
				@click="toEventLive">
				<v-list-tile class="grow">
					<v-list-tile-avatar>
						<v-btn icon>
							<v-icon
								size="35"
								color="primary"
								v-text="'$vuetify.icons.event'" />
						</v-btn>
					</v-list-tile-avatar>

					<v-list-tile-content>
						<v-list-tile-title class="body-2 text-capitalize">
							{{ info.name }}
						</v-list-tile-title>
						<v-list-tile-sub-title class="grey--text text-uppercase">
							#{{ info.code }}
						</v-list-tile-sub-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-flex>

			<!-- date/time (SM and up)-->
			<template v-if="!isXS">
				<!-- @desc: time begin/end -->
				<v-flex
					sm5
					@click="toEventLive">
					<div class="grey--text text--darken-1">
						{{ formatTime(info.start_at) }} - {{ formatDate(info.start_at) }}
					</div>
					<div>
						{{ formatTime(info.end_at) }} - {{ formatDate(info.end_at) }}
					</div>
				</v-flex>
			</template>

			<!-- actions -->
			<v-flex
				xs2
				sm3
				class="text-xs-center">
				<v-layout
					justify-end>
					<span class="otp hidden-sm-and-down pl-5">
						<v-icon
							class="iconHover"
							:size="iconSize - 3"
							v-text="'$vuetify.icons.web_slide_event'" />
						<v-icon
							class="iconHover"
							:size="iconSize - 3"
							v-text="'$vuetify.icons.mobile_slide_event'" />
					</span>

					<v-menu offset-y left>
						<template #activator="{ on: menu }">
							<v-tooltip top>
								<template #activator="{ on: tooltip }">
									<v-icon
										class="iconHover right px-2"
										:size="iconSize"
										v-on="{ ...tooltip, ...menu }"
										v-text="'$vuetify.icons.more_vert'" />
								</template>
								<span v-t="'action-tooltip'" />
							</v-tooltip>
						</template>

						<!-- *Event QRCode -->
						<v-list class="py-0 custom-list" dense>
							<v-list-tile @click="toggleDialogQRCode">
								<v-list-tile-action>
									<v-icon small v-text="'$vuetify.icons.dashboard'" />
								</v-list-tile-action>
								<v-list-tile-content>
									<v-list-tile-title
										v-text="'QRCode'" />
								</v-list-tile-content>
							</v-list-tile>
						</v-list>

						<!-- *delete event -->
						<v-list class="py-0 custom-list" dense>
							<v-list-tile @click="deleteEvent">
								<v-list-tile-action>
									<v-icon small v-text="'$vuetify.icons.delete'" />
								</v-list-tile-action>
								<v-list-tile-content>
									<v-list-tile-title
										v-t="'btn-delete'"
										class="first-letter-uppercase" />
								</v-list-tile-content>
							</v-list-tile>
						</v-list>
					</v-menu>
				</v-layout>
			</v-flex>

			<!-- date/time (only XS) -->
			<template v-if="isXS">
				<v-flex xs2 />
				<!-- @desc: time begin/end -->
				<v-flex xs10 class="pl-3">
					<div class="grey--text text--darken-1">
						{{ formatTime(info.start_at) }} - {{ formatDate(info.start_at) }}
					</div>
					<div class="red--text text--darken-3">
						{{ formatTime(info.end_at) }} - {{ formatDate(info.end_at) }}
					</div>
				</v-flex>
			</template>
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
				end_at: '',
			}),
		},
	},
	data: () => ({
		iconSize: 25,
	}),
	methods: {
		formatDate(date) {
			return new Date(date).toLocaleDateString();
		},
		formatTime(date) {
			return new Date(date).toLocaleString([], { hour: '2-digit', minute: '2-digit' });
		},
		toggleDialogQRCode() {
			this.$root.$emit('dialog-qrcode', this.info.code);
		},
		toEventLive() {
			const { code } = this.info;
			this.$router.push({ name: 'admin-event', params: { code } });
		},
		deleteEvent() {
			// ...
		},
	},
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
.iconHover.material-icons.theme--light:hover {
	color: #3595BE;
}
</style>
