import {getActivities} from "../../../amadeus/index"
import searchableLocations from "../../../config/searchable-locations"

//GET /destinations endpoint for travel destinations. To help the user facilitate searching for a destination.
export default async function handler (req,res){
    const selectedLocation = req.query.selectedLocation
    // To find the configuration that the user specified. 
    const location = searchableLocations.find(searchableLocation => searchableLocation.id === selectedLocation)
    const latitude=location.coordinates.latitude
    const longitude=location.coordinates.longitude
    const radius=location.radius
    const limit=location.limit
    //To call the Amadeus API.
    const activities= await getActivities(latitude, longitude, radius, limit)
    res.status(200).json(activities)
}