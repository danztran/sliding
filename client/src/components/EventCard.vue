<template>
	<v-hover>
		<v-card slot-scope="{ hover }" class="card-hover py-3 my-2">
			<v-layout
				class="mt-2"
				row
				wrap
				align-center>
				<!-- ICON -->
				<v-flex xs2 sm1 class="text-xs-center">
					<v-btn icon>
						<v-icon
							:size="iconSize"
							color="primary"
							v-text="'$vuetify.icons.event'" />
					</v-btn>
				</v-flex>

				<!-- CONTENT -->
				<v-flex xs9 sm10>
					<v-layout
						row
						justify-space-between
						align-center>
						<section>
							<div>
								<span class="body-2">{{ field.name }} </span>
								<span class="grey--text text-uppercase"> #{{ field.code }}</span>
							</div>
							<span class="grey--text">
								{{ calDateStart(field.start_at) }} - {{ calDateEnd(field.end_at) }}
							</span>
						</section>
						<div v-if="hover" class="hidden-sm-and-down">
							<v-icon
								class="iconAction"
								:size="iconSize"
								v-text="'$vuetify.icons.web_slide_event'" />
							<v-icon
								class="iconAction"
								:size="iconSize"
								v-text="'$vuetify.icons.mobile_slide_event'" />
						</div>
					</v-layout>
				</v-flex>

				<!-- ACTIONS -->
				<v-flex xs1 sm1 class="text-xs-center">
					<v-menu offset-y left>
						<template #activator="{ on: menu }">
							<v-tooltip top>
								<template #activator="{ on: tooltip }">
									<v-icon
										class="iconAction"
										:size="iconSize"
										v-on="{ ...tooltip, ...menu }"
										v-text="'$vuetify.icons.more_vert'" />
								</template>
								<span v-t="'action-tooltip'" />
							</v-tooltip>
						</template>
						<v-list>
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
	</v-hover>
</template>

<script>
export default {
	name: 'EventCard',
	props: {
		field: {
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
.card-hover:hover {
	cursor: pointer;
	background-color: #f5f5f5;
}
.iconAction.material-icons.theme--light:hover {
	color: #3595BE;
}
</style>
