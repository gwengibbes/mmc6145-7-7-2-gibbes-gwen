import { Schema, model, models } from 'mongoose'
import bcrypt from 'bcrypt'

//Store what the user has added to their respectives lists- bucket list or visited list
const ListSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
list: {
    type: String,
    required: true,
  },
  destinationId: {
    type: String,
    required: true,
  },
})

export default models.List || model('List', ListSchema)