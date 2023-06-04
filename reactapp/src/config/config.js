const baseUrl = `http://localhost:8081`;

const endpoints = {            
  listEvents: `${baseUrl}/users/bookedEvents`,
  createEvent: `${baseUrl}/users/bookTheme`,
  deleteEvent: `${baseUrl}/users/bookedEvents/`,
};


export default endpoints;
