import api from '@/api';
import axios from '@/modules/axios-custom';

const queryEvent = (context, queryOpt) => {
	axios.get(api.event.query, { params: queryOpt })
		.then((res) => {
			context.commit('QUERY_EVENT', res.data.events);
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
