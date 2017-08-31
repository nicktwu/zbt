export default function (state = {
  events: [],
  event: false,
}, action) {
  switch(action.type) {
  case 'LOAD_WEEKLIST_SUCCESS':
    return {
      ...state,
      events: action.response.map(event => ({ ...event, date: new Date(event.date) })),
    };
  case 'LOAD_EVENT_SUCCESS':
    console.log(action.response);
    return {
      ...state,
      event: action.response
    };
  default:
    return state;
  }
}
