import List from '../models/list'
import dbConnect from '../connection'

export async function addToList(listName, user, destinationId) {
    //Create an entry in the database to save the destination to the user's list. 
    await dbConnect()
    const addedDestination = await List.create({user:user._id, list:listName, destinationId}).lean()
    if (!addedDestination) return null
    return addedDestination
}

export async function getDestinations(listName, user){
    //Reading from the database the destinations that have been saved to a database by a specific user. 
        await dbConnect()
        const destinations= await List.find({
          list:listName,
          user:user._id,
        }
        ).lean()
        if (!destinations) return []
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