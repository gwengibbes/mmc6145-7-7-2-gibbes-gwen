import List from '../models/list'
import dbConnect from '../connection'
import { getActivity } from '../../amadeus'

export async function addToList(listName, user, destinationId) {
    //Create an entry in the database to save the destination to the user's list. 
    await dbConnect()
    const addedDestination = await List.create({user:user._id, list:listName, destinationId})
    if (!addedDestination) return null
    return addedDestination
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
           destinations.push(await getActivity (destination.destinationId))
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