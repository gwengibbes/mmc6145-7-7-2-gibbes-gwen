import db from '../../../db/'

//This handler runs for /lists/:listName/destinations
export default withIronSessionApiRoute(
    async function handler(req, res) {
        // User info can be accessed with req.session
        const user = req.session?.user;
        if (!user) {
            // No user info on the session means the user is not logged in
            return res.status(401);
        }
        const listName = req.query.listName

        switch (req.method) {
            //POST /lists/:listName/destinations endpoint for adding a travel destination to the Bucket List & Visited
            //On POST request, add a destination using db.list.add 
            case 'POST':
                try {
                    const addedDestination = await db.list.addToList(listName, user, req.body.destinationId);
                    if (!addedDestination) {
                        return res.status(400).json({ error: 'Something went wrong while adding to the list.' });
                    }
                    return res.status(200).json(addedDestination);
                } catch (err) {
                    return res.status(400).json({ error: err.message });
                }
                break;

            //GET /lists/bucket/destinations endpoint for retrieving destinations from the Bucket List & Visited List.
            case 'GET':
                try {
                    const destinations = await db.list.getDestinations(listName, user);
                    if (!destinations) {
                        return res.status(200).json([]);
                    }
                    return res.status(200).json(destinations);
                } catch (err) {
                    return res.status(400).json({ error: err.message });
                }
                break;

            //DELETE /lists/bucket/destinations/:id endpoint for removing a travel destination to the Bucket List & the Visited List. 
            //On a DELETE request, remove a destination from the bucket list using?
            case 'DELETE':
                try {
                    const destinationDeleted = await db.list.removeDestination(listName, user, req.body.destinationId);
                    if (!destinationDeleted) {
                        return res.status(404);
                    }
                    return res.status(200).json(destinationDeleted);
                } catch (err) {
                    return res.status(400).json({ error: err.message });
                }
                break;
        }
        //Respond with 404 for all other requests
        return res.status(404).end()
    })