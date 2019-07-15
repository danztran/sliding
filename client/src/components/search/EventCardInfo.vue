<template>
	<v-hover>
		<v-card
			slot-scope="{ hover }"
			class="no-shadow search-card mb-1">
			<v-list three-line>
				<v-list-tile>
					<v-list-tile-content>
						<v-list-tile-title>
							event name
						</v-list-tile-title>
						<v-list-tile-sub-title>
							# 1234
						</v-list-tile-sub-title>
						<v-list-tile-sub-title>
							15 - 19 Jul 2019
						</v-list-tile-sub-title>
					</v-list-tile-content>

					<v-spacer />

					<v-list-tile-action v-if="hover">
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
