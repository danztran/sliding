export default {
	name: 'animationEditLoading',
	data: () => ({
		mixEditLoading: {
			loading: false,
			success: false,
			fail: false
		},
		timeout: 2000
	}),
	methods: {
		buttonEditLoading(name, timing) {
			this.mixEditLoading[name] = true;
			setTimeout(() => {
				this.mixEditLoading[name] = false;
			}, timing || this.timeout);
		}
	}
};
