export default {
	name: 'handleMessage',
	created() {
		const message = this.$cookies.get('_fm');
		if (message) {
			this.flashMessage = message;
			this.$cookies.remove('_fm');
		}
	},
	methods: {
		handleErrorMessages(dataMsg) {
			if (typeof dataMsg === 'string') {
				if (this.errorMessage !== undefined) {
					this.errorMessage = dataMsg;
				}
				else {
					this.$root.$emit('notifyErrorMessage', dataMsg);
				}
			}
			else {
				const messages = [];
				for (const key of Object.keys(dataMsg)) {
					if (this.form) {
						if (Object.prototype.hasOwnProperty.call(this.form, key)) {
							this.form[key].errmsg = dataMsg[key];
						}
						else messages.push(dataMsg[key]);
					}
					else messages.push(dataMsg[key]);
				}

				if (messages.length > 0) {
					this.$root.$emit('notifyErrorMessage', messages.join('\n\r'));
				}
			}
		}
	}
};
