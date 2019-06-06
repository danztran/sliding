import api from '@/api';
import axios from '@/modules/axios-custom';

const queryEvent = (context, queryParams) => {
	axios.get(`${api.event.query}?${queryParams}`)
		.then((res) => {
			context.commit('QUERY_EVENT', res.data);
		})
		// eslint-disable-next-line
		.catch(err => console.log(err));
};

const createEvent = (context, newEvent) => {
	context.commit('CREATE_EVENT', newEvent);
};

export default {
	queryEvent,
	createEvent
};
