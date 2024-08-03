import List from '../models/list'
import dbConnect from '../connection'

export async function addToList(listName, user, destinationId) {
    //Create an entry in the database to save the destination to the user's list. 
    await dbConnect()
    const addedDestination = await List.create({user:user._id, list:listName, destinationId}).lean()
    if (!addedDestination) return null
    return addedDestination
}

async function getDestinationFromAPI (destinationId) {
  //To figure out what the API, making the call to the API and getting the data.
       return {
            title: "Trinidad Beach",
            summary: "A beautiful beach in Barbados",
            image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?cs=srgb&dl=pexels-asadphoto-457882.jpg&fm=jpg"
        }
}

export async function getDestinations(listName, user){
    //Reading from the database the destinations that have been saved to a database by a specific user. 
        await dbConnect()
        const destinationsFromDb= await List.find({
          list:listName,
          user:user._id,
        }
        ).lean()
        if (!destinationsFromDb) return []
        const destinations =[]
        //Using for of loop because of awaiting promise
        for(const destination of destinationsFromDb) {
           destinations.push(await getDestinationFromAPI (destination.destinationId))
        }
        // console.log (destinations)
        return destinations
}

export async function removeDestination(listName, user, destinationId){
    //Remove from the database the specified destination by a specific user. 
        await dbConnect()
        const destination = await List.remove({
          list:listName,
          user:user._id,
          destinationId,
        }
        ).lean()
        if (!destination) return null
        return true
}