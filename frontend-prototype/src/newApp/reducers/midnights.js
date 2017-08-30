export default function (state = {
  events: [],
}, action) {
  switch(action.type) {
  case 'LOAD_WEEKLIST_SUCCESS':
    return {
      ...state,
      events: action.response.map(event => ({ ...event, date: new Date(event.date) })),
    };
  default:
    return state;
  }
}
