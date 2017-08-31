export default function (state = {
  events: [],
}, action) {
  switch(action.type) {
  case 'LOAD_WEEKLIST_SUCCESS':
    return {
      ...state,
      events: action.response.map(event => ({ ...event, date: new Date(event.date) })),
    };
  case 'LOAD_EVENT_SUCCESS':
    return {
      ...state,
      events: [...state.events.filter(event => event._id !== action.response._id),
      {...action.response, date: new Date(action.response.date)}],
    };
  default:
    return state;
  }
}
