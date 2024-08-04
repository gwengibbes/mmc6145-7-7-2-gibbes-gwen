const axios = require('axios');
//create an instance of axios that will be used for all api calls. 
const amadeus = axios.create({
   baseURL: process.env.AMADEUS_API_HOST || 'https://test.api.amadeus.com/v1',
   timeout: 30000,
   headers: {'content-type': 'application/json'}
});

//get an access token to be used as authentication for the api. 
async function getAccessToken() {
   const res = await amadeus.post('/security/oauth2/token', {
       client_id: process.env.AMADEUS_API_KEY,
       client_secret: process.env.AMADEUS_API_SECRET,
       grant_type: 'client_credentials'
   }, {
       headers: {'content-type': 'application/x-www-form-urlencoded'}
   });
   return res.data.access_token
}

//convert the api's response to a format this application understands. 
function formatActivity(activity) {
   return {
       id: activity.id,
       title: activity.name,
       summary: (activity.shortDescription || activity.description),
       details: activity.description,
       image: activity.pictures?.length > 0 ? activity.pictures[0] : null,
   }
}

//get a list of things to do within a specific location. 
export async function getActivities(latitude, longitude, radius, limit) {
   const accessToken = await getAccessToken();
   const result = (await amadeus.get('/shopping/activities', {
       headers: {'Authorization': `Bearer ${accessToken}`},
       params: {
           latitude,
           longitude,
           radius,
       }
   })).data;
   return result.data.slice(0, limit).map(formatActivity);
}

//get an activity by its id. 
export async function getActivity(activityId) {
   const accessToken = await getAccessToken();
   const result = (await amadeus.get(`/shopping/activities/${activityId}`,
       {headers: {'Authorization': `Bearer ${accessToken}`}}
   )).data;
   return formatActivity(result.data);
}
