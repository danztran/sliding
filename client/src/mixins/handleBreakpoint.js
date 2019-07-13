export default {
	name: 'handleBreakpoint',
	computed: {
		isSM() {
			return this.$vuetify.breakpoint.sm;
		},
		isXS() {
			return this.$vuetify.breakpoint.xs;
		},
		isSMnXS() {
			return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
		},
	},
};
