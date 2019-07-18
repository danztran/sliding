<template>
	<div>
		<div id="input-code">
			<text-field
				:field="keySearch"
				@keydown.native.enter.capture="searchEvent"
				@keydown.native="showNotFoundMsg=false" />
			<v-btn
				class="btn-append-icon"
				color="primary"
				icon
				:disabled="loadingState !== ''"
				:loading="loadingState !== ''"
				@click="searchEvent">
				<v-icon
					v-show="loadingState === ''"
					color="white"
					v-text="'$vuetify.icons.arrow_forward'" />
				<template v-slot:loader>
					<icon-loading-circle :state.sync="loadingState" />
				</template>
			</v-btn>
			<v-slide-y-transition>
				<div
					v-if="showNotFoundMsg"
					v-t="'err-event-not-found'"
					class="error--text text-xs-center" />
			</v-slide-y-transition>
		</div>
		<v-slide-y-transition>
			<event-card--info v-if="_cm.notEmpty(eventInfo)" :event-info="eventInfo" />
		</v-slide-y-transition>
	</div>
</template>

<script>
import IconLoadingCircle from '@/components/pieces/IconLoadingCircle.vue';
import EventCardInfo from '@/components/search/EventCardInfo.vue';

export default {
	name: 'Search',
	components: {
		'icon-loading-circle': IconLoadingCircle,
		'event-card--info': EventCardInfo,
	},
	data: () => ({
		keySearch: {
			type: 'text',
			value: '',
			errmsg: '',
			prefix: '#',
			autofocus: true,
			placeholder: 'search',
			solo: true,
		},
		loadingState: '',
		showNotFoundMsg: false,
		eventInfo: {},
	}),
	mounted() {
		if (this.$route.query.code !== undefined) {
			this.keySearch.value = this.$route.query.code;
			this.searchEvent();
		}
	},
	methods: {
		searchEvent() {
			if (this.keySearch.value === '') {
				this.keySearch.errmsg = this.$t('err-empty-inputcode');
				return;
			}
			this.eventInfo = {};
			this.loadingState = 'loading';

			const params = {
				code: this.keySearch.value,
			};
			this.$axios
				.get(this.$api.event.search, { params })
				.then((res) => {
					this.loadingState = 'success';
					this.eventInfo = res.data.event;
				})
				.catch((err) => {
					this.showNotFoundMsg = true;
					this.loadingState = 'fail';
				});
		},
	},
};
</script>

<style lang="scss">
#input-code {
	position: relative;
	z-index: 1;
	margin-bottom: 3em;

	.v-input__slot {
		border-radius: 50px;

		input:valid {
			text-transform: uppercase;
		}
	}
	.v-messages__wrapper {
		text-align: center;
	}
	.btn-append-icon {
		position: absolute;
		z-index: 2;
		top: 0;
		right: 0;
	}
}
</style>
