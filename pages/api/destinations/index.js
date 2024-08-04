import {getActivities} from "../../../amadeus/index"

//GET /destinations endpoint for travel destinations. To help the user facilitate searching for a destination.  (Home page)
export default async function handler (req,res){
    const latitude=41.397158
    const longitude=2.160873
    const radius=100
    const limit=10
    const activities= await getActivities(latitude, longitude, radius, limit)
    res.status(200).json(activities)
}