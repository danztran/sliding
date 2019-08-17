<template>
	<v-card class="elevation-2">
		<!-- *icons - title - count -->
		<v-card-title :class="`subheading font-weight-medium ${info.color}--text`">
			<v-avatar :class="`lighten-5 ${info.color}`">
				<v-icon :class="`${info.color}--text`" v-text="`$vuetify.icons.${icon}`" />
			</v-avatar>
			<span v-t="info.header" class="first-letter-uppercase pl-2" />

			<v-layout align-center justify-end>
				<span class="font-weight-bold title" v-text="headerCount" />
			</v-layout>
		</v-card-title>

		<template v-if="!users">
			<!-- *info analytics -->
			<v-card-text class="pt-1">
				<div class="d-flex">
					<span v-t="info.fTitle" class="first-letter-uppercase grey--text text--lighten-1" />
					<span class="text-xs-right font-weight-bold">
						{{ fTitleCount }}
						<template v-if="question">
							/ {{ fSubTitleCount }}
						</template>
					</span>
				</div>

				<v-divider class="my-1" />
				<div class="d-flex">
					<span v-t="info.sTitle" class="first-letter-uppercase grey--text text--lighten-1" />
					<span class="text-xs-right font-weight-bold" v-text="sTitleCount" />
				</div>
			</v-card-text>
		</template>
	</v-card>
</template>

<script>
export default {
	name: 'OverViewCard',
	props: {
		info: {
			type: Object,
			default: () => ({
				color: '',
				header: '',
				fTitle: '',
				sTitle: '',
			}),
		},
		question: {
			type: Boolean,
			default: false,
		},
		users: {
			type: Boolean,
			default: false,
		},
		icon: {
			type: String,
			default: 'group_people',
		},
		headerCount: {
			type: String,
			default: '0',
		},
		fTitleCount: {
			type: String,
			default: '0',
		},
		fSubTitleCount: {
			type: String,
			default: '0',
		},
		sTitleCount: {
			type: String,
			default: '0',
		},
	},
};
</script>

<style>
</style>
