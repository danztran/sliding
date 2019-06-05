<template>
	<v-hover>
		<v-card class="card-hover py-2 my-2" slot-scope="{ hover }" to="#">
			<v-layout class="mt-2" row wrap align-center>
				<!-- ICON -->
				<v-flex xs2 sm1 class="text-xs-center">
					<v-btn icon>
						<v-icon
							:size="iconSize"
							color="primary"
							v-html="'$vuetify.icons.event'"/>
					</v-btn>
				</v-flex>

				<!-- CONTENT -->
				<v-flex xs9 sm10>
					<v-layout row justify-space-between align-center>
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
								v-html="'$vuetify.icons.web-slide-event'"/>
							<v-icon
								class="iconAction"
								:size="iconSize"
								v-html="'$vuetify.icons.mobile-slide-event'"/>
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
										:size="iconSize"
										v-on="{ ...tooltip, ...menu }"
										v-html="'$vuetify.icons.more-vert'" />
								</template>
								<span v-t="'action-tooltip'"></span>
							</v-tooltip>
						</template>
						<v-list>
							<v-list-tile
								v-for="(item, index) in items"
								:key="index">
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
			return new Date(date).getDate();
		},
		calDateEnd(date) {
			return new Date(date).toGMTString().substr(5, 11);
		}
	}
};
</script>

<style lang="css">
.card-hover:hover {
	cursor: pointer;
	background-color: #f5f5f5;
}
.iconAction.material-icons.theme--light:hover {
	color: #3595BE;
}
</style>
