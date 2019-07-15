<template>
	<div>
		<div id="input-code">
			<text-field :field="inputCode" />
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
		</div>
		<event-card--info />
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
		inputCode: {
			type: 'text',
			value: '',
			errmsg: '',
			prefix: '#',
			autofocus: true,
			placeholder: 'lb-event-code',
			solo: true,
		},
		loadingState: '',
	}),
	methods: {
		searchEvent() {
			if (this.inputCode.value === '') {
				this.inputCode.errmsg = this.$t('err-empty-inputcode');
				return;
			}
			this.loadingState = 'loading';
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
