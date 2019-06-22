export default {
	methods: {
		$socket_updateHeaders() {
			this.$socket.io.opts = {
				...this.$socket.io.opts,
				transportOptions: {
					polling: {
						extraHeaders: {
							'accept-language': this.$i18n.locale
						}
					}
				}
			};
		}
	}
};
