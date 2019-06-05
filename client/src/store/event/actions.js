import api from '@/api';
import axios from '@/modules/axios-custom';

const queryEvent = (context, queryOptions) => {
	axios.get(api.event.query, queryOptions)
		.then((res) => {
			context.commit('QUERY_EVENT', res.data);
		})
		// eslint-disable-next-line
		.catch(err => console.log(err));
};

export default {
	queryEvent
};
