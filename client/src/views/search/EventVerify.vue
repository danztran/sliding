<template>
	<div v-show="ready" class="text-xs-center event-verify">
		<div
			v-t="'search-verify-welcome'"
			class="first-letter-uppercase title font-weight-regular" />
		<div class="title py-2 font-weight-bold">
			{{ eventInfo.name }}
		</div>
		<div class="grey--text text--darken-1">
			{{ startDate }}
		</div>
		<v-layout
			v-if="eventInfo.require_passcode"
			id="my-input-passcode"
			align-center
			justify-center
			column>
			<text-field :field="passcode" />
		</v-layout>
		<v-btn
			class="mt-5"
			color="success"
			medium
			round
			:disabled="eventInfo.require_passcode && passcode.value !== ''">
			<span v-t="'btn-join'" class="first-letter-uppercase" />
		</v-btn>

		<router-link
			tag="div"
			to="/search"
			class="grey--text text--lighten-1 caption bt-1 hover-pointer to-search">
			<span v-t="'btn-back-search'" />
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'EventVerify',
	data: () => ({
		eventInfo: {
			name: '',
			end_at: '2019-06-02T00:00:00.000Z',
			require_passcode: false,
		},
		passcode: {
			placeholder: 'lb-passcode',
			type: 'text',
			value: '',
			errmsg: '',
			inprepend: 'lock',
			autofocus: true,
		},
		ready: false,
	}),
	computed: {
		startDate() {
			return new Date(this.eventInfo.end_at).toUTCString().toString().substr(4, 12);
		},
	},
	created() {
		if (this._cm.notEmpty(this.$route.params.eventInfo)) {
			this.ready = true;
			this.eventInfo = this.$route.params.eventInfo;
		}
		else {
			this.$router.push({ name: 'search' });
		}
	},
};
</script>

<style lang="scss">
.event-verify {
	.to-search:hover {
		color: #777777 !important;
	}
	#my-input-passcode {
		.v-input__slot {
			border-radius: 50px;
		}
	}
}
</style>
